# ADR-001: Payment Mechanism — Stripe Connect for PSD2 Compliance

## Status

**Accepted** — Binding

## Date

2025-07-14

## Context

The Anclora Group PropTech ecosystem processes third-party payments through its EnergyScan application (energy certification services) and anticipates payment flows in Nexus for commercial transactions. European regulation PSD2 (Payment Services Directive 2) strictly governs how businesses can collect, hold, and route funds on behalf of third parties.

Two viable options were evaluated:

1. **Stripe Connect** — Delegate payment intermediation to a PSD2-licensed payment processor (Stripe), routing funds directly from payer to payee without Anclora holding funds.
2. **Manual Escrow** — Implement a licensed escrow arrangement where Anclora (or a contracted agent) holds funds temporarily under a PSD2 payment agent license.

### Key Constraints Identified

- Anclora Group S.L. does **not** hold a PSD2 payment services license and has no near-term plan to obtain one.
- EnergyScan already uses Stripe Connect for payment routing in production.
- Collecting client funds into Anclora operational accounts without PSD2-compliant intermediation constitutes an unauthorized payment service under EU law.
- The cost and regulatory burden of obtaining a payment agent license (Option 2) is disproportionate to current payment volumes.

### Regulatory References

- **PSD2** (Directive (EU) 2015/2366) — Articles 3, 5, 11: defines who may provide payment services and under what conditions.
- **Spanish transposition** (Real Decreto-ley 19/2018) — National implementation of PSD2.
- **Stripe Connect compliance model** — Stripe acts as the licensed payment institution; connected accounts receive funds directly.

## Decision

**Use Stripe Connect as the exclusive payment routing mechanism for all third-party payment flows in the Anclora ecosystem.**

Specifically:

1. All payments where Anclora facilitates a transaction between a client and a service provider SHALL be routed through Stripe Connect.
2. EnergyScan continues its existing Stripe Connect integration as the reference implementation.
3. Future payment flows in Nexus or other ecosystem applications SHALL follow the same Stripe Connect pattern.
4. No Anclora-controlled bank account SHALL receive client funds directly — funds flow from payer to payee via Stripe's licensed infrastructure.

## Binding Constraints

These constraints are **non-negotiable** and apply to all ecosystem repositories:

| ID   | Constraint                                                             | Rationale                                                        |
| ---- | ---------------------------------------------------------------------- | ---------------------------------------------------------------- |
| BC-1 | No direct collection of client funds into Anclora operational accounts | PSD2 Art. 5 — unauthorized payment services prohibition          |
| BC-2 | All third-party payments route through Stripe Connect                  | Delegates PSD2 compliance to licensed intermediary               |
| BC-3 | No holding of client funds in transit, even temporarily                | Eliminates need for safeguarding requirements under PSD2 Art. 10 |
| BC-4 | Payment flow changes require ADR amendment and legal review            | Prevents accidental regulatory breach                            |

## Consequences

### Positive

- **Regulatory compliance by delegation** — Stripe holds the necessary licenses; Anclora operates within the platform model without needing its own PSD2 authorization.
- **Reduced operational risk** — No safeguarding obligations, no client money accounting requirements, no FCA/BdE reporting for payment services.
- **Proven integration** — EnergyScan already validates this pattern in production.
- **Faster time-to-market** — No license application process (6–12 months) blocking payment features.

### Negative

- **Stripe dependency** — Payment routing is coupled to Stripe's platform availability and fee structure.
- **Fee structure** — Stripe Connect fees (typically 0.25%–1.5% per transaction plus platform fee) reduce margin vs. direct bank transfers.
- **Limited flexibility** — Complex payment splitting, escrow-like hold periods, or custom settlement schedules are constrained by Stripe Connect's capabilities.

### Neutral

- If payment volumes grow significantly or Anclora requires payment features beyond Stripe Connect's model (e.g., regulated escrow for property deposits), this ADR must be revisited with legal counsel and a new ADR issued.
- The manual escrow option (Option 2) remains a future possibility if Anclora obtains a payment agent license, but is explicitly **not selected** for the current phase.

## Affected Repositories

- `anclora-energyscan` — Current Stripe Connect implementation (reference)
- `anclora-nexus` — Future commercial payment flows must follow this pattern
- `anclora-group` — This ADR is the governing document

## Requirements Traceability

| Requirement                                                            | Coverage                                |
| ---------------------------------------------------------------------- | --------------------------------------- |
| 4.1 — Document payment mechanism decision in binding ADR               | This document                           |
| 4.2 — Route all third-party payments through Stripe Connect            | BC-1, BC-2, BC-3                        |
| 4.3 — If manual escrow, implement licensed arrangement                 | Rejected option — documented in Context |
| 4.4 — Prohibit direct collection without PSD2-compliant intermediation | BC-1, BC-3                              |

## Review Triggers

This ADR must be re-evaluated if:

- Anclora payment volumes exceed €1M/month aggregate
- Stripe Connect fees exceed 3% of total transaction value
- A business requirement emerges that Stripe Connect cannot support (e.g., regulated property deposit escrow)
- Anclora Group obtains or initiates a PSD2 payment agent license application
- EU regulatory changes affect the platform model exemption
