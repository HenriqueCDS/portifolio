import './footer.css'
import { Phone, MapPin, Envelope, GithubLogo, LinkedinLogo } from 'phosphor-react';

export default function FootContacts() {
    return (
        <footer>
            <div id="footerContainer" className="footerContainer">
                <div className="footerLogo">
                    <span className="footer-tag">// contato</span>
                    <h2>Vamos conversar?</h2>
                    <p className="footer-sub">Aberto a oportunidades em backend e engenharia de dados.</p>
                </div>

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

            <div className="footerBottom">
                <p className="copyright">© 2025 Henrique Cordeiro — Desenvolvedor Backend &amp; Dados</p>
            </div>
        </footer>
    )
}
