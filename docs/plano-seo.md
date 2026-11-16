# Plano de SEO e performance — vicenterijo.com.br

Documento de trabalho. Cada fase é um commit independente, com verificação própria e
medida antes/depois. O que já foi executado está em "Status de execução".

---

## Status de execução

| Fase | Estado | Medido |
|---|---|---|
| 0 Ambiente | **feito** | `basePath` removido; canonical local agora `https://vicenterijo.com.br/` |
| 1 Imagens | **feito** | 44 originais (63,1 MB) → 133 variantes WebP (9,3 MB); home referencia 83 arquivos; maior servido 321 KB (hero 1020 px) |
| 2 Core Web Vitals | **feito (código)** | Home 2,66 s → **2,00 s** de LCP mobile (mediana, Playwright + CDP); CLS 0; 2 preloads de imagem → 1; logo 77 KB → 20 KB |
| 3 Indexação | **feito (código)** | `robots.txt` e `sitemap.xml` gerados no build e servindo 200; 3 URLs com barra final; Search Console pendente (ação humana) |
| 4 Dados estruturados | **feito (código)** | `School` em todas as páginas; `FAQPage` na home e em `/apmf/`; `BreadcrumbList` em `/apmf/` e `/contato/`; 2–3 blocos por página, todos JSON válido |
| 5 On-page local | **feito (código)** | 3 titles com nome da escola e cidade; `canonical` e `og:url` próprios por rota; H1 único; `check:seo` sem erro |
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
| JSON-LD (dados estruturados) | **ausente** ❌ → `School` + `FAQPage` + `BreadcrumbList` no build ✅ |

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

**Feito.** Primeiro achado, que muda a leitura do problema: **o elemento de LCP da home
não é o hero, é o `<h1>`**. O gradiente escuro (`from-navy-950/85` … `to-navy-950/95`)
cobre a foto e o Chrome descarta a imagem como candidata — ela conta só como disputa de
banda. As ações abaixo atacaram exatamente isso.

| Mudança | Arquivo | Efeito |
|---|---|---|
| Removido o preload do 1º slide do carrossel (fica `lazy`, como os outros 14) | `InfraCarousel.tsx` | −104 KB em prioridade alta antes da dobra |
| Variantes 96 e 192 px para imagens de origem < 600 px; logo do header e do rodapé passam a pedir 96/192 em vez de 480 | `scripts/optimize-images.mjs`, `image-variants.json` | logo 77 KB → 20 KB |
| `fetchPriority="high"` + `sizes="100vw"` explícito no hero | `Hero.tsx` | fecha o item `priorityHinted` do Lighthouse |
| Foto do hero trocada pela versão 1020×1541 (era 676×1020); variante 676 órfã removida | `../originais-vicente-rijo/hero/fachada.webp`, `public/img/opt/hero` | nitidez no desktop sem custo de LCP (medido) |

**Medição.** PageSpeed Insights por API devolveu 429 (sem chave, cota anônima) e o modo
`simulate` do Lighthouse ficou inconsistente nesta página (LCP simulado de 5,6 s contra
imagem baixada em 52 ms). Protocolo adotado: **Chromium via Playwright + CDP**, viewport
412×823, DPR 2,625, rede 1,6 Mbps / 150 ms de RTT, CPU 4× mais lenta — mesmos parâmetros
do perfil mobile do Lighthouse — com `PerformanceObserver` para LCP e CLS.

| Rota | LCP antes (produção) | LCP depois (build novo) | CLS | Elemento de LCP |
|---|---|---|---|---|
| `/` | 2,47 / 2,66 s | **1,76 / 2,00 / 2,16 s** | 0 | `<h1>` |
| `/apmf/` | 0,9 s (LH) | 1,48 / 1,78 s | 0 | parágrafo de abertura |
| `/contato/` | 0,9 s (LH) | 1,26 / 2,05 s | 0 | parágrafo de abertura |

O "depois" foi medido em `localhost` (TTFB 152 ms contra ~250 ms da produção), então o
número pós-deploy deve ficar alguns décimos acima. **Falta:** rodar o PSI oficial depois
do redeploy — precisa de chave de API ou da interface web.

**Conferido e já correto:** `sizes` de todas as imagens bate com o grid real (hero `100vw`,
cards `100vw / 50vw / 33vw`, conquistas `100vw / 33vw`); auditoria `unsized-images` vazia;
CLS 0 nas três rotas.

**Não feito de propósito:** preload de fonte, CSS crítico e code-splitting. Medido o
caminho: CSS bloqueante custa 742 ms e o `bootup-time` 2,6 s sob CPU 4×, mas o LCP já
fechou abaixo da meta. Fica para quando houver número de campo.

**Efeito colateral a observar:** a foto nova é mais clara e o parágrafo do hero
(`text-white/60`) fica sobre a fachada. Se a leitura incomodar, o ajuste é uma linha no
gradiente (`from-navy-950/85` → `/90`), não uma mudança de layout.

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

**Arquivos:** `src/lib/schema.ts` (novo), `src/components/seo/JsonLd.tsx` (novo),
`src/app/layout.tsx`, `src/app/page.tsx`, `src/app/apmf/page.tsx`, `src/app/contato/page.tsx`

**Feito:** `src/lib/schema.ts` expõe `schoolSchema()`, `faqSchema(items, pageUrl)` e
`breadcrumbSchema(items)`. Todo fato sai de `constants.ts` — nome, endereço, telefone,
Instagram, `foundingDate` e os nomes dos cursos não são reescritos no schema; só as
descrições curtas dos cursos são resumos editoriais. O telefone vira E.164
(`+554333237630`) a partir do mesmo `SCHOOL.phone` que a página exibe.

`School` entra no `layout.tsx` (vale para as 3 rotas, mesmo `@id`
`https://vicenterijo.com.br/#school`); `FAQPage` na home (4 perguntas de `MATRICULAS_FAQ`)
e em `/apmf/` (4 de `APMF_FAQ`); `BreadcrumbList` em `/apmf/` e `/contato/`.
`JsonLd` escapa `<` como `\u003c` para o conteúdo nunca fechar a tag `<script>`.

Medido no build: home 2 blocos, `/apmf/` 3, `/contato/` 2 — todos parseáveis por
`JSON.parse`, acentuação UTF-8 correta, zero `U+FFFD`. Verificação automatizada:
`npm run check:jsonld` (lê o `out/` e valida cada bloco).

**Falta (ação humana):** validar no Rich Results Test e no Schema.org Validator depois do
redeploy. O `FAQPage` só rende rich result em sites de governo/saúde, o que é o caso de
uma escola pública estadual — mas o resultado depende do Google.

**Verificação:** `npm run check:jsonld` sem erro; Rich Results Test apontando `School` e
`FAQPage` sem itens críticos.

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

**Feito:** titles e descriptions próprios por rota, com o nome da escola e a cidade onde
cabe:

| Rota | Title | Caracteres |
|---|---|---|
| `/` | `Colégio Estadual Vicente Rijo — Ensino Médio e Técnico em Londrina` | 66 |
| `/apmf/` | `APMF do Vicente Rijo — contribua e veja a prestação de contas` | 61 |
| `/contato/` | `Contato e matrículas — Colégio Vicente Rijo, Londrina` | 54 |

`src/lib/seo.ts` centraliza `pageMetadata({ title, description, path })`, que devolve
`title`, `description`, `alternates.canonical` e o `openGraph` completo. O motivo é um bug
que estava passando: o Next substitui `openGraph` inteiro quando a rota define o seu, então
`/apmf/` e `/contato/` herdavam o `og:url` da home. Agora cada rota tem canonical e
`og:url` próprios — conferido com `npm run check:seo`.

H1 único nas três páginas: home (`Hero`), `/apmf/` ("O Vicente Rijo é forte porque a
comunidade participa") e `/contato/` ("Contato e matrículas"). Hierarquia `h1 → h2 → h3`
sem salto.

Pedidos fora do plano, feitos na mesma rodada:

- Link "Site completo" removido do rodapé — apontava para a própria home.
- Imagens dos modais "Saiba mais" das modalidades apontavam para `/img/images/*`, pasta
  que não existe mais em `public/` desde que os originais saíram do repositório. Eram 404
  em qualquer tela; no celular o modal ficava só com o gradiente. O `Modal` agora resolve
  o caminho pelo `imageLoader`, que devolve a variante WebP já gerada.
- `scripts/optimize-images.mjs`: `esportes.jpg` e `esportes.webp` têm o mesmo nome e
  geravam a mesma variante — o último a rodar vencia, então os bytes mudavam a cada build
  e o conteúdo dependia da ordem do sistema de arquivos. Agora vence o original de maior
  largura, de forma determinística.
- `InfraCarousel`: os 15 slides passaram a ter título e subtítulo próprios, descrevendo o
  que a foto mostra (estrutura esportiva, laboratórios, formaturas, eventos). O overlay
  antes existia em 1 slide só. Enquadramento `4/3` no celular e `21/9` a partir de `sm`,
  porque `21/9` em tela estreita cortava quase toda a foto. Commit `9704efb`.

**Aberto:** o item 5 (`/matriculas/` como página própria) segue sem decisão. O texto do
overlay do carrossel só entra no HTML estático para o slide atual (é client-side), então
não conta como conteúdo indexável — se isso importar, o caminho é listar as legendas
também em texto visível abaixo do carrossel.

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
| LCP mobile | 2,66 s | **< 2,5 s** (build novo: 2,00 s) ✅ |
| CLS | 0 | **< 0,1** ✅ |
| `robots.txt` / `sitemap.xml` | 404 | **200** ✅ (build local) |
| Páginas com JSON-LD | 0 | **3** |

---

## Riscos e pontos abertos

1. **Espelho do GitHub Pages** — resolvido: Pages encerrado, produção única no Coolify.
2. **Repo com 63 MB de origem** — resolvido: os originais saíram do repositório e ficam em
   `../originais-vicente-rijo/` (local-only, fora do git). As variantes geradas em
   `public/img/opt/` (9,3 MB) são versionadas, então clone e build no Coolify funcionam sem
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
