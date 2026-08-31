# Dev Proxy Subpath Compatibility Spec V1

## Context

The canonical VPS development workflow runs the portal through AOS on port 3005
and exposes it through the code-server subpath proxy:

`https://dev.anclora.com/proxy/3005/`

code-server strips the `/proxy/3005` prefix before forwarding to Next.js, but the
app emits root-absolute asset, navigation and redirect URLs. Through the proxy the
browser therefore requests `https://dev.anclora.com/_next/...` and escapes the
prefix on redirects, rendering raw HTML without CSS, JS, brand assets or fonts.

Direct access to `http://127.0.0.1:3005` works correctly.

## Scope

- Add a development-only `basePath` derived from the dev server port
  (`/proxy/<port>`), so every framework-emitted URL (assets, links, redirects,
  image optimizer) is proxy-aware.
- Add a compatibility rewrite so requests arriving with the prefix stripped
  (code-server behavior) still resolve.
- Add a minimal `withBasePath` helper for the few client-side root-absolute URLs
  (login fetch, login redirect, logout form) and metadata icons if needed.
- Fix the logout route handler redirect so it never emits an absolute
  `127.0.0.1:3005` Location through the proxy.
- Production (`next build` / `next start`) keeps base path `/` unchanged.
- Do not change AOS, the port, Caddy, code-server, authentication strength,
  cookie scoping or the UI design.
- Preserve the cookie-consent hydration fix; no localStorage during initial
  render.

## Acceptance Criteria

- Through `https://dev.anclora.com/proxy/3005/login`: CSS, JS, logo, fonts and
  favicon load; no hydration errors; login, navigation and logout work.
- Direct access `http://127.0.0.1:3005/login` keeps working (no regression).
- Redirects stay under the prefix: `/` to `/login`, login to `/workspace`,
  logout to `/login`, forbidden stays server-side 403.
- Session cookie keeps `Path=/`; no security headers removed; RBAC stays
  server-side.
- `npm test`, `npm run lint`, `npm run build` and `git diff --check` pass.
- Developer documentation states the canonical `aos up group` +
  `https://dev.anclora.com/proxy/3005/` workflow; SSH tunneling is fallback only.
