import type { ElementType } from "react";
import {
  HiAcademicCap,
  HiBookOpen,
  HiDesktopComputer,
  HiFlag,
  HiMicrophone,
  HiMoon,
  HiSparkles,
  HiViewGrid,
  HiHome,
} from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import InfraCarousel from "@/components/sections/InfraCarousel";
import { STRUCTURE } from "@/lib/constants";

const ICONS: Record<string, ElementType> = {
  gym: HiSparkles,
  court: HiViewGrid,
  soccer: HiFlag,
  lab: HiDesktopComputer,
  science: HiAcademicCap,
  library: HiBookOpen,
  auditorium: HiMicrophone,
  dining: HiMoon,
  classroom: HiHome,
};

export default function Infra() {
  return (
    <section id="estrutura" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Estrutura"
          title="Uma estrutura incomparável"
          description="Mais de 25 mil metros quadrados de área total no coração de Londrina, com 12,5 mil m² construídos: espaço, conforto e tecnologia para o aprendizado acontecer de verdade."
        />

        <Reveal className="mt-14">
          <InfraCarousel />
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STRUCTURE.map((item, i) => {
            const Icon = ICONS[item.icon] ?? HiSparkles;
            return (
              <Reveal key={item.title} delay={i * 40}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-navy-100 bg-navy-50/60 p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-gold-600 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-navy-950">{item.title}</h3>
                    <p className="mt-0.5 text-base text-navy-800/60">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
