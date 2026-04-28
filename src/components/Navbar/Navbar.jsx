import { useState } from 'react'
import './Navbar.css'

const links = [
    { href: '#banner', label: 'HOME' },
    { href: '#about', label: 'SOBRE' },
    { href: '#experience', label: 'EXPERIÊNCIA' },
    { href: '#education', label: 'FORMAÇÃO' },
    { href: '#gridProjects', label: 'PROJETOS' },
    { href: '#footerContainer', label: 'CONTATO' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const close = () => setIsOpen(false)

    return (
        <nav>
            <div className="nav-desktop">
                {links.map(({ href, label }) => (
                    <div className="nav-item" key={href}>
                        <a href={href}>{label}</a>
                    </div>
                ))}
            </div>

            <div className="nav-mobile">
                <div className="nav-mobile-header">
                    <button
                        className={`hamburger ${isOpen ? 'open' : ''}`}
                        onClick={() => setIsOpen(o => !o)}
                        aria-label="Abrir menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>

                <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
                    {links.map(({ href, label }) => (
                        <div className="nav-item" key={href}>
                            <a href={href} onClick={close}>{label}</a>
                        </div>
                    ))}
                </div>
            </div>
        </nav>
    )
}
