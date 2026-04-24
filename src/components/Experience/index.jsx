import './Experience.css';

const experiences = [
    {
        period: '2023 — atual',
        role: 'Desenvolvedor Backend',
        company: 'Sociedade Campineira de Educação e Instrução',
        location: 'Campinas, SP',
        bullets: [
            'Desenvolveu e manteve APIs REST para integração entre Canvas LMS e sistema Lyceum, automatizando sincronização de usuários, matrículas e dados acadêmicos',
            'Implementou pipelines ETL em Python para consolidação de dados de múltiplas fontes, eliminando processos manuais recorrentes e reduzindo incidência de erros',
            'Trabalhou com manipulação e transformação de dados em larga escala utilizando Python, MySQL e SQL Server',
            'Automatizou fluxos de processos educacionais, reduzindo carga operacional das equipes de TI e pedagógica',
        ],
        stack: ['Python', 'Java', 'APIs REST', 'MySQL', 'SQL Server', 'Canvas LMS', 'Lyceum', 'ETL'],
    },
];

export default function Experience() {
    return (
        <section id="experience" className="experience">
            <div className="experience-container">
                <div className="experience-header">
                    <span className="section-tag">// experiência</span>
                    <h2>Experiência Profissional</h2>
                </div>

                <div className="timeline">
                    {experiences.map((exp, i) => (
                        <div key={i} className="timeline-item">
                            <div className="timeline-left">
                                <span className="timeline-period">{exp.period}</span>
                                <span className="timeline-location">{exp.location}</span>
                            </div>

                            <div className="timeline-connector">
                                <div className="timeline-dot" />
                                <div className="timeline-line" />
                            </div>

                            <div className="timeline-right">
                                <div className="timeline-role">
                                    <h3>{exp.role}</h3>
                                    <span className="timeline-company">{exp.company}</span>
                                </div>

                                <ul className="timeline-bullets">
                                    {exp.bullets.map((b, j) => (
                                        <li key={j}>{b}</li>
                                    ))}
                                </ul>

                                <div className="timeline-stack">
                                    {exp.stack.map((tech) => (
                                        <span key={tech} className="stack-tag">{tech}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
