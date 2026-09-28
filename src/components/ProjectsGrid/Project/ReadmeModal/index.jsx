import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, GithubLogo } from 'phosphor-react';
import './ReadmeModal.css';
import { fetchReadme, cleanMarkdown, GITHUB_USERNAME } from '../../../../services/githubService';

export default function ReadmeModal({ repo, title, link_git, onClose }) {
    const [paragraphs, setParagraphs] = useState(null); // null = carregando
    const [error, setError] = useState(false);
    const closeBtnRef = useRef(null);

    useEffect(() => {
        let cancelled = false;

        fetchReadme(GITHUB_USERNAME, repo).then((md) => {
            if (cancelled) return;
            const blocks = cleanMarkdown(md);
            if (blocks.length === 0) setError(true);
            else setParagraphs(blocks);
        });

        return () => { cancelled = true; };
    }, [repo]);

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
                    {paragraphs === null && !error && (
                        <p className="readme-modal-status">Carregando README…</p>
                    )}
                    {error && (
                        <p className="readme-modal-status">
                            Não foi possível carregar o README deste repositório.
                        </p>
                    )}
                    {paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
                </div>

                <footer className="readme-modal-footer">
                    <a href={link_git} target="_blank" rel="noopener noreferrer" className="card-link">
                        <GithubLogo size={16} weight="bold" />
                        Ver repositório no GitHub
                    </a>
                </footer>
            </div>
        </div>,
        document.body
    );
}
