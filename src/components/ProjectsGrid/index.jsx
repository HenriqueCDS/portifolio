import { useState, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Project from "./Project";
import "./GridProject.css";
import { useGithubProjects } from '../../hooks/useGithubProjects';
import { prefersReducedMotion } from '../../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

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
    const scope = useRef(null);

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

    // batch: reanima só os cards que entram na viewport, funciona também após trocar filtro/"ver mais"
    // depende do TAMANHO/identidade da lista renderizada, não do array `visible` em si — `projects` troca de
    // referência quando o hook enriquece as descriptions via README (useGithubProjects), o que recriaria os
    // ScrollTriggers e resetava a opacidade dos cards que já tinham acabado de aparecer.
    useGSAP(() => {
        if (prefersReducedMotion() || loading || !visible.length) return;

        ScrollTrigger.batch('.project-card', {
            start: 'top 85%',
            onEnter: (batch) => gsap.from(batch, {
                opacity: 0,
                y: 40,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                overwrite: true,
            }),
        });

        // cards que já estavam visíveis (ex.: recém-expandidos via "ver mais") podem cair numa zona
        // ambígua do batch, que só detecta entrada por scroll — o refresh força reavaliar a posição atual
        requestAnimationFrame(() => ScrollTrigger.refresh());
    }, { scope, dependencies: [visible.length, activeFilter, showAll, loading] });

    return (
        <section id="gridProjects" className="gridProjects" ref={scope}>
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
