# ArtIux Lab

Biblioteca de componentes animados para React, feita para Next.js + Tailwind CSS + TypeScript. Modelo de uso: copie o código do componente e cole no seu projeto.

## O que é

Biblioteca de componentes em Next.js com documentação e demonstração com mais de 24 componentes — botões, selects, drawers, dialogs, formulários com animação, progress bars, calendário etc. Cada componente tem página própria em [src/app/components](src/app/components), com preview ao vivo e bloco de código pronto para copiar.

Duas pastas dos componentes coexistem hoje:

- [src/artiux/components](src/artiux/components) — componentes exportáveis prontos para serem utilizados em projetos.
- [src/app/components](src/app/components) — Componentes usados apenas na construção da UI do website artiux.dev

## Intenção

Inspirado no Shadcn e React-bits, o objetivo é ser uma biblioteca de componentes totalmente animados com GSAP, Motion, ripple, transições e etc; Sendo o foco principal em componentes básicos de UI's modernas.
O time apenas cola direto no projeto, mantendo consistência visual.

## Próximos passos

- Remover componentes soltos e testes, organizando também as pastas do repositório.
- Revisar api dos componentes garantindo devX.
- Realizar testes em diversos cenários e implantar testes automatizados para garantir manutenabilidade.
- Implementar instalação via CLI

## Rodando localmente

```bash
pnpm install
```

```bash
pnpm dev
```

Abre em [http://localhost:3000](http://localhost:3000). A lista de componentes fica em `/components`.

## Stack

Next.js 15 (Turbopack) · React 19 · Tailwind CSS 4 · TypeScript · Radix UI · GSAP · Motion · Three.js (`@react-three/fiber`) · Zustand · React Hook Form + Zod
