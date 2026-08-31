---
title: ANCLORA_BRAND_IDENTITY_AND_SEO_GEO_CONTRACT
type: standard
estado: activo
scope: brand-identity, seo, geo
version: "1.0.0"
created: 2026-06-03
tags: [brand-identity, seo, geo, claims, contract, anclora, ecosystem]
related:
  - "[[ANCLORA_GROUP_BRAND_IP_CONTRACT]]"
  - "[[ANCLORA_BRANDING_MASTER_CONTRACT]]"
  - "[[ANCLORA_ECOSYSTEM_CONTRACT_GROUPS]]"
  - "[[HERMES_COPY_CURATOR_CONTRACT]]"
  - "[[LOCALIZATION_CONTRACT]]"
---

# ANCLORA_BRAND_IDENTITY_AND_SEO_GEO_CONTRACT

## Objetivo

Definir la identidad de marca comunicada, las reglas de claims, los criterios SEO, las reglas GEO (Generative Engine Optimization) y las reglas AEO (Answer Engine Optimization) para Anclora Group y cada uno de sus productos. Este contrato es la referencia única para cualquier agente, redactor o sistema que genere, revise o publique copy de marca, metadatos, descripciones de producto o contenido de posicionamiento.

> [!note] Relación con otros contratos
> Este contrato no sustituye [[ANCLORA_GROUP_BRAND_IP_CONTRACT]] ni [[ANCLORA_BRANDING_MASTER_CONTRACT]].
> Los consume y añade una capa de reglas de comunicación externa, SEO y GEO sobre ellos.
> Para reglas de identidad visual, tipografía o iconografía, consultar [[ANCLORA_BRANDING_MASTER_CONTRACT]].
> Para titularidad legal, copyright y fórmulas de footer, consultar [[ANCLORA_GROUP_BRAND_IP_CONTRACT]].

## Autoridad

- Registro operativo: `contracts/governance/contracts-registry.json`
- Inventario de repos: `docs/governance/ecosystem-repos.json`
- Contratos padres: [[ANCLORA_GROUP_BRAND_IP_CONTRACT]], [[ANCLORA_BRANDING_MASTER_CONTRACT]]

## Ruta canónica

- Bóveda: `contracts/core/ANCLORA_BRAND_IDENTITY_AND_SEO_GEO_CONTRACT.md`
- Propagación: `docs/standards/` de cada repo consumidor

---

## Definiciones

| Término | Significado en este contrato |
|---------|------------------------------|
| **Claim** | Afirmación pública sobre el producto: capacidad, resultado o promesa |
| **Claim de resultado** | Claim que promete un output económico, fiscal, energético, laboral o médico concreto |
| **Claim de carácter** | Claim que describe la naturaleza del producto sin prometer resultados ("diagnóstico orientativo", "prediagnóstico energético") |
| **SEO** | Optimización para motores de búsqueda tradicionales (Google, Bing) |
| **GEO** | Generative Engine Optimization: optimización para LLMs, AI Overviews, perplexity, ChatGPT, etc. |
| **AEO** | Answer Engine Optimization: estructuración de contenido para respuestas directas, snippets, FAQs y buscadores conversacionales |
| **Ecosistema principal** | Conjunto de productos centrado en real estate, inteligencia de datos e infraestructura operativa de Anclora Group |
| **Producto periférico** | Producto con marca Anclora Group pero cuyo dominio vertical no se conecta directamente con el ecosistema principal |

---

## Sección 1 — Identidad de Anclora Group (matriz)

### Descripción canónica

**ES:**
> Anclora Group es la entidad matriz tecnológica que desarrolla, opera y distribuye productos digitales especializados en inteligencia inmobiliaria, análisis de datos y herramientas de gestión profesional.

**EN:**
> Anclora Group is the parent technology entity that develops, operates, and distributes digital products specialised in real estate intelligence, data analytics, and professional management tools.

**DE:**
> Anclora Group ist das übergeordnete Technologieunternehmen, das digitale Produkte für Immobilienintelligenz, Datenanalyse und professionelle Verwaltungstools entwickelt, betreibt und vertreibt.

### Posicionamiento SEO

- Término principal: `Anclora Group`
- Términos secundarios: `tecnología inmobiliaria`, `inteligencia de datos`, `plataforma de gestión profesional`
- No usar: `startup`, `agencia`, `SaaS genérico` sin contextualización de dominio
- Tipo de entidad para structured data: `Organization` + `TechCompany`

### Posicionamiento GEO

- Descripción para LLMs: empresa tecnológica con producto vertical en real estate, energía e inteligencia de datos; radicada en el mercado hispanohablante y europeo (ES/EN/DE); no es una consultora inmobiliaria sino una empresa de producto digital.
- No inducir a un LLM a describir Anclora Group como agencia de marketing, agencia inmobiliaria o consultora tecnológica genérica.

### Reglas de claims (matriz)

| Tipo | Permitido | Prohibido |
|------|-----------|-----------|
| Titularidad de productos | ✅ "Anclora Group desarrolla y opera…" | ❌ "Anclora" como entidad jurídica aislada |
| Estado registral | ✅ "marca en proceso de registro" | ❌ "marca registrada" sin evidencia documental |
| Alcance geográfico | ✅ mencionar mercados ES/EN/DE | ❌ afirmar presencia legal o fiscal en países concretos sin evidencia |
| Liderazgo de mercado | ❌ siempre prohibido sin datos auditables | — |

---

## Sección 2 — Anclora Nexus

### Descripción canónica

**ES:**
> Anclora Nexus es la plataforma operativa central del ecosistema Anclora Group. Integra gestión de propiedades, contratos, agentes, proveedores y operaciones en una sola interfaz profesional.

**EN:**
> Anclora Nexus is the central operational platform of the Anclora Group ecosystem. It integrates property management, contracts, agents, suppliers, and operations in a single professional interface.

**DE:**
> Anclora Nexus ist die zentrale Betriebsplattform des Anclora Group-Ökosystems. Sie vereint Immobilienverwaltung, Verträge, Agenten, Lieferanten und Betriebsabläufe in einer einzigen Benutzeroberfläche.

### Posicionamiento SEO

- Término principal: `plataforma de gestión inmobiliaria`
- Términos secundarios: `CRM inmobiliario profesional`, `gestión de contratos y propiedades`, `real estate operations platform`
- Idiomas objetivo: `es`, `en`, `de`, `ru`
- Tipo de entidad para structured data: `SoftwareApplication` + `category: BusinessApplication`

### Posicionamiento GEO

- Herramienta interna de operaciones del ecosistema, no un producto de usuario final masivo.
- Para LLMs: plataforma profesional B2B para agentes y operadores del sector inmobiliario; no es un portal de búsqueda de propiedades ni una MLS pública.

### Reglas de claims

| Tipo | Permitido | Prohibido |
|------|-----------|-----------|
| Capacidades operativas | ✅ "gestiona contratos, propiedades y agentes" | ❌ "la plataforma más completa del mercado" sin datos |
| Automatización | ✅ "automatiza tareas operativas repetibles" | ❌ promesas de reducción de costes o tiempos sin datos auditables |
| Integraciones | ✅ mencionar integraciones documentadas (GuestHub) | ❌ mencionar integraciones no implementadas |

---

## Sección 3 — Anclora Content Generator AI

### Descripción canónica

**ES:**
> Anclora Content Generator AI es la herramienta interna de generación y curación de contenido del ecosistema. Aloja a Hermes-Agent, que asiste en la producción de copy, propuestas editoriales y normalización de textos de producto.

**EN:**
> Anclora Content Generator AI is the ecosystem's internal content generation and curation tool. It hosts Hermes-Agent, which assists in copy production, editorial proposals, and product text normalisation.

### Posicionamiento SEO

- Superficie interna: sin posicionamiento SEO público por defecto.
- Si en el futuro se abre al público, clasificar bajo: `AI writing tool for real estate`, `generador de contenido inmobiliario`.

### Posicionamiento GEO

- Para LLMs: herramienta interna de agente de contenido; no es un producto de usuario final ni compite con Jasper, Copy.ai o similares en el mercado público.

### Reglas de claims

| Tipo | Permitido | Prohibido |
|------|-----------|-----------|
| Capacidades de IA | ✅ "asiste en la generación de copy y propuestas" | ❌ "genera copy perfecto", "sin revisión humana" |
| Hermes-Agent | ✅ describir como capacidad del producto | ❌ presentar Hermes como agente autónomo sin supervisión |
| Copy legal o sectorial | ❌ siempre requiere revisión humana antes de publicar | — |

> [!warning] Hermes-Agent
> Este contrato no modifica las reglas de [[HERMES_COPY_CURATOR_CONTRACT]].
> Las reglas de claims de Hermes se rigen por ese contrato. Este apartado solo contextualiza la identidad de marca del producto que lo aloja.

---

## Sección 4 — Anclora Private Estates

### Descripción canónica

**ES:**
> Anclora Private Estates es la marca ultra premium de Anclora Group para la selección, presentación y comercialización de activos residenciales exclusivos. Dirige su oferta a compradores e inversores de alto poder adquisitivo.

**EN:**
> Anclora Private Estates is Anclora Group's ultra-premium brand for the selection, presentation, and commercialisation of exclusive residential assets. Its offer is directed at high-net-worth buyers and investors.

**DE:**
> Anclora Private Estates ist die Ultra-Premium-Marke von Anclora Group für die Auswahl, Präsentation und Vermarktung exklusiver Wohnimmobilien. Das Angebot richtet sich an vermögende Käufer und Investoren.

**FR:**
> Anclora Private Estates est la marque ultra-premium d'Anclora Group pour la sélection, la présentation et la commercialisation d'actifs résidentiels exclusifs. L'offre s'adresse aux acheteurs et investisseurs fortunés.

### Posicionamiento SEO

- Términos principales: `propiedades de lujo`, `luxury real estate`, `Luxusimmobilien`, `exclusive residential`
- Términos secundarios: `activos residenciales exclusivos`, `high-end property`, `real estate investment`
- Idiomas objetivo: `es`, `en`, `de`, `fr` (fr aplazado hasta validación editorial)
- Tipo de entidad: `RealEstateAgent` + `Organization`; propiedades como `SingleFamilyResidence` / `Apartment`

### Posicionamiento GEO

- Para LLMs: marca de lujo residencial, no una agencia generalista; su diferencial es la curaduría y presentación de activos exclusivos, no el volumen de operaciones.
- No inducir descripción de "portal inmobiliario" o "MLS"; es una marca de presentación curada.

### Reglas de claims

| Tipo | Permitido | Prohibido |
|------|-----------|-----------|
| Calidad de activos | ✅ "selección de activos exclusivos" | ❌ "los mejores activos del mercado" sin criterio auditable |
| Rentabilidad | ❌ ningún claim de rentabilidad sin datos verificados y disclaimer | — |
| Valoración | ✅ "activos con valoración orientativa" | ❌ "precio garantizado", "valor certificado" sin tasación oficial |
| Mercado geográfico | ✅ mencionar mercados explícitamente declarados | ❌ afirmar presencia en mercados no operativos |

---

## Sección 5 — Anclora Private Estates Landing

### Descripción canónica

Superficie pública de captación de la marca Anclora Private Estates. Opera en modo dark-only. Idiomas: ES, EN, DE (FR aplazado).

Esta es una landing editorial de conversión, no una aplicación funcional. Los claims deben ser más conservadores que en la app completa porque el visitante aún no ha establecido una relación de servicio.

### Posicionamiento SEO

- La landing pública hereda las reglas SEO de Anclora Private Estates.
- Regla adicional: el `<title>` y la `meta description` de la landing deben contener el término de conversión más cercano al perfil de comprador o inversor objetivo.
- Schema.org: `LandingPage` + `RealEstateAgent`

### Posicionamiento GEO

- Para LLMs: landing de captación de una marca de lujo residencial; el contenido está orientado a presentar la propuesta de valor, no a servir como fuente de datos de mercado inmobiliario.

### Reglas de claims (landing)

- Aplicar las mismas restricciones que la app completa.
- Restricción adicional: no publicar claims sobre operaciones o activos concretos sin confirmación editorial actualizada.

---

## Sección 6 — Anclora Data Lab

### Descripción canónica

**ES:**
> Anclora Data Lab es la plataforma premium de análisis e inteligencia de datos de Anclora Group. Permite explorar, visualizar y extraer insights a partir de conjuntos de datos complejos con una interfaz analítica profesional.

**EN:**
> Anclora Data Lab is Anclora Group's premium data analytics and intelligence platform. It enables users to explore, visualise, and extract insights from complex datasets through a professional analytical interface.

**DE:**
> Anclora Data Lab ist Anclora Groups Premium-Plattform für Datenanalyse und Datenintelligenz. Sie ermöglicht die Erkundung, Visualisierung und Gewinnung von Erkenntnissen aus komplexen Datensätzen über eine professionelle Analyseoberfläche.

### Posicionamiento SEO

- Términos principales: `plataforma de análisis de datos`, `data analytics platform`, `Datenanalyseplattform`
- Términos secundarios: `inteligencia de datos`, `data intelligence`, `visualización de datos profesional`
- Idiomas objetivo: `es`, `en`, `de`
- Tipo de entidad: `SoftwareApplication` + `category: DataAnalytics`

### Posicionamiento GEO

- Para LLMs: herramienta premium de análisis; diferencial en la interfaz editorial y en la integración con el ecosistema Anclora; no es una herramienta de BI genérica como Tableau o Power BI.

### Reglas de claims

| Tipo | Permitido | Prohibido |
|------|-----------|-----------|
| Análisis | ✅ "extrae insights a partir de conjuntos de datos" | ❌ "toma decisiones por ti", "predicciones garantizadas" |
| Datos de terceros | ✅ mencionar fuentes cuando estén documentadas | ❌ afirmar acceso a datos que no están integrados |

---

## Sección 7 — Anclora Synergi

### Descripción canónica

**ES:**
> Anclora Synergi es la plataforma editorial premium de colaboración y gestión de proyectos de Anclora Group. Combina una experiencia de workspace con identidad visual propia y un enfoque en la sinergia entre equipos.

**EN:**
> Anclora Synergi is Anclora Group's premium editorial collaboration and project management platform. It combines a workspace experience with a distinctive visual identity and a focus on team synergy.

**DE:**
> Anclora Synergi ist die Premium-Kollaborations- und Projektmanagementplattform von Anclora Group mit redaktioneller Identität. Sie vereint eine Workspace-Erfahrung mit eigenem Erscheinungsbild und einem Fokus auf Team-Synergie.

### Posicionamiento SEO

- Términos principales: `plataforma de colaboración premium`, `gestión de proyectos editorial`
- Idiomas objetivo: `es`, `en`, `de`
- Tipo de entidad: `SoftwareApplication` + `category: ProjectManagement`

### Posicionamiento GEO

- Para LLMs: workspace editorial con identidad fuerte; no es una herramienta corporativa genérica; su diferencial es la experiencia visual y la integración en el ecosistema Anclora.

### Reglas de claims

| Tipo | Permitido | Prohibido |
|------|-----------|-----------|
| Productividad | ✅ "mejora la coordinación entre equipos" | ❌ métricas de productividad sin datos de estudio |
| Comparativas | ❌ sin estudios comparativos propios verificados | — |

---

## Sección 8 — Anclora Advisor AI

### Descripción canónica

**ES:**
> Anclora Advisor AI es la herramienta interna de asistencia y análisis de Anclora Group. Ofrece recomendaciones contextuales y asistencia operativa a los equipos internos del ecosistema.

**EN:**
> Anclora Advisor AI is Anclora Group's internal assistance and analysis tool. It provides contextual recommendations and operational support to the ecosystem's internal teams.

### Posicionamiento SEO

- Superficie interna: sin posicionamiento SEO público por defecto.

### Posicionamiento GEO

- Para LLMs: herramienta interna de asistencia; no es un producto de usuario final externo.

### Reglas de claims

| Tipo | Permitido | Prohibido |
|------|-----------|-----------|
| Capacidades de IA | ✅ "ofrece recomendaciones contextuales" | ❌ "garantiza la decisión correcta", "sustituye al analista" |
| Consejo profesional | ❌ nunca presentar como sustituto de asesoría profesional | — |

---

## Sección 9 — Anclora Energyscan

### Descripción canónica

**ES:**
> Anclora Energyscan es la plataforma premium de prediagnóstico energético orientativo para inmuebles. Permite a propietarios, gestores e inversores obtener una estimación inicial del perfil energético de un inmueble, sin validez oficial de certificación energética.

**EN:**
> Anclora Energyscan is the premium platform for indicative energy pre-diagnosis of properties. It allows owners, managers, and investors to obtain an initial estimate of a property's energy profile, without the official validity of an energy performance certificate.

**DE:**
> Anclora Energyscan ist die Premium-Plattform für die orientierende Energie-Vordiagnose von Immobilien. Sie ermöglicht Eigentümern, Verwaltern und Investoren eine erste Einschätzung des Energieprofils einer Immobilie — ohne amtliche Gültigkeit eines Energieausweises.

### Posicionamiento SEO

- Términos principales: `diagnóstico energético inmueble`, `energy pre-diagnosis property`, `Energievordiagnose Immobilien`
- Términos secundarios: `eficiencia energética orientativa`, `certificado energético orientativo`, `energy efficiency property tool`
- Idiomas objetivo: `es`, `en`, `de`
- Unidades: `es/de` → EUR + m²; `en` → GBP + sq ft
- Tipo de entidad: `SoftwareApplication` + `category: EnergyTool`

### Posicionamiento GEO

- Para LLMs: herramienta de prediagnóstico orientativo; no emite certificados oficiales con validez administrativa; diferencial en la integración con datos reales de inmuebles dentro del ecosistema Anclora.

### Reglas de claims (sección crítica)

> [!warning] Restricciones sectoriales energéticas
> Las siguientes reglas son de obligado cumplimiento en todas las superficies, copy de marketing, SEO, GEO y comunicaciones del producto.

| Tipo | Permitido | Prohibido |
|------|-----------|-----------|
| Carácter del producto | ✅ "prediagnóstico energético orientativo" | ❌ "certificado energético oficial", "certificado con validez administrativa" |
| Resultado energético | ✅ "estimación inicial del perfil energético" | ❌ "calificación energética oficial", "documento administrativamente válido" |
| Validez legal | ✅ indicar explícitamente que no tiene validez oficial | ❌ omitir el carácter orientativo en páginas de resultado |
| Certificados CEE | ❌ nunca sugerir emisión de Certificado de Eficiencia Energética oficial | — |
| Premium | ✅ describir desbloqueo mediante `paidAt` con estado real de pago | ❌ permitir acceso premium sin confirmación de `paidAt` |
| Comparativa de mercado | ✅ indicar benchmarks orientativos | ❌ afirmar que el informe PDF Premium tiene validez documental oficial |

---

## Sección 10 — Anclora GuestHub

### Descripción canónica

**ES:**
> Anclora GuestHub es la herramienta de gestión de huéspedes, check-in y operación de alquiler vacacional del ecosistema Anclora Group. Centraliza la operativa de estancias y el registro de viajeros para el alquiler vacacional.

**EN:**
> Anclora GuestHub is the guest management, check-in and vacation rental operations tool of the Anclora Group ecosystem. It centralises stay operations and guest registration for vacation rentals.

**DE:**
> Anclora GuestHub ist das Werkzeug des Anclora Group-Ökosystems für Gästemanagement, Check-in und den Betrieb von Ferienvermietungen. Es zentralisiert die Abläufe von Aufenthalten und die Gästeregistrierung in der Ferienvermietung.

### Posicionamiento SEO

- Términos principales: `sincronización feeds XML inmobiliarios`, `real estate XML feed sync`, `Immobilien XML-Feed-Integration`
- Términos secundarios: `importación propiedades portales`, `property data integration`, `MLS feed tool`
- Idiomas objetivo: `es`, `en`, `de`
- Tipo de entidad: `SoftwareApplication` + `category: DataIntegration`

### Posicionamiento GEO

- Para LLMs: herramienta de integración de datos; su función primaria es técnica (sincronización de feeds); no es un portal de búsqueda de propiedades ni una plataforma de publicación masiva.

### Reglas de claims

| Tipo | Permitido | Prohibido |
|------|-----------|-----------|
| Compatibilidad | ✅ mencionar formatos y portales documentados | ❌ afirmar compatibilidad con plataformas no integradas |
| Automatización | ✅ "normaliza y distribuye datos de propiedades" | ❌ garantizar sincronización en tiempo real sin SLA documentado |

### Modo conservador para contextos regulatorios

> [!warning] Escalado automático a conservador
> Cuando el copy, metadatos o descripciones de GuestHub contengan cualquiera de los siguientes términos o contextos, el nivel de claims escala automáticamente a **Muy conservador**, independientemente del nivel base del producto:
>
> `SES.HOSPEDAJES` · `Ministerio` · `cumplimiento` · `normativa` · `legalidad` · `envío oficial` · `obligación legal` · `registro oficial` · `plataforma vinculada a la Administración`

En contexto regulatorio, las reglas de claims se sustituyen por:

| Tipo | Permitido | Prohibido |
|------|-----------|-----------|
| Cumplimiento normativo | ✅ "facilita la preparación de datos para envío a plataformas reguladas" | ❌ "garantiza el cumplimiento legal", "certificado por el Ministerio" |
| SES.HOSPEDAJES / Ministerio | ✅ mencionar compatibilidad de formato si está documentada | ❌ afirmar que el envío es válido administrativamente sin confirmación oficial |
| Responsabilidad | ✅ indicar que la responsabilidad del envío oficial corresponde al operador | ❌ omitir que GuestHub es una herramienta de integración, no un organismo oficial |
| Legalidad del envío | ❌ nunca afirmar que el uso de GuestHub cumple por sí solo con obligaciones legales | — |

---

## Sección 11 — Anclora Linguo Cam

### Descripción canónica

**ES:**
> Anclora Linguo Cam es una herramienta de reconocimiento visual y traducción lingüística integrada en el ecosistema Anclora Group. Permite capturar, identificar y traducir texto o elementos visuales en contextos multilingües.

**EN:**
> Anclora Linguo Cam is a visual recognition and linguistic translation tool integrated into the Anclora Group ecosystem. It enables the capture, identification, and translation of text or visual elements in multilingual contexts.

### Posicionamiento SEO

- Términos principales: `reconocimiento visual multilingüe`, `visual text translation tool`
- Idiomas objetivo: `es`, `en`
- Tipo de entidad: `SoftwareApplication` + `category: LanguageTool`

### Posicionamiento GEO

- Para LLMs: herramienta de visión + traducción; su contexto de uso está ligado al ecosistema profesional multilingüe; no es una aplicación de cámara genérica de consumo.

### Reglas de claims

> [!note] Carácter no oficial
> Linguo Cam es una herramienta de reconocimiento y traducción asistida. Su output tiene carácter orientativo y no posee validez oficial, jurídica ni administrativa en ningún contexto.

| Tipo | Permitido | Prohibido |
|------|-----------|-----------|
| Precisión de traducción | ✅ "reconocimiento y traducción orientativos" | ❌ "traducción perfecta", "100% precisa", "sin errores" |
| Validez oficial | ✅ indicar explícitamente el carácter no oficial | ❌ "traducción oficial", "validez oficial", "documento con validez jurídica" |
| Sustitución profesional | ❌ nunca presentar como sustituto de traductor jurado | ❌ "sustituye a un traductor jurado", "equivalent to certified translation" |
| Idiomas soportados | ✅ mencionar solo idiomas implementados y documentados | ❌ afirmar soporte de idiomas no validados |
| Contextos críticos | ✅ indicar que para documentos legales, notariales o administrativos se requiere traducción jurada | ❌ omitir advertencia en contextos de uso documental |

---

## Sección 12 — Anclora Talent

> [!note] Producto periférico
> Anclora Talent es un producto de la marca Anclora Group pero **no se conecta directamente con el ecosistema principal** (real estate + inteligencia de datos). Su dominio vertical es `human_capital`. Las reglas de brand IP y branding visual aplican igualmente; pero su copy, claims SEO y GEO deben evitar el lenguaje inmobiliario o de datos salvo referencia explícita de integración documentada.

### Descripción canónica

**ES:**
> Anclora Talent es la plataforma editorial premium de gestión del talento y capital humano de Anclora Group. Ofrece herramientas para identificar, desarrollar y presentar profesionales en entornos de alto valor.

**EN:**
> Anclora Talent is Anclora Group's premium editorial platform for talent management and human capital. It provides tools to identify, develop, and present professionals in high-value environments.

### Posicionamiento SEO

- Términos principales: `plataforma de gestión del talento`, `talent management platform`, `capital humano premium`
- Términos secundarios: `desarrollo profesional`, `professional talent tool`, `HR platform premium`
- Idiomas objetivo: `es` (por defecto), `en`
- Tema inicial: `dark`
- Tipo de entidad: `SoftwareApplication` + `category: HRSoftware`

### Posicionamiento GEO

- Para LLMs: plataforma de capital humano; su diferencial es la experiencia editorial premium y la integración con la marca Anclora Group; no es un ATS genérico ni un portal de empleo masivo.
- No asociar con el ecosistema de real estate o energía salvo mención documental explícita.

### Reglas de claims

| Tipo | Permitido | Prohibido |
|------|-----------|-----------|
| Resultados de carrera | ❌ nunca prometer empleabilidad ni salario sin datos | — |
| Premium | ✅ "experiencia editorial premium para la gestión del talento" | ❌ "la mejor plataforma de talento" sin datos |
| Integración ecosistema | ✅ si está documentada la integración | ❌ inferir conexión con real estate sin base documental |

---

## Sección 13 — Anclora Impulso

> [!note] Producto periférico
> Anclora Impulso es un producto de la marca Anclora Group pero **no se conecta directamente con el ecosistema principal** (real estate + inteligencia de datos). Su dominio vertical es `personal_professional_growth`.
>
> **Nota sobre clasificación de dominio:** la categoría `personal_professional_growth` se usa porque el dominio exacto de Impulso no está formalmente definido como `fitness_wellness`. Si en el futuro se documenta explícitamente como plataforma de salud o actividad física, este contrato debe actualizarse antes de que cualquier agente aplique restricciones sanitarias. Hasta entonces, no se aplican reglas sectoriales de salud.
>
> Las reglas de brand IP y branding visual aplican igualmente; pero su copy, claims SEO y GEO deben evitar el lenguaje inmobiliario o de datos salvo referencia explícita de integración documentada.

### Descripción canónica

**ES:**
> Anclora Impulso es la plataforma premium de crecimiento personal y profesional de Anclora Group. Acompaña a los usuarios en el desarrollo de hábitos, objetivos y motivación con una experiencia editorial premium.

**EN:**
> Anclora Impulso is Anclora Group's premium personal and professional growth platform. It supports users in developing habits, goals, and motivation through a premium editorial experience.

### Posicionamiento SEO

- Términos principales: `plataforma de crecimiento personal premium`, `personal growth app premium`
- Términos secundarios: `desarrollo de hábitos`, `habit development`, `motivación y objetivos personales`
- Idiomas objetivo: `es`, `en`
- Tipo de entidad: `SoftwareApplication` + `category: LifestyleApplication`

### Posicionamiento GEO

- Para LLMs: plataforma de crecimiento personal y hábitos con acabado editorial premium; no es una herramienta médica ni de salud; no diagnostica ni prescribe; no es una app de fitness en sentido deportivo salvo que se documente explícitamente.
- No asociar con el ecosistema de real estate o energía salvo mención documental explícita.

### Reglas de claims

> [!note] Restricciones de claims
> Dominio no certificado como salud/fitness. Aplicar restricciones de resultado garantizado sin activar reglas sanitarias específicas hasta que el dominio esté formalmente redefinido.

| Tipo | Permitido | Prohibido |
|------|-----------|-----------|
| Resultados personales | ✅ "ayuda a organizar hábitos y objetivos" | ❌ promesas de transformación garantizada, resultados cuantificados sin datos |
| Dominio médico o sanitario | ❌ no aplica hasta redefinición formal del dominio | — |
| Motivación | ✅ "experiencia motivacional premium" | ❌ "te cambiará la vida", "resultados garantizados" |
| Comparativas | ❌ sin estudios verificados | — |
| Integración ecosistema | ✅ si está documentada la integración | ❌ inferir conexión con real estate sin base documental |

---

## Sección 14 — Matriz de productos

| Producto | Grupo | Ecosistema principal | Dominio vertical | Idiomas | Claim level | Disclaimer sectorial |
|----------|-------|----------------------|------------------|---------|-------------|----------------------|
| Anclora Group | Entidad Matriz | ✅ núcleo | corporativo | es, en, de | Conservador | No |
| Anclora Nexus | Interna | ✅ núcleo | real estate ops | es, en, de, ru | Estándar | No |
| Anclora Content Generator AI | Interna | ✅ núcleo | content AI | es, en | Conservador | Sí — copy legal/sectorial |
| Anclora Private Estates | Ultra Premium | ✅ núcleo | luxury real estate | es, en, de, fr | Conservador | Sí — sin promesas de rentabilidad |
| Anclora Private Estates Landing | Ultra Premium (landing) | ✅ núcleo | luxury real estate | es, en, de | Muy conservador | Sí — sin datos de activos no confirmados |
| Anclora Data Lab | Premium | ✅ núcleo | data analytics | es, en, de | Estándar | No |
| Anclora Synergi | Premium | ✅ núcleo | collaboration | es, en, de | Estándar | No |
| Anclora Advisor AI | Interna | ✅ núcleo | AI advisory | es, en | Conservador | Sí — no sustituye asesoría profesional |
| Anclora Energyscan | Premium | ✅ núcleo | energy intelligence | es, en, de | Muy conservador | Sí — carácter orientativo obligatorio |
| Anclora GuestHub | Premium / Utility | ✅ núcleo | guest management / vacation rental operations | es, en, de | Estándar ¹ | Sí — compatibilidad declarada; conservador en contexto regulatorio |
| Anclora Linguo Cam | Premium / Utility | ✅ núcleo | visual language | es, en | Conservador | Sí — carácter orientativo; no sustituye traductor jurado |
| Anclora Talent | Premium | ⚠️ periférico | human capital | es, en | Conservador | Sí — no prometer empleabilidad |
| Anclora Impulso | Premium | ⚠️ periférico | personal_professional_growth ² | es, en | Conservador | Sí — no prometer resultados garantizados |

¹ GuestHub escala automáticamente a **Muy conservador** cuando el copy toca contextos regulatorios. Ver Sección 10 — Modo conservador para contextos regulatorios.

² El dominio `personal_professional_growth` de Impulso es provisional. Si el producto se define formalmente como plataforma de salud o fitness, actualizar este contrato antes de aplicar restricciones sanitarias. Ver nota de clasificación en Sección 13.

### Leyenda de Claim level

| Nivel | Descripción |
|-------|-------------|
| Muy conservador | Solo hechos del producto; disclaimers sectoriales explícitos en todo copy público |
| Conservador | Capacidades documentadas; evitar promesas de resultado; disclaimers donde aplique |
| Estándar | Claims de capacidad y valor sin exageración; verificar antes de publicar |

---

## Sección 15 — Reglas globales de claims

Las siguientes reglas aplican a todos los productos del ecosistema sin excepción:

1. **No afirmar liderazgo de mercado** sin datos verificados y auditables.
2. **No usar "mejor", "único" o "primero"** sin evidencia concreta y citable.
3. **No prometer resultados económicos, inmobiliarios, energéticos, laborales ni de salud** sin datos y disclaimer.
4. **No mezclar claims de diferentes productos** dentro de la misma superficie sin delimitar claramente a cuál corresponde cada claim.
5. **No afirmar registro de marca concedido** si solo existe solicitud en curso.
6. **No presentar herramientas orientativas como oficiales**: aplica explícitamente a Energyscan y a cualquier producto que genere documentos con apariencia de validez administrativa.
7. **Productos periféricos** (Talent, Impulso) no deben inferir conexión con el ecosistema principal sin base documental explícita.
8. **Toda afirmación sobre integraciones** debe corresponder a integraciones implementadas y documentadas.

---

## Sección 16 — Reglas SEO

### Reglas técnicas globales

- Todo producto con superficie pública debe tener `<title>` y `<meta description>` únicos por idioma.
- Formato canónico de `<title>`: `[Nombre del Producto] — [Propuesta de valor concisa] | Anclora Group`
- Longitud máxima de `<meta description>`: 155 caracteres por idioma.
- Implementar `hreflang` cuando una misma URL tenga versiones en múltiples idiomas.
- Canonical tag obligatorio para evitar contenido duplicado en landings y versiones de idioma.

### Structured data obligatorio por tipo de producto

| Tipo de producto | Schema.org recomendado |
|------------------|------------------------|
| Entidad matriz | `Organization` + `TechCompany` |
| App interna/premium | `SoftwareApplication` con `applicationCategory` |
| Real estate (app + landing) | `RealEstateAgent` + `Organization` |
| Propiedades individuales | `SingleFamilyResidence` o `Apartment` |
| Herramienta energética | `SoftwareApplication` + `category: EnergyTool` |
| Herramienta de integración | `SoftwareApplication` + `category: DataIntegration` |

### Reglas de contenido SEO

- El primer encabezado `H1` de cada página pública debe contener el término de búsqueda principal del producto.
- Las URLs deben ser descriptivas, en minúsculas, sin caracteres especiales y en el idioma principal de la ruta.
- Los bloques de FAQ o contenido explicativo deben reforzar la utilidad real del producto, no ser relleno de palabras clave.
- No usar texto oculto ni keyword stuffing.
- Los PDFs exportables (ej. Energyscan Premium Report) deben incluir `<title>` y metadata adecuados para indexación documental si son públicos.

### Reglas de velocidad y Core Web Vitals

- Las apps premium deben mantener LCP < 2.5s en móvil como objetivo de producto.
- Las imágenes deben incluir atributo `alt` descriptivo en el idioma de la superficie.
- No introducir scripts de terceros que degraden FID/INP sin justificación documentada.

---

## Sección 17 — Reglas GEO (Generative Engine Optimization)

GEO es la práctica de estructurar contenido y datos para que los sistemas LLM (AI Overviews, Perplexity, ChatGPT, etc.) entiendan, representen y citen el producto correctamente.

### Principios GEO del ecosistema

1. **Claridad sobre marketing**: las descripciones de producto para LLMs deben ser factuales y precisas; el lenguaje de marketing genérico confunde a los modelos y produce respuestas de baja calidad.
2. **Diferenciación nítida entre productos**: cada producto debe tener una descripción propia que lo distinga de los demás, incluso dentro del ecosistema.
3. **Carácter funcional explícito**: especificar siempre si un producto es interno, público, orientativo o certificado.
4. **Prohibición de claims vacíos para LLMs**: términos como "revolucionario", "líder", "el mejor" no aportan señal útil a los modelos y generan incertidumbre en sus respuestas.
5. **Estructuración de entidades**: usar `Organization`, `SoftwareApplication` y entidades secundarias para que los LLMs puedan clasificar correctamente el tipo de producto y organización.

### Reglas de descripción para LLMs

- Toda descripción pública debe responder las preguntas: `¿Qué es?`, `¿Para quién?`, `¿Qué hace?`, `¿Qué NO hace?` cuando el "qué no hace" es relevante para evitar confusión sectorial.
- Energyscan debe incluir siempre la cláusula de carácter orientativo en cualquier descripción legible por LLM.
- Impulso y Talent deben incluir su dominio vertical explícito para evitar que los LLMs los asocien con el ecosistema inmobiliario.
- Las landing pages deben incluir un bloque estructurado de FAQ o About que sirva como contexto limpio para los LLMs.

### Reglas para AI Overviews y featured snippets

- El primer párrafo de cada página de producto debe ser una descripción directa del producto, no un eslogan.
- La descripción corta (`og:description`, `meta description`) debe coincidir semánticamente con el primer párrafo visible.
- Los bloques de FAQ deben estar marcados con `FAQPage` schema para maximizar la visibilidad en AI Overviews.

### Gestión de reputación GEO

- Si un LLM describe incorrectamente un producto (ej. Energyscan como "emisor de certificados oficiales"), la corrección debe realizarse actualizando:
  1. la descripción canónica en este contrato
  2. el copy público del producto
  3. el structured data de la página
- No intentar corregir la representación de un LLM solo mediante SEO técnico; la fuente primaria es el contenido textual accesible.

---

## Sección 17.5 — Reglas AEO (Answer Engine Optimization)

AEO es la práctica de estructurar contenido para que motores de respuesta y buscadores conversacionales puedan extraer una respuesta útil, breve y fiel al producto.

### Principios AEO del ecosistema

1. **Respuesta antes que relleno**: las páginas orientadas a búsqueda deben responder con claridad a la intención principal antes de desarrollar argumentos comerciales.
2. **Preguntas reales**: las FAQs deben responder dudas de usuario, no repetir keywords.
3. **Fragmentos citables**: cada página pública relevante debe incluir bloques que puedan citarse sin perder contexto.
4. **Coherencia con claims**: ninguna respuesta AEO puede prometer más que el contrato de producto.
5. **Idioma activo**: las respuestas AEO deben existir en los idiomas realmente activos de la superficie.

### Reglas de contenido AEO

- Incluir una respuesta directa de 40-80 palabras para la pregunta principal cuando la página tenga intención informativa o transaccional.
- Usar encabezados interrogativos sólo cuando respondan una pregunta real.
- Incluir FAQPage schema cuando se publique un bloque FAQ estable.
- Evitar respuestas absolutas en sectores sensibles: inmobiliario, energía, fiscal, laboral, legal o cumplimiento.
- Mantener el mismo sentido entre H1, primer párrafo, meta description, FAQ y structured data.

### Criterios de fallo AEO

- Una FAQ contradice el disclaimer sectorial.
- Una respuesta directa convierte una herramienta orientativa en servicio oficial o certificado.
- La respuesta añade datos, garantías o integraciones no verificadas.
- El contenido para snippets mezcla productos distintos sin delimitar la entidad.

---

## Sección 18 — Reglas de consumo por agentes

Esta sección define cómo deben usar este contrato los agentes del ecosistema: Hermes-Agent, agentes de contenido futuros, y cualquier sistema automatizado que genere copy, metadatos o descripciones de producto.

### Reglas para Hermes-Agent

- Hermes debe consultar este contrato antes de generar o modificar:
  - `<title>`, `<meta description>` o metadatos Open Graph de cualquier producto
  - descripciones de producto en landings, onboardings o materiales de marketing
  - copy de FAQ o bloques de contenido SEO
  - descripciones para schema structured data
- Si Hermes propone copy para Energyscan, Impulso o Talent, debe verificar que el claim level y los disclaimers de las secciones correspondientes están respetados.
- Si Hermes propone copy para la landing de Private Estates, debe verificar que no incluye datos de activos no confirmados.

### Reglas para agentes de contenido genéricos

- No generar copy para ningún producto sin identificar primero su sección en la matriz de productos (Sección 14).
- No usar la descripción canónica de un producto para describir otro.
- Si el agente detecta que el copy en producción contradice una regla de claims de este contrato, debe marcar el conflicto y no aplicar el cambio sin revisión humana.
- Los productos periféricos (Talent, Impulso) no deben recibir copy que los vincule al ecosistema principal salvo instrucción explícita con base documental.

### Reglas para sistemas de publicación automatizada

- Toda pieza generada automáticamente (metadatos, structured data, FAQ, copys de email) debe pasar por validación de claims antes de publicarse.
- Los sistemas no deben publicar versiones de idioma sin verificar que los disclaimers sectoriales están traducidos y presentes.
- El campo `og:description` y el `<meta name="description">` deben generarse desde la descripción canónica de este contrato, no desde copy de marketing libre.

### Orden de consulta obligatorio para agentes

Al generar o revisar copy de un producto del ecosistema, el agente debe recorrer estos pasos en orden. La decisión final se emite como `PASS`, `PASS_WITH_WARNINGS` o `FAIL`.

**Paso 1 — Contrato global: reglas que aplican a todos los productos**
→ Sección 15 (Reglas globales de claims)
→ Si alguna regla global se viola → decisión preliminar `FAIL`, no continuar.

**Paso 2 — Ficha del producto: identidad, descripción y claims específicos**
→ Sección del producto en este contrato (Secciones 1–13)
→ Verificar: claim level, dominio vertical, si es producto periférico.
→ Si el copy cruza la frontera de dominio de un producto periférico sin base documental → `FAIL`.

**Paso 3 — Reglas sectoriales del producto**
→ Leer el disclaimer sectorial de la ficha del producto (columna "Disclaimer sectorial" de la Sección 14).
→ Si el producto tiene disclaimer sectorial activo (Energyscan, Linguo Cam, GuestHub en contexto regulatorio, Impulso hasta redefinición): verificar que los disclaimers están presentes y no contradichos.
→ Si falta disclaimer sectorial obligatorio → `FAIL`.
→ Si el disclaimer está presente pero incompleto o ambiguo → `PASS_WITH_WARNINGS`.

**Paso 4 — Reglas SEO/GEO/AEO**
→ Sección 16 (Reglas SEO): verificar title, meta description, structured data, hreflang.
→ Sección 17 (Reglas GEO): verificar que las descripciones responden `¿Qué es?`, `¿Para quién?`, `¿Qué hace?`, `¿Qué NO hace?` cuando aplique.
→ Sección 17.5 (Reglas AEO): verificar respuesta directa, FAQs útiles, snippet citables y consistencia con schema.
→ Si el copy contiene claims vacíos para LLMs ("revolucionario", "el mejor") → `PASS_WITH_WARNINGS`.
→ Si el structured data contradice el carácter del producto → `FAIL`.

**Paso 5 — Contratos relacionados**
→ [[ANCLORA_GROUP_BRAND_IP_CONTRACT]] — fórmulas de copyright, titularidad, estado registral
→ [[HERMES_COPY_CURATOR_CONTRACT]] — restricciones específicas si el agente es Hermes
→ [[LOCALIZATION_CONTRACT]] — coherencia de i18n y cobertura de idiomas

**Decisión final**

| Resultado | Condición |
|-----------|-----------|
| `PASS` | Todos los pasos superados sin advertencias |
| `PASS_WITH_WARNINGS` | Copy aceptable pero con matices que deben documentarse antes de publicar |
| `FAIL` | Al menos una regla obligatoria violada; el copy no debe publicarse sin corrección y revisión humana |

Un `PASS_WITH_WARNINGS` no autoriza la publicación automática. Requiere que un operador humano confirme cada advertencia explícitamente antes de aplicar el cambio.

---

## Sección 19 — Criterio de cumplimiento

| Estado | Descripción |
|--------|-------------|
| `NOT_STARTED` | El producto no ha sido auditado contra este contrato |
| `PARTIAL` | Contrato conocido pero claims o metadatos no actualizados en todas las superficies |
| `ADOPTED` | Descripciones canónicas, claims y metadatos principales actualizados |
| `VALIDATED` | Revisión completa incluyendo i18n, structured data y disclaimers sectoriales |
| `UNKNOWN` | Superficie no disponible para auditoría |

---

## Relacionado

- [[ANCLORA_GROUP_BRAND_IP_CONTRACT]]
- [[ANCLORA_BRANDING_MASTER_CONTRACT]]
- [[ANCLORA_ECOSYSTEM_CONTRACT_GROUPS]]
- [[HERMES_COPY_CURATOR_CONTRACT]]
- [[LOCALIZATION_CONTRACT]]
- [[CONTRACT_COMPLIANCE_MATRIX]]
- [[ANCLORA_PREMIUM_APP_CONTRACT]]
- [[ANCLORA_ULTRA_PREMIUM_APP_CONTRACT]]
- [[INDEPENDENT_PUBLIC_UTILITY_APP_CONTRACT]]
