# ANCLORA_AI_ACT_COMPLIANCE_BASELINE

## 1. Propósito del documento

Este contrato define una baseline interna, técnica y preliminar para diseñar, documentar y revisar features IA en el ecosistema Anclora. No es asesoramiento jurídico definitivo y queda pendiente de revisión legal cuando una feature afecte a personas físicas, datos personales, decisiones sensibles o comunicación pública.

## 2. Alcance

Aplica a Anclora Group, Anclora Nexus, Anclora Content Generator AI, Anclora Private Estates, Anclora Private Estates Landing, Anclora Data Lab, Anclora Synergi, Anclora Advisor AI, Anclora EnergyScan, Anclora SyncXML, Anclora Linguo Cam, Anclora Talent, Anclora Impulso, AncloraPress UI / Anclora Press cuando proceda, y Hermes Agent cuando actúe como worker, agente de curación o validador.

## 3. Estado y limitaciones

Este documento es una baseline de cumplimiento prudente. No garantiza cumplimiento legal, no sustituye asesoramiento profesional y no convierte hipótesis regulatorias en obligación consolidada. AI/Digital Omnibus se trata como hipótesis regulatoria pendiente de verificación oficial.

## 4. Principios de cumplimiento IA de Anclora

- Transparencia contextual cuando una salida sea generada o asistida por IA.
- Supervisión humana efectiva para acciones externas, decisiones sensibles y outputs con impacto económico, legal, laboral, técnico o reputacional.
- Minimización de datos y separación de información personal cuando sea posible.
- Trazabilidad de modelo, proveedor, datos enviados, límites y revisión.
- Redacción prudente: probable, preliminar, pendiente de revisión legal, buena práctica, hipótesis regulatoria, requiere verificación.

## 5. Roles probables de Anclora en la cadena de valor IA

Anclora probablemente actuará como deployer, proveedor downstream o proveedor de sistema IA según el producto y la feature. No debe afirmarse que Anclora es proveedor GPAI si solo integra APIs externas o modelos de terceros. Cada feature IA debe documentar la distribución de responsabilidades entre Anclora, proveedor de modelo, cliente y usuario final.

## 6. Distinción entre EU AI Act, GPAI Code of Practice, RGPD y propuestas regulatorias

EU AI Act, GPAI Code of Practice, RGPD y propuestas como AI/Digital Omnibus deben mantenerse separados en la documentación. El GPAI Code of Practice puede orientar buenas prácticas, pero no elimina riesgos. RGPD sigue siendo crítico cuando se tratan datos personales, especialmente en SyncXML, Talent, Advisor AI, Impulso y EnergyScan.

## 7. Clasificación preliminar por familias de producto

- Entidad Matriz: riesgo IA normalmente bajo si solo informa, gobierna o documenta.
- Internal: riesgo variable por asistentes, análisis y generación de contenido.
- Premium: riesgo variable; EnergyScan y SyncXML requieren controles reforzados por impacto técnico, económico o datos personales.
- Ultra Premium: riesgo bajo/variable salvo scoring, recomendación personalizada o decisiones sobre clientes.
- Portfolio / Showcase: riesgo limitado si la IA solo asiste contenido; transparencia necesaria si se publica contenido sintético.

## 8. Obligaciones y buenas prácticas transversales

- Mantener AI System Card para features IA relevantes.
- Mantener AI Feature Register por producto.
- Registrar proveedores y modelos en [[ANCLORA_MODEL_PROVIDER_REGISTER]].
- Documentar límites y disclaimers visibles.
- Revisar legalmente cualquier automatización con impacto sensible.
- Guardar evidencia suficiente sin almacenar datos personales innecesarios.

## 9. Transparencia e identificación de IA

Debe informarse cuando el usuario interactúe con IA o reciba resultados generados o asistidos por IA. Para contenido generado, preparar mecanismos de transparencia e identificación de contenido generado o asistido por IA cuando aplique; alcance y calendario pendientes de verificación oficial.

## 10. Supervisión humana

La decisión final corresponde al usuario o profesional responsable. La supervisión humana no debe ser nominal: debe permitir revisar, corregir, rechazar, detener o escalar una salida antes de usarla en producción, comunicarla externamente o aplicarla a una decisión sensible.

## 11. Gestión de proveedores de modelos IA

Cada integración debe registrar proveedor, modelo, tipo de integración, datos enviados, retención conocida, uso para entrenamiento, región/transferencias, documentación del proveedor, estado de revisión, riesgos y mitigaciones. Si un dato no se conoce, se marca como `Pendiente`.

## 12. Datos personales, privacidad y DPIA

Cuando una feature trate datos personales o pueda afectar significativamente a personas físicas, debe evaluarse DPIA/RGPD. SyncXML debe tratarse con privacidad por defecto, minimización y revisión humana obligatoria. Talent requiere cautela reforzada por empleo. Advisor AI requiere límites por dominio.

## 13. Copyright, contenido generado y uso aceptable

El contenido generado o asistido por IA debe respetar contratos de marca, copyright, localización y uso aceptable. Hermes Agent no debe alterar textos legales, claims comerciales o copy sensible sin revisión humana.

## 14. Productos sensibles y zonas de alto riesgo

Zonas sensibles: empleo, crédito, educación, salud, vivienda, acceso a servicios, decisiones legales, sistemas oficiales y scoring de personas. Art. 6(3) debe tratarse como autoevaluación documentada sobre si el sistema realiza una tarea asistiva, preparatoria o procedimental, pendiente de revisión legal.

## 15. Reglas de copy, claims y disclaimers

Prohibido afirmar: cumplimiento automático, garantía legal, certificación oficial, sustitución profesional, ahorro garantizado, selección automática segura o exención total de responsabilidad. Usar distribución de responsabilidades y reforzar obligaciones de supervisión humana del cliente, sin excluir responsabilidades legales no renunciables.

## 16. Checklist para nuevas features IA

- ¿Qué hace la IA?
- ¿Qué no hace?
- ¿Qué modelo/proveedor usa?
- ¿Qué datos trata?
- ¿Afecta a personas físicas?
- ¿Puede influir en empleo, crédito, educación, salud, vivienda, acceso a servicios o decisiones legales?
- ¿Genera contenido sintético?
- ¿El usuario sabe que hay IA?
- ¿Hay revisión humana?
- ¿Se guarda evidencia/log?
- ¿Hay alternativa manual?
- ¿Hay disclaimer visible?
- ¿Requiere DPIA?
- ¿Requiere revisión legal?
- ¿Debe bloquearse en producción?

## 17. Puntos pendientes de revisión legal

- Clasificación final por feature y jurisdicción.
- Alcance real de obligaciones de transparencia.
- Tratamiento de alto riesgo en Talent y cualquier scoring de personas.
- Base legal, retención y DPIA en SyncXML.
- Límites de Advisor AI por asesoramiento profesional.
- Calendario oficial aplicable a obligaciones futuras.

## 18. Relación con otros contratos canónicos

- [[ANCLORA_BRAND_IDENTITY_AND_SEO_GEO_CONTRACT]]
- [[ANCLORA_GROUP_BRAND_IP_CONTRACT]]
- [[ANCLORA_ECOSYSTEM_ARCHITECTURE_CONTRACT]]
- [[ANCLORA_ECOSYSTEM_CONTRACT_GROUPS]]
- [[HERMES_COPY_CURATOR_CONTRACT]]
- [[LOCALIZATION_CONTRACT]]
- [[COOKIES_CONSENT_CONTRACT]]
- [[ANCLORA_AI_RISK_CLASSIFICATION_MATRIX]]
- [[ANCLORA_AI_HUMAN_OVERSIGHT_POLICY]]
- [[ANCLORA_AI_TRANSPARENCY_AND_DISCLOSURE_RULES]]
- [[ANCLORA_MODEL_PROVIDER_REGISTER]]
