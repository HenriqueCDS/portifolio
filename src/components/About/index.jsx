import './About.css';

export default function About() {
    return (
        <section id="about" className="about">
            <div className="about-container">
                <div className="about-header">
                    <span className="section-tag">// sobre</span>
                    <h2>Sobre mim</h2>
                </div>

                <div className="about-grid">
                    <div className="about-text">
                    <p>
                        Desenvolvedor com foco em <strong>backend, integração de sistemas e engenharia de dados</strong>, atuando na
                        sustentação e evolução de soluções que garantem o funcionamento e a confiabilidade de plataformas educacionais em larga escala.
                    </p>
                    <p>
                        Atualmente, trabalho na sustentação do <strong>Canvas LMS</strong> em ambiente institucional da <strong>PUC-CAMPINAS</strong>, garantindo sua disponibilidade,
                        estabilidade e correto funcionamento para alunos e docentes. Paralelamente, desenvolvo integrações com o sistema <strong>Lyceum</strong>,
                        utilizando <strong>Python</strong> e <strong>Java</strong> para criação de APIs REST, automações e sincronização de dados acadêmicos.
                    </p>
                    <p>
                        Tenho experiência com <strong>ETL com Python</strong>, manipulação e validação de dados em larga escala, além de modelagem de bancos
                        relacionais como <strong>MySQL</strong> e <strong>SQL Server</strong>. Minha atuação é voltada à resolução de problemas de forma
                        sistêmica, automatizando processos e aumentando a eficiência e confiabilidade das integrações.
                    </p>
                    <p>
                        Durante meu estágio na <strong>FUNCAMP</strong>, atuei no desenvolvimento de aplicações e funcionalidades backend,
                        trabalhando com lógica de negócio, manipulação de bancos de dados e participação em projetos utilizando metodologias ágeis.
                        Essa experiência consolidou minha base como desenvolvedor, proporcionando vivência prática no ciclo de desenvolvimento de software.
                    </p>
                    <p className="about-closing">
                         No frontend, já trabalhei com PHP e atualmente utilizo React. Ainda assim, meu principal foco está no backend — na construção das regras de negócio, processamento e formatação de dados que sustentam as aplicações.
                    </p>
                    </div>

                    <div className="about-aside">
                        <div className="about-stats">
                            <div className="stat-item">
                                <span className="stat-num">4+</span>
                                <span className="stat-label">Projetos Backend</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-num">3+</span>
                                <span className="stat-label">Projetos frontend</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-num">8+</span>
                                <span className="stat-label">Anos codando</span>
                            </div>
                        </div>

                        <div className="about-focus">
                            <h4>Buscando</h4>
                            <ul>
                                <li>Desenvolvedor FrontEnd (Junior/Pleno)</li>
                                <li>Desenvolvedor Backend (Junior/Pleno)</li>
                                <li>Engenheiro de Dados (Junior)</li>
                                <li>Presencial ou Remoto - SP</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
