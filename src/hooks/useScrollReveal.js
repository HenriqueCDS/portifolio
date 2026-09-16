import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// fade + slide genérico disparado quando `selector` entra na viewport de `scope`
export function useScrollReveal(selector, { scrollTrigger, ...vars } = {}) {
    const scope = useRef(null);

    useGSAP(() => {
        if (prefersReducedMotion()) return;

        const targets = gsap.utils.toArray(selector, scope.current);
        if (!targets.length) return;

        gsap.from(targets, {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
            ...vars,
            scrollTrigger: {
                trigger: scope.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
                ...scrollTrigger,
            },
        });
    }, { scope });

    return scope;
}
