import './project.css'
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { GithubLogo, ArrowUpRight, FileText } from 'phosphor-react';
import ReadmeModal from './ReadmeModal';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// eager + ?url: só as URLs entram no bundle (sem chunk JS por imagem) e ficam disponíveis no 1º render.
// O Vite exige as opções como objeto literal em cada chamada (análise estática), por isso a repetição
const IMAGES = {
    cottom_films:        Object.values(import.meta.glob('../../../assets/img/cottom_films/*.png',        { eager: true, query: '?url', import: 'default' })),
    ecommerce_custom:    Object.values(import.meta.glob('../../../assets/img/ecommerce_custom/*.jpeg',    { eager: true, query: '?url', import: 'default' })),
    rest_api:            Object.values(import.meta.glob('../../../assets/img/rest_api/*.png',            { eager: true, query: '?url', import: 'default' })),
    lets_see:            Object.values(import.meta.glob('../../../assets/img/lest_see/*.png',            { eager: true, query: '?url', import: 'default' })),
    ia_agent_puc_digital: Object.values(import.meta.glob('../../../assets/img/ia_agent_puc_digital/*.png', { eager: true, query: '?url', import: 'default' })),
    ufc_preditor:        Object.values(import.meta.glob('../../../assets/img/ufc_preditor/*.png',        { eager: true, query: '?url', import: 'default' })),
};

const TYPE_COLOR = {
    'REST API': 'type-api',
    'BACKEND':  'type-backend',
    'DADOS':    'type-data',
    'WEB':      'type-web',
};

export default function Project({ date, title, type, link_git, link_web, paste, description, readme, stack, highlight, index }) {
    const [showReadme, setShowReadme] = useState(false);
    const imgPaths = IMAGES[paste] ?? [];

    const hasLiveLink = link_web && link_web !== link_git;
    const typeClass = TYPE_COLOR[type] || 'type-api';
    const num = String(index + 1).padStart(2, '0');

    return (
        <article className="project-card">
            {/* ── Cover: imagem ou placeholder ── */}
            <div className="card-cover">
                {imgPaths.length > 0 ? (
                    <Swiper
                        key={paste}
                        spaceBetween={0}
                        slidesPerView={1}
                        loop={imgPaths.length > 1}
                        modules={[Navigation, Pagination]}
                        navigation={imgPaths.length > 1}
                        pagination={imgPaths.length > 1 ? { clickable: true } : false}
                        className="card-swiper"
                    >
                        {imgPaths.map((src, i) => (
                            <SwiperSlide key={i}>
                                <img
                                    src={src}
                                    alt={`${title} — screenshot ${i + 1}`}
                                    className="card-img"
                                    loading="lazy"
                                    decoding="async"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="card-placeholder">
                        <div className="placeholder-bar">
                            <span /><span /><span />
                        </div>
                        <pre className="placeholder-code">
{`const project = {
  type: "${type}",
  stack: [
    ${(stack || []).slice(0, 3).map(t => `"${t}"`).join(', ')},
  ],
}`}
                        </pre>
                    </div>
                )}

                {/* badge de número */}
                <span className="card-num">{num}</span>
            </div>

            {/* ── Corpo do card ── */}
            <div className="card-body">
                <div className="card-meta">
                    <span className={`card-type ${typeClass}`}>{type}</span>
                    <span className="card-date">{date}</span>
                </div>

                <h3 className="card-title">{title}</h3>

                {highlight && <p className="card-highlight">{highlight}</p>}

                <p className="card-desc">{description}</p>

                {stack?.length > 0 && (
                    <div className="card-stack">
                        {stack.map((tech) => (
                            <span key={tech} className="stack-pill">{tech}</span>
                        ))}
                    </div>
                )}

                <div className="card-actions">
                    <a href={link_git} target="_blank" rel="noopener noreferrer" className="card-link">
                        <GithubLogo size={16} weight="bold" />
                        Código
                    </a>
                    <button type="button" className="card-link" onClick={() => setShowReadme(true)}>
                        <FileText size={16} weight="bold" />
                        Leia mais
                    </button>
                    {hasLiveLink && (
                        <a href={link_web} target="_blank" rel="noopener noreferrer" className="card-link card-link--demo">
                            <ArrowUpRight size={16} weight="bold" />
                            Demo
                        </a>
                    )}
                </div>
            </div>

            {showReadme && (
                <ReadmeModal
                    title={title}
                    type={type}
                    typeClass={typeClass}
                    date={date}
                    stack={stack}
                    highlight={highlight}
                    link_git={link_git}
                    link_web={hasLiveLink ? link_web : null}
                    images={imgPaths}
                    text={readme || description}
                    onClose={() => setShowReadme(false)}
                />
            )}
        </article>
    );
}
