import { useEffect, useRef } from 'react';
import { prefersReducedMotion } from './useScrollReveal';

const PARTICLE_COLOR = '#3b82f6'; // --color-add
const FIELD_DEPTH = 60;
const PARTICLE_COUNT = window.innerWidth < 768 ? 350 : 900;

// textura de sprite com o dígito desenhado num canvas, usada nos THREE.Points
function createDigitTexture(THREE, digit) {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext('2d');
    ctx.font = `bold ${size * 0.72}px "Courier New", monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = PARTICLE_COLOR;
    ctx.fillText(digit, size / 2, size / 2 + size * 0.04);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

function createDigitPoints(THREE, texture, count) {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 70;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 45;
        positions[i * 3 + 2] = (Math.random() - 0.5) * FIELD_DEPTH;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
        map: texture,
        size: 1.3,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        sizeAttenuation: true,
    });

    return new THREE.Points(geometry, material);
}

// campo infinito (wrap no eixo Z) de dígitos "0"/"1" com leve parallax de mouse,
// pausado fora da viewport/aba pra não gastar GPU/bateria à toa
export function useBannerScene(canvasRef, sectionRef) {
    const pointerRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || prefersReducedMotion()) return;

        let cleanup = () => {};
        let cancelled = false;

        import('three').then((THREE) => {
            if (cancelled) return;

            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, 1, 0.1, FIELD_DEPTH + 20);
            camera.position.z = FIELD_DEPTH / 2;

            const texture0 = createDigitTexture(THREE, '0');
            const texture1 = createDigitTexture(THREE, '1');

            const count0 = Math.ceil(PARTICLE_COUNT / 2);
            const count1 = PARTICLE_COUNT - count0;
            const digits = [
                createDigitPoints(THREE, texture0, count0),
                createDigitPoints(THREE, texture1, count1),
            ];
            digits.forEach((mesh) => scene.add(mesh));

            const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            const resize = () => {
                const { clientWidth: w, clientHeight: h } = canvas;
                if (!w || !h) return;
                renderer.setSize(w, h, false);
                camera.aspect = w / h;
                camera.updateProjectionMatrix();
            };
            resize();

            const onPointerMove = (event) => {
                const rect = canvas.getBoundingClientRect();
                pointerRef.current.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
                pointerRef.current.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
            };

            const drift = 0.02;

            let frameId = null;
            let running = false;

            const animate = () => {
                if (!running) return;

                digits.forEach(({ geometry }) => {
                    const positionAttr = geometry.getAttribute('position');
                    const array = positionAttr.array;
                    for (let i = 2; i < array.length; i += 3) {
                        array[i] += drift;
                        if (array[i] > FIELD_DEPTH / 2) {
                            array[i] = -FIELD_DEPTH / 2;
                        }
                    }
                    positionAttr.needsUpdate = true;
                });

                camera.position.x += (pointerRef.current.x * 2.5 - camera.position.x) * 0.03;
                camera.position.y += (-pointerRef.current.y * 2.5 - camera.position.y) * 0.03;
                camera.lookAt(0, 0, 0);

                renderer.render(scene, camera);
                frameId = requestAnimationFrame(animate);
            };

            const start = () => {
                if (running) return;
                running = true;
                frameId = requestAnimationFrame(animate);
            };

            const stop = () => {
                running = false;
                if (frameId !== null) cancelAnimationFrame(frameId);
                frameId = null;
            };

            const resizeObserver = new ResizeObserver(resize);
            resizeObserver.observe(canvas);

            const intersectionObserver = new IntersectionObserver(
                ([entry]) => (entry.isIntersecting ? start() : stop()),
                { threshold: 0 }
            );
            const target = sectionRef?.current;
            if (target) intersectionObserver.observe(target);
            else start();

            const onVisibilityChange = () => (document.hidden ? stop() : start());

            window.addEventListener('pointermove', onPointerMove);
            document.addEventListener('visibilitychange', onVisibilityChange);

            cleanup = () => {
                stop();
                resizeObserver.disconnect();
                intersectionObserver.disconnect();
                window.removeEventListener('pointermove', onPointerMove);
                document.removeEventListener('visibilitychange', onVisibilityChange);
                digits.forEach(({ geometry, material }) => {
                    geometry.dispose();
                    material.dispose();
                });
                texture0.dispose();
                texture1.dispose();
                renderer.dispose();
            };
        });

        return () => {
            cancelled = true;
            cleanup();
        };
    }, [canvasRef, sectionRef]);
}
