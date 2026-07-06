export const GITHUB_USERNAME = 'HenriqueCDS';

const STARRED_URL = `https://api.github.com/users/${GITHUB_USERNAME}/starred?per_page=100`;

const CACHE_KEY          = 'gh_starred_v1';
const README_CACHE_PREFIX = 'gh_readme_';
const CACHE_TTL          = 5 * 60 * 1000; // 5 minutos

/* ------------------------------------------------------------------ */
/*  Repositórios favoritados (starred) do usuário                      */
/* ------------------------------------------------------------------ */
export async function fetchStarredRepos() {
    // tenta retornar do cache primeiro
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (raw) {
            const { data, ts } = JSON.parse(raw);
            if (Date.now() - ts < CACHE_TTL) return data;
        }
    } catch (_) { /* sessionStorage indisponível */ }

    const res = await fetch(STARRED_URL, {
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

/* ------------------------------------------------------------------ */
/*  README → excerto de texto limpo                                    */
/* ------------------------------------------------------------------ */
export async function fetchReadmeExcerpt(owner, repo, maxLen = 240) {
    const cacheKey = `${README_CACHE_PREFIX}${owner}_${repo}`;

    // cache local (guarda inclusive o "null" para não repetir requisição)
    try {
        const raw = sessionStorage.getItem(cacheKey);
        if (raw) {
            const { text, ts } = JSON.parse(raw);
            if (Date.now() - ts < CACHE_TTL) return text;
        }
    } catch (_) { /* ignore */ }

    let excerpt = null;
    try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
            headers: { Accept: 'application/vnd.github.raw+json' },
        });
        if (res.ok) {
            const md = await res.text();
            excerpt = extractExcerpt(md, maxLen);
        }
        // 403/404/etc → mantém null e cai no fallback local
    } catch (_) { /* rede indisponível → fallback local */ }

    try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ text: excerpt, ts: Date.now() }));
    } catch (_) { /* ignore */ }

    return excerpt;
}

/**
 * Extrai o primeiro parágrafo relevante de um README em Markdown,
 * removendo badges, imagens, links, HTML e símbolos de formatação.
 */
export function extractExcerpt(markdown, maxLen = 240) {
    if (!markdown) return null;

    const cleaned = markdown
        .replace(/```[\s\S]*?```/g, '')          // blocos de código
        .replace(/`[^`]*`/g, '')                 // código inline
        .replace(/<!--[\s\S]*?-->/g, '')         // comentários HTML
        .replace(/<[^>]+>/g, '')                 // tags HTML
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')    // imagens / badges
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1') // links → texto
        .replace(/^\s*[-*+]\s+/gm, '')           // marcadores de lista
        .replace(/^\s{0,3}#{1,6}\s+/gm, '')      // títulos
        .replace(/[*_>~]/g, '')                  // ênfase/citação restante
        .replace(/\r/g, '');

    const paragraphs = cleaned
        .split(/\n\s*\n/)
        .map((p) => p.replace(/\s+/g, ' ').trim())
        .filter(Boolean);

    // prefere o primeiro parágrafo com corpo real (ignora título/badge solto)
    const first = paragraphs.find((p) => p.length > 40) || paragraphs[0];
    if (!first) return null;

    if (first.length <= maxLen) return first;
    return first.slice(0, maxLen).replace(/\s+\S*$/, '').trimEnd() + '…';
}
