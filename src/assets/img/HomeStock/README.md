# HomeStock

**Escaneou o cupom, a despensa da casa está atualizada.**

HomeStock (antigo Stockflow) é um app de controle de estoque doméstico. A pessoa lê o QR Code da
NFC-e do mercado, confere os itens e eles entram na despensa. Quando algo é usado ou acaba, vai
sozinho para a lista de compras, que é compartilhada com quem mora na mesma casa.


## Sumário

- [A ideia](#a-ideia)
- [Escopo](#escopo)
- [Arquitetura](#arquitetura)
- [Stack](#stack)
- [Repositórios](#repositórios)
- [Como rodar a API localmente](#como-rodar-a-api-localmente)
- [Deploy mínimo](#deploy-mínimo)
- [Situação atual](#situação-atual)
- [Roadmap](#roadmap)
- [Documentos do projeto](#documentos-do-projeto)

---

## A ideia

Ninguém quer digitar a compra item por item. Como todo cupom fiscal de consumidor (NFC-e) tem um QR
Code público, dá para alimentar a despensa automaticamente, sem integração paga.

O app fecha o ciclo da compra:

```
Comprar → Escanear cupom → Despensa → Usar / Descartar → Acabando → Lista de compras → Comprar
```

Quando a próxima nota é lida, os itens da lista que vieram nela são riscados sozinhos.

### O diferencial: a despensa é da casa, não da pessoa

Apps que leem NFC-e para pessoa física já existem, mas nenhum compartilha a despensa. Apps de lista
de compras compartilham, mas não têm estoque nem leitura de nota. O HomeStock junta as duas coisas:

- Convite por link ou código (no WhatsApp); quem entra vê a mesma despensa na hora.
- Cada movimento mostra quem fez ("Ana usou o último leite", "Pedro escaneou a nota do Assaí").
- Lista de compras compartilhada, para duas pessoas não comprarem a mesma coisa.

---

## Escopo

O produto é **só para casa**. Tudo que era voltado a empresa saiu do escopo.

### v1 (MVP)

| Etapa | O que entra |
|---|---|
| Conta | Cadastro e login por e-mail e senha (sem CNPJ), uma casa por conta, convite para outra pessoa entrar na mesma despensa |
| Entrada | Ler o QR da NFC-e (câmera, URL ou chave), **revisar os itens** (renomear, juntar com produto existente, ignorar, ajustar quantidade) e confirmar. Cadastro manual por código de barras ou nome |
| Despensa | Lista por categoria, quantidade, mínimo e selo "Acabando" |
| Uso | Botões "Usei" (1 toque) e "Descartei", com o nome de quem fez |
| Reposição | Lista de compras automática com o que está abaixo do mínimo, mais itens manuais |
| Painel | Acabando, notas para revisar, gasto do mês |

O MVP está pronto quando **uma casa consegue usar o app por duas semanas sem ajuda**.

### Fora do escopo (decidido)

Empresa/CNPJ, NF-e modelo 55, fornecedores, pedido de compra, venda, margem, custo médio, valor de
estoque, relatórios e exportação, papéis e permissões, várias casas por conta, comparação de preço
entre mercados e receitas.

---

## Arquitetura

Uma API central e dois clientes que conversam com ela por HTTPS, autenticados com JWT.

```
 App mobile (Flutter) ──┐
                        ├── HTTPS + JWT ──▶  API Spring Boot  ──▶  PostgreSQL
 Painel web (React) ────┘                         │
                                                  └──▶ Portais NFC-e da SEFAZ (leitura do cupom)
```

### Como a API está organizada hoje

Código em `com.stockflow`, separado por camada técnica: `controller`, `service`, `usecase`,
`repository`, `domain`, `mapper`, `security`, `tenant`, `config` e `fiscal` (leitura da NFC-e:
`parser`, `provider`, `service`).

- **Multi-tenant:** cada casa é um `tenant_id`, presente em todas as tabelas e extraído do JWT. O
  cliente nunca informa de qual casa é o pedido.
- **Fluxo da nota em duas etapas:** ler o QR (nota fica `FETCHED`) e depois confirmar, o que gera as
  entradas no estoque, ou rejeitar.
- **Movimentações** guardam saldo antes e depois, para ter histórico.

### Para onde a arquitetura deve ir (proposta, aguardando decisão)

A recomendação é **manter uma API só, reorganizada como monolito modular**: separar o código por
assunto em vez de por camada técnica.

| Módulo | Responsabilidade |
|---|---|
| `identidade` | Conta, login, tokens, casa e convites |
| `despensa` | Produtos, quantidades, mínimo, "Usei" e "Descartei" |
| `notas` | Leitura da NFC-e, revisão e confirmação |
| `compras` | Lista de compras |
| `painel` | Números do painel inicial |
| `comum` | Erros, configuração, utilitários |

As fronteiras entre módulos seriam conferidas por teste (ArchUnit ou Spring Modulith), e o OpenAPI
da API geraria os clientes do Flutter (Dart) e do React (TypeScript), para os três lados não
divergirem no contrato. Microsserviços e Supabase/Firebase foram descartados por enquanto.

---

## Stack

| Parte | Tecnologia |
|---|---|
| API | Java 21, Spring Boot 3.2, Spring Security com JWT (access + refresh), MapStruct |
| Banco | PostgreSQL 16, migrações com Flyway |
| Leitura da NFC-e | Busca da página pública da SEFAZ e parser de HTML |
| Documentação da API | springdoc (Swagger UI) |
| Observabilidade | Spring Actuator, correlation-id nos logs |
| App mobile | Flutter |
| Painel web | React |
| Infra | Docker, Docker Compose, Caddy (HTTPS automático) |

---

## Repositórios

| Repositório | Conteúdo |
|---|---|
| [`HenriqueCDS/Stockflow-API`](https://github.com/HenriqueCDS/Stockflow-API) | API Spring Boot (público) |
| `HenriqueCDS/Stockflow-mobile` | App mobile (privado) |
| `HenriqueCDS/Stockflow-web` | Painel web (privado) |

Os repositórios ainda usam o nome antigo, Stockflow.

---

## Como rodar a API localmente

Pré-requisitos: Docker e Docker Compose. Para rodar fora do Docker, Java 21 e Maven.

### Tudo no Docker

```bash
git clone https://github.com/HenriqueCDS/Stockflow-API.git
cd Stockflow-API
docker compose up -d --build
```

Isso sobe o PostgreSQL (porta `54329` no seu computador) e a API em `http://localhost:8080` com o
perfil `dev`.

### Só o banco no Docker, API pela IDE ou Maven

```bash
docker compose up -d postgres
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

A API já aponta por padrão para `jdbc:postgresql://localhost:54329/stockflow` (usuário e senha
`stockflow`).

### Endereços úteis

| O quê | Endereço |
|---|---|
| Saúde da API | http://localhost:8080/actuator/health |
| Swagger UI | http://localhost:8080/swagger-ui.html |
| OpenAPI (JSON) | http://localhost:8080/v3/api-docs |

### Testes

```bash
mvn test
```

Os testes de integração usam Testcontainers e são pulados se o Docker não estiver disponível.

### Variáveis de ambiente

| Variável | Para quê |
|---|---|
| `DB_URL`, `DB_USERNAME`, `DB_PASSWORD` | Conexão com o PostgreSQL |
| `JWT_SECRET` | Chave de assinatura dos tokens (em produção, obrigatória e longa) |
| `JWT_ACCESS_EXP_MS`, `JWT_REFRESH_EXP_MS` | Validade do access token e do refresh token |
| `SPRING_PROFILES_ACTIVE` | `dev` localmente |

> O `JWT_SECRET` do `docker-compose.yml` é só para desenvolvimento. Nunca use em produção.

---

## Deploy mínimo

Para dezenas de usuários, uma máquina basta:

```
Celular (app) ──HTTPS──▶ Caddy ──▶ API Spring Boot ──▶ PostgreSQL
                         (tudo no mesmo VPS, Docker Compose)
```

| Peça | Escolha |
|---|---|
| Servidor | 1 VPS em São Paulo com 2 GB de RAM (perto do usuário e da SEFAZ) |
| Containers | Caddy, API e Postgres com `docker-compose-prod.yml`; só o Caddy expõe portas |
| HTTPS | Certificado automático do Caddy, com domínio apontando para o VPS |
| Deploy | Manual no começo: `git pull && docker compose -f docker-compose-prod.yml up -d --build` |
| Backup | Dump diário do Postgres enviado ao Cloudflare R2 ou Backblaze B2, guardado por 14 dias |
| Monitoramento | UptimeRobot em `/actuator/health` |
| Segredos | Arquivo `.env` no servidor, fora do Git |

O painel web fica fora do MVP; quando entrar, vai para o Cloudflare Pages. Mais adiante, o deploy da
API passa a ser feito por GitHub Actions (imagem no `ghcr.io` e atualização no VPS por SSH).

### App mobile

O app não é publicado num servidor: ele roda no celular de cada pessoa e conversa com a API.

- **Testes:** comece por Android, com APK direto ou teste interno do Google Play (US$ 25, uma vez).
  iPhone via TestFlight (US$ 99 por ano) quando houver testadores que precisem.
- **Compatibilidade:** nem todo mundo atualiza o app ao mesmo tempo. A API não deve renomear nem
  remover campos em uso; adicione os novos e aposente os antigos depois.
- **Segurança:** nenhum segredo vai dentro do app. Tokens ficam no armazenamento seguro do celular
  (Keychain no iOS, Keystore no Android).

---

## Situação atual

**Já funciona na API:** cadastro e login com refresh token, multi-tenant, CRUD de produtos com
filtro e paginação, estoque mínimo, movimentações com saldo antes e depois, fluxo de nota em duas
etapas, painel e Swagger.

**O que falta para o MVP:**

1. **Ler cupom de verdade.** O parser de NFC-e ainda não lê o layout padrão dos portais da SEFAZ
   (`NfceHtmlParser`). Sem isso não existe produto. Precisa de páginas reais salvas como teste.
2. **Fechar o contrato e levar `feat/pivot-casa-v1` para a `main`.** A branch ainda usa nomes
   diferentes do contrato combinado (`USED` e `/company` em vez de `CONSUMPTION` e `/household`).
3. **Revisão antes de confirmar:** hoje os produtos são criados já na leitura da nota.
4. **Segurança mínima:** o filtro aceitar só token de acesso (hoje aceita o refresh token), CORS
   restrito ao domínio do painel, `JWT_SECRET` obrigatório e sem conta demo em produção.
5. **Travas de dados:** `UNIQUE (tenant_id, invoice_key)` para não gravar a mesma nota duas vezes e
   `@Version` no produto para dois "Usei" simultâneos não se sobrescreverem.
6. **App na mão de 5 a 10 casas** por 2 a 4 semanas.

### Como saber se o MVP deu certo

- Quantas casas leram pelo menos um cupom e confirmaram sem desistir na revisão.
- Quantos itens do cupom precisaram ser corrigidos à mão.
- Quantas voltaram na segunda semana e usaram "Usei" ao menos 3 vezes.

---

## Roadmap

**v1.1, logo depois do MVP**
- Validade opcional na revisão da nota e aviso "vence em 3 dias".
- Gasto por categoria no mês.
- Notificações push: lista de compras pronta, item vencendo.

**v2, quando houver uso real**
- Mínimo sugerido pelo consumo da casa.
- Normalização de nomes do cupom ("ARROZ TJ 5KG" → Arroz Tio João 5kg).
- Divisão de contas entre moradores (quem pagou cada nota e quanto cada um deve).
- Painel web publicado.
- Leitura da nota em segundo plano, quando a espera pela SEFAZ começar a travar a tela.

**Ideia futura, ainda em estudo**
- Um assistente (por exemplo, no WhatsApp) que diga "o que comprar esta semana". Não existe código
  dele hoje e a forma de integrá-lo à API ainda não foi decidida.

---

## Documentos do projeto

| Documento | Assunto |
|---|---|
| `analise/homestock-analise.md` | Análise da API comparada com os wireframes |
| `analise/escopo-casa.md` | Escopo doméstico, diferencial e riscos |
| `analise/mvp-e-deploy-minimo.md` | O que é o MVP e o deploy para poucos usuários |
| `deploy/como-funciona-deploy-mobile.md` | Como o app chega ao celular e usa a API |
| `deploy/stockflow-api-deploy.patch` | Arquivos de deploy e ajustes de produção para a API |
| `prompts/reduzir-escopo-casa.md` | Contrato da API para o escopo doméstico |
