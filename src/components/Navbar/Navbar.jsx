import { useCallback, useEffect, useRef, useState } from 'react'
import './Navbar.css'

const links = [
    { href: '#banner', label: 'HOME' },
    { href: '#about', label: 'SOBRE' },
    { href: '#experience', label: 'EXPERIÊNCIA' },
    { href: '#education', label: 'FORMAÇÃO' },
    { href: '#gridProjects', label: 'PROJETOS' },
    { href: '#footerContainer', label: 'CONTATO' },
]

const CHARS = '1234567890ABCDEFSOUBOMNOLOLGHIJKLMNOPQRSTUVWXYZ!@#$%*?><'
const FRAMES_PER_CHAR = 2 // mesma cadência do Loader

// Link que embaralha as letras e as "trava" da esquerda pra direita, como no Loader
function ScrambleLink({ label, ...props }) {
    const ref = useRef(null)
    const frameId = useRef(0)
    const [chars, setChars] = useState(null)

    const stop = useCallback(() => {
        cancelAnimationFrame(frameId.current)
        setChars(null)
        if (ref.current) ref.current.style.minWidth = ''
    }, [])

    const start = useCallback(() => {
        cancelAnimationFrame(frameId.current)
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const el = ref.current
        if (el) el.style.minWidth = `${el.offsetWidth}px` // evita o layout "pular"
        let frame = 0
        let resolved = 0
        const tick = () => {
            frame++
            if (frame % FRAMES_PER_CHAR === 0) resolved++
            if (resolved >= label.length) return stop()
            setChars(
                label.split('').map((char, i) =>
                    i < resolved || char === ' '
                        ? { char, locked: true }
                        : { char: CHARS[Math.floor(Math.random() * CHARS.length)], locked: false }
                )
            )
            frameId.current = requestAnimationFrame(tick)
        }
        frameId.current = requestAnimationFrame(tick)
    }, [label, stop])

    useEffect(() => () => cancelAnimationFrame(frameId.current), [])

    return (
        <a
            ref={ref}
            aria-label={label}
            onMouseEnter={start}
            onMouseLeave={stop}
            onFocus={start}
            onBlur={stop}
            {...props}
        >
            {chars
                ? chars.map((c, i) => (
                    <span key={i} aria-hidden="true" className={c.locked ? 'gl-locked' : 'gl-scramble'}>{c.char}</span>
                ))
                : label}
        </a>
    )
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const close = () => setIsOpen(false)

    useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e) => e.key === 'Escape' && setIsOpen(false);
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [isOpen]);

    return (
        <nav aria-label="Principal">
            <div className="nav-desktop">
                {links.map(({ href, label }) => (
                    <div className="nav-item" key={href}>
                        <ScrambleLink href={href} label={label} />
                    </div>
                ))}
            </div>

            <div className="nav-mobile">
                <div className="nav-mobile-header">
                    <button
                        type="button"
                        className={`hamburger ${isOpen ? 'open' : ''}`}
                        onClick={() => setIsOpen(o => !o)}
                        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>

                <div id="mobile-menu" className={`mobile-menu ${isOpen ? 'active' : ''}`}>
                    {links.map(({ href, label }) => (
                        <div className="nav-item" key={href}>
                            <ScrambleLink href={href} label={label} onClick={close} />
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    )
}
