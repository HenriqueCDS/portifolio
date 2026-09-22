import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion } from './useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

// reveal do componente Timeline: a linha "desenha" com o scroll e cada item entra com fade+slide
export function useTimelineReveal() {
    const scope = useRef(null);

    useGSAP(() => {
        if (prefersReducedMotion()) return;

        const items = gsap.utils.toArray('.timeline-item', scope.current);

        items.forEach((item) => {
            const dot = item.querySelector('.timeline-dot');
            const line = item.querySelector('.timeline-line');
            const right = item.querySelector('.timeline-right');

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
