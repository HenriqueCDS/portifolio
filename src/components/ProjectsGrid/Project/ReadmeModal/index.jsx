import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { X, GithubLogo, ArrowUpRight, ArrowsOut, CaretLeft, CaretRight, Lock } from 'phosphor-react';
import './ReadmeModal.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ReadmeModal({ title, type, typeClass, date, stack, highlight, link_git, link_web, repos, images, imageGroups, text, onClose }) {
    const closeBtnRef = useRef(null);
    const paragraphs = (text || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
    const hasGroups = imageGroups?.length > 0;
    const [activeGroup, setActiveGroup] = useState(hasGroups ? imageGroups[0].key : null);
    const [activeImage, setActiveImage] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const activeImages = useMemo(
        () => (hasGroups ? imageGroups.find((g) => g.key === activeGroup)?.images ?? [] : images ?? []),
        [hasGroups, imageGroups, activeGroup, images]
    );
    const hasImages = activeImages.length > 0;

    function handleSelectGroup(key) {
        setActiveGroup(key);
        setActiveImage(0);
    }

    useEffect(() => {
        closeBtnRef.current?.focus();
        document.body.style.overflow = 'hidden';

        function handleKeyDown(e) {
            if (e.key === 'Escape') {
                lightboxOpen ? setLightboxOpen(false) : onClose();
                return;
            }
            if (!lightboxOpen || !hasImages || activeImages.length < 2) return;
            if (e.key === 'ArrowRight') setActiveImage((i) => (i + 1) % activeImages.length);
            if (e.key === 'ArrowLeft') setActiveImage((i) => (i - 1 + activeImages.length) % activeImages.length);
        }
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose, lightboxOpen, hasImages, activeImages]);

    return createPortal(
        <>
            <div className="readme-modal-backdrop" onClick={onClose}>
                <div
                    className="readme-modal"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="readme-modal-title"
                    onClick={(e) => e.stopPropagation()}
                >
                    <header className="readme-modal-header">
                        <h3 id="readme-modal-title">{title}</h3>
                        <button
                            ref={closeBtnRef}
                            type="button"
                            className="readme-modal-close"
                            onClick={onClose}
                            aria-label="Fechar"
                        >
                            <X size={20} weight="bold" />
                        </button>
                    </header>

                    <div className="readme-modal-content">
                        <div className="readme-modal-left">
                            <div className="readme-modal-summary">
                                <div className="card-meta">
                                    <span className={`card-type ${typeClass}`}>{type}</span>
                                    <span className="card-date">{date}</span>
                                </div>

                                {highlight && <p className="card-highlight">{highlight}</p>}

                                {stack?.length > 0 && (
                                    <div className="card-stack">
                                        {stack.map((tech) => (
                                            <span key={tech} className="stack-pill">{tech}</span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="readme-modal-text">
                                {paragraphs.length > 0
                                    ? paragraphs.map((p, i) => <p key={i}>{p}</p>)
                                    : <p className="readme-modal-status">Sem descrição adicional para este projeto.</p>}
                            </div>
                        </div>

                        {(hasImages || hasGroups) && (
                            <div className="readme-modal-right">
                                {hasGroups && (
                                    <div className="gallery-tabs" role="tablist" aria-label="Galeria de telas">
                                        {imageGroups.map((g) => (
                                            <button
                                                key={g.key}
                                                type="button"
                                                role="tab"
                                                aria-selected={activeGroup === g.key}
                                                className={`gallery-tab ${activeGroup === g.key ? 'gallery-tab--active' : ''}`}
                                                onClick={() => handleSelectGroup(g.key)}
                                            >
                                                {g.label}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {hasImages && (
                                    <Swiper
                                        key={activeGroup ?? 'single'}
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        loop={activeImages.length > 1}
                                        modules={[Navigation, Pagination]}
                                        navigation={activeImages.length > 1}
                                        pagination={activeImages.length > 1 ? { clickable: true } : false}
                                        onSlideChange={(swiper) => setActiveImage(swiper.realIndex)}
                                        className="readme-modal-swiper"
                                    >
                                        {activeImages.map((src, i) => (
                                            <SwiperSlide key={i}>
                                                <img
                                                    src={src}
                                                    alt={`${title} — screenshot ${i + 1}`}
                                                    className="readme-modal-img"
                                                    loading="lazy"
                                                    decoding="async"
                                                    onClick={() => setLightboxOpen(true)}
                                                />
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                )}

                                {hasImages && (
                                    <button
                                        type="button"
                                        className="readme-modal-expand"
                                        onClick={() => setLightboxOpen(true)}
                                        aria-label="Ampliar imagem"
                                    >
                                        <ArrowsOut size={18} weight="bold" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    <footer className="readme-modal-footer">
                        {repos?.length > 0 ? (
                            repos.map((repo) =>
                                repo.url ? (
                                    <a
                                        key={repo.label}
                                        href={repo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="card-link"
                                    >
                                        <GithubLogo size={16} weight="bold" />
                                        {repo.label}
                                    </a>
                                ) : (
                                    <span
                                        key={repo.label}
                                        className="card-link card-link--disabled"
                                        title="Repositório privado"
                                    >
                                        <Lock size={16} weight="bold" />
                                        {repo.label}
                                    </span>
                                )
                            )
                        ) : (
                            <a href={link_git} target="_blank" rel="noopener noreferrer" className="card-link">
                                <GithubLogo size={16} weight="bold" />
                                Ver repositório no GitHub
                            </a>
                        )}
                        {link_web && (
                            <a href={link_web} target="_blank" rel="noopener noreferrer" className="card-link card-link--demo">
                                <ArrowUpRight size={16} weight="bold" />
                                Ver demo
                            </a>
                        )}
                    </footer>
                </div>
            </div>

            {lightboxOpen && hasImages && (
                <div className="lightbox-backdrop" onClick={() => setLightboxOpen(false)}>
                    <button
                        type="button"
                        className="lightbox-close"
                        onClick={() => setLightboxOpen(false)}
                        aria-label="Fechar imagem ampliada"
                    >
                        <X size={22} weight="bold" />
                    </button>

                    {activeImages.length > 1 && (
                        <button
                            type="button"
                            className="lightbox-nav lightbox-nav--prev"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveImage((i) => (i - 1 + activeImages.length) % activeImages.length);
                            }}
                            aria-label="Imagem anterior"
                        >
                            <CaretLeft size={22} weight="bold" />
                        </button>
                    )}

                    <img
                        src={activeImages[activeImage]}
                        alt={`${title} — imagem ampliada ${activeImage + 1}`}
                        className="lightbox-img"
                        onClick={(e) => e.stopPropagation()}
                    />

                    {activeImages.length > 1 && (
                        <button
                            type="button"
                            className="lightbox-nav lightbox-nav--next"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveImage((i) => (i + 1) % activeImages.length);
                            }}
                            aria-label="Próxima imagem"
                        >
                            <CaretRight size={22} weight="bold" />
                        </button>
                    )}
                </div>
            )}
        </>,
        document.body
    );
}
