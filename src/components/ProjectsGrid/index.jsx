import { useState, useMemo } from 'react';
import Project from "./Project";
import "./GridProject.css";

const ALL_PROJECTS = [
    {
        id: "rest_api",
        date: "2024",
        title: "REST API — Banco de Questões",
        type: "REST API",
        link_git: "https://github.com/HenriqueCDS/Rest_Api_Questoes",
        link_web: "https://github.com/HenriqueCDS/Rest_Api_Questoes",
        paste: "rest_api",
        description: "API RESTful para gerenciamento de banco de questões educacionais. Autenticação JWT, upload de arquivos via AWS S3, ORM com Sequelize + MySQL, arquitetura MVC com rotas para questões, áreas curriculares, usuários e feedbacks. Testes automatizados com Jest e Supertest.",
        stack: ["Node.js", "Express", "MySQL", "Sequelize", "JWT", "AWS S3", "Jest"],
    },
    {
        id: "cottom_films",
        date: "2024",
        title: "Cotton Films Website",
        type: "WEB",
        link_git: "https://github.com/HenriqueCDS/Cotton_Films_Website",
        link_web: "https://cotton-films-website-usbq.vercel.app/",
        paste: "cottom_films",
        description: "Site institucional para produtora audiovisual. Layout responsivo, carrossel de portfólio, animações CSS e deploy automatizado via Vercel.",
        stack: ["JavaScript", "HTML", "CSS", "Vercel"],
    },
    {
        id: "api_ecommerce",
        date: "2024",
        title: "E-commerce Custom",
        type: "REST API",
        link_git: "https://github.com/HenriqueCDS/api_ecommerce",
        link_web: "https://github.com/HenriqueCDS/ecommerce-custom",
        paste: "ecommerce_custom",
        description: "API backend completa para plataforma de e-commerce com arquitetura MVC. Controllers, middlewares de autenticação, migrations e seeders com Sequelize, camada de serviços separada e configuração de rotas modulares.",
        stack: ["Node.js", "Express", "Sequelize", "MySQL", "MVC"],
    },
    {
        id: "python_sql",
        date: "2024",
        title: "Python + SQL Server — ETL & Dados",
        type: "DADOS",
        link_git: "https://github.com/HenriqueCDS/pyhton-sql-server-bd",
        link_web: null,
        paste: null,
        description: "Notebook Python para geração, manipulação e carga de dados em SQL Server. Utiliza Faker para criação de datasets realistas e integração direta com banco relacional via scripts SQL organizados por domínio.",
        stack: ["Python", "SQL Server", "Pandas", "Jupyter Notebook", "Faker"],
    },
    {
        id: "websocket",
        date: "2024",
        title: "Projeto WebSocket",
        type: "BACKEND",
        link_git: "https://github.com/HenriqueCDS/Projeto-Websocket",
        link_web: null,
        paste: null,
        description: "Servidor WebSocket em Node.js com arquitetura modular. Camadas separadas para banco de dados, middlewares, registro de eventos e utilitários. Comunicação em tempo real entre clientes com controle de sessões.",
        stack: ["Node.js", "WebSocket", "JavaScript"],
    },
    {
        id: "registration_api",
        date: "2024",
        title: "Registration API",
        type: "REST API",
        link_git: "https://github.com/HenriqueCDS/registration-api",
        link_web: null,
        paste: null,
        description: "API de cadastro e gerenciamento de usuários com Node.js e Sequelize. Estrutura MVC com migrations, seeders e configuração de ambiente por variáveis.",
        stack: ["Node.js", "Express", "Sequelize", "MySQL"],
    },
    {
        id: "dev_books_server",
        date: "2023",
        title: "Dev Books Server",
        type: "BACKEND",
        link_git: "https://github.com/HenriqueCDS/dev-books-server",
        link_web: null,
        paste: null,
        description: "Servidor backend para plataforma de livros para desenvolvedores. API REST com gerenciamento de catálogo, rotas organizadas e persistência de dados.",
        stack: ["Node.js", "JavaScript", "Express"],
    },
    {
        id: "spring_boot",
        date: "2024",
        title: "Spring Boot — Exercícios",
        type: "BACKEND",
        link_git: "https://github.com/HenriqueCDS/spring-boot-exercicios",
        link_web: null,
        paste: null,
        description: "Coleção de exercícios e projetos práticos desenvolvidos com Spring Boot. Implementações de APIs REST, injeção de dependência, configuração de datasources e padrões de projeto Java.",
        stack: ["Java", "Spring Boot", "Maven"],
    },
    {
        id: "prova_gti",
        date: "2024",
        title: "Prova GTI — Spring Boot",
        type: "BACKEND",
        link_git: "https://github.com/HenriqueCDS/ProvaGTI",
        link_web: null,
        paste: null,
        description: "Aplicação Java com Spring Boot desenvolvida como avaliação técnica. Estrutura padrão Maven com testes unitários, configuração de propriedades e boas práticas de projeto Spring.",
        stack: ["Java", "Spring Boot", "Maven", "JUnit"],
    },
    {
        id: "lets_see",
        date: "2024",
        title: "Lets See",
        type: "WEB",
        link_git: "https://github.com/HenriqueCDS/lets_see",
        link_web: null,
        paste: "lets_see",
        description: "Aplicação frontend em React com Vite. Interface componentizada com gerenciamento de estado, roteamento de páginas e estilização modular.",
        stack: ["React", "Vite", "JavaScript", "CSS"],
    },
    {
        id: "devbooks",
        date: "2023",
        title: "Devbooks",
        type: "WEB",
        link_git: "https://github.com/HenriqueCDS/Devbooks",
        link_web: null,
        paste: null,
        description: "Aplicação frontend para exploração de livros técnicos para desenvolvedores. Consome a API Dev Books Server e exibe catálogo com busca e filtragem.",
        stack: ["JavaScript", "React", "CSS"],
    },
];

const FILTERS = [
    { label: 'Todos',    value: null,        cls: 'f-all'     },
    { label: 'REST API', value: 'REST API',  cls: 'f-api'     },
    { label: 'Backend',  value: 'BACKEND',   cls: 'f-backend' },
    { label: 'Dados',    value: 'DADOS',     cls: 'f-data'    },
    { label: 'Web',      value: 'WEB',       cls: 'f-web'     },
];

const INITIAL_COUNT = 4;

export default function GridProjects() {
    const [activeFilter, setActiveFilter] = useState(null);
    const [showAll, setShowAll]           = useState(false);

    const filtered = useMemo(() =>
        activeFilter
            ? ALL_PROJECTS.filter((p) => p.type === activeFilter)
            : ALL_PROJECTS,
        [activeFilter]
    );

    const counts = useMemo(() =>
        Object.fromEntries(
            FILTERS.map(({ value }) => [
                value ?? 'all',
                value ? ALL_PROJECTS.filter((p) => p.type === value).length : ALL_PROJECTS.length,
            ])
        ),
        []
    );

    const isFiltered   = activeFilter !== null;
    const needsToggle  = !isFiltered && filtered.length > INITIAL_COUNT;
    const visible      = isFiltered || showAll ? filtered : filtered.slice(0, INITIAL_COUNT);

    function handleFilter(value) {
        setActiveFilter(value);
        setShowAll(false);
    }

    return (
        <section id="gridProjects" className="gridProjects">
            <div className="projects-wrapper">

                {/* Header */}
                <div className="projects-header">
                    <div>
                        <span className="section-tag">// projetos</span>
                        <h2>Projetos Selecionados</h2>
                    </div>
                    <span className="projects-count">
                        {visible.length}/{ALL_PROJECTS.length}
                    </span>
                </div>

                {/* Filter bar */}
                <div className="filter-bar">
                    {FILTERS.map(({ label, value, cls }) => (
                        <button
                            key={cls}
                            className={`filter-btn ${cls} ${activeFilter === value ? 'filter-btn--active' : ''}`}
                            onClick={() => handleFilter(value)}
                        >
                            {label}
                            <span className="filter-count">
                                {counts[value ?? 'all']}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {visible.length > 0 ? (
                    <div className="Projects">
                        {visible.map((p, i) => (
                            <Project
                                key={p.id}
                                index={i}
                                date={p.date}
                                title={p.title}
                                type={p.type}
                                link_git={p.link_git}
                                link_web={p.link_web}
                                paste={p.paste}
                                description={p.description}
                                stack={p.stack}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="projects-empty">
                        <p>Nenhum projeto encontrado para este filtro.</p>
                    </div>
                )}

                {/* Ver mais — só aparece no modo "Todos" */}
                {needsToggle && (
                    <div className="projects-toggle">
                        <button
                            className="btn-toggle"
                            onClick={() => setShowAll((prev) => !prev)}
                        >
                            {showAll
                                ? '↑ Mostrar menos'
                                : `Ver todos os projetos (${filtered.length - INITIAL_COUNT} restantes)`}
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
}
