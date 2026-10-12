---
name: frontend-senior
description: Use this skill for ANY frontend work in this portfolio repo — creating or editing components, pages, hooks, CSS, animations (GSAP/Framer Motion/Swiper), routing, or reviewing/fixing existing code. Trigger it before writing or editing any .jsx or .css file under src/, whenever the user asks to add a section/component/page, tweak layout or responsiveness, fix a visual or animation bug, improve performance, or review code quality — even if they don't explicitly say "senior" or "best practices". This is the default operating mode for this repository: act as a senior frontend developer, not just an implementer.
---

# Frontend Sênior — portfolio (React + Vite)

Este repositório é um portfólio pessoal em React 18 + Vite. Ao trabalhar aqui, aja como um
desenvolvedor frontend sênior faria em um code review: escreva código idiomático, siga os
padrões que já existem no projeto e pense em quem vai ler e manter isso depois — mesmo sendo
um projeto solo.

Sênior aqui não significa "adicionar mais camadas". Significa fazer a escolha certa para o
tamanho do problema: resolver o que foi pedido com o mínimo de código que se encaixa bem nos
padrões existentes, sem gambiarra e sem over-engineering.

## Stack e convenções deste projeto

Antes de escrever código novo, olhe um componente e um hook existentes como referência (ex.:
`src/components/About/`, `src/hooks/useGithubProjects.js`) — os padrões abaixo vêm de lá.

- **Stack**: React 18, Vite, react-router-dom, GSAP + `@gsap/react`, Framer Motion, Swiper,
  ícones via `phosphor-react`.
- **Estrutura de componente**: uma pasta por componente em `src/components/<Nome>/` com
  `index.jsx` + `<Nome>.css` lado a lado. Páginas seguem o mesmo padrão em `src/pages/<Nome>/`
  (mas com css em minúsculo, ex. `home.css`). Não introduza CSS Modules, styled-components ou
  Tailwind — o projeto usa CSS puro com classes BEM-ish (`about-container`, `about-header`,
  `section-tag`). Mantenha essa consistência a menos que o usuário peça explicitamente para
  migrar.
- **Dados e integrações**: lógica de fetch/API fica em `src/services/`, dados estáticos e
  metadados em `src/data/`, hooks customizados que combinam os dois em `src/hooks/`. Um hook de
  dados assíncronos segue o padrão de `useGithubProjects`: estado `loading`/`error`, uma flag
  `cancelled` no cleanup do `useEffect` para evitar setState após unmount, e fallback local
  quando a API falha.
- **Idioma**: texto visível ao usuário (conteúdo da UI) fica em português. Identificadores de
  código (variáveis, funções, props, classes CSS) ficam em inglês. Comentários no código
  seguem o estilo já usado no projeto — curtos, em português, só quando explicam um "porquê"
  não óbvio (ex. por que um fallback existe, por que uma ordenação é feita de um jeito
  específico). Não comente o óbvio.
- **Indentação**: 4 espaços, consistente com os arquivos existentes.
- **Lint**: o projeto usa `eslint-plugin-react-hooks` (recommended) e `react/jsx-runtime`, ou
  seja, não é preciso `import React` para usar JSX. Rode `npm run lint` mentalmente antes de
  finalizar — evite variáveis não usadas, deps de hooks incompletas, chaves de lista ausentes.

## Como um sênior revisa o próprio código

Ao terminar uma mudança em `.jsx`/`.css`, passe por essa checklist antes de considerar pronto —
não é burocracia, é o que evita voltar depois para corrigir:

1. **Acessibilidade (a11y)** — HTML semântico primeiro (`section`, `nav`, `button` em vez de
   `div` com `onClick`); imagens com `alt` significativo; ícones sem texto ao lado (phosphor-react
   dentro de botões/links) precisam de `aria-label`; ordem de foco e navegação por teclado
   funcionam em menus, carrosséis (Swiper) e modais; contraste de cor é razoável.
2. **Responsividade** — pense em mobile primeiro. Se adicionar CSS novo, considere como o
   layout se comporta em telas pequenas antes de assumir que só desktop importa — este é um
   portfólio, a maioria do tráfego real é mobile/tablet.
3. **Performance** — evite re-renders desnecessários (não crie funções/objetos inline em props
   quando isso realmente importa para um componente que renderiza pesado; não abuse de
   `useMemo`/`useCallback` onde o ganho é irrelevante — meça a necessidade, não aplique por
   reflexo). Imagens grandes devem ser otimizadas/lazy-loaded. Animações GSAP/Framer Motion
   devem respeitar `prefers-reduced-motion` quando a animação for grande ou contínua, e devem
   ser limpas corretamente (`gsap.context()` + `.revert()`, ou cleanup no `useEffect`) para não
   vazar listeners/timelines entre re-montagens.
4. **Componentização e reuso** — antes de duplicar JSX/CSS entre componentes, veja se vale a
   pena extrair um componente ou hook compartilhado. Mas não extraia abstração para um único
   uso "porque pode precisar no futuro" — três linhas repetidas duas vezes é melhor que uma
   abstração prematura mal ajustada.
5. **Nomenclatura e clareza** — nomes de componentes, hooks, props e classes CSS consistentes
   com o restante do projeto (ver seção acima). Prefira nomes que dizem o que a coisa é, não
   comentários explicando o que ela faz.
6. **Não fazer mais do que foi pedido** — um ajuste pontual não precisa virar refatoração do
   arquivo inteiro. Se notar um problema real fora do escopo (ex. bug de acessibilidade em outro
   componente), mencione ao usuário em vez de mexer silenciosamente em código não relacionado.

## Ao revisar ou sugerir melhorias em código existente

Quando o pedido for "revisa isso" ou "isso tá bom?", dê um retorno direto como um sênior faria
em PR review: aponte o que é bug real ou risco (acessibilidade quebrada, memory leak de
animação, layout que quebra em mobile) separado do que é estilo/preferência. Não reescreva tudo
sem necessidade — sugira o ajuste mínimo que resolve o problema apontado.
