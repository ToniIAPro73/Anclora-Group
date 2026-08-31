# ANCLORA_MODEL_PROVIDER_REGISTER

Registro vivo de proveedores, modelos e integraciones IA. No rellenar datos no confirmados; usar `Pendiente` hasta revisar documentación oficial o configuración real del producto.

| Producto | Feature IA | Proveedor | Modelo | Tipo de integración | Datos enviados | Retención conocida | Uso para entrenamiento | Región/transferencias | Documentación proveedor | Estado revisión | Riesgos | Mitigaciones |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Anclora Advisor AI | Asistente de decisión | Anthropic | Claude, versión pendiente | API externa | Consultas y contexto del usuario | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Asesoramiento profesional implícito | Disclaimers, límites de dominio, revisión legal |
| Anclora Advisor AI | Asistente local | Ollama / Mistral local | Mistral, versión pendiente | Modelo local | Consultas y contexto del usuario | Pendiente | Pendiente | Local/Pendiente | Pendiente | Pendiente | Configuración no auditada | Documentar despliegue y logs |
| Anclora Content Generator AI | Generación de copy | OpenAI | Pendiente | API externa | Prompts, brief, copy y contexto de producto | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Claims, copyright, contenido sintético | Revisión Hermes y disclosure |
| Hermes Agent | Curación y validación | OpenAI / Anthropic / Mistral | Pendiente | API externa o local | Copy, prompts, contexto de producto | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Cambios autónomos o legales sin revisión | Confirmación humana y contrato Hermes |
| Anclora EnergyScan | OCR/parsing documental | OCR/parser externo | Pendiente | API externa o librería local | Adjuntos y texto extraído | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | PII, documentos de vivienda, errores técnicos | Minimización, consentimiento, no retención innecesaria |
| Anclora EnergyScan | Prediagnóstico orientativo | Pendiente | Pendiente | Pendiente | Datos de inmueble y escenarios | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Parecer certificación oficial | Trazabilidad y disclaimers |
| Anclora GuestHub | Parsing/validación si se activa | Pendiente | Pendiente | Pendiente | Datos de huéspedes y reservas | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | PII sensible y sistemas oficiales | Privacidad por defecto, revisión humana, DPIA |
| Anclora Linguo Cam | OCR/visión/traducción | Google / Mistral / modelo local | Pendiente | API externa o local | Imágenes y texto extraído | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Imágenes con PII o documentos sensibles | Consentimiento y no retención por defecto |
| Anclora Data Lab | Analítica avanzada | Pendiente | Pendiente | Pendiente | Señales agregadas | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Reidentificación | Umbrales de agregación y no PII |
| Productos Anclora | Modelos locales | Local | Pendiente | Local | Según feature | Pendiente | No aplica/Pendiente | Local/Pendiente | Pendiente | Pendiente | Falta de auditoría de modelo | Registrar versión, origen y límites |
| Productos Anclora | Procesamiento documental | MinerU | Pendiente | Local o servicio externo según despliegue | Documentos procesados | Pendiente | Pendiente | Pendiente | Pendiente | Pendiente | Extracción de PII y copyright documental | Minimización, permisos y revisión |

## Instrucciones de uso

1. Crear una fila por producto y feature IA.
2. Registrar OpenAI, Anthropic, Mistral, Google, modelos locales, OCR/parser externo, MinerU y Hermes Agent cuando se usen.
3. No usar `Pendiente` en producción sin revisión explícita de riesgo.
4. Actualizar la fila cuando cambie proveedor, modelo, región, retención o datos enviados.
5. Enlazar cada fila con su AI System Card cuando exista.

## Relacionado

- [[ANCLORA_AI_ACT_COMPLIANCE_BASELINE]]
- [[ANCLORA_AI_RISK_CLASSIFICATION_MATRIX]]
- [[ANCLORA_AI_HUMAN_OVERSIGHT_POLICY]]
