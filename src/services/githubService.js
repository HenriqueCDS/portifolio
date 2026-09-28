export const GITHUB_USERNAME = 'HenriqueCDS';

const STARRED_URL = `https://api.github.com/users/${GITHUB_USERNAME}/starred?per_page=100`;

const CACHE_KEY            = 'gh_starred_v1';
const LAST_GOOD_KEY        = 'gh_starred_last_good_v1';
const README_CACHE_PREFIX  = 'gh_readme_v2_';
const SHOTS_CACHE_PREFIX   = 'gh_shots_v1_';
const CACHE_TTL            = 5 * 60 * 1000; // 5 minutos

// pastas candidatas (nessa ordem) para screenshots versionados no repo
const SCREENSHOT_PATHS = ['docs/screenshot', 'docs/screenshots'];
const IMAGE_EXT_RE = /\.(png|jpe?g|webp|gif)$/i;

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
    } catch { /* sessionStorage indisponível */ }

    const res = await fetch(STARRED_URL, {
        headers: { Accept: 'application/vnd.github+json' },
    });

    if (res.status === 403) throw new Error('rate_limit');
    if (!res.ok)           throw new Error(`github_api_${res.status}`);

    const data = await res.json();

    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data, ts: Date.now() }));
    } catch { /* quota esgotada */ }

    // snapshot sem TTL (localStorage): usado como fallback quando a API
    // falhar/atingir rate limit, para não cair no dump estático de todo o
    // projectsMeta.js e mostrar só o que realmente está estrelado no GitHub
    try {
        localStorage.setItem(LAST_GOOD_KEY, JSON.stringify({ data }));
    } catch { /* quota esgotada */ }

    return data;
}

/** Último snapshot bem-sucedido de repos estrelados (sem expiração). */
export function getLastKnownStarredRepos() {
    try {
        const raw = localStorage.getItem(LAST_GOOD_KEY);
        if (raw) return JSON.parse(raw).data;
    } catch { /* ignore */ }
    return null;
}

/* ------------------------------------------------------------------ */
/*  README → markdown bruto (cru), com cache                           */
/* ------------------------------------------------------------------ */
export async function fetchReadme(owner, repo) {
    const cacheKey = `${README_CACHE_PREFIX}${owner}_${repo}`;

    // cache local (guarda inclusive o "null" para não repetir requisição)
    try {
        const raw = sessionStorage.getItem(cacheKey);
        if (raw) {
            const { md, ts } = JSON.parse(raw);
            if (Date.now() - ts < CACHE_TTL) return md;
        }
    } catch { /* ignore */ }

    let md = null;
    try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
            headers: { Accept: 'application/vnd.github.raw+json' },
        });
        if (res.ok) md = await res.text();
        // 403/404/etc → mantém null e cai no fallback local
    } catch { /* rede indisponível → fallback local */ }

    try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ md, ts: Date.now() }));
    } catch { /* ignore */ }

    return md;
}

/* ------------------------------------------------------------------ */
/*  README → excerto de texto limpo (usa o mesmo cache de fetchReadme) */
/* ------------------------------------------------------------------ */
export async function fetchReadmeExcerpt(owner, repo, maxLen = 240) {
    const md = await fetchReadme(owner, repo);
    return extractExcerpt(md, maxLen);
}

/**
 * Remove badges, imagens, links, HTML e símbolos de formatação de um
 * README em Markdown, mantendo os parágrafos como texto limpo.
 */
export function cleanMarkdown(markdown) {
    if (!markdown) return [];

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

    return cleaned
        .split(/\n\s*\n/)
        .map((p) => p.replace(/[ \t]+/g, ' ').trim())
        .filter(Boolean);
}

/**
 * Extrai o primeiro parágrafo relevante de um README em Markdown.
 */
export function extractExcerpt(markdown, maxLen = 240) {
    const paragraphs = cleanMarkdown(markdown);

    // prefere o primeiro parágrafo com corpo real (ignora título/badge solto)
    const first = paragraphs.find((p) => p.length > 40) || paragraphs[0];
    if (!first) return null;

    if (first.length <= maxLen) return first;
    return first.slice(0, maxLen).replace(/\s+\S*$/, '').trimEnd() + '…';
}

/* ------------------------------------------------------------------ */
/*  Screenshots versionadas no repo (docs/screenshot[s]/*.png|jpg…)    */
/* ------------------------------------------------------------------ */
export async function fetchRepoScreenshots(owner, repo) {
    const cacheKey = `${SHOTS_CACHE_PREFIX}${owner}_${repo}`;

    try {
        const raw = sessionStorage.getItem(cacheKey);
        if (raw) {
            const { urls, ts } = JSON.parse(raw);
            if (Date.now() - ts < CACHE_TTL) return urls;
        }
    } catch { /* ignore */ }

    let urls = [];
    for (const path of SCREENSHOT_PATHS) {
        try {
            const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                headers: { Accept: 'application/vnd.github+json' },
            });
            if (res.ok) {
                const items = await res.json();
                urls = (Array.isArray(items) ? items : [])
                    .filter((f) => f.type === 'file' && IMAGE_EXT_RE.test(f.name))
                    .map((f) => f.download_url);
                if (urls.length > 0) break;
            }
            // 404 → pasta não existe nesse repo, tenta o próximo padrão
        } catch { /* rede indisponível → tenta o próximo padrão */ }
    }

    try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ urls, ts: Date.now() }));
    } catch { /* ignore */ }

    return urls;
}
