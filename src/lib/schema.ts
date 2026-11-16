import { SITE_URL } from "@/lib/site";
import {
  FOUNDATION_YEAR,
  FUNDAMENTAL,
  MEDIO,
  SCHOOL,
  TECNICOS,
} from "@/lib/constants";

/**
 * Dados estruturados (JSON-LD).
 *
 * Regra: todo fato sai de `constants.ts` — nome, endereço, telefone, redes e
 * horário não são reescritos aqui. Só as descrições curtas dos cursos são
 * resumos editoriais; os nomes vêm dos mesmos objetos que a página renderiza.
 */

export type FaqItem = { q: string; a: string };

export type BreadcrumbItem = { name: string; path: string };

/** Id estável da escola, para que outras entidades possam referenciá-la. */
export const SCHOOL_ID = `${SITE_URL}/#school`;

/** Telefone em E.164 a partir do formato exibido na página: (43) 3323-7630. */
const SCHOOL_PHONE_E164 = `+55${SCHOOL.phone.replace(/\D/g, "")}`;

const SCHOOL_LOGO = `${SITE_URL}/img/opt/brand/logo_escola-512.webp`;

const SCHOOL_DESCRIPTION =
  "Colégio Estadual da rede pública do Paraná, em Londrina, com Ensino Fundamental Integral, Ensino Médio e cursos técnicos integrados de Administração e Desenvolvimento de Sistemas. Ensino 100% gratuito.";

export function schoolSchema(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "School",
    "@id": SCHOOL_ID,
    name: SCHOOL.name,
    alternateName: SCHOOL.shortName,
    url: `${SITE_URL}/`,
    logo: SCHOOL_LOGO,
    image: `${SITE_URL}/og.png`,
    description: SCHOOL_DESCRIPTION,
    foundingDate: String(FOUNDATION_YEAR),
    telephone: SCHOOL_PHONE_E164,
    email: SCHOOL.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SCHOOL.address,
      addressLocality: SCHOOL.city,
      addressRegion: SCHOOL.state,
      postalCode: SCHOOL.cep,
      addressCountry: "BR",
    },
    areaServed: { "@type": "City", name: SCHOOL.city },
    sameAs: [SCHOOL.instagramUrl],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: SCHOOL.secretaria.opens,
        closes: SCHOOL.secretaria.closes,
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cursos e modalidades",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: FUNDAMENTAL.name,
            description:
              "Ensino Fundamental Anos Finais em tempo integral, das 8h às 15h10, com alimentação inclusa e atividades complementares.",
            provider: { "@id": SCHOOL_ID },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: MEDIO.name,
            description:
              "Ensino Médio regular no período matutino, com itinerários formativos e preparação para ENEM e vestibulares.",
            provider: { "@id": SCHOOL_ID },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: TECNICOS[0].details.title,
            description:
              "Curso técnico integrado ao Ensino Médio em Administração, com diploma de Técnico ao concluir.",
            provider: { "@id": SCHOOL_ID },
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Course",
            name: TECNICOS[1].details.title,
            description:
              "Curso técnico integrado ao Ensino Médio em Desenvolvimento de Sistemas, com certificações intermediárias por série.",
            provider: { "@id": SCHOOL_ID },
          },
        },
      ],
    },
  };
}

/**
 * FAQPage. Só deve ser usada na página em que as perguntas estão visíveis —
 * o Google exige que o conteúdo exista de fato na página.
 */
export function faqSchema(
  items: FaqItem[],
  pageUrl: string
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function breadcrumbSchema(
  items: BreadcrumbItem[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
