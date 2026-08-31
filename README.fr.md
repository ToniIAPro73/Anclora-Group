<!-- markdownlint-disable MD001 MD013 MD033 MD041 MD060 -->

<div align="center">

<img src="./public/brand/anclora-group.png" alt="Anclora Group" width="132" />

# Anclora Group

### Portail corporatif central de l'écosystème Anclora

Portail interne intégrant l'architecture, la gouvernance et la documentation de toute la famille de produits Anclora. Conçu comme dépôt de référence pour la navigation, le contrôle qualité et la traçabilité opérationnelle.

[Español](./README.md) · [English](./README.en.md) · [Deutsch](./README.de.md) · **Français**

<br />

![Anclora](https://img.shields.io/badge/Anclora-ecosystem-111827)
![Catégorie](https://img.shields.io/badge/catégorie-Entité%20Matrice-A8AEB8)
![Langues](https://img.shields.io/badge/langue%20produit-espagnol-047857)

</div>

---

> [!IMPORTANT]
> Dépôt corporatif interne. Décrit l'architecture et la gouvernance de l'écosystème Anclora ; n'expose pas de données opérationnelles, d'identifiants ni de logique sensible en dehors des canaux autorisés.

## Ce que c'est

Anclora Group est le portail central de l'entreprise Anclora, agissant comme point de convergence pour la documentation produit, les standards de marque et la gouvernance technique. Il sert de source unique de vérité (SSOT) pour l'architecture, la traçabilité et le contrôle qualité de l'écosystème.

## Catégorie dans l'écosystème

| Champ | Valeur |
|---|---|
| Catégorie | Entité Matrice |
| Accent de marque | `#A8AEB8` |
| Typographie | Georgia / Serif |
| Dépôt canonique | `anclora-group` |

## Fonctionnalités principales

- Portail intégré de documentation et de gouvernance corporative
- Navigation centralisée de la famille de produits Anclora
- Sections du portail : workspace (`/workspace`), catalogue d'apps (`/apps`), carte d'architecture (`/architecture`) et documentation authentifiée (`/docs`)
- Génération automatique de documentation PDF (architecture, politiques)
- Gestion des standards de marque et des contrats visuels
- Traçabilité et audit des changements opérationnels

## Stack technologique

| Domaine | Technologie |
|---|---|
| Framework | Next.js 16 |
| Frontend | React 19, TypeScript |
| Utilitaires | lucide-react, pdf-lib, sharp |
| Tests | TSX |
| Linting | ESLint 9 |

## Démarrage local

```bash
npm install
npm run dev
```

Serveur local : `http://localhost:3000`

## Langues prises en charge

L'interface du produit est actuellement disponible uniquement en espagnol. L'infrastructure de localisation existe (`es`, `en`, `de`, `fr` dans `src/lib/group-ui.ts`), mais les messages `en/de/fr` sont des alias de l'espagnol et l'i18n réel est une phase future. Cette documentation est maintenue en espagnol, anglais, allemand et français.

## Documentation et gouvernance

- Contrats de marque et de gouvernance : [`contracts/`](./contracts/) et [`docs/standards/`](./docs/standards/)
- Guides internes et utilisateur : [`docs/claude-code/`](./docs/claude-code/)

---

<div align="center">

### Anclora Group

Usage interne. Portail de gouvernance corporative de l'écosystème Anclora.

</div>
