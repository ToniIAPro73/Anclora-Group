# Group Footer And App Catalog Spec V1

## Context

The workspace footer currently compresses legal links, email and cookie access into an
uneven row on wide screens and wraps poorly on narrower screens.

The visible application catalog also misses active ecosystem products that must be
available from Anclora Group for authorized users.

## Scope

- Refine `GroupLegalFooter` layout for desktop and mobile.
- Add missing application definitions to the workspace catalog.
- Keep access controlled by existing role filtering.
- Do not change authentication, session handling or legal document content.

## Acceptance Criteria

- Footer uses stable columns and does not create awkward isolated links.
- Footer remains readable on desktop and mobile.
- Workspace catalog includes:
  - Anclora Private Estates Landing Page
  - Anclora Fiscal
  - Anclora SyncXML
  - Anclora EnergyScan
  - Anclora FileStudio
  - Anclora VisionFlow
  - Anclora Linguo Cam
- `group-admin` can see all catalog entries.
- TypeScript and lint checks pass.
