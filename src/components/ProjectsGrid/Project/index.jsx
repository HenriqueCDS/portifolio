import './project.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { GithubLogo, LinkSimple, ArrowUpRight } from 'phosphor-react';
import { useState, useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const IMAGE_GLOBS = {
    cottom_films:     () => import.meta.glob('../../../assets/img/cottom_films/*.png'),
    ecommerce_custom: () => import.meta.glob('../../../assets/img/ecommerce_custom/*.jpeg'),
    rest_api:         () => import.meta.glob('../../../assets/img/rest_api/*.png'),
    lets_see:         () => import.meta.glob('../../../assets/img/lest_see/*.png'),
};

const TYPE_COLOR = {
    'REST API': 'type-api',
    'BACKEND':  'type-backend',
    'DADOS':    'type-data',
    'WEB':      'type-web',
};

export default function Project({ date, title, type, link_git, link_web, paste, description, stack, index }) {
    const [imgPaths, setImgPaths] = useState([]);

    useEffect(() => {
        const globFn = IMAGE_GLOBS[paste];
        if (!globFn) return;
        const images = globFn();
        Promise.all(
            Object.keys(images).map(async (path) => {
                const mod = await images[path]();
                return mod.default;
            })
        ).then(setImgPaths);
    }, [paste]);

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
                    {hasLiveLink && (
                        <a href={link_web} target="_blank" rel="noopener noreferrer" className="card-link card-link--demo">
                            <ArrowUpRight size={16} weight="bold" />
                            Demo
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
}
