import { useEffect } from 'react';
import { prefersReducedMotion } from './useScrollReveal';
import { quadVS, sceneFS, asciiFS } from '../three/blackHoleShaders';

const RAMP = ' .:-=+*xX#%@'; // do vazio ao mais brilhante
const CELL_ASPECT = 0.55; // largura / altura de cada caractere
const FONT = '"Cascadia Mono", Consolas, "SF Mono", Menlo, "Courier New", monospace';
const CAMERA_DIST = 19; // em raios de Schwarzschild
const CAMERA_ELEVATION = 0.06;
const ELEVATION_LIMIT = 1.45; // não deixa a câmera passar do polo
const DRAG_SPEED = 0.0055; // rad por px arrastado
const IDLE_DELAY_MS = 2500; // sem interação por esse tempo, o balanço automático volta
const PULSE_INTERVAL = 10; // segundos entre pulsos automáticos (a onda dura 4 s no shader)

// atlas horizontal com um glifo da RAMP por célula, amostrado no shader ASCII
function createGlyphAtlas(THREE, cellW, cellH) {
    const canvas = document.createElement('canvas');
    canvas.width = cellW * RAMP.length;
    canvas.height = cellH;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let fontSize = cellH * 0.9;
    ctx.font = `700 ${fontSize}px ${FONT}`;
    fontSize *= (cellW / ctx.measureText('M').width) * 0.98; // encaixa o glifo na largura da célula
    ctx.font = `700 ${fontSize}px ${FONT}`;

    for (let i = 1; i < RAMP.length; i++) {
        ctx.fillText(RAMP[i], i * cellW + cellW / 2, cellH * 0.54);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = texture.magFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
    return texture;
}

// buraco negro em ASCII (paleta gelo). Arrastar orbita a câmera (com inércia) e um clique
// dispara o pulso; os eventos vêm da section porque o conteúdo cobre o canvas.
// Pausado fora da viewport/aba pra não gastar GPU/bateria à toa
export function useBlackHoleScene(canvasRef, sectionRef) {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || prefersReducedMotion()) return;

        let cleanup = () => {};
        let cancelled = false;

        import('three').then((THREE) => {
            if (cancelled) return;

            let renderer;
            try {
                renderer = new THREE.WebGLRenderer({
                    canvas,
                    alpha: true,
                    antialias: false,
                    powerPreference: 'high-performance',
                });
            } catch {
                return; // sem WebGL: a section fica só com o fundo sólido
            }
            renderer.setPixelRatio(1); // o DPR é controlado em layout()
            renderer.setClearColor(0x000000, 0);

            const quadGeometry = new THREE.PlaneGeometry(2, 2);
            const quadCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

            const cam = {
                pos: new THREE.Vector3(),
                right: new THREE.Vector3(),
                up: new THREE.Vector3(),
                fwd: new THREE.Vector3(),
            };
            const worldUp = new THREE.Vector3(0, 1, 0);

            const sceneMaterial = new THREE.ShaderMaterial({
                vertexShader: quadVS,
                fragmentShader: sceneFS,
                depthTest: false,
                depthWrite: false,
                uniforms: {
                    uAspect: { value: 2 },
                    uTanHalf: { value: 0.364 },
                    uTime: { value: 0 },
                    uPulse: { value: 0 },
                    uCamPos: { value: cam.pos },
                    uCamRight: { value: cam.right },
                    uCamUp: { value: cam.up },
                    uCamFwd: { value: cam.fwd },
                },
            });
            const asciiMaterial = new THREE.ShaderMaterial({
                vertexShader: quadVS,
                fragmentShader: asciiFS,
                depthTest: false,
                depthWrite: false,
                uniforms: {
                    uScene: { value: null },
                    uAtlas: { value: null },
                    uCell: { value: new THREE.Vector2() },
                    uGrid: { value: new THREE.Vector2() },
                    uOrigin: { value: new THREE.Vector2() },
                    uScreen: { value: new THREE.Vector2() },
                    uCount: { value: RAMP.length },
                },
            });

            const sceneScene = new THREE.Scene();
            sceneScene.add(new THREE.Mesh(quadGeometry, sceneMaterial));
            const asciiScene = new THREE.Scene();
            asciiScene.add(new THREE.Mesh(quadGeometry, asciiMaterial));

            let renderTarget = null;
            let atlas = null;
            let supersample = 2;

            const layout = () => {
                const { clientWidth, clientHeight } = canvas;
                if (!clientWidth || !clientHeight) return;

                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                const width = Math.floor(clientWidth * dpr);
                const height = Math.floor(clientHeight * dpr);
                renderer.setSize(width, height, false);

                const cellH = Math.round((clientWidth < 768 ? 14 : 12) * dpr);
                const cellW = Math.round(cellH * CELL_ASPECT);
                const cols = Math.ceil(width / cellW);
                const rows = Math.ceil(height / cellH);

                if (renderTarget) renderTarget.dispose();
                renderTarget = new THREE.WebGLRenderTarget(cols * supersample, rows * supersample, {
                    minFilter: THREE.LinearFilter,
                    magFilter: THREE.LinearFilter,
                    depthBuffer: false,
                    stencilBuffer: false,
                });

                if (atlas) atlas.dispose();
                atlas = createGlyphAtlas(THREE, cellW, cellH);

                const u = asciiMaterial.uniforms;
                u.uScene.value = renderTarget.texture;
                u.uAtlas.value = atlas;
                u.uCell.value.set(cellW, cellH);
                u.uGrid.value.set(cols, rows);
                u.uScreen.value.set(width, height);
                u.uOrigin.value.set(
                    Math.floor((width - cols * cellW) / 2),
                    Math.floor((height - rows * cellH) / 2)
                );

                const aspect = (cols * cellW) / (rows * cellH);
                sceneMaterial.uniforms.uAspect.value = aspect;
                // em telas estreitas abre o FOV para o disco continuar cabendo
                sceneMaterial.uniforms.uTanHalf.value = 0.364 * Math.max(1, 1.6 / aspect);
            };
            layout();

            const updateCamera = (azimuth, elevation) => {
                cam.pos.set(
                    CAMERA_DIST * Math.cos(elevation) * Math.sin(azimuth),
                    CAMERA_DIST * Math.sin(elevation),
                    CAMERA_DIST * Math.cos(elevation) * Math.cos(azimuth)
                );
                cam.fwd.copy(cam.pos).negate().normalize();
                cam.right.crossVectors(cam.fwd, worldUp).normalize();
                cam.up.crossVectors(cam.right, cam.fwd).normalize();
            };

            const view = { az: 0, el: CAMERA_ELEVATION, velocityAz: 0, velocityEl: 0 };
            const drag = { pointerId: null, lastX: 0, lastY: 0, moved: 0, downAt: 0, lastMoveAt: 0 };
            let lastInteractionAt = -Infinity;
            let idleAmount = 1;
            let frameId = null;
            let running = false;
            let last = 0;
            let clock = 0;
            let pulseAt = 0;
            let lowFpsFor = 0;
            let fpsElapsed = 0;
            let fpsFrames = 0;

            const interactionTarget = sectionRef?.current ?? canvas;

            const onPointerDown = (event) => {
                if (drag.pointerId !== null || event.button !== 0) return;
                if (event.target.closest('a, button')) return;

                drag.pointerId = event.pointerId;
                drag.lastX = event.clientX;
                drag.lastY = event.clientY;
                drag.moved = 0;
                drag.downAt = drag.lastMoveAt = lastInteractionAt = performance.now();
                view.velocityAz = view.velocityEl = 0;

                interactionTarget.setPointerCapture(event.pointerId);
                interactionTarget.classList.add('is-dragging');
            };

            const onPointerMove = (event) => {
                if (event.pointerId !== drag.pointerId) return;

                const dx = event.clientX - drag.lastX;
                const dy = event.clientY - drag.lastY;
                drag.lastX = event.clientX;
                drag.lastY = event.clientY;
                drag.moved += Math.abs(dx) + Math.abs(dy);

                const now = performance.now();
                const dt = Math.max(0.004, (now - drag.lastMoveAt) / 1000);
                drag.lastMoveAt = lastInteractionAt = now;

                const deltaAz = -dx * DRAG_SPEED;
                const deltaEl = dy * DRAG_SPEED;
                view.az += deltaAz;
                view.el = THREE.MathUtils.clamp(view.el + deltaEl, -ELEVATION_LIMIT, ELEVATION_LIMIT);
                // velocidade suavizada, usada na inércia ao soltar
                view.velocityAz += (deltaAz / dt - view.velocityAz) * 0.4;
                view.velocityEl += (deltaEl / dt - view.velocityEl) * 0.4;
            };

            const onPointerEnd = (event) => {
                if (event.pointerId !== drag.pointerId) return;
                drag.pointerId = null;
                interactionTarget.classList.remove('is-dragging');

                const now = performance.now();
                lastInteractionAt = now;

                const isClick = event.type === 'pointerup' && drag.moved < 6 && now - drag.downAt < 350;
                if (isClick) pulseAt = clock; // reinicia também o timer do pulso automático
                if (isClick || now - drag.lastMoveAt > 90) view.velocityAz = view.velocityEl = 0; // soltou parado: sem inércia
            };

            const animate = (now) => {
                if (!running) return;
                frameId = requestAnimationFrame(animate);

                const dt = Math.min(0.05, (now - last) / 1000);
                last = now;
                clock += dt;

                const dragging = drag.pointerId !== null;
                if (!dragging) {
                    view.az += view.velocityAz * dt;
                    view.el = THREE.MathUtils.clamp(view.el + view.velocityEl * dt, -ELEVATION_LIMIT, ELEVATION_LIMIT);
                    const damping = Math.exp(-dt * 3.5);
                    view.velocityAz *= damping;
                    view.velocityEl *= damping;
                }

                // sem interação, a câmera balança suavemente em torno da pose escolhida
                const idle = !dragging && now - lastInteractionAt > IDLE_DELAY_MS;
                idleAmount += ((idle ? 1 : 0) - idleAmount) * (1 - Math.exp(-dt * 1.2));
                const azimuth = view.az + 0.42 * Math.sin(clock * 0.13) * idleAmount;
                const elevation = THREE.MathUtils.clamp(
                    view.el + 0.035 * Math.sin(clock * 0.21 + 1) * idleAmount,
                    -ELEVATION_LIMIT,
                    ELEVATION_LIMIT
                );
                updateCamera(azimuth, elevation);

                if (clock - pulseAt >= PULSE_INTERVAL) pulseAt = clock;
                sceneMaterial.uniforms.uTime.value = clock;
                sceneMaterial.uniforms.uPulse.value = clock - pulseAt;

                renderer.setRenderTarget(renderTarget);
                renderer.render(sceneScene, quadCamera);
                renderer.setRenderTarget(null);
                renderer.render(asciiScene, quadCamera);

                // GPU fraca: cai para 1x1 amostra por célula
                fpsElapsed += dt;
                fpsFrames++;
                if (fpsElapsed >= 0.5) {
                    lowFpsFor = fpsFrames / fpsElapsed < 28 ? lowFpsFor + 0.5 : 0;
                    fpsElapsed = 0;
                    fpsFrames = 0;
                    if (lowFpsFor >= 3 && supersample > 1) {
                        supersample = 1;
                        lowFpsFor = 0;
                        layout();
                    }
                }
            };

            const start = () => {
                if (running) return;
                running = true;
                last = performance.now();
                frameId = requestAnimationFrame(animate);
            };

            const stop = () => {
                running = false;
                if (frameId !== null) cancelAnimationFrame(frameId);
                frameId = null;
            };

            const resizeObserver = new ResizeObserver(layout);
            resizeObserver.observe(canvas);

            // a aba voltar a ficar visível não pode religar o loop se a section está fora da tela
            let inView = true;
            const intersectionObserver = new IntersectionObserver(
                ([entry]) => {
                    inView = entry.isIntersecting;
                    if (inView && !document.hidden) start();
                    else stop();
                },
                { threshold: 0 }
            );
            const target = sectionRef?.current;
            if (target) intersectionObserver.observe(target);
            else start();

            const onVisibilityChange = () => (document.hidden || !inView ? stop() : start());

            interactionTarget.addEventListener('pointerdown', onPointerDown);
            interactionTarget.addEventListener('pointermove', onPointerMove);
            interactionTarget.addEventListener('pointerup', onPointerEnd);
            interactionTarget.addEventListener('pointercancel', onPointerEnd);
            document.addEventListener('visibilitychange', onVisibilityChange);

            cleanup = () => {
                stop();
                resizeObserver.disconnect();
                intersectionObserver.disconnect();
                interactionTarget.removeEventListener('pointerdown', onPointerDown);
                interactionTarget.removeEventListener('pointermove', onPointerMove);
                interactionTarget.removeEventListener('pointerup', onPointerEnd);
                interactionTarget.removeEventListener('pointercancel', onPointerEnd);
                interactionTarget.classList.remove('is-dragging');
                document.removeEventListener('visibilitychange', onVisibilityChange);
                if (renderTarget) renderTarget.dispose();
                if (atlas) atlas.dispose();
                quadGeometry.dispose();
                sceneMaterial.dispose();
                asciiMaterial.dispose();
                renderer.dispose();
            };
        });

        return () => {
            cancelled = true;
            cleanup();
        };
    }, [canvasRef, sectionRef]);
}
