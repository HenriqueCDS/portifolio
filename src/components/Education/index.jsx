import './Education.css';
import Timeline from '../Timeline';

const education = [
    {
        period: '2025 — atual',
        heading: 'Pós-graduação em Ciência de Dados e Machine Learning',
        subheading: 'PUC-Campinas',
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
        heading: 'Análise e Desenvolvimento de Sistemas',
        subheading: 'UniMetrocamp Wyden',
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
        heading: 'Técnico em Informática integrado ao Ensino Médio',
        subheading: 'IFSP – Campus Campinas',
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
                    <span className="section-tag">{'// formação'}</span>
                    <h2>Formação Acadêmica</h2>
                </div>

                <Timeline items={education} />
            </div>
        </section>
    );
}
