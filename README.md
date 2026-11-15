# Vicente Rijo Institutional Website

**A modern, responsive institutional website for the Vicente Rijo State School community in Londrina, Paraná, Brazil.**

[![Live Site](https://img.shields.io/badge/Live_Site-vicenterijo.com.br-22c55e?style=for-the-badge&logo=googlechrome&logoColor=white)](https://vicenterijo.com.br/)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

![Vicente Rijo institutional website preview](https://vicenterijo.com.br/og.png)

**English** | [Português](#português)

## Overview

This project is a public institutional website designed to organize school information, communicate services and activities, preserve institutional history, and improve access for students, families, staff, and the wider community.

The repository contains only public-facing website content. Credentials, internal systems, student records, and other sensitive school data must never be committed.

## Technology

- Next.js 16 with React 19.
- TypeScript.
- Tailwind CSS 4.
- React Icons.
- Static export served by nginx (production at vicenterijo.com.br).
- ESLint for code-quality checks.

## Run locally

Requires a recent Node.js version.

```bash
npm install
npm run dev
```

The development server runs on `http://localhost:3001`.

Production build:

```bash
npm run lint
npm run build
```

## Deployment

```bash
npm run build
```

The build generates the static site in `out/`, which is served by nginx at `https://vicenterijo.com.br/`.
Set `NEXT_PUBLIC_SITE_URL` when building for another origin.

## Images

Photos live **outside the repository**, in `../originais-vicente-rijo/` (local-only, ~63 MB),
and are never published as-is. The generated WebP variants in `public/img/opt/` **are**
committed, so a fresh clone builds without the originals. `npm run dev` and `npm run build`
run `scripts/optimize-images.mjs`, which regenerates the variants when the originals folder is
present and otherwise reuses the committed ones. Point `ORIGINALS_DIR` elsewhere to regenerate.
`next/image` resolves them through `src/lib/image-loader.ts`, so each photo is served at the
size it is displayed.

## Privacy

This repository is intended exclusively for public institutional communication. Do not add:

- Student names, registration numbers, grades, attendance, or personal records.
- Staff personal contact details unless publication is explicitly authorized.
- Credentials, tokens, internal URLs, or infrastructure details.
- Restricted documents or images without confirmed publication rights.

---

<a id="português"></a>

# Site Institucional Vicente Rijo

[English](#vicente-rijo-institutional-website) | **Português**

🌐 **Site:** [vicenterijo.com.br](https://vicenterijo.com.br/)

## Visão geral

Este projeto é o site institucional público do Colégio Estadual Vicente Rijo, em Londrina, Paraná. O site organiza informações escolares, comunica serviços e atividades, preserva a história da instituição e facilita o acesso da comunidade.

O repositório deve conter somente conteúdo destinado à publicação. Credenciais, sistemas internos, registros de estudantes e outros dados escolares sensíveis nunca devem ser adicionados.

## Tecnologias

- Next.js 16 com React 19.
- TypeScript.
- Tailwind CSS 4.
- React Icons.
- Exportação estática servida por nginx (produção em vicenterijo.com.br).
- ESLint para verificação de qualidade.

## Executar localmente

```bash
npm install
npm run dev
```

O servidor de desenvolvimento utiliza `http://localhost:3001`.

Build de produção:

```bash
npm run lint
npm run build
```

## Publicação

```bash
npm run build
```

O build gera a versão estática em `out/`, servida por nginx em `https://vicenterijo.com.br/`.
Defina `NEXT_PUBLIC_SITE_URL` ao construir para outra origem.

## Imagens

As fotos originais ficam **fora do repositório**, em `../originais-vicente-rijo/` (local-only,
~63 MB), e nunca são publicadas como estão. As variantes WebP geradas em `public/img/opt/`
**são versionadas**, então um clone limpo constrói sem os originais. `npm run dev` e
`npm run build` executam `scripts/optimize-images.mjs`, que regenera as variantes quando a
pasta de originais existe e, quando não existe, reaproveita as versionadas. Use `ORIGINALS_DIR`
para apontar para outro caminho. O `next/image` as resolve por `src/lib/image-loader.ts`, então
cada foto é servida no tamanho em que aparece na tela.

## Privacidade

Não devem ser publicados neste repositório:

- Nomes, CGMs, notas, frequência ou registros pessoais de estudantes.
- Contatos pessoais de servidores sem autorização expressa.
- Credenciais, tokens, endereços internos ou detalhes de infraestrutura.
- Documentos restritos ou imagens sem direito de publicação confirmado.
