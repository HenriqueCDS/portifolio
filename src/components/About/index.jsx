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
                            Desenvolvedor com foco em <strong>backend e engenharia de dados</strong>, atuando na
                            construção de soluções que resolvem problemas reais de integração, automação e
                            processamento de informação em escala.
                        </p>
                        <p>
                            Tenho experiência prática com <strong>Python</strong> e <strong>Java</strong> no
                            desenvolvimento de APIs REST e pipelines de dados, com ênfase em integração de sistemas
                            de gestão educacional — incluindo <strong>Canvas LMS</strong> e <strong>Lyceum</strong>{' '}
                            — onde desenvolvi automações que eliminaram sincronizações manuais e aumentaram a
                            confiabilidade dos processos.
                        </p>
                        <p>
                            Trabalho com ETL, manipulação de dados em larga escala, modelagem de bancos relacionais
                            (MySQL, SQL Server) e não relacionais (MongoDB), além de práticas de arquitetura como
                            microsserviços e padrões REST.
                        </p>
                        <p className="about-closing">
                            No frontend, uso React quando necessário — mas meu valor principal está na camada que
                            ninguém vê: a que não cai, não perde dado e escala sem drama.
                        </p>
                    </div>

                    <div className="about-aside">
                        <div className="about-stats">
                            <div className="stat-item">
                                <span className="stat-num">4+</span>
                                <span className="stat-label">Projetos Backend</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-num">2</span>
                                <span className="stat-label">LMS Integrados</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-num">3+</span>
                                <span className="stat-label">Anos codando</span>
                            </div>
                        </div>

                        <div className="about-focus">
                            <h4>Buscando</h4>
                            <ul>
                                <li>Desenvolvedor Backend (Junior/Pleno)</li>
                                <li>Engenheiro de Dados (Junior)</li>
                                <li>Presencial ou Remoto · Campinas, SP</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
