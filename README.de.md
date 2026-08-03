<!-- markdownlint-disable MD001 MD013 MD033 MD041 MD060 -->

<div align="center">

<img src="./public/brand/anclora-group.png" alt="Anclora Group" width="132" />

# Anclora Group

### Zentrales Unternehmensportal des Anclora-Ökosystems

Internes Portal, das Architektur, Governance und Dokumentation der gesamten Anclora-Produktfamilie integriert. Konzipiert als Referenz-Repository für Navigation, Qualitätskontrolle und operative Nachvollziehbarkeit.

[Español](./README.md) · [English](./README.en.md) · **Deutsch** · [Français](./README.fr.md)

<br />

![Anclora](https://img.shields.io/badge/Anclora-ecosystem-111827)
![Kategorie](https://img.shields.io/badge/kategorie-Matrix--Entit%C3%A4t-A8AEB8)
![Sprachen](https://img.shields.io/badge/produktsprachen-4-047857)

</div>

---

> [!IMPORTANT]
> Internes Unternehmens-Repository. Dokumentiert Architektur und Governance des Anclora-Ökosystems; keine operativen Daten, Zugangsdaten oder sensible Logik außerhalb autorisierter Kanäle offenlegen.

## Was es ist

Anclora Group ist das zentrale Portal von Anclora, das als Konvergenzpunkt für Produktdokumentation, Markenstandards und technische Governance fungiert. Es dient als einzige Quelle der Wahrheit (SSOT) für Architektur, Nachvollziehbarkeit und Qualitätskontrolle im gesamten Ökosystem.

## Kategorie im Ökosystem

| Feld | Wert |
|---|---|
| Kategorie | Matrix-Entität |
| Markenakzent | `#A8AEB8` |
| Typografie | Georgia / Serif |
| Kanonisches Repository | `anclora-group` |

## Kernfunktionen

- Integriertes Portal für Unternehmensdokumentation und Governance
- Zentralisierte Navigation durch die Anclora-Produktfamilie
- Automatische PDF-Generierung (Architektur, Richtlinien)
- Verwaltung von Markenstandards und visuellen Verträgen
- Nachvollziehbarkeit und Audit operativer Änderungen

## Technologie-Stack

| Bereich | Technologie |
|---|---|
| Framework | Next.js 16 |
| Frontend | React 19, TypeScript |
| Hilfsmittel | lucide-react, pdf-lib, sharp |
| Tests | TSX |
| Linting | ESLint 9 |

## Lokaler Start

```bash
npm install
npm run dev
```

Lokaler Server: `http://localhost:3000`

## Unterstützte Sprachen

Das Produkt unterstützt in der Produktion 4 Sprachen: Español (Standard), English, Deutsch, Français (`SUPPORTED_LOCALES`, `src/lib/group-ui.ts`). Diese Dokumentation wird in allen 4 Produktsprachen gepflegt.

## Dokumentation und Governance

- Marken- und Governance-Verträge: [`docs/standards/`](./docs/standards/)
- Anclora Vault (Quelle der Wahrheit): `contracts/` und `docs/governance/`

---

<div align="center">

### Anclora Group

Interne Nutzung. Unternehmens-Governance-Portal des Anclora-Ökosystems.

</div>
