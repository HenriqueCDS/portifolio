import './Experience.css';

const experiences = [
    {
        period: '2024 — atual',
        role: 'Analista de Suporte Júnior',
        company: 'PUC-Campinas - Pontifícia Universidade Católica de Campinas',
        location: 'Campinas, SP',
        bullets: [
            'Garanto a disponibilidade, estabilidade e o correto funcionamento da plataforma Canvas LMS para alunos e docentes.',
            'Presto suporte a docentes e alunos na utilização da plataforma educacional, esclarecendo dúvidas e auxiliando na aplicação de suas funcionalidades no ambiente acadêmico.',
            'Desenvolvo integrações em  sistemas acadêmicos (Canvas LMS) utilizando APIs REST, automatizando a verificação sincronização de usuários, matrículas',
            'Crio scripts em Python para automação de processos e validação de dados, reduzindo tarefas manuais e aumentando a confiabilidade das informações',
            'Identifico e corrige inconsistências em bases de dados, garantindo integridade e qualidade das informações',
            'Atuo com abordagem orientada a dados, indo além do suporte tradicional e propondo soluções sistêmicas',
        ],
        stack: ['Python', 'APIs REST', 'ETL', 'MySQL', 'Canvas LMS', 'Lyceum', 'Automação', 'Integração de Sistemas'],
    },
    {
        period: '2022 — 2024',
        role: 'Estagiário em Desenvolvimento de Software Full Stack',
        company: 'FUNCAMP - Fundação de Desenvolvimento da Unicamp',
        location: 'Campinas, SP',
        bullets: [
            'Customizei a plataforma open source SIGA DOC para a Prefeitura de São José do Rio Preto, adaptando o sistema de gestão documental às necessidades do órgão público.',
            'Construí uma API REST para armazenamento e consumo de dados de questões, integrada à plataforma educacional Edukas.',
            'Desenvolvi telas e funcionalidades na plataforma Edukas em PHP e JavaScript, atuando diretamente no produto voltado a usuários finais.',
            'Desenvolvi scripts de integração com NetSuite (JavaScript) para automatizar processos de negócio entre sistemas internos.',
            'Modelei e mantive bancos de dados relacionais em MySQL (10 a 30 tabelas por projeto).',
        ],
        stack: ['JavaScript','Java','PHP','Python', 'MySQL', 'HTML', 'CSS', 'Scrum'],
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
