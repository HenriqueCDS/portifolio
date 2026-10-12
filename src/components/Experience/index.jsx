import './Experience.css';
import Timeline from '../Timeline';

const experiences = [
    {
        period: '2024 — atual',
        heading: 'Analista de Suporte Júnior',
        subheading: 'PUC-Campinas - Pontifícia Universidade Católica de Campinas',
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
        heading: 'Estagiário em Desenvolvimento de Software Full Stack',
        subheading: 'FUNCAMP - Fundação de Desenvolvimento da Unicamp',
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
                    <span className="section-tag">{'// experiência'}</span>
                    <h2>Experiência Profissional</h2>
                </div>

                <Timeline items={experiences} />
            </div>
        </section>
    );
}
