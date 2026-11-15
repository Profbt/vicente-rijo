import Hero from "@/components/sections/Hero";
import Why from "@/components/sections/Why";
import Fundamental from "@/components/sections/Fundamental";
import Tecnicos from "@/components/sections/Tecnicos";
import Medio from "@/components/sections/Medio";
import Naahs from "@/components/sections/Naahs";
import Infra from "@/components/sections/Infra";
import Conquistas from "@/components/sections/Conquistas";
import Seguranca from "@/components/sections/Seguranca";
import Matriculas from "@/components/sections/Matriculas";
import Apmf from "@/components/sections/Apmf";
import Cta from "@/components/sections/Cta";
import ScrollToTop from "@/components/ui/ScrollToTop";
import JsonLd from "@/components/seo/JsonLd";
import { MATRICULAS_FAQ } from "@/lib/constants";
import { faqSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(MATRICULAS_FAQ, `${SITE_URL}/`)} />
      <Hero />
      <Why />
      <Fundamental />
      <Tecnicos />
      <Medio />
      <Naahs />
      <Infra />
      <Conquistas />
      <Seguranca />
      <Matriculas />
      <Apmf />
      <Cta />
      <ScrollToTop />
    </>
  );
}
