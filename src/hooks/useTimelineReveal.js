import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from './useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

// reveal de timeline vertical (Experience/Education): linha "desenha" com o scroll
// e cada item entra com fade+slide. `prefix` é o namespace de classes (ex.: "timeline", "edu-timeline").
export function useTimelineReveal(prefix) {
    const scope = useRef(null);

    useGSAP(() => {
        if (prefersReducedMotion()) return;

        const items = gsap.utils.toArray(`.${prefix}-item`, scope.current);

        items.forEach((item) => {
            const dot = item.querySelector(`.${prefix}-dot`);
            const line = item.querySelector(`.${prefix}-line`);
            const right = item.querySelector(`.${prefix}-right`);

            gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse',
                },
            })
                .from(dot, { scale: 0, duration: 0.4, ease: 'back.out(2)' })
                .from(right, { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }, '-=0.2');

            if (line) {
                gsap.fromTo(line, { scaleY: 0 }, {
                    scaleY: 1,
                    transformOrigin: 'top',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: item,
                        start: 'top 60%',
                        end: 'bottom 60%',
                        scrub: true,
                    },
                });
            }
        });
    }, { scope });

    return scope;
}
