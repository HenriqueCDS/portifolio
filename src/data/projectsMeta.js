/**
 * Metadados dos repositórios.
 * Chave = nome exato do repo no GitHub (case-sensitive).
 *
 * Campos disponíveis:
 *   title       string   — nome exibido no card (default: formatRepoName)
 *   type        string   — 'REST API' | 'BACKEND' | 'DADOS' | 'WEB'
 *   description string   — descrição exibida no card (default: repo.description da API)
 *   stack       string[] — tecnologias exibidas como pills
 *   paste       string   — pasta em assets/img/ para carregar screenshots locais
 *   link_web    string   — URL de demo/deploy (default: repo.homepage da API)
 *   featured    boolean  — true → aparece como destaque (sem precisar clicar "Ver mais")
 *
 * Para adicionar um novo repositório com enriquecimento:
 *   1. Crie uma entrada com a chave = nome exato do repo no GitHub
 *   2. Preencha os campos desejados
 *   3. Salve — o portfólio lerá automaticamente na próxima abertura
 */

export const PROJECT_META = {

    Rest_Api_Questoes: {
        title: 'REST API — Banco de Questões',
        type: 'REST API',
        description:
            'API RESTful para gerenciamento de banco de questões educacionais. Autenticação JWT, upload de arquivos via AWS S3, ORM com Sequelize + MySQL, arquitetura MVC com rotas para questões, áreas curriculares, usuários e feedbacks. Testes automatizados com Jest e Supertest.',
        stack: ['Node.js', 'Express', 'MySQL', 'Sequelize', 'JWT', 'AWS S3', 'Jest'],
        paste: 'rest_api',
        featured: true,
    },

    'api_ecommerce': {
        title: 'API E-commerce (Backend)',
        type: 'REST API',
        description:
            'API backend completa para plataforma de e-commerce com arquitetura MVC. Controllers, middlewares de autenticação, migrations e seeders com Sequelize, camada de serviços separada e configuração de rotas modulares.',
        stack: ['Node.js', 'Express', 'Sequelize', 'MySQL', 'MVC'],
        paste: 'ecommerce_custom',
        featured: true,
    },

    'Projeto-Websocket': {
        title: 'Projeto WebSocket',
        type: 'BACKEND',
        description:
            'Servidor WebSocket em Node.js com arquitetura modular. Camadas separadas para banco de dados, middlewares, registro de eventos e utilitários. Comunicação em tempo real entre clientes com controle de sessões.',
        stack: ['Node.js', 'WebSocket', 'JavaScript'],
        featured: true,
    },

    'pyhton-sql-server-bd': {
        title: 'Python + SQL Server — ETL & Dados',
        type: 'DADOS',
        description:
            'Notebook Python para geração, manipulação e carga de dados em SQL Server. Utiliza Faker para criação de datasets realistas e integração direta com banco relacional via scripts SQL organizados por domínio.',
        stack: ['Python', 'SQL Server', 'Pandas', 'Jupyter Notebook', 'Faker'],
        featured: true,
    },

    'registration-api': {
        title: 'Registration API',
        type: 'REST API',
        description:
            'API de cadastro e gerenciamento de usuários com Node.js e Sequelize. Estrutura MVC com migrations, seeders e configuração de ambiente por variáveis.',
        stack: ['Node.js', 'Express', 'Sequelize', 'MySQL'],
        featured: false,
    },

    'dev-books-server': {
        title: 'Dev Books Server',
        type: 'BACKEND',
        description:
            'Servidor backend para plataforma de livros para desenvolvedores. API REST com gerenciamento de catálogo, rotas organizadas e persistência de dados.',
        stack: ['Node.js', 'JavaScript', 'Express'],
        featured: false,
    },

    'spring-boot-exercicios': {
        title: 'Spring Boot — Exercícios',
        type: 'BACKEND',
        description:
            'Coleção de exercícios e projetos práticos desenvolvidos com Spring Boot. Implementações de APIs REST, injeção de dependência, configuração de datasources e padrões de projeto Java.',
        stack: ['Java', 'Spring Boot', 'Maven'],
        featured: false,
    },

    ProvaGTI: {
        title: 'Prova GTI — Spring Boot',
        type: 'BACKEND',
        description:
            'Aplicação Java com Spring Boot desenvolvida como avaliação técnica. Estrutura padrão Maven com testes unitários, configuração de propriedades e boas práticas de projeto Spring.',
        stack: ['Java', 'Spring Boot', 'Maven', 'JUnit'],
        featured: false,
    },

    Cotton_Films_Website: {
        title: 'Cotton Films Website',
        type: 'WEB',
        description:
            'Site institucional para produtora audiovisual. Layout responsivo, carrossel de portfólio, animações CSS e deploy automatizado via Vercel.',
        stack: ['JavaScript', 'HTML', 'CSS', 'Vercel'],
        paste: 'cottom_films',
        link_web: 'https://cotton-films-website-usbq.vercel.app/',
        featured: false,
    },

    lets_see: {
        title: 'Lets See',
        type: 'WEB',
        description:
            'Aplicação frontend em React com Vite. Interface componentizada com gerenciamento de estado, roteamento de páginas e estilização modular.',
        stack: ['React', 'Vite', 'JavaScript', 'CSS'],
        paste: 'lets_see',
        featured: false,
    },

    Devbooks: {
        title: 'Devbooks',
        type: 'WEB',
        description:
            'Aplicação frontend para exploração de livros técnicos para desenvolvedores. Consome a API Dev Books Server e exibe catálogo com busca e filtragem.',
        stack: ['JavaScript', 'React', 'CSS'],
        featured: false,
    },

    'ecommerce-custom': {
        title: 'E-commerce Custom (Frontend)',
        type: 'WEB',
        description:
            'Interface frontend para plataforma de e-commerce customizável. Listagem de produtos, carrinho e checkout integrados à API de backend.',
        stack: ['JavaScript', 'HTML', 'CSS'],
        paste: 'ecommerce_custom',
        featured: false,
    },
};

// Repos para ignorar completamente (perfil, portfólio, experimentos sem relevância)
export const SKIP_REPOS = new Set([
    'HenriqueCDS',
    'portifolio',
    'portfolio_web',
    'wireframe',
    'CalculadoraSwing',
    'ExercJava-Carpintaria',
]);

/**
 * Infere o tipo do projeto a partir dos dados brutos da API do GitHub.
 * Usado apenas para repos que não têm entrada em PROJECT_META.
 */
export function inferType(repo) {
    const name    = repo.name.toLowerCase();
    const lang    = (repo.language || '').toLowerCase();
    const topics  = (repo.topics  || []).join(' ').toLowerCase();
    const context = `${name} ${topics}`;

    if (lang === 'jupyter notebook' || lang === 'python' && context.includes('data')) return 'DADOS';
    if (context.includes('api') || context.includes('server') || context.includes('rest')) {
        return lang === 'python' ? 'DADOS' : 'REST API';
    }
    if (lang === 'java' || context.includes('spring') || context.includes('backend')) return 'BACKEND';
    if (['javascript', 'typescript', 'css', 'html'].includes(lang)) return 'WEB';
    return 'BACKEND';
}

/** Transforma "meu-repo_name" → "Meu Repo Name" para repos sem meta */
export function formatRepoName(name) {
    return name.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
