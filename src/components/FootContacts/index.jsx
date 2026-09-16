import './footer.css'
import { useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Phone, MapPin, Envelope, GithubLogo, LinkedinLogo, PaperPlaneTilt } from 'phosphor-react';
import { useScrollReveal, prefersReducedMotion } from '../../hooks/useScrollReveal';

const CONTACT_EMAIL = 'henriquecordeiro054@gmail.com';

export default function FootContacts() {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const scope = useScrollReveal('.footerLogo, .footerAside', { y: 30, stagger: 0.15 });

    useGSAP(() => {
        if (prefersReducedMotion()) return;

        gsap.from('.footer-stack-pill', {
            opacity: 0,
            y: 12,
            duration: 0.5,
            stagger: 0.02,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.footer-stack',
                start: 'top 90%',
                toggleActions: 'play none none reverse',
            },
        });
    }, { scope });

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        const subject = `Contato via portfólio — ${formData.name}`;
        const body = `${formData.message}\n\nE-mail para retorno: ${formData.email}`;
        const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        window.location.href = mailtoUrl;
    }

    return (
        <footer ref={scope}>
            <div id="footerContainer" className="footerContainer">
                <div className="footerLogo">
                    <span className="footer-tag">// contato</span>
                    <h2>Vamos conversar?</h2>
                    <p className="footer-sub">Aberto a oportunidades em froentend, backend e engenharia de dados.</p>

                    <form className="footer-contact-form" onSubmit={handleSubmit}>
                        <div className="footer-form-field">
                            <label htmlFor="footer-name">Nome</label>
                            <input
                                id="footer-name"
                                name="name"
                                type="text"
                                placeholder="Seu nome"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="footer-form-field">
                            <label htmlFor="footer-email">E-mail</label>
                            <input
                                id="footer-email"
                                name="email"
                                type="email"
                                placeholder="seu@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="footer-form-field">
                            <label htmlFor="footer-message">Mensagem</label>
                            <textarea
                                id="footer-message"
                                name="message"
                                placeholder="Como posso ajudar?"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="footer-form-submit">
                            <PaperPlaneTilt weight="bold" />
                            Enviar mensagem
                        </button>
                    </form>
                </div>

                <div className="footerAside">
                    <div className="footerLinks">
                        <h3>Contatos</h3>
                        <ul>
                            <li>
                                <a href="tel:+5519995454391">
                                    <Phone weight="bold" /> 19 99545-4391
                                </a>
                            </li>
                            <li>
                                <a href="mailto:henriquecordeiro054@gmail.com">
                                    <Envelope weight="bold" /> henriquecordeiro054@gmail.com
                                </a>
                            </li>
                            <li>
                                <MapPin weight="bold" /> Campinas, SP
                            </li>
                        </ul>
                    </div>

                    <div className="footerSocials">
                        <h3>Redes</h3>
                        <div className="social-links">
                            <a
                                href="https://github.com/HenriqueCDS"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                            >
                                <GithubLogo size={22} />
                                <span>GitHub</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/henrique-cordeiro-940709201/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <LinkedinLogo size={22} />
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-stack">
                <span className="footer-stack-label">// stack</span>
                <div className="footer-stack-pills">
                    {["Python","Java","TypeScript","JavaScript","Node.js","Express.js","Spring Boot","MongoDB","MySQL","SQL Server","Postgresql","Pandas","Docker","Git","AWS S3","REST API","MENSAGERIAS","JWT","rabbitmq"].map(t => (
                        <span key={t} className="footer-stack-pill">{t}</span>
                    ))}
                </div>
            </div>

            <div className="footerBottom">
                <p className="copyright">© 2026 Henrique Cordeiro — Desenvolvedor</p>
            </div>
        </footer>
    )
}
