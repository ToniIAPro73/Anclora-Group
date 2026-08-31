// Base path applied by next.config.ts in development for the code-server
// subpath proxy (/proxy/<port>). Next.js inlines __NEXT_ROUTER_BASEPATH at
// build time in both server and client bundles; it is empty in production.
const BASE_PATH = process.env.__NEXT_ROUTER_BASEPATH ?? ''

/**
 * Prefix a root-absolute URL with the configured base path. Use for URLs
 * Next.js does not prefix automatically: metadata icon URLs, client-side
 * fetch targets, form actions and full-page navigations.
 */
export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`
}
