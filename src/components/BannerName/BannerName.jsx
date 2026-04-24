
import './BannerName.css'
import { GithubLogo, LinkedinLogo, ArrowDown } from 'phosphor-react';

export default function BannerName() {
    return (
        <section id="banner" className="banner">
            <div className="banner-grid">
                <div className="banner-content">
                    <span className="banner-tag">// desenvolvedor backend &amp; dados</span>
                    <h1 className="banner-name">Henrique<br />Cordeiro</h1>
                    <p className="banner-pitch">
                        Construo sistemas que movem dados com precisão —
                        APIs robustas, pipelines ETL e integrações entre
                        sistemas educacionais em escala.
                    </p>
                    <div className="banner-actions">
                        <a
                            href="https://www.linkedin.com/in/henrique-cordeiro-940709201/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary"
                        >
                            Ver LinkedIn
                        </a>
                        <a href="#about" className="btn-secondary">
                            Sobre mim <ArrowDown size={16} />
                        </a>
                    </div>
                    <div className="banner-socials">
                        <a href="https://github.com/HenriqueCDS" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                            <GithubLogo size={24} />
                        </a>
                        <a href="https://www.linkedin.com/in/henrique-cordeiro-940709201/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                            <LinkedinLogo size={24} />
                        </a>
                    </div>
                </div>

                <div className="banner-visual">
                    <div className="banner-photo-wrapper">
                        <img
                            src="https://github.com/HenriqueCDS.png"
                            alt="Henrique Cordeiro"
                            className="banner-photo"
                        />
                    </div>
                    <div className="banner-terminal">
                        <div className="terminal-bar">
                            <span></span><span></span><span></span>
                        </div>
                        <pre className="terminal-code">
                            <span className="t-comment">// stack principal</span>{'\n'}
                            <span className="t-key">const</span> <span className="t-var">dev</span> = {'{'}{'\n'}
                            {'  '}<span className="t-prop">languages</span>: [<span className="t-str">"Python"</span>, <span className="t-str">"Java"</span>],{'\n'}
                            {'  '}<span className="t-prop">focus</span>: [<span className="t-str">"API REST"</span>, <span className="t-str">"ETL"</span>],{'\n'}
                            {'  '}<span className="t-prop">integrations</span>: [<span className="t-str">"Canvas LMS"</span>,{'\n'}
                            {'               '}<span className="t-str">"Lyceum"</span>],{'\n'}
                            {'  '}<span className="t-prop">db</span>: [<span className="t-str">"MySQL"</span>, <span className="t-str">"SQL Server"</span>],{'\n'}
                            {'}'}<span className="t-cursor">▋</span>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    )
}
