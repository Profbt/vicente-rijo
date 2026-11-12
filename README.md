# Vicente Rijo Institutional Website

**A modern, responsive institutional website for the Vicente Rijo State School community in Londrina, Paraná, Brazil.**

[![Live Site](https://img.shields.io/badge/Live_Site-profbt.github.io%2Fvicente--rijo-22c55e?style=for-the-badge&logo=githubpages&logoColor=white)](https://profbt.github.io/vicente-rijo/)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

![Vicente Rijo institutional website preview](https://profbt.github.io/vicente-rijo/og.png)

**English** | [Português](#português)

## Overview

This project is a public institutional website designed to organize school information, communicate services and activities, preserve institutional history, and improve access for students, families, staff, and the wider community.

The repository contains only public-facing website content. Credentials, internal systems, student records, and other sensitive school data must never be committed.

## Technology

- Next.js 16 with React 19.
- TypeScript.
- Tailwind CSS 4.
- React Icons.
- Static export and GitHub Pages deployment.
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
npm run deploy
```

The deployment script builds the static site and publishes the generated `out/` directory through GitHub Pages.

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

🌐 **Site:** [profbt.github.io/vicente-rijo](https://profbt.github.io/vicente-rijo/)

## Visão geral

Este projeto é o site institucional público do Colégio Estadual Vicente Rijo, em Londrina, Paraná. O site organiza informações escolares, comunica serviços e atividades, preserva a história da instituição e facilita o acesso da comunidade.

O repositório deve conter somente conteúdo destinado à publicação. Credenciais, sistemas internos, registros de estudantes e outros dados escolares sensíveis nunca devem ser adicionados.

## Tecnologias

- Next.js 16 com React 19.
- TypeScript.
- Tailwind CSS 4.
- React Icons.
- Exportação estática e publicação no GitHub Pages.
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
npm run deploy
```

O comando gera a versão estática e publica a pasta `out/` no GitHub Pages.

## Privacidade

Não devem ser publicados neste repositório:

- Nomes, CGMs, notas, frequência ou registros pessoais de estudantes.
- Contatos pessoais de servidores sem autorização expressa.
- Credenciais, tokens, endereços internos ou detalhes de infraestrutura.
- Documentos restritos ou imagens sem direito de publicação confirmado.
