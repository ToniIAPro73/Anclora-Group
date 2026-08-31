<!-- markdownlint-disable MD001 MD013 MD033 MD041 MD060 -->

<div align="center">

<img src="./public/brand/anclora-group.png" alt="Anclora Group" width="132" />

# Anclora Group

### Central corporate hub for the Anclora ecosystem

Internal portal integrating architecture, governance, and documentation across the entire Anclora product family. Designed as the reference repository for navigation, quality control, and operational traceability.

[Español](./README.md) · **English** · [Deutsch](./README.de.md) · [Français](./README.fr.md)

<br />

![Anclora](https://img.shields.io/badge/Anclora-ecosystem-111827)
![Category](https://img.shields.io/badge/category-Matrix%20Entity-A8AEB8)
![Languages](https://img.shields.io/badge/product%20language-Spanish-047857)

</div>

---

> [!IMPORTANT]
> Internal corporate repository. Documents ecosystem architecture and governance; does not expose operational data, credentials, or sensitive logic outside authorized channels.

## What is this

Anclora Group is the central hub of Anclora, functioning as the convergence point for product documentation, brand standards, and technical governance. It serves as the single source of truth (SSOT) for architecture, traceability, and quality control across the ecosystem.

## Ecosystem category

| Field | Value |
|---|---|
| Category | Matrix Entity |
| Brand accent | `#A8AEB8` |
| Typography | Georgia / Serif |
| Canonical repository | `anclora-group` |

## Key features

- Integrated corporate documentation and governance hub
- Centralized navigation across Anclora product family
- Portal sections: workspace (`/workspace`), app catalog (`/apps`), architecture map (`/architecture`), and authenticated documentation (`/docs`)
- Automatic PDF generation for architecture and policies
- Brand standard and visual contract management
- Operational change traceability and auditing

## Tech stack

| Area | Technology |
|---|---|
| Framework | Next.js 16 |
| Frontend | React 19, TypeScript |
| Utilities | lucide-react, pdf-lib, sharp |
| Testing | TSX |
| Linting | ESLint 9 |

## Local startup

```bash
npm install
npm run dev
```

Dev server: `http://127.0.0.1:3005` (authoritative port assigned to this repo on the VPS; override with `PORT`/`HOST`, e.g. `PORT=3100 npm run dev`). `npm run dev` is cross-platform (Linux/macOS/Windows) via `scripts/dev-safe.mjs`, which stops any previous `next dev` of this repo and clears the Turbopack lock before starting; on Windows it delegates to `scripts/dev-safe.ps1`.

Local production-mode validation (requires a prior build):

```bash
npm run build
npm start
```

`npm start` serves the production build (Next default port 3000, or `PORT` if set). It is not the development command.

## Supported languages

The product UI is currently available in Spanish only. The locale infrastructure exists (`es`, `en`, `de`, `fr` in `src/lib/group-ui.ts`), but the `en/de/fr` messages alias the Spanish ones and real i18n is a future phase. This documentation is maintained in Spanish, English, German, and French.

## Documentation and governance

- Brand contracts and governance: [`contracts/`](./contracts/) and [`docs/standards/`](./docs/standards/)
- Internal and user guides: [`docs/claude-code/`](./docs/claude-code/)

---

<div align="center">

### Anclora Group

Internal use. Corporate governance hub for the Anclora ecosystem.

</div>
