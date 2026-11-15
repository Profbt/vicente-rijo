import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Export estático: sem isto o build falha em "collecting page data" com
// "output: export" (metadata routes precisam ser explicitamente estáticas).
export const dynamic = "force-static";

// Crawlers de busca por IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
// não são bloqueados: o site quer ser citado nessas respostas.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
