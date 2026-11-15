/**
 * Origem canônica do site, sem barra final.
 *
 * Usada por layout.tsx (metadataBase, canonical, OG), robots.ts e sitemap.ts.
 * Centralizada aqui para que canonical, sitemap e robots nunca divirjam.
 *
 * Em produção o Coolify define NEXT_PUBLIC_SITE_URL; o fallback cobre o build
 * local e evita gerar URLs de preview no canonical.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://vicenterijo.com.br"
).replace(/\/+$/, "");

/** Concatena um caminho à origem canônica, tolerando "/" inicial e final. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
