import type { NextConfig } from 'next'

// Baseline security headers for the whole portal.
// CSP note: Next.js injects inline scripts/styles, so 'unsafe-inline' is
// kept for script-src/style-src in this phase. A nonce-based strict CSP is
// a documented follow-up. frame-ancestors 'none' is mirrored by legacy
// X-Frame-Options: DENY.
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const SECURITY_HEADERS = [
  { key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Private portal: never indexable (complements robots metadata).
  { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
]

// Development-only code-server subpath proxy support. The canonical VPS dev
// workflow exposes the app through `https://dev.anclora.com/proxy/<port>/`.
// Deriving the prefix from the dev server port keeps production at `/`
// without introducing extra environment variables.
function resolveDevPort(): string {
  if (process.env.NODE_ENV !== 'development') return ''
  const flagIndex = process.argv.findIndex((arg) => arg === '-p' || arg === '--port')
  const port = flagIndex >= 0 ? process.argv[flagIndex + 1] : process.env.PORT
  return port && /^\d+$/.test(port) ? port : ''
}

const DEV_PORT = resolveDevPort()
const DEV_PROXY_PREFIX = DEV_PORT ? `/proxy/${DEV_PORT}` : ''

const nextConfig: NextConfig = {
  // Required for forbidden() (HTTP 403) used by server-side RBAC enforcement.
  experimental: { authInterrupts: true },
  // Prefixes every framework-emitted URL (assets, links, redirects, image
  // optimizer) so the browser stays under the proxy subpath. Empty in
  // production builds.
  ...(DEV_PROXY_PREFIX ? { basePath: DEV_PROXY_PREFIX } : {}),
  async rewrites() {
    if (!DEV_PROXY_PREFIX) return { beforeFiles: [] }
    // code-server strips the /proxy/<port> prefix before forwarding, so the
    // request that reaches Next.js never carries the basePath. Self-proxy
    // those stripped paths onto the prefixed routes. Requests that already
    // carry the prefix are excluded and served directly.
    return {
      beforeFiles: [
        {
          source: `/:path((?!${DEV_PROXY_PREFIX.slice(1)}).*)`,
          destination: `http://127.0.0.1:${DEV_PORT}${DEV_PROXY_PREFIX}/:path`,
          basePath: false,
        },
      ],
    }
  },
  async headers() {
    return [{ source: '/:path*', headers: SECURITY_HEADERS }]
  },
}

export default nextConfig
