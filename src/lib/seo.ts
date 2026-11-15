import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

const OG_IMAGE = {
  url: absoluteUrl("/og.png"),
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Colégio Estadual Vicente Rijo",
};

/**
 * Metadata de uma rota: title, description, canonical e og:url próprios.
 *
 * `openGraph` é substituído inteiro pelo Next quando a rota define o seu, por
 * isso a imagem e o siteName são repetidos aqui — sem isso, /apmf e /contato
 * herdariam o og:url da home.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Colégio Estadual Vicente Rijo",
      locale: "pt_BR",
      type: "website",
      images: [OG_IMAGE],
    },
  };
}
