import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { X, GithubLogo, ArrowUpRight } from 'phosphor-react';
import './ReadmeModal.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ReadmeModal({ title, type, typeClass, date, stack, highlight, link_git, link_web, images, text, onClose }) {
    const closeBtnRef = useRef(null);
    const paragraphs = (text || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

    useEffect(() => {
        closeBtnRef.current?.focus();
        document.body.style.overflow = 'hidden';

        function handleKeyDown(e) {
            if (e.key === 'Escape') onClose();
        }
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return createPortal(
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

                <div className="readme-modal-body">
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

                    {images?.length > 0 && (
                        <Swiper
                            spaceBetween={0}
                            slidesPerView={1}
                            loop={images.length > 1}
                            modules={[Navigation, Pagination]}
                            navigation={images.length > 1}
                            pagination={images.length > 1 ? { clickable: true } : false}
                            className="readme-modal-swiper"
                        >
                            {images.map((src, i) => (
                                <SwiperSlide key={i}>
                                    <img
                                        src={src}
                                        alt={`${title} — screenshot ${i + 1}`}
                                        className="readme-modal-img"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}

                    <div className="readme-modal-text">
                        {paragraphs.length > 0
                            ? paragraphs.map((p, i) => <p key={i}>{p}</p>)
                            : <p className="readme-modal-status">Sem descrição adicional para este projeto.</p>}
                    </div>
                </div>

                <footer className="readme-modal-footer">
                    <a href={link_git} target="_blank" rel="noopener noreferrer" className="card-link">
                        <GithubLogo size={16} weight="bold" />
                        Ver repositório no GitHub
                    </a>
                    {link_web && (
                        <a href={link_web} target="_blank" rel="noopener noreferrer" className="card-link card-link--demo">
                            <ArrowUpRight size={16} weight="bold" />
                            Ver demo
                        </a>
                    )}
                </footer>
            </div>
        </div>,
        document.body
    );
}
