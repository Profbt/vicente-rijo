import { HiShieldCheck, HiHeart, HiAcademicCap } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

const SEGURANCA = [
  "Portões controlados e ambiente monitorado 24h",
  "Equipe atenta do portão à sala de aula",
  "Rotina previsível com horários definidos",
  "Programa Escola Segura do governo do Paraná",
];

const ALIMENTACAO = [
  "Refeitório climatizado para 200 alunos",
  "Refeições balanceadas por nutricionistas",
  "Alimentação completa inclusa no Fundamental Integral",
  "Ambiente limpo, seguro e acolhedor",
];

const CORPO_DOCENTE = [
  "Corpo docente qualificado e dedicado",
  "Pedagogos e professores de apoio",
  "Especialistas em diferentes áreas do conhecimento",
  "Mestres e doutores formando o futuro do seu filho",
];

export default function Seguranca() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Para os pais"
          title="Tranquilidade para você, segurança para ele"
          description="Sabemos que, mais do que ensino, você entrega o seu filho na nossa porta todos os dias. A gente leva isso muito a sério."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-3xl bg-navy-950 p-8 sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-gold-300">
                <HiShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-3xl font-semibold text-white">
                Segurança
              </h3>
              <ul className="mt-5 space-y-3">
                {SEGURANCA.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-navy-100/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full rounded-3xl border border-navy-100 bg-white p-8 sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-100 text-gold-600">
                <HiHeart className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-3xl font-semibold text-navy-950">
                Alimentação
              </h3>
              <ul className="mt-5 space-y-3">
                {ALIMENTACAO.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-navy-800/80">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="h-full rounded-3xl bg-navy-950 p-8 sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-gold-300">
                <HiAcademicCap className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-3xl font-semibold text-white">
                Corpo Docente
              </h3>
              <ul className="mt-5 space-y-3">
                {CORPO_DOCENTE.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-navy-100/85">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
