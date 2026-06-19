# Requirements Document

## Introduction

Plan de consolidación multi-fase y multi-repositorio para el ecosistema PropTech de Anclora Group. Derivado de la triangulación de tres análisis independientes: Análisis Operacional (mayo 2026), Informe de Deep Research estratégico, y Auditoría Legal-Técnica. El plan aborda gaps de compliance críticos, deuda técnica bloqueante, integración desconectada entre servicios, y la ausencia de un circuito comercial cerrado.

## Glossary

- **Ecosistema_Anclora**: Conjunto de aplicaciones y servicios que componen la plataforma PropTech de Anclora Group, incluyendo Nexus, Advisor AI, Content Generator AI, Synergi, Data Lab, FileStudio, Private Estates Landing, EnergyScan y SyncXML
- **Nexus**: CRM core del ecosistema con DMS, ingesta unificada, gestión de leads y agentes LangGraph (repo: anclora-nexus)
- **Advisor_AI**: Aplicación de asesoría fiscal, laboral e inmobiliaria con RAG sobre Supabase (repo: anclora-advisor-ai)
- **Content_Generator_AI**: Motor autónomo de generación de contenido SEO/LinkedIn/Instagram con Better Auth + Neon + pgvector (repo: anclora-content-generator-ai)
- **Synergi**: Plataforma de partners con admisiones y gestión de colaboradores (repo: anclora-synergi)
- **Data_Lab**: Capa de inteligencia con observatorio territorial y modelos predictivos (repo: anclora-data-lab)
- **FileStudio**: Workspace de conversión y procesamiento documental con MinerU (repo: anclora-filestudio)
- **Private_Estates_Landing**: Landing page de captación de leads para Anclora Private Estates (repo: anclora-private-estates-landing)
- **EnergyScan**: Aplicación de certificación energética con flujo de pagos Stripe Connect (repo: anclora-energyscan)
- **SyncXML**: Servicio piloto de sincronización XML de portales inmobiliarios, actualmente obsoleto (repo: anclora-syncxml)
- **Command_Center**: Dashboard unificado de gobernanza y reporting del ecosistema (Bóveda Anclora)
- **RAG**: Retrieval-Augmented Generation — patrón de IA que consulta documentos indexados para generar respuestas contextuales
- **unified_ingestion**: Módulo de ingesta unificada en Nexus que reemplaza funcionalmente a SyncXML
- **Better_Auth**: Librería de autenticación utilizada en Content Generator AI y candidata para unificación de identidad
- **AI_Act**: Reglamento europeo de Inteligencia Artificial (EU AI Act 2024/1689)
- **PSD2**: Directiva europea de Servicios de Pago revisada (Payment Services Directive 2)
- **ETD_465_2021**: Normativa española de prevención de blanqueo y financiación del terrorismo
- **GDPR**: Reglamento General de Protección de Datos (EU 2016/679)
- **AML**: Anti-Money Laundering — normativa de prevención de blanqueo de capitales
- **MinerU**: Motor de parsing documental de alta precisión integrado en FileStudio (MinerU-Popo)
- **Neon_pgvector**: Base de datos PostgreSQL serverless (Neon) con extensión pgvector para embeddings vectoriales
- **AVM**: Automated Valuation Model — modelo de valoración automatizada de inmuebles
- **DMS**: Document Management System — sistema de gestión documental integrado en Nexus
- **project_ref**: Identificador único de proyecto en Supabase que determina el aislamiento de datos por aplicación

## Requirements

### Requisito 1: Resolución de Compilación de Advisor AI

**User Story:** Como equipo de desarrollo, quiero que Advisor AI compile sin errores, para que el servicio sea desplegable y pueda integrarse con el resto del ecosistema.

**Repositorios afectados:** anclora-advisor-ai

#### Criterios de Aceptación

1. WHEN `npm run type-check` is executed in anclora-advisor-ai, THE Advisor_AI SHALL complete without TypeScript errors
2. WHEN `npm run lint` is executed in anclora-advisor-ai, THE Advisor_AI SHALL complete without ESLint errors using a valid configuration
3. WHEN `npm run build` is executed in anclora-advisor-ai, THE Advisor_AI SHALL produce a successful Next.js production build
4. WHEN CI pipeline runs on anclora-advisor-ai, THE Advisor_AI SHALL pass all three checks (type-check, lint, build) as gate conditions

### Requisito 2: Disclaimer AI Act Art. 50 en Advisor AI

**User Story:** Como usuario del sistema, quiero recibir un aviso claro de que estoy interactuando con un sistema de IA, para cumplir con el Art. 50 del AI Act europeo sobre transparencia.

**Repositorios afectados:** anclora-advisor-ai

#### Criterios de Aceptación

1. WHEN a user initiates a conversation with Advisor_AI, THE Advisor_AI SHALL display a conversational disclaimer indicating the user is interacting with an artificial intelligence system
2. THE Advisor_AI SHALL include the disclaimer text in the first message of every new chat session
3. WHILE a user session is active, THE Advisor_AI SHALL maintain a persistent visual indicator that responses are AI-generated
4. WHEN Advisor_AI generates a legal or fiscal recommendation, THE Advisor_AI SHALL append a disclaimer stating the recommendation does not constitute professional legal advice

### Requisito 3: Vault de Retención AML 10 Años

**User Story:** Como responsable de compliance, quiero que los datos sujetos a retención AML se almacenen en un vault separado durante 10 años, para cumplir con ETD/465/2021 sin violar la minimización de datos de GDPR.

**Repositorios afectados:** anclora-nexus, anclora-advisor-ai

#### Criterios de Aceptación

1. THE Ecosistema_Anclora SHALL maintain a dedicated Supabase schema (vault) for AML-regulated data physically separated from marketing and operational data
2. WHEN a transaction record is classified as AML-relevant, THE Nexus SHALL store a copy in the AML vault with a retention timestamp of 10 years from creation date
3. WHILE a record exists in the AML vault and its retention period has not expired, THE Ecosistema_Anclora SHALL prevent deletion of that record
4. WHEN the 10-year retention period expires for a record, THE Ecosistema_Anclora SHALL flag the record for review and potential deletion per GDPR minimization
5. THE Ecosistema_Anclora SHALL enforce that PII stored in the AML vault is not accessible to marketing or analytics services

### Requisito 4: Decisión de Flujo de Pagos (Stripe Connect vs Escrow Manual)

**User Story:** Como responsable de producto, quiero una decisión documentada sobre el mecanismo de pagos del ecosistema, para asegurar compliance con PSD2 y evitar gestión de fondos de terceros no autorizada.

**Repositorios afectados:** anclora-energyscan, anclora-nexus

#### Criterios de Aceptación

1. THE Ecosistema_Anclora SHALL document the payment mechanism decision (Stripe Connect or manual escrow) in a binding architectural decision record
2. IF the decision is Stripe Connect, THEN THE EnergyScan SHALL route all third-party payments through Stripe Connect without holding funds in Anclora-controlled accounts
3. IF the decision is manual escrow, THEN THE Ecosistema_Anclora SHALL implement a licensed escrow arrangement compliant with PSD2 payment agent requirements
4. THE Ecosistema_Anclora SHALL prohibit direct collection of client funds into Anclora operational accounts without PSD2-compliant intermediation

### Requisito 5: Purga de Fuentes RAG de Baja Calidad en Advisor AI

**User Story:** Como usuario de Advisor AI, quiero recibir respuestas precisas sobre el mercado inmobiliario, para tomar decisiones informadas sin información obsoleta o irrelevante.

**Repositorios afectados:** anclora-advisor-ai

#### Criterios de Aceptación

1. WHEN the RAG knowledge base is audited, THE Advisor_AI SHALL identify and remove all document sources with relevance scores below 0.3
2. WHEN sources tagged as "Mercado" from the initial pilot are evaluated, THE Advisor_AI SHALL remove those with a current relevance score of 0.08 or below
3. AFTER purging low-quality sources, THE Advisor_AI SHALL re-index the remaining knowledge base and verify no orphaned references remain

### Requisito 6: Ingesta de Inteligencia Territorial en Advisor AI

**User Story:** Como asesor inmobiliario, quiero que Advisor AI tenga acceso a documentos de inteligencia territorial actualizados, para ofrecer análisis de mercado precisos y localizados.

**Repositorios afectados:** anclora-advisor-ai

#### Criterios de Aceptación

1. WHEN new territorial intelligence documents are added to the designated ingestion folder, THE Advisor_AI SHALL process and index them into the RAG knowledge base within 24 hours
2. THE Advisor_AI SHALL validate that ingested territorial documents conform to the NotebookLM scope governance (notebook_id, domain, reason_for_fit)
3. WHEN a territorial intelligence query is submitted, THE Advisor_AI SHALL retrieve relevant chunks with a minimum relevance score of 0.7

### Requisito 7: Evaluación RAG con Umbral Mínimo de Calidad

**User Story:** Como responsable de calidad, quiero un mecanismo de evaluación continua del RAG, para garantizar que la calidad de respuestas se mantiene por encima de un umbral aceptable.

**Repositorios afectados:** anclora-advisor-ai

#### Criterios de Aceptación

1. THE Advisor_AI SHALL implement an automated RAG evaluation pipeline that measures response relevance against a benchmark dataset
2. WHEN the RAG evaluation pipeline executes, THE Advisor_AI SHALL produce a composite score between 0.0 and 1.0
3. IF the RAG evaluation score falls below 0.7, THEN THE Advisor_AI SHALL emit an alert to the Command_Center and block deployments until the score recovers
4. THE Advisor_AI SHALL execute the RAG evaluation pipeline on every PR that modifies knowledge base sources or retrieval logic

### Requisito 8: Formalización del Pipeline de Sincronización NotebookLM

**User Story:** Como equipo de operaciones, quiero que la sincronización con NotebookLM sea un pipeline formalizado y automatizable, para eliminar la dependencia de procesos manuales frágiles.

**Repositorios afectados:** anclora-nexus, anclora-advisor-ai

#### Criterios de Aceptación

1. THE Nexus SHALL expose existing build/validate scripts as a documented CLI command for NotebookLM synchronization
2. WHEN the NotebookLM sync pipeline executes, THE Nexus SHALL validate source documents against scope governance rules before pushing to NotebookLM
3. IF a source document fails scope validation, THEN THE Nexus SHALL reject the document with a SOURCE_SCOPE_MISMATCH error and log the rejection
4. THE Nexus SHALL maintain a manifest file tracking all documents currently synchronized to each NotebookLM notebook (notebook_id, document_hash, sync_timestamp)

### Requisito 9: Deprecación Física de SyncXML

**User Story:** Como equipo de arquitectura, quiero eliminar completamente el código muerto de SyncXML del ecosistema, para reducir superficie de mantenimiento y evitar confusión sobre qué módulo gestiona la ingesta.

**Repositorios afectados:** anclora-syncxml, anclora-nexus

#### Criterios de Aceptación

1. WHEN the deprecation is executed, THE Nexus SHALL remove the file `syncxml_pilot_service.py` and all its associated smoke tests
2. WHEN the deprecation is executed, THE Nexus SHALL remove all import references and configuration entries that point to the SyncXML pilot service
3. AFTER removal of SyncXML references, THE Nexus SHALL pass all existing integration tests confirming `unified_ingestion` handles all previously covered use cases
4. THE Ecosistema_Anclora SHALL archive the anclora-syncxml repository as read-only with a deprecation notice in its README

### Requisito 10: Integración Advisor AI ↔ Nexus Contract Validator

**User Story:** Como gestor de contratos, quiero que Nexus consuma la validación legal de Advisor AI en tiempo real, para bloquear la firma de documentos con irregularidades detectadas.

**Repositorios afectados:** anclora-nexus, anclora-advisor-ai

#### Criterios de Aceptación

1. WHEN a document is submitted for validation in Nexus, THE Nexus SHALL call Advisor_AI's `/api/legal-documents/validate` endpoint via `advisor_contract_validator_service.py`
2. THE Nexus SHALL authenticate requests to Advisor_AI using a dedicated `ADVISOR_INTERNAL_API_KEY` environment variable
3. WHEN Advisor_AI returns a validation result with `block_signing=true`, THE Nexus SHALL immediately set the document status to "blocked" in the DMS and prevent digital signature
4. WHEN Advisor_AI returns a validation result with `block_signing=false`, THE Nexus SHALL allow the document to proceed through the normal signing workflow
5. IF Advisor_AI is unreachable or returns an error, THEN THE Nexus SHALL queue the document for retry and notify the operator via Command_Center

### Requisito 11: Contrato API Unificado entre Advisor AI y Nexus

**User Story:** Como arquitecto del ecosistema, quiero un contrato API explícito entre Advisor AI y Nexus, para que ambos servicios puedan evolucionar independientemente sin romper la integración.

**Repositorios afectados:** anclora-nexus, anclora-advisor-ai

#### Criterios de Aceptación

1. THE Ecosistema_Anclora SHALL define an API contract document specifying request/response schemas for `/api/legal-documents/validate`
2. THE Advisor_AI SHALL validate the `ADVISOR_INTERNAL_API_KEY` header on all internal API calls and reject requests with invalid or missing keys with HTTP 401
3. WHEN the contract schema changes, THE Ecosistema_Anclora SHALL version the endpoint (e.g., `/api/v2/legal-documents/validate`) and maintain backward compatibility for one release cycle
4. THE Nexus SHALL use the `project_ref` configuration to route requests to the correct Advisor_AI instance without mixing Supabase project references

### Requisito 12: Propagación de Bloqueo de Firma en Tiempo Real

**User Story:** Como equipo legal, quiero que un bloqueo de firma emitido por Advisor AI se propague inmediatamente al DMS de Nexus, para prevenir la ejecución de contratos con problemas detectados.

**Repositorios afectados:** anclora-nexus, anclora-advisor-ai

#### Criterios de Aceptación

1. WHEN Advisor_AI emits a `block_signing=true` event for a document, THE Nexus SHALL update the document DMS status to "signature_blocked" within 5 seconds
2. WHILE a document has status "signature_blocked" in Nexus DMS, THE Nexus SHALL disable all signature action buttons and display the blocking reason from Advisor_AI
3. WHEN the blocking condition is resolved and Advisor_AI emits `block_signing=false`, THE Nexus SHALL restore the document to "ready_for_signature" status
4. THE Nexus SHALL log all block/unblock events in the `audit_log` with HMAC-SHA256 signature per constitutional requirements

### Requisito 13: Circuito Comercial Landing → Nexus

**User Story:** Como equipo comercial, quiero que los leads capturados en Private Estates Landing fluyan automáticamente a Nexus con trazabilidad completa, para cerrar el circuito de captación sin intervención manual.

**Repositorios afectados:** anclora-private-estates-landing, anclora-nexus

#### Criterios de Aceptación

1. WHEN a lead form is submitted on Private_Estates_Landing, THE Private_Estates_Landing SHALL send the lead to Nexus with standardized fields `source_system` and `source_channel`
2. THE Nexus SHALL accept incoming leads via a documented intake API that validates required fields (contact, source_system, source_channel, timestamp)
3. WHEN a lead is received from Private_Estates_Landing, THE Nexus SHALL assign an initial temperature score and create a pipeline entry with status "new"
4. THE Nexus SHALL reject duplicate leads (same contact + source within 24 hours) and return a conflict response to the sender

### Requisito 14: Pipeline Comercial con Temperatura y Reporting

**User Story:** Como director comercial, quiero ver la temperatura, propietario y siguiente acción de cada lead en el Command Center, para tomar decisiones de priorización basadas en datos.

**Repositorios afectados:** anclora-nexus

#### Criterios de Aceptación

1. THE Nexus SHALL maintain for each lead: temperature (cold/warm/hot), assigned owner, and next scheduled action
2. WHEN a lead's temperature or owner changes, THE Nexus SHALL emit an event to Command_Center with the updated state
3. THE Nexus SHALL expose a reporting endpoint that returns pipeline metrics (leads by temperature, leads by owner, conversion funnel stages)
4. WHILE a lead has no next action scheduled and is older than 48 hours, THE Nexus SHALL flag it as "stale" and alert the assigned owner

### Requisito 15: Webhook Nexus → Content Generator AI para Exclusivas

**User Story:** Como equipo de marketing, quiero que cuando una propiedad alcance el estado "Exclusiva" en Nexus se dispare automáticamente la generación de contenido, para acelerar la publicación sin coordinación manual.

**Repositorios afectados:** anclora-nexus, anclora-content-generator-ai

#### Criterios de Aceptación

1. WHEN a property status changes to "Exclusiva" in Nexus, THE Nexus SHALL send a webhook POST to Content_Generator_AI with the property payload (id, description, media_urls, location, features)
2. THE Content_Generator_AI SHALL validate the webhook signature using a shared HMAC secret before processing
3. WHEN Content_Generator_AI receives a valid property webhook, THE Content_Generator_AI SHALL create a content generation job for the property (SEO listing, social posts)
4. IF the webhook delivery fails, THEN THE Nexus SHALL retry delivery with exponential backoff (max 3 retries over 1 hour)

### Requisito 16: Autenticación Unificada con Better Auth

**User Story:** Como usuario del ecosistema, quiero autenticarme una sola vez y acceder a Nexus, Content Generator AI y Synergi sin volver a introducir credenciales, para una experiencia integrada.

**Repositorios afectados:** anclora-nexus, anclora-content-generator-ai, anclora-synergi

#### Criterios de Aceptación

1. THE Ecosistema_Anclora SHALL implement Better Auth as the unified authentication provider for Nexus, Content_Generator_AI, and Synergi
2. WHEN a user authenticates in one application, THE Ecosistema_Anclora SHALL issue a session token valid across all three applications without re-authentication
3. THE Ecosistema_Anclora SHALL support organization-level identity allowing users to belong to multiple workspaces with role-based access per application
4. WHILE migrating from Supabase Auth to Better Auth, THE Nexus SHALL maintain backward compatibility with existing Supabase sessions for a transition period of 30 days

### Requisito 17: FileStudio con MinerU para Dossiers de Propiedad

**User Story:** Como agente inmobiliario, quiero generar dossiers de propiedad estructurados a partir de documentos escaneados usando MinerU, para reducir tiempo de preparación documental y mejorar precisión.

**Repositorios afectados:** anclora-filestudio

#### Criterios de Aceptación

1. WHEN a property document bundle (PDF, images, scans) is uploaded to FileStudio, THE FileStudio SHALL process it through the MinerU-Popo engine extracting structured data
2. THE FileStudio SHALL produce a Property Dossier output containing: parsed text, detected entities (address, cadastral reference, surface, price), and document classification
3. WHEN MinerU processing completes, THE FileStudio SHALL achieve a token reduction of at least 70% compared to raw OCR text output
4. IF MinerU processing fails for a document, THEN THE FileStudio SHALL fall back to Tesseract OCR and flag the output as "reduced_precision"

### Requisito 18: Ingesta RAG desde Output de MinerU

**User Story:** Como sistema de inteligencia, quiero que los documentos procesados por MinerU se indexen automáticamente en el RAG vectorial, para enriquecer la base de conocimiento con datos estructurados de alta precisión.

**Repositorios afectados:** anclora-filestudio, anclora-content-generator-ai

#### Criterios de Aceptación

1. WHEN MinerU produces structured output for a document, THE FileStudio SHALL emit the parsed content to the RAG ingestion pipeline
2. THE Content_Generator_AI SHALL receive MinerU output and store it as `rag_chunks` in Neon pgvector with appropriate embedding vectors
3. WHEN chunks are stored, THE Content_Generator_AI SHALL maintain metadata linking each chunk to its source document (document_id, page_number, extraction_timestamp)
4. THE Content_Generator_AI SHALL deduplicate incoming chunks by content hash to prevent duplicate entries in the vector store

### Requisito 19: Data Lab — Primer AVM de Mallorca

**User Story:** Como analista de mercado, quiero un modelo de valoración automatizada que consuma datos del observatorio territorial y márgenes de operación, para ofrecer estimaciones de valor fundamentadas.

**Repositorios afectados:** anclora-data-lab

#### Criterios de Aceptación

1. THE Data_Lab SHALL consume data from `source_observatory` (territorial intelligence) and `deal_margin` (transaction margins) tables as inputs for the AVM model
2. WHEN a property valuation is requested, THE Data_Lab SHALL return an estimated value with a confidence interval and the data sources used in the calculation
3. THE Data_Lab SHALL limit the first AVM iteration to the Mallorca geographic area using cadastral and municipal boundary filters
4. WHEN input data for a requested area is insufficient (fewer than 10 comparable transactions), THE Data_Lab SHALL return a "low_confidence" flag and explain the data gap

### Requisito 20: Registro de Exclusión AI Act Art. 6.3 para Talent

**User Story:** Como responsable legal, quiero documentar la exclusión de alto riesgo del módulo Talent bajo Art. 6.3 del AI Act, para demostrar compliance proactiva ante auditorías.

**Repositorios afectados:** anclora-talent

#### Criterios de Aceptación

1. THE Ecosistema_Anclora SHALL maintain a formal exclusion registration document for the Talent module under AI Act Art. 6.3, specifying why the system does not fall under high-risk classification
2. THE Ecosistema_Anclora SHALL include in the registration: system description, intended purpose, decision impact assessment, and reasoning for exclusion
3. WHEN the Talent module's scope or decision-making capabilities change, THE Ecosistema_Anclora SHALL re-evaluate the exclusion registration within 30 days of the change

### Requisito 21: Marcas de Agua Criptográficas en PDFs de Content Generator AI

**User Story:** Como equipo de compliance, quiero que los PDFs generados por Content Generator AI incluyan marcas de agua criptográficas, para garantizar autenticidad y trazabilidad de documentos producidos por IA.

**Repositorios afectados:** anclora-content-generator-ai

#### Criterios de Aceptación

1. WHEN Content_Generator_AI produces a PDF document, THE Content_Generator_AI SHALL embed a cryptographic watermark containing: generation_timestamp, model_version, workspace_id, and document_hash
2. THE Content_Generator_AI SHALL use a signing key stored in environment variables (never hardcoded) to produce the watermark signature
3. WHEN a watermarked PDF is verified, THE Content_Generator_AI SHALL provide a verification endpoint that confirms authenticity and returns the embedded metadata
4. IF a PDF is modified after generation, THEN the watermark verification SHALL return a "tampered" status indicating the document has been altered

### Requisito 22: Command Center Unificado

**User Story:** Como director de operaciones, quiero un dashboard unificado que muestre el estado de todas las aplicaciones del ecosistema, para tener visibilidad completa desde un único punto.

**Repositorios afectados:** anclora-group (Command Center)

#### Criterios de Aceptación

1. THE Command_Center SHALL aggregate health status from all ecosystem applications (Nexus, Advisor_AI, Content_Generator_AI, Synergi, Data_Lab, FileStudio, EnergyScan)
2. WHEN any application reports an error or degraded status, THE Command_Center SHALL display an alert within 60 seconds of detection
3. THE Command_Center SHALL display commercial pipeline metrics from Nexus (leads, temperature distribution, conversion rates)
4. THE Command_Center SHALL display RAG quality scores from Advisor_AI and content generation throughput from Content_Generator_AI
5. THE Command_Center SHALL enforce role-based access where only users with role "group-admin" can view cross-application metrics

### Requisito 23: Identidad Organizacional Unificada con Better Auth

**User Story:** Como administrador del grupo, quiero gestionar identidades a nivel de organización para todo el ecosistema, para controlar acceso y permisos desde un punto centralizado.

**Repositorios afectados:** anclora-group, anclora-nexus, anclora-content-generator-ai, anclora-synergi

#### Criterios de Aceptación

1. THE Ecosistema_Anclora SHALL implement Better Auth organization-level identity where each organization maps to an Anclora Group entity
2. WHEN an administrator creates or modifies user roles at the organization level, THE Ecosistema_Anclora SHALL propagate the role change to all connected applications within 60 seconds
3. THE Ecosistema_Anclora SHALL support role hierarchies: group-admin (full access), app-admin (per-application), operator (read-write operational), viewer (read-only)
4. WHEN a user is deactivated at organization level, THE Ecosistema_Anclora SHALL invalidate all active sessions across all applications immediately
