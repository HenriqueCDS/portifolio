import './Education.css';

const education = [
    {
        period: '2025 — atual',
        course: 'Pós-graduação em Ciência de Dados e Machine Learning',
        institution: 'PUC-Campinas',
        location: 'Campinas, SP',
        bullets: [
            'Estudo de técnicas de Machine Learning para análise e previsão de dados',
            'Aplicação de métodos estatísticos e manipulação de dados com Python',
            'Desenvolvimento de modelos preditivos e análise exploratória de dados',
            'Aprofundamento em ETL, processamento e tratamento de dados em larga escala',
        ],
        stack: ['Python', 'Pandas', 'Machine Learning', 'Data Analysis', 'Estatística'],
    },
    {
        period: '2022 — 2024',
        course: 'Análise e Desenvolvimento de Sistemas',
        institution: 'UniMetrocamp Wyden',
        location: 'Campinas, SP',
        bullets: [
            'Formação focada em desenvolvimento de software e lógica de programação',
            'Desenvolvimento de aplicações web e sistemas backend',
            'Experiência com banco de dados relacionais e modelagem de dados',
            'Projetos acadêmicos envolvendo APIs, integração de sistemas e aplicações completas',
        ],
        stack: ['Java', 'Python', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'APIs REST'],
    },
    {
        period: '2018 — 2021',
        course: 'Técnico em Informática integrado ao Ensino Médio',
        institution: 'IFSP – Campus Campinas',
        location: 'Campinas, SP',
        bullets: [
            'Base sólida em lógica de programação e fundamentos de computação',
            'Desenvolvimento de aplicações básicas e introdução ao desenvolvimento web',
            'Primeiro contato com banco de dados e algoritmos',
            'Participação em projetos práticos voltados à área de tecnologia',
        ],
        stack: ['Lógica de Programação', 'Algoritmos', 'HTML', 'CSS', 'Banco de Dados'],
    },
];

export default function Education() {
    return (
        <section id="education" className="education">
            <div className="education-container">
                <div className="education-header">
                    <span className="section-tag">// formação</span>
                    <h2>Formação Acadêmica</h2>
                </div>

                <div className="edu-timeline">
                    {education.map((edu, i) => (
                        <div key={i} className="edu-timeline-item">
                            <div className="edu-timeline-left">
                                <span className="edu-timeline-period">{edu.period}</span>
                                <span className="edu-timeline-location">{edu.location}</span>
                            </div>

                            <div className="edu-timeline-connector">
                                <div className="edu-timeline-dot" />
                                <div className="edu-timeline-line" />
                            </div>

                            <div className="edu-timeline-right">
                                <div className="edu-timeline-role">
                                    <h3>{edu.course}</h3>
                                    <span className="edu-timeline-company">{edu.institution}</span>
                                </div>

                                <ul className="edu-timeline-bullets">
                                    {edu.bullets.map((b, j) => (
                                        <li key={j}>{b}</li>
                                    ))}
                                </ul>

                                <div className="edu-timeline-stack">
                                    {edu.stack.map((tech) => (
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
