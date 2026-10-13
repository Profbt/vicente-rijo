import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { BASE_PATH } from "@/lib/constants";
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

export const metadata: Metadata = {
  title: "Colégio Estadual Vicente Rijo · 80 anos em Londrina",
  description:
    "O Vicente Rijo: um dos maiores colégios estaduais do Paraná. Ensino Fundamental Integral, Técnico (Administração e Desenvolvimento de Sistemas) e Médio. Estrutura completa, esporte e APMF que cuida de tudo.",
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
    icon: `${BASE_PATH}/favicon.png`,
    apple: `${BASE_PATH}/apple-touch-icon.png`,
  },
  openGraph: {
    title: "Colégio Estadual Vicente Rijo · 80 anos",
    description:
      "Educação pública de qualidade para o seu filho. Fundamental Integral, Técnicos, Médio e uma estrutura de respeito.",
    locale: "pt_BR",
    type: "website",
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
