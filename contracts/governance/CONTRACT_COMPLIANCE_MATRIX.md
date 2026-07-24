# Contract Compliance Matrix

## Objetivo

Servir de checklist maestra de cumplimiento por aplicación, agrupada por familia, contrato y nivel de evidencia.

Estados permitidos:
- `OK`
- `PARTIAL`
- `NO`
- `N/A`

Interpretación operativa:
- `OK`: auditado y sin gaps abiertos relevantes en el alcance revisado
- `PARTIAL`: auditado de forma parcial o con gaps todavía abiertos
- `NO`: incumplimiento confirmado o cobertura todavía insuficiente para aceptar el contrato
- `N/A`: el contrato o condición no aplica a esa app

La referencia de condiciones es:
- `contracts/governance/CONTRACT_CONDITION_CATALOG.md`

La adopción específica de titularidad, copyright y marca derivada se registra en:
- `docs/governance/BRAND_IP_ADOPTION_MATRIX.md`

Contrato transversal asociado:
- `contracts/core/ANCLORA_GROUP_BRAND_IP_CONTRACT.md`

## Vista resumida por aplicación

| Aplicación | Familia | Universal Motion | Universal Modal | Universal Localization | Family Contract | Overrides locales | Cobertura auditada | Estado global | Gaps abiertos | Última auditoría |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `anclora-group` | Entidad Matriz | PARTIAL | PARTIAL | PARTIAL | N/A | PARTIAL | Footer corporativo, legales y cookies implementados 2026-05-17; lint y build OK | PARTIAL | Falta QA visual final | 2026-05-17 |
| `anclora-advisor-ai` | Internal | PARTIAL | PARTIAL | PARTIAL | PARTIAL | N/A | Footer, legales y cookies implementados 2026-05-17; validación bloqueada por binarios faltantes eslint/tsc | PARTIAL | Instalar dependencias y ejecutar auditoría visual completa | 2026-05-17 |
| `anclora-filestudio` | Internal | PARTIAL | PARTIAL | PARTIAL | PARTIAL | N/A | Alta documental 2026-06-20 basada en repo local; Web local-first, Desktop PRO, Service API privada, Local Agent e integración Nexus documentadas; sin auditoría visual contractual completa | PARTIAL | Confirmar owner, retención, clasificación por tipo de archivo, consumo directo por otras apps y QA visual/seguridad completa | 2026-06-20 |
| `anclora-nexus` | Internal | PARTIAL | PARTIAL | PARTIAL | PARTIAL | N/A | Footer, legales y cookies ES/EN/DE+RU implementados 2026-05-17; lint OK; build bloqueado por fetch Google Fonts sin red | PARTIAL | QA visual completa y build con red/caché de fuentes | 2026-05-17 |
| `anclora-content-generator-ai` | Internal | PARTIAL | PARTIAL | PARTIAL | PARTIAL | N/A | Contratos sincronizados; falta auditoría pantalla por pantalla | PARTIAL | Falta auditoría visual real de shell, toggles, modales y responsive | 2026-03-30 |
| `anclora-impulso` | Premium | PARTIAL | OK | PARTIAL | PARTIAL | N/A | Footer/legales/cookies ES/EN implementados 2026-05-17; lint y typecheck OK | PARTIAL | QA visual responsive | 2026-05-17 |
| `anclora-command-center` | Premium | PARTIAL | N/A | PARTIAL | PARTIAL | N/A | Shell compartida y vistas `command-center` y `real-estate` ya unificadas; falta auditoría contractual completa | PARTIAL | Falta auditoría completa de las dos vistas del app unificado y cierre fino de coherencia premium | 2026-04-04 |
| `anclora-data-lab` | Premium | PARTIAL | PARTIAL | PARTIAL | PARTIAL | N/A | Branding premium estructural alineado en el repo real: DM Sans, wiring centralizado de marca, metadata y paleta esmeralda/cobre; assets finales pendientes | PARTIAL | Faltan los assets finales de logo/favicon del usuario y una auditoría visual completa del workspace para cerrar el contrato premium más allá del branding | 2026-04-04 |
| `anclora-energyscan` | Premium | PARTIAL | PARTIAL | PARTIAL | PARTIAL | N/A | MVP funcional con i18n ES/EN/DE, scoring orientativo, Catastro, adjuntos/OCR, PDF Premium y Stripe Checkout; auditoría documental Design System creada con estado PARTIAL; contratos `EnergyAssessmentLead`, `EnergySignalAggregate` y `ProviderHandoffRequest` preparados | PARTIAL | Falta QA visual completa y conexión productiva de endpoints; mantener que no emite CEE oficial ni documentación administrativa | 2026-05-16 |
| `anclora-syncxml` | Premium | PARTIAL | PARTIAL | PARTIAL | PARTIAL | N/A | Pre-MVP / validación controlada; transformación de reservas/huéspedes a XML (SES.HOSPEDAJES); enfoque en privacidad y minimización de datos | PARTIAL | Riesgo alto por datos sensibles; requiere hardening legal, RGPD y seguridad; revisión humana obligatoria | 2026-05-24 |
| `anclora-synergi` | Premium | PARTIAL | PARTIAL | PARTIAL | PARTIAL | N/A | Branding premium estructural alineado en el repo real: DM Sans, wiring centralizado de marca, metadata y paleta púrpura/cobre; assets finales pendientes | PARTIAL | Faltan los assets finales de logo/favicon del usuario y una auditoría visual completa del backoffice para cerrar el contrato premium más allá del branding | 2026-04-04 |
| `anclora-talent` | Premium | PARTIAL | N/A | PARTIAL | PARTIAL | N/A | Clasificada como premium en bóveda; landing, auth y workspace con contrato dark-first e i18n es/en en progreso de cierre | PARTIAL | Falta auditoría visual completa y cierre de persistencia de tema/idioma en toda la app | 2026-04-02 |
| `anclora-private-estates` | Ultra Premium | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | Contratos sincronizados; falta auditoría editorial y validación de overrides | PARTIAL | Falta auditoría visual detallada y validación de overrides ultra premium | 2026-03-30 |
| `anclora-private-estates-landing` | Ultra Premium | PARTIAL | N/A | OK | PARTIAL | OK | Landing publicada en producción (dark-only, ES/EN/DE); dark-only y switcher de idioma operativos; `site-copy.ts` centralizado; excepciones documentadas (dark-only, sin fr); falta auditoría visual detallada desktop/mobile | PARTIAL | Falta auditoría visual completa en desktop y mobile; copy FR pendiente para cierre de cobertura plena | 2026-04-05 |
| `anclora-portfolio` | Portfolio / Showcase | PARTIAL | PARTIAL | PARTIAL | PARTIAL | N/A | Footer normalizado, legales y cookies implementados 2026-05-17; lint OK | PARTIAL | QA visual desktop/mobile | 2026-05-17 |
| `anclora-azure-bay-landing` | Portfolio / Showcase | PARTIAL | PARTIAL | PARTIAL | PARTIAL | N/A | Footer/legales/cookies implementados 2026-05-17 en rama `development`; validación bloqueada por node_modules/eslint ausente | PARTIAL | Instalar dependencias y QA visual | 2026-05-17 |
| `anclora-playa-viva-uniestate` | Portfolio / Showcase | PARTIAL | PARTIAL | PARTIAL | PARTIAL | N/A | Footer/legales/cookies implementados 2026-05-17 en rama `development`; validación bloqueada por node_modules/eslint ausente | PARTIAL | Instalar dependencias y QA visual | 2026-05-17 |

## Evidencia resumida por familia

### Entidad Matriz

| Aplicación | Evidencia actual | Riesgo principal | Próxima acción |
| --- | --- | --- | --- |
| `anclora-group` | Portal corporativo clasificado como Entidad Matriz; nota canónica y gobernanza ya regularizadas en bóveda | Falta validar el repo real contra los contratos nuevos de branding | Auditar el repo `anclora-group` y cerrar wiring de tokens, favicon y metadata |

### Premium

| Aplicación | Evidencia actual | Riesgo principal | Próxima acción |
| --- | --- | --- | --- |
| `anclora-impulso` | Branding premium estructural alineado en el repo real: DM Sans, wiring centralizado de marca, metadata y paleta naranja/cobre; assets finales pendientes | Diferencias finas entre local y Vercel y coherencia premium entre cards/surfaces | Ejecutar pass completo en producción y cerrar criterios de cards premium |
| `anclora-command-center` | Shell compartida activa; Command Center y `real-estate` ya operan dentro del mismo app | Falta pass contractual completo de ambas vistas y validación fina de densidad/card hierarchy | Auditar el app unificado completo y cerrar criterios premium de ambas vistas |
| `anclora-data-lab` | Branding premium estructural ya alineado en el repo real con DM Sans, metadata centralizada y paleta esmeralda/cobre | Siguen pendientes los assets finales de marca y la auditoría visual completa del workspace | Sustituir logo/favicon cuando el usuario entregue assets y ejecutar pass visual completo del workspace |
| `anclora-energyscan` | App Premium funcional de prediagnóstico energético orientativo con wizard, resultados, PDF Premium, i18n ES/EN/DE, Catastro, adjuntos/OCR, Stripe Checkout y contratos preparados para Nexus/Data Lab/Synergi | Riesgo de parecer certificación oficial si el copy o el PDF no mantienen disclaimers visibles; QA visual completa todavía pendiente | Ejecutar QA visual por superficie y activar integraciones solo tras confirmar endpoints, autorización y retención |
| `anclora-synergi` | Branding premium estructural ya alineado en el repo real con DM Sans, metadata centralizada y paleta púrpura/cobre | Siguen pendientes los assets finales de marca y la auditoría visual completa del backoffice | Sustituir logo/favicon cuando el usuario entregue assets y ejecutar pass visual completo del backoffice |
| `anclora-talent` | Clasificada como premium en la bóveda; cuenta con shell, auth y dashboard definidos | Falta cierre visual y validación completa de dark default, theme toggle y locale toggle | Completar auditoría y cerrar contrato de preferencias e i18n en toda la app |
| `anclora-syncxml` | Pre-MVP / validación controlada para SES.HOSPEDAJES; enfoque en privacidad y minimización | Riesgo alto por datos personales sensibles; requiere validación técnica y legal completa | Ejecutar hardening legal/RGPD, seguridad y auditoría visual operativa |

### Internal

| Aplicación | Evidencia actual | Riesgo principal | Próxima acción |
| --- | --- | --- | --- |
| `anclora-advisor-ai` | Branding interno estructural alineado en el repo real: módulo centralizado de marca, metadata y favicon wiring preparado; assets finales pendientes | Siguen pendientes los assets finales de logo/favicon y la auditoría visual completa del shell y pantallas principales | Sustituir logo/favicon cuando el usuario entregue assets y ejecutar auditoría visual completa |
| `anclora-filestudio` | Repo local revisado; README, seguridad, privacidad, Service API, Local Agent, SDK e integración Nexus documentan alcance técnico y límites de procesamiento local/private-service | Riesgo documental y de privacidad si se usa como almacenamiento permanente o se procesan documentos sensibles sin clasificación/consentimiento | Cerrar owner, retención, scopes por cliente, QA visual y revisión de seguridad antes de ampliar consumidores |
| `anclora-nexus` | Excepción multilenguaje documentada; frontend verificado con `lint`, `vitest` y `build`; branding dark e i18n explícito ya alineados | Faltan solo los assets finales de marca y un pass visual completo pantalla por pantalla | Sustituir logo/favicon cuando el usuario entregue assets finales y ejecutar auditoría visual completa |
| `anclora-content-generator-ai` | Sólo sincronización contractual | Sin evidencia visual real | Auditoría end-to-end de shell y pantallas principales |

### Ultra Premium

| Aplicación | Evidencia actual | Riesgo principal | Próxima acción |
| --- | --- | --- | --- |
| `anclora-private-estates` | Sólo sincronización contractual | Overrides no validados y falta de auditoría editorial | Auditoría ultra premium pantalla por pantalla |
| `anclora-private-estates-landing` | Landing publicada en producción (dark-only, ES/EN/DE, Vercel); excepciones documentadas en `ANCLORA_ECOSYSTEM_CONTRACT_GROUPS.md` | Falta auditoría visual completa pantalla por pantalla en desktop y mobile; FR aplazado | Auditoría visual ultra premium de landing pública en desktop/mobile y revisión editorial del copy en tres idiomas |

### Portfolio / Showcase

| Aplicación | Evidencia actual | Riesgo principal | Próxima acción |
| --- | --- | --- | --- |
| `anclora-portfolio` | Sólo sincronización contractual | Sin evidencia visual real | Auditoría de narrativa, CTA, responsive y conversión |
| `anclora-azure-bay-landing` | Sólo sincronización contractual | Sin evidencia visual real | Auditoría de narrativa, CTA, responsive y conversión |
| `anclora-playa-viva-uniestate` | Sólo sincronización contractual | Sin evidencia visual real | Auditoría de narrativa, CTA, responsive y conversión |

## Vista detallada por contrato

### Universal · Brand/IP Ownership

La vista detallada de `BIP1` a `BIP5` vive en [[Brand IP Adoption Matrix]] para no mezclar QA visual con titularidad legal. Estado resumido actual:

| Aplicación | Brand/IP Ownership | Nota |
| --- | --- | --- |
| `anclora-private-estates-landing` | PARTIAL | Hay footer/config legal, pero quedan docs antiguos y decisión FR |
| `anclora-private-estates` | PARTIAL | Footer, legales y locales contienen Anclora Group; falta normalizar fórmula y docs/exportables |
| `anclora-data-lab` | PARTIAL | Footer workspace y marca derivada detectados; faltan locales/docs completos |
| `anclora-synergi` | PARTIAL | Manual y brand copy detectados; falta footer/i18n legal completo |
| `anclora-nexus` | PARTIAL | Hay referencias a Anclora Group, pero existen copyrights antiguos en manuales/exportables |
| `anclora-content-generator-ai` | PARTIAL | Hermes existe y hay referencias a Anclora Group; falta contrato local y revisión legal surfaces |
| `anclora-design-system` | PARTIAL | Fuente de marca documentada; falta paquete Brand/IP consumible |
| `anclora-energyscan` | PARTIAL | README alineado; docs legacy requieren revisión |
| `anclora-impulso` | NO | Sin evidencia en auditoría ligera |
| `anclora-talent` | PARTIAL | README menciona Anclora Group; falta auditoría real |
| `anclora-command-center` | NO | Ruta confirmada `dashboard/`; sin evidencia de footer/legal Brand/IP |
| `anclora-portfolio` | PARTIAL | Metadata usa Anclora Group; existen titulares antiguos |
| `calculadora-fiscal-183` | PARTIAL | Producto independiente; no hereda Brand/IP salvo decisión explícita |

### Universal · AI Act / IA

Estado preliminar de adopción de los contratos [[ANCLORA_AI_ACT_COMPLIANCE_BASELINE]], [[ANCLORA_AI_RISK_CLASSIFICATION_MATRIX]], [[ANCLORA_AI_HUMAN_OVERSIGHT_POLICY]], [[ANCLORA_AI_TRANSPARENCY_AND_DISCLOSURE_RULES]] y [[ANCLORA_MODEL_PROVIDER_REGISTER]].

| Aplicación | AI1 Documentación feature | AI2 Transparencia | AI3 Supervisión humana | AI4 Registro proveedor | AI5 Escalado sensible | AI6 Claims prudentes | Estado | Próxima acción |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `anclora-group` | PARTIAL | PARTIAL | N/A | PARTIAL | N/A | PARTIAL | PARTIAL | Confirmar si existe asistente IA público o interno |
| `anclora-advisor-ai` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | Revisar dominios profesional/fiscal/laboral/financiero |
| `anclora-filestudio` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | Confirmar si OCR/background removal/extracción documental requieren tarjeta AI Act propia y registro de proveedor/modelo |
| `anclora-nexus` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | Documentar usos permitidos y bloquear scoring sensible |
| `anclora-content-generator-ai` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | Aplicar AI System Card y reglas Hermes |
| `anclora-impulso` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | Delimitar wellness frente a consejo médico/nutricional |
| `anclora-command-center` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | Confirmar agentes o automatizaciones activas |
| `anclora-data-lab` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | Documentar no PII, agregación y reidentificación |
| `anclora-energyscan` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | Añadir disclaimers IA/orientativo en resultados y PDF |
| `anclora-syncxml` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | DPIA/RGPD, revisión humana obligatoria y proveedor/parser |
| `anclora-synergi` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | Documentar handoff y consentimiento |
| `anclora-talent` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | NO | PARTIAL | PARTIAL | Revisión legal reforzada por empleo antes de ranking/scoring |
| `anclora-private-estates` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | Confirmar IA activa en recomendaciones o copy |
| `anclora-private-estates-landing` | PARTIAL | PARTIAL | N/A | PARTIAL | N/A | PARTIAL | PARTIAL | Añadir disclosure si se incorpora chat o personalización IA |
| `anclora-portfolio` | PARTIAL | PARTIAL | N/A | PARTIAL | N/A | PARTIAL | PARTIAL | Revisar contenido asistido y claims |
| `anclora-azure-bay-landing` | PARTIAL | PARTIAL | N/A | PARTIAL | N/A | PARTIAL | PARTIAL | Revisar contenido asistido y claims |
| `anclora-playa-viva-uniestate` | PARTIAL | PARTIAL | N/A | PARTIAL | N/A | PARTIAL | PARTIAL | Revisar contenido asistido y claims |
| `anclora-linguo-cam` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | Revisar OCR/visión, imágenes, retención y PII |

### Universal · UI Motion

| Aplicación | M1 | M2 | M3 | M4 | M5 | M6 |
| --- | --- | --- | --- | --- | --- | --- |
| `anclora-advisor-ai` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-filestudio` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-nexus` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-content-generator-ai` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-impulso` | PARTIAL | PARTIAL | OK | PARTIAL | PARTIAL | OK |
| `anclora-command-center` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-data-lab` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-energyscan` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-synergi` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-talent` | PARTIAL | N/A | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-private-estates` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-private-estates-landing` | PARTIAL | PARTIAL | OK | OK | PARTIAL | PARTIAL |
| `anclora-portfolio` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-azure-bay-landing` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-playa-viva-uniestate` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |

### Universal · Modal

| Aplicación | D1 | D2 | D3 | D4 | D5 | D6 |
| --- | --- | --- | --- | --- | --- | --- |
| `anclora-advisor-ai` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-filestudio` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-nexus` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-content-generator-ai` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-impulso` | OK | OK | PARTIAL | OK | OK | OK |
| `anclora-command-center` | N/A | N/A | N/A | N/A | N/A | N/A |
| `anclora-data-lab` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-energyscan` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-synergi` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-talent` | N/A | N/A | N/A | N/A | N/A | N/A |
| `anclora-private-estates` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-private-estates-landing` | N/A | N/A | N/A | N/A | N/A | N/A |
| `anclora-portfolio` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-azure-bay-landing` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-playa-viva-uniestate` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |

### Universal · Localization

| Aplicación | L1 | L2 | L3 | L4 | L5 |
| --- | --- | --- | --- | --- | --- |
| `anclora-advisor-ai` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-filestudio` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-nexus` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-content-generator-ai` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-impulso` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-command-center` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-data-lab` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-energyscan` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-synergi` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-talent` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-private-estates` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-private-estates-landing` | OK | OK | OK | OK | PARTIAL |
| `anclora-portfolio` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-azure-bay-landing` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-playa-viva-uniestate` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |

### Family · Internal

| Aplicación | I1 | I2 | I3 |
| --- | --- | --- | --- |
| `anclora-advisor-ai` | PARTIAL | PARTIAL | PARTIAL |
| `anclora-filestudio` | PARTIAL | PARTIAL | PARTIAL |
| `anclora-nexus` | PARTIAL | PARTIAL | PARTIAL |
| `anclora-content-generator-ai` | PARTIAL | PARTIAL | PARTIAL |

### Family · Premium

| Aplicación | P1 | P2 | P3 | P4 | P5 |
| --- | --- | --- | --- | --- | --- |
| `anclora-impulso` | PARTIAL | OK | PARTIAL | PARTIAL | PARTIAL |
| `anclora-command-center` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-data-lab` | PARTIAL | OK | PARTIAL | PARTIAL | PARTIAL |
| `anclora-energyscan` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |
| `anclora-synergi` | PARTIAL | OK | PARTIAL | PARTIAL | PARTIAL |
| `anclora-talent` | PARTIAL | PARTIAL | PARTIAL | PARTIAL | PARTIAL |

### Family · Ultra Premium

| Aplicación | U1 | U2 | U3 |
| --- | --- | --- | --- |
| `anclora-private-estates` | PARTIAL | PARTIAL | PARTIAL |
| `anclora-private-estates-landing` | OK | OK | PARTIAL |

### Family · Portfolio / Showcase

| Aplicación | S1 | S2 | S3 |
| --- | --- | --- | --- |
| `anclora-portfolio` | PARTIAL | PARTIAL | PARTIAL |
| `anclora-azure-bay-landing` | PARTIAL | PARTIAL | PARTIAL |
| `anclora-playa-viva-uniestate` | PARTIAL | PARTIAL | PARTIAL |

## Gaps confirmados que ya están registrados

| ID | Ámbito | Aplicaciones | Gap |
| --- | --- | --- | --- |
| `CHG-0003` | `PREMIUM` | `anclora-impulso`, `anclora-data-lab`, `anclora-synergi`, `anclora-command-center` | Falta decidir si la coherencia visual de cards premium debe pasar a contrato de familia o resolverse como ajustes locales por app |

## Uso

Cuando se cierre una auditoría o una propagación contractual:

1. actualizar la fila resumida de la app
2. actualizar el bloque detallado del contrato afectado
3. actualizar `Cobertura auditada` y `Gaps abiertos`
4. actualizar `Última auditoría`

La matriz mide cumplimiento. No sustituye a los contratos.

