import { useState, useEffect } from 'react';
import { fetchGithubRepos } from '../services/githubService';
import { PROJECT_META, SKIP_REPOS, inferType, formatRepoName } from '../data/projectsMeta';

function buildFallback() {
    return Object.entries(PROJECT_META).map(([name, meta]) => ({
        id: name,
        title: meta.title || formatRepoName(name),
        date: '2024',
        type: meta.type || 'BACKEND',
        link_git: `https://github.com/HenriqueCDS/${name}`,
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
        description: meta.description || repo.description || 'Repositório disponível no GitHub.',
        stack: meta.stack || (repo.language ? [repo.language] : []),
        featured: meta.featured || false,
    };
}

export function useGithubProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState(null);

    useEffect(() => {
        fetchGithubRepos()
            .then((repos) => {
                const enriched = repos
                    .filter((r) => !r.fork && !SKIP_REPOS.has(r.name))
                    .map(mergeRepoWithMeta)
                    // featured primeiro, depois por data de atualização
                    .sort((a, b) => {
                        if (a.featured !== b.featured) return a.featured ? -1 : 1;
                        return parseInt(b.date) - parseInt(a.date);
                    });

                setProjects(enriched);
            })
            .catch((err) => {
                const isRateLimit = err.message === 'rate_limit';
                setError(isRateLimit ? 'rate_limit' : 'api_error');
                // fallback: dados do projectsMeta sem precisar da API
                setProjects(buildFallback().sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)));
            })
            .finally(() => setLoading(false));
    }, []);

    return { projects, loading, error };
}
