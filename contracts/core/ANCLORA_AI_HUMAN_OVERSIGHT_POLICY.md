# ANCLORA_AI_HUMAN_OVERSIGHT_POLICY

## 1. Principio general

Toda feature IA de Anclora debe mantener supervisión humana proporcional al riesgo. La supervisión humana efectiva permite entender, revisar, corregir, rechazar, detener o escalar una salida antes de que produzca impacto externo, económico, legal, laboral, técnico o reputacional.

## 2. Cuándo es obligatoria la supervisión humana

- Cuando la salida afecte a personas físicas.
- Cuando se trate empleo, salud, vivienda, crédito, educación, servicios esenciales o decisiones legales.
- Cuando una acción envíe datos a terceros, sistemas oficiales o comunicaciones externas.
- Cuando se publique contenido generado por IA con claims comerciales, técnicos o regulatorios.
- Cuando el sistema procese datos personales sensibles o documentos identificativos.

## 3. Qué significa supervisión humana efectiva

- El usuario sabe que hay IA.
- La salida se presenta como preliminar, no definitiva.
- El usuario puede ver la información de entrada relevante.
- El usuario puede editar, rechazar o pedir regeneración.
- El usuario confirma explícitamente antes de acciones sensibles.
- Se conserva evidencia mínima de revisión sin retener datos personales innecesarios.

## 4. Acciones que requieren confirmación explícita

- Enviar XML a sistemas oficiales o preproducción sensible.
- Publicar contenido generado por IA con claims relevantes.
- Emitir informes energéticos/técnicos usados para decisión económica.
- Recomendar decisiones de contratación.
- Rechazar, ordenar o puntuar personas.
- Generar recomendaciones legales, financieras o médicas.
- Ejecutar agentes que modifiquen datos o envíen comunicaciones externas.

## 5. Productos con supervisión reforzada

- [[Anclora GuestHub]]: revisión humana obligatoria antes de cualquier exportación o uso en flujos oficiales.
- [[Anclora Talent]]: no debe ejecutar ranking, rechazo o recomendación de contratación sin revisión legal reforzada.
- [[Anclora EnergyScan]]: outputs orientativos, con confirmación antes de handoff económico o técnico.
- [[Anclora Advisor AI]]: límites claros cuando el dominio sea fiscal, laboral, legal, financiero o médico.
- [[Hermes-Agent]]: no modifica textos legales, claims sensibles o repos consumidores sin aprobación humana.

## 6. Registros y trazabilidad

Registrar feature, modelo/proveedor, usuario revisor, timestamp, decisión tomada, versión de prompt o plantilla y evidencia mínima. Evitar guardar secretos, credenciales o datos personales no necesarios.

## 7. Mensajes UI recomendados

- `Resultado generado o asistido por IA. Revísalo antes de utilizarlo.`
- `La decisión final corresponde al usuario o profesional responsable.`
- `Esta herramienta no sustituye asesoramiento profesional cuando sea aplicable.`

## 8. Casos prohibidos sin revisión legal

- Decisión automatizada sobre empleo, contratación, rechazo o ranking de personas.
- Integración autónoma con sistemas oficiales.
- Recomendaciones médicas, legales, financieras o laborales presentadas como definitivas.
- Scoring de personas o acceso a servicios.
- Retención de datos personales sensibles sin base documentada.

## 9. Relación con contratos existentes

- [[ANCLORA_AI_ACT_COMPLIANCE_BASELINE]]
- [[ANCLORA_AI_RISK_CLASSIFICATION_MATRIX]]
- [[ANCLORA_AI_TRANSPARENCY_AND_DISCLOSURE_RULES]]
- [[ANCLORA_GROUP_BRAND_IP_CONTRACT]]
- [[HERMES_COPY_CURATOR_CONTRACT]]
