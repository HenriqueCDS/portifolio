import { useState, useMemo } from 'react';
import Project from "./Project";
import "./GridProject.css";
import { useGithubProjects } from '../../hooks/useGithubProjects';

const FILTERS = [
    { label: 'Todos',    value: null,       cls: 'f-all'     },
    { label: 'REST API', value: 'REST API', cls: 'f-api'     },
    { label: 'Backend',  value: 'BACKEND',  cls: 'f-backend' },
    { label: 'Dados',    value: 'DADOS',    cls: 'f-data'    },
    { label: 'Web',      value: 'WEB',      cls: 'f-web'     },
];

function SkeletonCard() {
    return <div className="project-card skeleton-card" aria-hidden="true" />;
}

export default function GridProjects() {
    const { projects, loading, error } = useGithubProjects();
    const [activeFilter, setActiveFilter] = useState(null);
    const [showAll, setShowAll]           = useState(false);

    const featured    = useMemo(() => projects.filter((p) => p.featured), [projects]);
    const nonFeatured = useMemo(() => projects.filter((p) => !p.featured), [projects]);

    const pool = useMemo(() =>
        activeFilter ? projects.filter((p) => p.type === activeFilter) : projects,
        [projects, activeFilter]
    );

    // quando filtro ativo → mostra tudo do filtro
    // quando "Todos" → featured sempre visíveis; nonFeatured só se showAll=true
    const visible = useMemo(() => {
        if (activeFilter) return pool;
        return showAll ? projects : featured;
    }, [activeFilter, pool, showAll, projects, featured]);

    const counts = useMemo(() =>
        Object.fromEntries(
            FILTERS.map(({ value }) => [
                value ?? 'all',
                value
                    ? projects.filter((p) => p.type === value).length
                    : projects.length,
            ])
        ),
        [projects]
    );

    const hiddenCount = nonFeatured.filter(
        (p) => !activeFilter || p.type === activeFilter
    ).length;

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
                    <div className="header-right">
                        {loading && <span className="loading-badge">carregando via GitHub API…</span>}
                        {error === 'rate_limit' && (
                            <span className="error-badge">limite GitHub atingido · usando cache local</span>
                        )}
                        {!loading && (
                            <span className="projects-count">
                                {visible.length}/{projects.length}
                            </span>
                        )}
                    </div>
                </div>

                {/* Filter bar */}
                <div className="filter-bar">
                    {FILTERS.map(({ label, value, cls }) => (
                        <button
                            key={cls}
                            className={`filter-btn ${cls} ${activeFilter === value ? 'filter-btn--active' : ''}`}
                            onClick={() => handleFilter(value)}
                            disabled={loading}
                        >
                            {label}
                            {!loading && (
                                <span className="filter-count">
                                    {counts[value ?? 'all']}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="Projects">
                        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
                    </div>
                ) : visible.length > 0 ? (
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

                {/* Ver mais — só quando "Todos" e há projetos não-featured */}
                {!loading && !activeFilter && hiddenCount > 0 && (
                    <div className="projects-toggle">
                        <button
                            className="btn-toggle"
                            onClick={() => setShowAll((prev) => !prev)}
                        >
                            {showAll
                                ? '↑ Mostrar menos'
                                : `Ver todos os projetos (${hiddenCount} restantes)`}
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
}
