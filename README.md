# Portfólio — Henrique Cordeiro

Portfólio pessoal de desenvolvedor com foco em **Backend, Engenharia de Dados e Integração de Sistemas** (REST API, ETL, Python, Java), com experiência também em front end.

## Seções

- **Loader** — animação de entrada (pulada com `prefers-reduced-motion`)
- **Banner** e **Navbar**
- **Sobre**
- **Experiência**
- **Formação**
- **Projetos selecionados** — grid com modal de README de cada projeto
- **Contatos**

## Tecnologias

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [GSAP](https://gsap.com/) e `@gsap/react` — animações
- [Swiper](https://swiperjs.com/) — carrosséis
- [Three.js](https://threejs.org/) — elementos 3D
- [Phosphor Icons](https://phosphoricons.com/) — ícones
- ESLint

## Como rodar

Requer Node.js 24.x.

```bash
npm install
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

## Scripts

| Comando           | Descrição                         |
| ----------------- | --------------------------------- |
| `npm run dev`     | Servidor de desenvolvimento       |
| `npm run build`   | Build de produção                 |
| `npm run preview` | Pré-visualização do build         |
| `npm run lint`    | Verificação com ESLint            |

## Estrutura

```
src/
├── assets/        # fontes, imagens
├── components/    # About, Experience, Education, ProjectsGrid, Navbar, ...
├── hooks/         # hooks reutilizáveis (ex.: useScrollReveal)
├── pages/Home/    # página principal
├── App.jsx        # rotas
└── main.jsx
```
