const GITHUB_USERNAME = 'HenriqueCDS';
const API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`;

const CACHE_KEY = 'gh_repos_v1';
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export async function fetchGithubRepos() {
    // tenta retornar do cache primeiro
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (raw) {
            const { data, ts } = JSON.parse(raw);
            if (Date.now() - ts < CACHE_TTL) return data;
        }
    } catch (_) { /* sessionStorage indisponível */ }

    const res = await fetch(API_URL, {
        headers: { Accept: 'application/vnd.github+json' },
    });

    if (res.status === 403) throw new Error('rate_limit');
    if (!res.ok)           throw new Error(`github_api_${res.status}`);

    const data = await res.json();

    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
    } catch (_) { /* quota esgotada */ }

    return data;
}
