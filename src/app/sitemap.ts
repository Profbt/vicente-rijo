import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Export estático: o Next gera /sitemap.xml no build a partir desta lista.
export const dynamic = "force-static";

// trailingSlash: true -> todas as URLs do sitemap precisam terminar em "/".
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/apmf/`, lastModified, changeFrequency: "yearly", priority: 0.6 },
    { url: `${SITE_URL}/contato/`, lastModified, changeFrequency: "yearly", priority: 0.7 },
  ];
}
