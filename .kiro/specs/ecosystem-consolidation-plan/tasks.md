# Implementation Plan: Ecosystem Consolidation Plan

## Overview

Multi-phase, multi-repository implementation plan for the Anclora Group PropTech ecosystem consolidation. Organized by the 6 phases defined in the design document, with dependencies respecting the phase graph: P0 → P1 → P2 → P3 → P5, and P1 → P4 → P5. Each phase delivers independently deployable value. TypeScript (fast-check) for Next.js repos, Python (hypothesis) for FastAPI backend.

## Tasks

- [x] 1. Phase 0 — Compliance Hard-Stops
  - [x] 1.1 Implement Advisor AI CI pipeline (type-check, lint, build)
    - Create `.github/workflows/ci.yml` in `anclora-advisor-ai` with three gate steps: `npm run type-check`, `npm run lint`, `npm run build`
    - Configure fail-fast so any step failure blocks PR merge
    - Verify pipeline triggers on PR events to `development` branch
    - _Requirements: 1.1, 1.2, 1.3, 1.4_

  - [x] 1.2 Implement AI Act Art. 50 disclaimer module
    - Create `anclora-advisor-ai/src/components/features/disclaimer/` with React components
    - Implement `SessionDisclaimerBanner` injected as first message on new chat sessions
    - Implement persistent `AiIndicatorBadge` visible throughout active sessions
    - Implement `LegalRecommendationFooter` appended to legal/fiscal responses
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [x] 1.3 Create AML vault schema and retention enforcement
    - Create Supabase migration `anclora-nexus/supabase/migrations/NNN_aml_vault_schema.sql`
    - Implement `aml_vault` schema with `retention_records` and `access_log` tables
    - Add RLS policies restricting access to `compliance_officer` and `service_role`
    - Implement `prevent_premature_deletion` trigger function enforcing 10-year retention
    - Add retention timestamp calculation: `retention_expires_at = created_at + interval '10 years'`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [x] 1.4 Write property test for AML vault retention timestamp (Property 1)
    - **Property 1: AML Vault Retention Timestamp Correctness**
    - Use `hypothesis` in Python to generate arbitrary transaction records
    - Assert `retention_expires_at == created_at + 10 years` for all generated records
    - **Validates: Requirements 3.2**

  - [x] 1.5 Write property test for AML vault deletion prevention (Property 2)
    - **Property 2: AML Vault Deletion Prevention**
    - Use `hypothesis` to generate records with `retention_expires_at > now()`
    - Assert delete attempts raise exception and record remains unchanged
    - **Validates: Requirements 3.3**

  - [x] 1.6 Create Payment Decision ADR document
    - Create `anclora-group/docs/adr/ADR-001-payment-mechanism.md`
    - Document Stripe Connect vs manual escrow decision with PSD2 compliance rationale
    - Include binding constraints: no direct collection into Anclora operational accounts
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

- [ ] 2. Checkpoint — Phase 0 complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Phase 1 — RAG Quality
  - [x] 3.1 Implement RAG source auditor
    - Create `anclora-advisor-ai/lib/rag/source-auditor.ts`
    - Implement `auditSources(threshold: number)` returning `SourceAuditResult[]`
    - Implement `purgeSources(sourceIds: string[])` with orphan reference cleanup
    - Score-based classification: below threshold → `purge`, above → `keep`
    - _Requirements: 5.1, 5.2, 5.3_

  - [x] 3.2 Write property test for RAG source audit threshold classification (Property 3)
    - **Property 3: RAG Source Audit Threshold Classification**
    - Use `fast-check` to generate arrays of sources with random relevance scores and arbitrary thresholds
    - Assert all sources with `score < threshold` get `action: 'purge'` and `score >= threshold` get `action: 'keep'`
    - **Validates: Requirements 5.1, 5.2**

  - [x] 3.3 Write property test for RAG post-purge referential integrity (Property 4)
    - **Property 4: RAG Post-Purge Referential Integrity**
    - Use `fast-check` to generate knowledge base states and purge subsets
    - Assert after purge, no chunk references point to purged sources
    - **Validates: Requirements 5.3**

  - [x] 3.4 Implement territorial intelligence ingestion pipeline
    - Create `anclora-advisor-ai/lib/rag/territorial-ingestion.ts`
    - Implement watch on ingestion folder, scope governance validation (notebook_id, domain, reason_for_fit)
    - Return `IngestionResult` with status `ingested` or `rejected` with reason
    - Reject documents with `SOURCE_SCOPE_MISMATCH` or `LOW_RELEVANCE`
    - _Requirements: 6.1, 6.2, 6.3_

  - [x] 3.5 Write property test for NotebookLM scope governance validation (Property 5)
    - **Property 5: NotebookLM Scope Governance Validation**
    - Use `fast-check` to generate documents with varying domains and target notebook scopes
    - Assert accept iff domain matches allowed scope; reject with `SOURCE_SCOPE_MISMATCH` otherwise
    - **Validates: Requirements 6.2, 8.2, 8.3**

  - [x] 3.6 Write property test for RAG retrieval minimum relevance (Property 6)
    - **Property 6: RAG Retrieval Minimum Relevance**
    - Use `fast-check` to generate query results with varying relevance scores
    - Assert all returned chunks have `relevance_score >= 0.7`
    - **Validates: Requirements 6.3**

  - [x] 3.7 Implement RAG evaluation pipeline
    - Create `anclora-advisor-ai/lib/rag/evaluation-pipeline.ts`
    - Implement benchmark scoring against golden dataset
    - Compute composite score in `[0.0, 1.0]` range
    - Gate logic: block deployments and emit alert to Command Center when score < 0.7
    - Integrate into CI for PRs modifying knowledge base or retrieval logic
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [x] 3.8 Write property test for RAG evaluation score bounded and gated (Property 7)
    - **Property 7: RAG Evaluation Score Bounded and Gated**
    - Use `fast-check` to generate evaluation results with arbitrary scores
    - Assert score is always in `[0.0, 1.0]` and deployment blocked when `score < 0.7`
    - **Validates: Requirements 7.2, 7.3**

  - [x] 3.9 Implement NotebookLM sync CLI
    - Create `anclora-nexus/backend/cli/notebooklm_sync.py`
    - Expose existing build/validate scripts as CLI command (`python -m cli.notebooklm_sync --validate --push`)
    - Implement `SyncManifest` tracking (notebook_id, document_hash, sync_timestamp)
    - Validate source documents against scope governance before push
    - Reject with `SOURCE_SCOPE_MISMATCH` and log rejection on failure
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

- [ ] 4. Checkpoint — Phase 1 complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Phase 2 — Integration
  - [x] 5.1 Implement legal document validation endpoint in Advisor AI
    - Create `anclora-advisor-ai/src/app/api/legal-documents/validate/route.ts`
    - Accept `POST` with `{ document_id, document_content, document_type }`
    - Validate `X-Advisor-Internal-API-Key` header; reject with HTTP 401 if invalid/missing
    - Run RAG-powered legal analysis and return `{ document_id, block_signing, issues[], confidence }`
    - _Requirements: 10.1, 11.1, 11.2_

  - [x] 5.2 Write property test for API key authentication enforcement (Property 9)
    - **Property 9: API Key Authentication Enforcement**
    - Use `fast-check` to generate requests with missing, empty, or incorrect API keys
    - Assert all such requests return HTTP 401 Unauthorized
    - **Validates: Requirements 11.2**

  - [x] 5.3 Implement contract validator service in Nexus
    - Create `anclora-nexus/backend/services/advisor_contract_validator_service.py`
    - Implement `ContractValidationRequest` and `ContractValidationResponse` Pydantic models
    - Call Advisor AI `/api/legal-documents/validate` with `ADVISOR_INTERNAL_API_KEY`
    - Handle retries with exponential backoff (max 3 over 1 hour) on failure
    - Notify operator via Command Center when Advisor AI is unreachable
    - _Requirements: 10.1, 10.2, 10.5, 11.4_

  - [x] 5.4 Implement signature blocking propagation service
    - Create `anclora-nexus/backend/services/dms_signature_service.py`
    - Add `signature_status`, `block_reason`, `block_source` columns to documents table via migration
    - Implement `SignatureBlockEvent` processing: set status to `signature_blocked` when `block_signing=true`
    - Restore to `ready_for_signature` when `block_signing=false`
    - Enforce 5-second SLA for status propagation
    - Log all block/unblock events in `audit_log` with HMAC-SHA256 signature
    - _Requirements: 12.1, 12.2, 12.3, 12.4_

  - [x] 5.5 Write property test for document validation block propagation (Property 8)
    - **Property 8: Document Validation Block Propagation**
    - Use `hypothesis` to generate contract validation responses with random `block_signing` values
    - Assert DMS status is `signature_blocked` iff `block_signing === true`, else `ready_for_signature`
    - **Validates: Requirements 10.3, 10.4**

  - [x] 5.6 Write property test for signature block/unblock round-trip with audit (Property 10)
    - **Property 10: Signature Block/Unblock Round-Trip with Audit**
    - Use `hypothesis` to generate sequences of block/unblock events
    - Assert document returns to `ready_for_signature` after unblock
    - Assert every event produces a valid HMAC-SHA256 audit_log entry
    - **Validates: Requirements 12.3, 12.4**

  - [x] 5.7 Deprecate SyncXML
    - Remove `syncxml_pilot_service.py` and associated smoke tests from `anclora-nexus`
    - Remove all import references and configuration entries pointing to SyncXML
    - Verify `unified_ingestion` passes all previously covered integration tests
    - Add deprecation notice to `anclora-syncxml` README and archive repository as read-only
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 6. Checkpoint — Phase 2 complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Phase 3 — Commercial Loop
  - [x] 7.1 Implement lead intake API in Nexus
    - Create `anclora-nexus/backend/api/routes/lead_intake.py`
    - Implement `POST /api/v1/leads/intake` with `LeadIntakeRequest` validation
    - Create leads pipeline migration with schema from design (leads table, indexes, unique constraint)
    - Assign initial temperature score based on source and metadata
    - Implement deduplication: reject duplicate (same email + source_system within 24h) with HTTP 409
    - _Requirements: 13.1, 13.2, 13.3, 13.4_

  - [x] 7.2 Write property test for lead intake validation (Property 11)
    - **Property 11: Lead Intake Validation**
    - Use `hypothesis` to generate lead requests with missing/empty fields and valid fields
    - Assert missing fields → HTTP 400; valid fields → status `new` with temperature assigned
    - **Validates: Requirements 13.2, 13.3**

  - [x] 7.3 Write property test for lead deduplication within 24-hour window (Property 12)
    - **Property 12: Lead Deduplication Within 24-Hour Window**
    - Use `hypothesis` to generate pairs of lead requests with identical email/source at varying time intervals
    - Assert within 24h → `duplicate` status; after 24h → new lead created
    - **Validates: Requirements 13.4**

  - [x] 7.4 Implement lead pipeline reporting and staleness detection
    - Add pipeline metrics endpoint returning leads by temperature, owner, conversion funnel
    - Implement staleness detection: flag leads with no `next_action_due` and `created_at > 48h` as `stale`
    - Emit events to Command Center on temperature/owner changes
    - _Requirements: 14.1, 14.2, 14.3, 14.4_

  - [x] 7.5 Write property test for lead staleness detection (Property 13)
    - **Property 13: Lead Staleness Detection**
    - Use `hypothesis` to generate leads with varying `created_at` and `next_action_due` values
    - Assert leads with no action due and `created_at > 48h` → flagged as `stale`
    - **Validates: Requirements 14.4**

  - [x] 7.6 Implement exclusiva webhook dispatcher in Nexus
    - Create `anclora-nexus/backend/services/webhook_dispatcher.py`
    - Implement `PropertyWebhookPayload` with HMAC-SHA256 signature generation
    - Dispatch webhook on property status change to "Exclusiva"
    - Implement exponential backoff retry (max 3 over 1 hour) on delivery failure
    - Log failures in `audit_log`
    - _Requirements: 15.1, 15.4_

  - [x] 7.7 Implement content generation job receiver in Content Generator AI
    - Create `anclora-content-generator-ai/src/app/api/webhooks/property/route.ts`
    - Validate `X-Webhook-Signature` header using HMAC-SHA256 with shared secret
    - Create content generation jobs (SEO listing + social posts) for valid payloads
    - Reject invalid signatures with HTTP 401; log suspicious requests
    - _Requirements: 15.2, 15.3_

  - [x] 7.8 Write property test for webhook HMAC signature verification (Property 14)
    - **Property 14: Webhook HMAC Signature Verification**
    - Use `fast-check` to generate arbitrary payloads and shared secrets
    - Assert webhook accepted iff `HMAC-SHA256(payload, secret)` equals provided signature
    - **Validates: Requirements 15.2**

  - [x] 7.9 Implement Better Auth unified provider
    - Configure Better Auth in `anclora-group/src/lib/auth/` with organization-level identity
    - Implement `OrganizationIdentity` and role hierarchy: `group-admin > app-admin > operator > viewer`
    - Configure SSO token valid across Nexus, Content Generator AI, and Synergi
    - Implement 30-day dual-auth window accepting both Supabase and Better Auth tokens in Nexus
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 23.1, 23.2, 23.3_

  - [x] 7.10 Wire Private Estates Landing form to Nexus lead intake API
    - Update `anclora-private-estates-landing` form handler to POST to Nexus `/api/v1/leads/intake`
    - Include standardized `source_system: "private-estates-landing"` and `source_channel` fields
    - _Requirements: 13.1_

- [x] 8. Checkpoint — Phase 3 complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Phase 4 — FileStudio + Data Lab
  - [ ] 9.1 Implement MinerU property dossier processor
    - Create `anclora-filestudio/src/lib/engines/mineru/property-dossier.ts`
    - Process property document bundles (PDF, images, scans) through MinerU-Popo engine
    - Extract structured entities: address, cadastral reference, surface, price, classification
    - Achieve ≥70% token reduction vs raw OCR
    - Fall back to Tesseract OCR on MinerU failure with `precision_level: "reduced"`
    - _Requirements: 17.1, 17.2, 17.3, 17.4_

  - [ ] 9.2 Implement RAG ingestion from MinerU output
    - Create `anclora-content-generator-ai/lib/rag/mineru-ingestion.ts`
    - Receive MinerU parsed content, chunk, and embed using Transformers.js
    - Store as `rag_chunks` in Neon pgvector with metadata (document_id, page_number, extraction_timestamp)
    - Create pgvector migration for `rag_chunks` table with IVFFlat index
    - Implement SHA-256 content hash deduplication (`INSERT ... ON CONFLICT DO NOTHING`)
    - _Requirements: 18.1, 18.2, 18.3, 18.4_

  - [ ] 9.3 Write property test for cryptographic watermark round-trip (Property 15)
    - **Property 15: Cryptographic Watermark Round-Trip**
    - Use `fast-check` to generate arbitrary PDF buffers and watermark payloads
    - Assert `embedWatermark` followed by `verifyWatermark` returns `{ valid: true, status: 'authentic' }` with original payload intact
    - **Validates: Requirements 21.1, 21.3**

  - [ ] 9.4 Write property test for watermark tamper detection (Property 16)
    - **Property 16: Watermark Tamper Detection**
    - Use `fast-check` to generate watermarked PDFs, then modify arbitrary bytes
    - Assert `verifyWatermark(modified_pdf)` returns `{ valid: false, status: 'tampered' }`
    - **Validates: Requirements 21.4**

  - [ ] 9.5 Write property test for content hash deduplication (Property 17)
    - **Property 17: Content Hash Deduplication**
    - Use `fast-check` to generate duplicate RAG chunk contents
    - Assert exactly one entry per unique `SHA-256(content)` — no duplicates stored
    - **Validates: Requirements 18.4**

  - [ ] 9.6 Implement AVM Mallorca model
    - Create `anclora-data-lab/src/lib/avm/mallorca-model.ts`
    - Consume `source_observatory` and `deal_margin` data
    - Return estimated value with confidence interval and data sources used
    - Enforce Mallorca geographic boundary using cadastral/municipal filters
    - Return `confidence_level: "low"` with explanation when comparable transactions < 10
    - _Requirements: 19.1, 19.2, 19.3, 19.4_

  - [ ] 9.7 Write property test for AVM confidence gating (Property 18)
    - **Property 18: AVM Confidence Gating**
    - Use `fast-check` to generate valuation requests with varying comparable counts
    - Assert comparables < 10 → `confidence_level: "low"` with non-empty explanation
    - **Validates: Requirements 19.4**

  - [ ] 9.8 Write property test for AVM geographic boundary enforcement (Property 19)
    - **Property 19: AVM Geographic Boundary Enforcement**
    - Use `fast-check` to generate locations inside and outside Mallorca boundary
    - Assert locations outside Mallorca → request rejected or error returned
    - **Validates: Requirements 19.3**

- [ ] 10. Checkpoint — Phase 4 complete
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Phase 5 — Governance
  - [ ] 11.1 Create AI Act Art. 6.3 exclusion registry for Talent
    - Create `anclora-group/docs/compliance/ai-act-art6-3-talent-exclusion.md`
    - Include: system description, intended purpose, decision impact assessment, reasoning for exclusion
    - Document re-evaluation trigger: within 30 days of scope/capability changes
    - _Requirements: 20.1, 20.2, 20.3_

  - [ ] 11.2 Implement cryptographic watermark engine
    - Create `anclora-content-generator-ai/lib/watermark/crypto-watermark.ts`
    - Implement `embedWatermark(pdf, payload, signingKey)` embedding generation_timestamp, model_version, workspace_id, document_hash
    - Implement `verifyWatermark(pdf, signingKey)` returning `WatermarkVerification` with status: `authentic | tampered | no_watermark`
    - Use signing key from environment variables (never hardcoded)
    - _Requirements: 21.1, 21.2, 21.3, 21.4_

  - [ ] 11.3 Implement Command Center aggregator
    - Create `anclora-group/src/app/command-center/` pages and API routes
    - Implement health polling for all ecosystem apps (Nexus, Advisor AI, Content Gen, Synergi, Data Lab, FileStudio, EnergyScan)
    - Display alerts within 60s of degraded/error detection
    - Display pipeline metrics from Nexus (leads, temperature, conversion)
    - Display RAG quality scores from Advisor AI and content throughput from Content Gen
    - Enforce role-based access: `group-admin` required for cross-application metrics
    - _Requirements: 22.1, 22.2, 22.3, 22.4, 22.5_

  - [ ] 11.4 Write property test for role hierarchy permission superset (Property 20)
    - **Property 20: Role Hierarchy Permission Superset**
    - Use `fast-check` to generate role pairs from the hierarchy
    - Assert higher role's permission set is a strict superset of lower role's permission set
    - **Validates: Requirements 23.3**

  - [ ] 11.5 Write property test for session invalidation on user deactivation (Property 21)
    - **Property 21: Session Invalidation on User Deactivation**
    - Use `fast-check` to generate users with active sessions, then deactivate
    - Assert all previously valid session tokens return unauthorized after deactivation
    - **Validates: Requirements 23.4**

  - [ ] 11.6 Implement organization role propagation
    - Wire Better Auth role changes to propagate across Nexus, Content Gen, and Synergi within 60s
    - Implement user deactivation: invalidate all active sessions across all apps immediately
    - _Requirements: 23.2, 23.4_

- [ ] 12. Final checkpoint — All phases complete
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation between phases
- Property tests validate universal correctness properties from the design document (21 properties total)
- Unit tests validate specific examples and edge cases
- TypeScript repos use `fast-check` for property-based tests; Python backend uses `hypothesis`
- Phase dependency graph: P0 → P1 → P2 → P3 → P5, and P1 → P4 → P5
- Phase 0 has no external dependencies and can start immediately
- Phases within the same wave can execute in parallel where noted in the dependency graph
- Task 1.6 (ADR) and Task 11.1 (Art. 6.3 exclusion) are document artifacts — no code tests needed
- Cross-service integration tests should use test doubles for external services in CI

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.6"] },
    { "id": 1, "tasks": ["1.3"] },
    { "id": 2, "tasks": ["1.4", "1.5"] },
    { "id": 3, "tasks": ["3.1", "3.4", "3.7", "3.9"] },
    { "id": 4, "tasks": ["3.2", "3.3", "3.5", "3.6", "3.8"] },
    { "id": 5, "tasks": ["5.1", "5.7"] },
    { "id": 6, "tasks": ["5.2", "5.3", "5.4"] },
    { "id": 7, "tasks": ["5.5", "5.6"] },
    { "id": 8, "tasks": ["7.1", "7.6", "7.9", "7.10"] },
    { "id": 9, "tasks": ["7.2", "7.3", "7.4", "7.7"] },
    { "id": 10, "tasks": ["7.5", "7.8"] },
    { "id": 11, "tasks": ["9.1", "9.6"] },
    { "id": 12, "tasks": ["9.2", "9.7", "9.8"] },
    { "id": 13, "tasks": ["9.3", "9.4", "9.5"] },
    { "id": 14, "tasks": ["11.1", "11.2", "11.3"] },
    { "id": 15, "tasks": ["11.4", "11.5", "11.6"] }
  ]
}
```
