import { useState, useEffect } from 'react';
import { fetchStarredRepos, fetchReadmeExcerpt, GITHUB_USERNAME } from '../services/githubService';
import { PROJECT_META, SKIP_REPOS, inferType, formatRepoName } from '../data/projectsMeta';

function buildFallback() {
    return Object.entries(PROJECT_META).map(([name, meta]) => ({
        id: name,
        title: meta.title || formatRepoName(name),
        date: '2024',
        type: meta.type || 'BACKEND',
        link_git: `https://github.com/${GITHUB_USERNAME}/${name}`,
        link_web: meta.link_web || null,
        paste: meta.paste || null,
        description: meta.description || '',
        stack: meta.stack || [],
        featured: meta.featured || false,
    }));
}

function mergeRepoWithMeta(repo) {
    const meta = PROJECT_META[repo.name] || {};
    return {
        id: repo.name,
        title: meta.title || formatRepoName(repo.name),
        date: new Date(repo.updated_at).getFullYear().toString(),
        type: meta.type || inferType(repo),
        link_git: repo.html_url,
        link_web: repo.homepage || meta.link_web || null,
        paste: meta.paste || null,
        // fallback local — será sobrescrito pelo excerto do README quando disponível
        description: meta.description || repo.description || 'Repositório disponível no GitHub.',
        stack: meta.stack || (repo.language ? [repo.language] : []),
        featured: meta.featured || false,
    };
}

// featured primeiro, depois por data de atualização (mais recente antes)
function sortProjects(list) {
    return [...list].sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return parseInt(b.date) - parseInt(a.date);
    });
}

export function useGithubProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);

    useEffect(() => {
        let cancelled = false;

        fetchStarredRepos()
            .then(async (repos) => {
                // apenas meus próprios repositórios favoritados
                const own = repos.filter(
                    (r) => r.owner?.login === GITHUB_USERNAME && !SKIP_REPOS.has(r.name)
                );

                const base = sortProjects(own.map(mergeRepoWithMeta));

                // 1º render rápido: description local (meta/repo)
                if (!cancelled) {
                    setProjects(base);
                    setLoading(false);
                }

                // 2º passo: enriquece com um excerto do README de cada repo
                const enriched = await Promise.all(
                    base.map(async (p) => {
                        const excerpt = await fetchReadmeExcerpt(GITHUB_USERNAME, p.id);
                        return excerpt ? { ...p, description: excerpt } : p;
                    })
                );

                if (!cancelled) setProjects(enriched);
            })
            .catch((err) => {
                if (cancelled) return;
                const isRateLimit = err.message === 'rate_limit';
                setError(isRateLimit ? 'rate_limit' : 'api_error');
                // fallback: dados do projectsMeta sem precisar da API
                setProjects(sortProjects(buildFallback()));
                setLoading(false);
            });

        return () => { cancelled = true; };
    }, []);

    return { projects, loading, error };
}
