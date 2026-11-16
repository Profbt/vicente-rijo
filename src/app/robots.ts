import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Export estático: sem isto o build falha em "collecting page data" com
// "output: export" (metadata routes precisam ser explicitamente estáticas).
export const dynamic = "force-static";

// Crawlers de busca por IA. O "*" já libera todo mundo; os três grupos nominais
// existem só para deixar a intenção explícita para quem auditar o arquivo. Regra:
// um grupo nomeado substitui as regras do "*" para aquele bot — se um dia houver
// bloqueio por bot, ele precisa ser escrito dentro do grupo dele.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: ["OAI-SearchBot", "PerplexityBot", "Claude-SearchBot"],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
