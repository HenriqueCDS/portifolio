// Buraco negro (geodésicas de Schwarzschild, rs = 1) renderizado por ray-marching e
// convertido em ASCII na GPU. Paleta fixa em "gelo".

export const quadVS = /* glsl */`
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

// Passo 1 — cena: um fóton com momento angular h obedece a = -1.5 · h² · p / |p|⁵.
// A cada cruzamento do plano y = 0 dentro do disco somamos a emissão (temperatura,
// Doppler, redshift gravitacional); o arco inferior e o anel de fótons surgem sozinhos.
export const sceneFS = /* glsl */`
    precision highp float;
    varying vec2 vUv;

    uniform float uAspect, uTanHalf, uTime, uPulse;
    uniform vec3  uCamPos, uCamRight, uCamUp, uCamFwd;

    #define R_IN      2.7
    #define R_OUT     12.0
    #define MAX_STEPS 380

    float hash13(vec3 p) {
        p = fract(p * 0.1031);
        p += dot(p, p.zyx + 31.32);
        return fract((p.x + p.y) * p.z);
    }

    float vnoise(vec3 p) {
        vec3 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(
            mix(mix(hash13(i),               hash13(i + vec3(1,0,0)), f.x),
                mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), f.x), f.y),
            mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), f.x),
                mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), f.x), f.y),
            f.z);
    }

    // temperatura normalizada (0..1+) -> cor de corpo negro estilizada
    vec3 blackbody(float T) {
        T = clamp(T, 0.0, 1.3);
        float T2 = T * T;
        return vec3(1.0, T2 * 1.05, T2 * T2 * 0.9);
    }

    vec3 starfield(vec3 d) {
        vec3 q  = d * 34.0;
        vec3 id = floor(q), f = fract(q);
        float h = hash13(id);
        if (h < 0.93) return vec3(0.0);
        vec3 c = vec3(hash13(id + 1.7), hash13(id + 5.3), hash13(id + 9.1)) * 0.5 + 0.25;
        float s = smoothstep(0.17, 0.0, length(f - c));
        float mag = 0.4 + 0.6 * fract(h * 97.0);
        return vec3(0.8, 0.88, 1.0) * s * s * mag * 2.6;
    }

    // emissão do disco de acreção no ponto ip, visto por um raio com direção rdir
    vec4 diskSample(vec3 ip, vec3 rdir) {
        float r   = length(ip.xz);
        float ang = atan(ip.z, ip.x);

        // rotação diferencial kepleriana: o miolo gira mais rápido
        float a  = ang + 3.0 * pow(r, -1.5) * uTime;
        vec2  cs = vec2(cos(a), sin(a));

        // ruído esticado ao longo do ângulo => filamentos concêntricos
        float n1 = vnoise(vec3(cs * 1.6, r * 3.0));
        float n2 = vnoise(vec3(cs * 3.6, r * 11.0 + 7.0));
        float n3 = vnoise(vec3(cs * 8.0, r * 30.0 + 13.0));
        float d  = smoothstep(0.12, 0.85, 0.45 * n1 + 0.33 * n2 + 0.22 * n3);
        float band = 0.70 + 0.30 * sin(r * 21.0 + n1 * 6.0);

        float edge = smoothstep(R_IN, R_IN + 0.3, r) * (1.0 - smoothstep(R_OUT - 4.0, R_OUT, r));
        float dens = (0.40 + 0.60 * d) * edge;

        // Doppler + redshift gravitacional
        vec3  vdir = normalize(vec3(ip.z, 0.0, -ip.x));
        float vm   = sqrt(0.5 / r);
        float D    = sqrt(1.0 - vm * vm) / (1.0 - vm * dot(vdir, -rdir));
        float g    = sqrt(max(1.0 - 1.0 / r, 0.02));
        float shift = D * g;

        float T = pow(R_IN / r, 0.75);
        float I = 3.6 * pow(R_IN / r, 0.95) * band * (0.35 + 1.0 * d) * pow(shift, 2.0);

        // pulso: onda de choque que corre pelo disco e some em 4 s (uPulse = segundos desde o disparo)
        if (uPulse < 4.0) {
            float front = R_IN + uPulse * 5.0;
            float w = (r - front) / 0.9;
            float k = exp(-w * w) * (1.0 - uPulse / 4.0);
            I *= 1.0 + 3.0 * k;
            T += 0.25 * k;
        }

        return vec4(blackbody(T * shift) * I, dens);
    }

    void main() {
        vec2 uv = vUv * 2.0 - 1.0;
        uv.x *= uAspect;
        vec3 rd = normalize(uCamFwd + (uCamRight * uv.x + uCamUp * uv.y) * uTanHalf);

        vec3 p = uCamPos;
        vec3 v = rd;
        vec3 hv = cross(p, v);
        float h2 = dot(hv, hv);

        vec3  col = vec3(0.0);
        float trans = 1.0;
        bool  escaped = false;

        for (int i = 0; i < MAX_STEPS; i++) {
            float r2 = dot(p, p);
            float r  = sqrt(r2);

            if (r < 1.0) break;                                  // horizonte de eventos
            if (r > 90.0 && dot(p, v) > 0.0) { escaped = true; break; }

            float dt = 0.08 * clamp(r - 0.6, 0.3, 8.0);

            if (r < 3.2) {                                       // anel de fótons
                float w = (r - 1.5) / 0.25;
                col += trans * dt * 0.16 * exp(-w * w) * vec3(1.0, 0.72, 0.42);
            }

            vec3 acc = -1.5 * h2 * p / (r2 * r2 * r);
            v += acc * dt;
            vec3 np = p + v * dt;

            if (p.y * np.y < 0.0) {                              // cruzou o plano do disco
                float t  = p.y / (p.y - np.y);
                vec3  ip = mix(p, np, t);
                float ir = length(ip.xz);
                if (ir > R_IN && ir < R_OUT) {
                    vec4 s = diskSample(ip, normalize(v));
                    col   += trans * s.rgb * s.a;
                    trans *= 1.0 - s.a * 0.85;
                }
            }
            p = np;
        }

        if (escaped) col += trans * starfield(normalize(v));

        col = 1.0 - exp(-col * 1.25);                            // tone mapping
        gl_FragColor = vec4(col, 1.0);
    }
`;

// Passo 2 — ASCII: amostra a luminância por célula e escolhe o glifo no atlas.
// A saída é pré-multiplicada (alpha = brilho), então o preto vira transparente
// e o canvas se funde com o fundo da section.
export const asciiFS = /* glsl */`
    precision highp float;
    uniform sampler2D uScene, uAtlas;
    uniform vec2  uCell, uGrid, uOrigin, uScreen;
    uniform float uCount;

    void main() {
        // coordenadas em px contando a partir do canto superior esquerdo da grade
        vec2 px   = vec2(gl_FragCoord.x, uScreen.y - gl_FragCoord.y) - uOrigin;
        vec2 cell = floor(px / uCell);
        if (cell.x < 0.0 || cell.y < 0.0 || cell.x >= uGrid.x || cell.y >= uGrid.y) {
            gl_FragColor = vec4(0.0);
            return;
        }
        vec2 f = fract(px / uCell);

        // o alvo tem 2x2 amostras por célula: o filtro linear já faz a média
        vec2 suv = vec2((cell.x + 0.5) / uGrid.x, 1.0 - (cell.y + 0.5) / uGrid.y);
        vec3 scn = texture2D(uScene, suv).rgb;

        float L   = clamp(dot(scn, vec3(0.55, 0.35, 0.10)) * 1.35, 0.0, 1.0);
        L = clamp((L - 0.10) / 0.90, 0.0, 1.0);                  // limiar: mantém a sombra realmente preta
        float idx = floor(clamp(pow(L, 0.85), 0.0, 0.999) * uCount);
        float m   = texture2D(uAtlas, vec2((idx + clamp(f.x, 0.001, 0.999)) / uCount, 1.0 - f.y)).r;

        vec3 ice = mix(vec3(0.15, 0.35, 0.90), vec3(0.85, 0.95, 1.00), L);
        vec3 col = ice * (0.42 + 0.58 * L) * m;
        col += ice * L * 0.07;                                   // brilho difuso atrás dos glifos

        float a = max(col.r, max(col.g, col.b));
        gl_FragColor = vec4(col, a);
    }
`;
