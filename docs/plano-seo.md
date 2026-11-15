# Plano de SEO e performance — vicenterijo.com.br

Documento de trabalho. Cada fase é um commit independente, com verificação própria e
medida antes/depois. O que já foi executado está em "Status de execução".

---

## Status de execução

| Fase | Estado | Medido |
|---|---|---|
| 0 Ambiente | **feito** | `basePath` removido; canonical local agora `https://vicenterijo.com.br/` |
| 1 Imagens | **feito** | 44 originais (63,1 MB) → 114 variantes WebP (8,7 MB); home referencia 83 arquivos; maior servido 329 KB |
| 2 Core Web Vitals | pendente | — |
| 3 Indexação | **feito (código)** | `robots.txt` e `sitemap.xml` gerados no build e servindo 200; 3 URLs com barra final; Search Console pendente (ação humana) |
| 4 Dados estruturados | pendente | — |
| 5 On-page local | pendente | — |
| 6 Busca por IA | pendente | — |
| 7 Medição | pendente | — |

Decisões tomadas: GitHub Pages **encerrado** (produção é o Coolify em vicenterijo.com.br);
domínio próprio mantido na raiz, sem subpasta.

Pipeline de imagens implementado: originais **fora do repo** (`../originais-vicente-rijo/`,
local-only), variantes geradas no prebuild em `public/img/opt/` (480/960/1600 px + largura
nativa quando menor) e **versionadas**, servidas por `next/image` com loader customizado
(`src/lib/image-loader.ts`).

---

## 0. Baseline medido (não estimado)

Medições feitas em 15/11/2026 contra a produção.

### Produção real

| Item | Valor |
|---|---|
| URL | `https://vicenterijo.com.br/` (raiz, sem basePath) |
| Servidor | `nginx/1.31.8` servindo export estático (`output: "export"`) |
| Canonical | `https://vicenterijo.com.br/` ✅ correto |
| `og:url` / `og:image` | `https://vicenterijo.com.br/` / `/og.png` ✅ |
| `<title>` | `Colégio Estadual Vicente Rijo · 80 anos em Londrina` ✅ |
| `<h1>` na home | 1 ✅ |
| `robots.txt` | **404** ❌ → gerado no build ✅ |
| `sitemap.xml` | **404** ❌ → gerado no build ✅ |
| JSON-LD (dados estruturados) | **ausente** ❌ |

### Peso

| Ativo | Medida |
|---|---|
| Imagens referenciadas na home | 35 arquivos, **49,3 MB** se todas carregarem |
| Maior imagem | `carrossel/brincadeiras.png` — **3,28 MB** |
| `public/` total em imagens | **63,4 MB** (44 arquivos) |
| `carrossel/` | 34,6 MB (14 arquivos) |
| `images/` | 27,6 MB (25 arquivos) |
| JavaScript | 10 chunks, **672 KB** |

### Por que é lento hoje

`next.config.ts` tem `output: "export"` + `images: { unoptimized: true }`. Com export
estático não existe otimização em runtime: **cada PNG/JPG é servido no tamanho original
do arquivo**. Isso explica as duas queixas — carrega devagar e, ao abrir em nova aba, a
foto aparece em resolução gigante.

Como o nginx serve arquivos prontos, toda otimização tem de acontecer **no build**.

### O que já está certo

- LCP é `/img/hero/fachada.webp` com `priority` ✅
- `alt` descritivo na maioria das imagens ✅
- Metadata por rota (`/`, `/apmf/`, `/contato/`) com description única ✅
- `lang="pt-BR"`, viewport responsivo, fontes com `display: swap` ✅

### Landmine encontrada (resolvida)

`.env.production` apontava `NEXT_PUBLIC_BASE_PATH=/vicente-rijo` e
`NEXT_PUBLIC_SITE_URL=https://profbt.github.io`. Foi corrigido na Fase 0: `basePath` e
`withBasePath` removidos do código, `.env.production` só define `NEXT_PUBLIC_SITE_URL`.
O build local agora gera canonical para `https://vicenterijo.com.br/`.

---

## 1. Ordem de execução e por quê

```
Fase 0  Ambiente        (evita build com canonical errado)
Fase 1  Imagens         (maior ganho: 49 MB → ~2 MB)
Fase 2  Core Web Vitals (depende da Fase 1)
Fase 3  Indexação       (robots, sitemap, Search Console)
Fase 4  Dados estruturados
Fase 5  On-page local
Fase 6  Busca por IA
Fase 7  Medição e rotina
```

Fase 1 vem antes de SEO on-page porque imagem é o gargalo de experiência e de LCP —
ranquear melhor não adianta se a página demora 20 s para estabilizar.

---

## Fase 0 — Higiene de ambiente

**Problema:** o build local produz canonical para `profbt.github.io`.

**Ações**
1. `.env.production` passa a refletir a produção real: sem `NEXT_PUBLIC_BASE_PATH`,
   com `NEXT_PUBLIC_SITE_URL=https://vicenterijo.com.br`.
2. O espelho do GitHub Pages (`npm run deploy`) fica explicitamente separado: variáveis
   injetadas só nele, ou descontinuado. **Decisão sua.**
3. Atualizar o README com o fluxo real (repo → Coolify → redeploy).

**Arquivos:** `.env.production`, `package.json`, `README.md`

**Verificação:** `npm run build` → `out/index.html` contém
`<link rel="canonical" href="https://vicenterijo.com.br/">`.

---

## Fase 1 — Pipeline de imagens (maior ganho)

**Meta:** home sai de 49,3 MB potenciais para **menos de 2,5 MB** de imagem; nenhum
arquivo individual acima de **200 KB**; nenhuma variante maior que **2×** o tamanho em
que aparece na tela.

**Decisão já tomada:** originais saem de `public/` e vão para `src/assets/originais/`,
continuando versionados no repo. O que é publicado são só os derivados.

**Ações**
1. Mover os 44 arquivos de `public/img/images/**` para `src/assets/originais/`
   (mantendo a mesma árvore de nomes).
2. `scripts/optimize-images.mjs` (padrão do `generate-og.mjs`, que já usa `sharp`):
   para cada original, gerar AVIF + WebP em larguras `480 / 960 / 1600`, nunca
   ultrapassando a largura original, com cache por `mtime` para não reencodar a cada
   build. Saída em `public/img/opt/`.
3. Componente `src/components/ui/Photo.tsx`: recebe `src` lógico
   (ex.: `/img/images/ensino.png`), deriva os caminhos otimizados e renderiza
   `<picture>` com `srcset`/`sizes`, `width`/`height` explícitos e `loading="lazy"`
   por padrão (`priority` para o hero).
4. Substituir os usos de `next/image` e dos `<img>` crus por `Photo`.
5. **Guarda de build:** se uma imagem referenciada não tiver derivado gerado, o build
   falha. Sem isso, o primeiro erro é um 404 em produção.
6. `og.png` (287 KB) e ícones entram no pipeline.

**Arquivos:** `scripts/optimize-images.mjs` (novo), `src/components/ui/Photo.tsx` (novo),
`package.json`, `next.config.ts`, `src/components/sections/*`, `src/lib/constants.ts`

**Verificação**
- Soma de bytes das imagens da home, antes vs depois (medido, não estimado)
- `Get-ChildItem public/img/opt -Recurse | Measure-Object Length -Sum`
- Nenhuma referência a `.png`/`.jpg` de 2 MB no HTML gerado
- Abrir uma imagem em nova aba e conferir que ela tem a largura de exibição, não 3000 px

---

## Fase 2 — Core Web Vitals

**Ações**
1. `preload` do hero com `imagesrcset` correspondente ao `sizes` real.
2. Conferir `sizes` de cada imagem — valor errado faz o navegador baixar a maior variante.
3. `width`/`height` em tudo (evita CLS).
4. Medir LCP/CLS/INP antes e depois com PageSpeed Insights (mobile).
5. Só depois avaliar `preload` de fontes e redução de CSS crítico — hoje as fontes já
   usam `next/font` com `display: swap`.

**Meta:** LCP < 2,5 s no mobile (4G simulado), CLS < 0,1.

**Referência usada:** skill `core-web-vitals` (`references/LCP.md`) — medir a subparte
do LCP antes de otimizar, não aplicar receita genérica.

---

## Fase 3 — Indexação

**Ações**
1. `src/app/robots.ts` → gera `/robots.txt` no build, com `Allow: /` e a linha
   `Sitemap: https://vicenterijo.com.br/sitemap.xml`.
2. `src/app/sitemap.ts` → gera `/sitemap.xml` com as 3 rotas, `lastmod` real.
3. Search Console: verificar por **DNS TXT** (domínio próprio permite); enviar o sitemap.
4. `404.html`: página estilizada em `src/app/not-found.tsx` (noindex, canonical para a raiz,
   atalhos para as seções). **Ponto de deploy:** o repo não tem `Dockerfile` nem `nginx.conf`,
   então quem precisa servir `out/404.html` com status 404 é o Coolify. Conferir depois do
   redeploy — se o servidor devolver 200 no HTML de erro, o Google indexa uma página fantasma.
5. Conferir `trailingSlash: true` → todas as URLs canônicas terminam com `/` e batem com
   o sitemap.

**Arquivos:** `src/app/robots.ts`, `src/app/sitemap.ts`, `src/lib/site.ts` (novos)

**Feito:** `robots.ts` e `sitemap.ts` com `export const dynamic = "force-static"` (obrigatório
com `output: "export"` — sem isso o build falha em "collecting page data"). Ambos leem
`SITE_URL` de `src/lib/site.ts`, que também alimenta `metadataBase` no `layout.tsx`.
Verificado no build: `/robots.txt` 105 B, `/sitemap.xml` 581 B, os 3 `canonical` com barra
final e batendo com o sitemap.

**Falta (ação humana):** verificar o domínio no Search Console por DNS TXT e enviar o sitemap.

**Verificação:** `curl https://vicenterijo.com.br/robots.txt` e `/sitemap.xml` retornando
200 após o redeploy no Coolify; Search Console sem erro de cobertura.

---

## Fase 4 — Dados estruturados

**Ações**
1. JSON-LD `School` (subtipo de `EducationalOrganization`), no `layout.tsx`, com dados
   que já existem em `constants.ts`: nome, URL, logo, endereço
   (Av. Juscelino Kubitscheck, 2372 — Boa Vista, Londrina-PR, 86020-000), telefone
   `+55 43 3323-7630`, e-mail institucional, `sameAs` do Instagram, `foundingDate` 1946.
2. `FAQPage` gerado a partir de `MATRICULAS_FAQ` — fonte única, sem duplicar texto.
3. `BreadcrumbList` em `/apmf/` e `/contato/`.
4. Validar no Rich Results Test e no Schema.org Validator.

**Regra da skill `seo`:** só descrever conteúdo visível na página. Nada de markup para
"ganhar" rich result que a página não mostra.

**Arquivos:** `src/components/seo/SchoolJsonLd.tsx` (novo) ou inline no `layout.tsx`,
`src/lib/constants.ts`

---

## Fase 5 — On-page e intenção local

**Hoje**
- `/apmf/` → title `APMF – Participe` (sem "Vicente Rijo", sem "Londrina")
- `/contato/` → title `Contato` (idem)

**Ações**
1. Titles com intenção de busca local, mantendo o nome da escola:
   - `/` → `Colégio Estadual Vicente Rijo — Ensino Médio, Técnico e Fundamental Integral em Londrina`
   - `/apmf/` → `APMF do Colégio Estadual Vicente Rijo — contribua e veja a prestação de contas`
   - `/contato/` → `Contato e matrículas — Colégio Estadual Vicente Rijo, Londrina-PR`
2. Descriptions únicas por rota, ~150–160 caracteres (proxy de lint, não regra rígida).
3. Conferir H1 único e hierarquia de headings em `/apmf/` e `/contato/`.
4. Links internos com texto descritivo (não "clique aqui").
5. **Oportunidade:** página própria `/matriculas/` com o passo a passo, documentos e FAQ.
   Hoje tudo isso vive dentro da home, competindo com a própria home pela query
   "matrícula colégio estadual Londrina". **Decisão sua.**

**Arquivos:** `src/app/layout.tsx`, `src/app/apmf/page.tsx`, `src/app/contato/page.tsx`,
opcionalmente `src/app/matriculas/page.tsx` (novo)

---

## Fase 6 — Busca por IA (AEO/GEO)

Estrutura da skill `ai-seo`: **estrutura, autoridade, presença**.

**Estrutura (extraível)**
- Cada seção responde uma pergunta em 1–2 frases logo no início, antes do texto longo.
- FAQ de matrícula em formato pergunta/resposta direto (já existe, só precisa ser
  citável: resposta completa, sem "veja acima").
- Tabelas para dados comparáveis (cursos × turnos × duração), que motores de resposta
  citam bem.

**Autoridade (citável)**
- NAP consistente: nome, endereço e telefone idênticos em site, JSON-LD, Instagram e
  Google Business Profile.
- Fatos concretos e datados: fundação em 1946, 80 anos, cursos ofertados, turnos,
  horário de atendimento.
- `sameAs` ligando site, Instagram oficial e página da SEED-PR.

**Presença (onde a IA procura)**
- `robots.txt` liberando explicitamente os crawlers de busca por IA documentados
  (`OAI-SearchBot`, `PerplexityBot`, `Claude-SearchBot`) — bloquear derruba a citação.
- `llms.txt`: **opcional e experimental**, não é padrão entre fornecedores nem fator de
  ranking. Incluo só se você pedir; o ganho real vem de estrutura, dados e autoridade.
- Google Business Profile da escola atualizado (fonte primária de respostas locais).

**Monitoramento sem ferramenta paga:** rodar manualmente as 5 principais perguntas
("melhor colégio estadual em Londrina", "curso técnico de administração Londrina",
"escola com ensino médio integral Londrina"…) no ChatGPT, Perplexity e Google AI
Overviews e registrar se o site é citado. Repetir a cada 2 meses.

---

## Fase 7 — Medição e rotina

1. Tabela antes/depois por fase: peso de imagens, LCP, CLS, nº de páginas indexadas.
2. PageSpeed Insights mobile na home, `/apmf/` e `/contato/` após cada fase.
3. Search Console: cobertura, consultas, CTR por página.
4. Rotina pós-deploy (checklist curto): sitemap responde 200, imagens novas entraram no
   pipeline, nenhum 404 novo, canonical correto.

---

## Metas numéricas

| Métrica | Hoje | Meta |
|---|---|---|
| Imagens na home (peso) | 49,3 MB | **< 2,5 MB** |
| Maior imagem servida | 3,28 MB | **< 200 KB** |
| `public/` em imagens | 63,4 MB | publicação **< 8 MB** |
| LCP mobile | não medido | **< 2,5 s** |
| CLS | não medido | **< 0,1** |
| `robots.txt` / `sitemap.xml` | 404 | **200** ✅ (build local) |
| Páginas com JSON-LD | 0 | **3** |

---

## Riscos e pontos abertos

1. **Espelho do GitHub Pages** — resolvido: Pages encerrado, produção única no Coolify.
2. **Repo com 63 MB de origem** — resolvido: os originais saíram do repositório e ficam em
   `../originais-vicente-rijo/` (local-only, fora do git). As variantes geradas em
   `public/img/opt/` (8,6 MB) são versionadas, então clone e build no Coolify funcionam sem
   os originais. `scripts/optimize-images.mjs` e `generate-og.mjs` detectam a ausência da
   pasta e reaproveitam o que está versionado; o `ORIGINALS_DIR` aponta para outro caminho
   quando precisar regenerar. O histórico do git ainda guarda os 63 MB antigos — só um
   `filter-repo`/LFS resolveria, e não é urgente.
3. **Tempo de build** — codificar 44 imagens em AVIF+WebP pode levar minutos. Mitigado
   por cache por `mtime`; no CI, cache entre builds.
4. **Conteúdo institucional** — não vou inventar número de alunos, nota do IDEB ou
   duração de curso. Dados de JSON-LD e de FAQ só com fonte: o que já está em
   `constants.ts` ou o que você confirmar.
5. **Resultado de índice e ranking não é imediato** — Google leva dias a semanas para
   reprocessar. Métrica confiável vem do Search Console, não de busca manual.
