import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SCHOOL_AGE } from "@/lib/constants";
import { SITE_URL } from "@/lib/site";
import { schoolSchema } from "@/lib/schema";
import JsonLd from "@/components/seo/JsonLd";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const metadataBase = new URL(SITE_URL);
const siteUrl = new URL("/", metadataBase);
const socialImage = new URL("/og.png", metadataBase).toString();

export const metadata: Metadata = {
  metadataBase,
  title:
    "Colégio Estadual Vicente Rijo — Ensino Médio e Técnico em Londrina",
  description:
    "Escola estadual no Boa Vista, em Londrina: Fundamental Integral, Ensino Médio e técnicos de Administração e Desenvolvimento de Sistemas. Gratuita.",
  keywords: [
    "Colégio Vicente Rijo",
    "Vicente Rijo",
    "escola estadual Londrina",
    "fundamental integral Londrina",
    "curso técnico Londrina",
    "ensino médio Londrina",
    "APMF",
  ],
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `Colégio Estadual Vicente Rijo · ${SCHOOL_AGE} anos`,
    description:
      "Educação pública de qualidade para o seu filho. Fundamental Integral, Técnicos, Médio e uma estrutura de respeito.",
    locale: "pt_BR",
    type: "website",
    url: siteUrl,
    siteName: "Colégio Estadual Vicente Rijo",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Colégio Estadual Vicente Rijo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [socialImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <JsonLd data={schoolSchema()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
