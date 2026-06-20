# AI Act Art. 6.3 Exclusion Registry — Anclora Talent Module

**Document version:** 1.0  
**Issue date:** 2026-06-20  
**Next re-evaluation due:** Within 30 days of any scope or capability change  
**Owner:** Responsable Legal / DPO — Anclora Group  
**Status:** Active

---

## 1. System Description

**Module name:** Anclora Talent  
**Repository:** `anclora-talent`  
**Purpose:** Internal platform for partner and collaborator management within the Anclora Group ecosystem. Manages admission workflows, collaborator profiles, and partner relationship tracking.

### What the system does

- Maintains profiles of human collaborators and partner agencies
- Tracks admission status (pending, approved, rejected, suspended)
- Provides internal operators with a CRM-style view of partner relationships
- Routes admission requests for human review and decision

### What the system does NOT do

- Does not make autonomous employment decisions
- Does not assess, score, or rank candidates without human review
- Does not generate binding decisions on professional eligibility
- Does not perform surveillance or systematic evaluation of natural persons in employment contexts

---

## 2. Intended Purpose

Anclora Talent is an **internal operations tool** used by Anclora Group administrators to manage their business partner network. The intended purpose is:

> To streamline the administrative workflow for onboarding and managing external collaborators and real estate partner agencies, reducing manual coordination overhead for the operations team.

All admission and status decisions are made by **authorized Anclora Group operators**. The system presents information and workflows to support those decisions; it does not substitute for them.

---

## 3. Decision Impact Assessment

### Decisions the system influences

| Decision type | Who makes it | System role |
|---|---|---|
| Partner admission (approved/rejected) | Anclora Group operator | Presents application data; operator selects outcome |
| Partner suspension | Anclora Group operator | Operator-initiated action via UI |
| Profile completeness validation | System | Validates required fields; blocks incomplete forms |
| Admission workflow routing | System | Routes application to correct review queue |

### Impact on natural persons

The system can affect external collaborators and partner agency representatives by:
- Determining whether their partnership application enters the review queue
- Reflecting their admission status to internal operators

**Impact severity:** Low. The system does not:
- Evaluate creditworthiness, health, or vulnerability
- Assess personality traits or competencies
- Generate employment scores or rankings
- Access biometric data

Persons affected by system-reflected decisions can contact Anclora Group directly to request review. There is always a human operator who made and can revisit the decision.

---

## 4. Reasoning for Exclusion from High-Risk Classification

### Applicable provision

**AI Act 2024/1689, Article 6.3** permits an AI system listed in Annex III to be excluded from high-risk classification when the system does not pose a significant risk of harm to health, safety, or fundamental rights. This exclusion applies when the AI system is intended to perform a **narrow procedural task**, is intended to **improve the result of a previously completed human activity**, or is intended to **detect decision-making patterns or deviations from prior decision-making patterns** without replacing human judgment.

### Application to Anclora Talent

Anclora Talent potentially falls within Annex III point 4 (Employment, workers management, and access to self-employment) as it operates in a partner admission context. However, the exclusion under Art. 6.3 applies for the following reasons:

**Reason 1 — Narrow procedural task only**  
The module performs form routing and status tracking, which are narrow procedural tasks. It does not evaluate applicants, score competencies, or generate admission recommendations.

**Reason 2 — Human decision remains the substantive act**  
Every admission and status change is a deliberate operator action. The system surfaces data; the human makes the decision. No automated decision with legal or similarly significant effect is produced.

**Reason 3 — No biometric or sensitive data processing**  
The system processes only business identification data (agency name, contact details, commercial registration). No sensitive categories under GDPR Art. 9 are involved.

**Reason 4 — Low probability and severity of harm**  
The affected population is limited to business professionals seeking a commercial partnership with Anclora Group. Rejection of a partnership application does not constitute harm to health, safety, or fundamental rights at the level Annex III is designed to address.

**Reason 5 — Accessible human review mechanism**  
Rejected applicants can contact Anclora Group to request a human review of their application at any time.

---

## 5. Re-Evaluation Triggers

This exclusion registration must be re-evaluated within **30 calendar days** of any of the following events:

- [ ] Anclora Talent adds automated scoring, ranking, or shortlisting of applicants
- [ ] Anclora Talent integrates AI models that generate recommendations on admission outcomes
- [ ] The module expands to process employee data (rather than external partner data)
- [ ] Applicable AI Act guidance or Commission Delegated Acts reclassify the use case
- [ ] Anclora Group receives a regulatory inquiry referencing this system

**Re-evaluation owner:** Responsable Legal must initiate the review and update this document. Engineering must be consulted on any capability changes before release.

---

## 6. References

- EU AI Act 2024/1689, Articles 6, 9, 50 and Annex III
- GDPR 2016/679, Articles 9 and 22
- Anclora Group Data Processing Register (maintained by DPO)
- ADR-001 — Payment Mechanism Decision (`docs/adr/ADR-001-payment-mechanism.md`)
