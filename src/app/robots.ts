import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Export estático: sem isto o build falha em "collecting page data" com
// "output: export" (metadata routes precisam ser explicitamente estáticas).
export const dynamic = "force-static";

// Crawlers de busca por IA (OAI-SearchBot, PerplexityBot, Claude-SearchBot,
// meta-webindexer) estão liberados pelo wildcard abaixo. Não criar grupo nominal:
// um grupo com User-agent específico substitui as regras do "*" para aquele bot.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
