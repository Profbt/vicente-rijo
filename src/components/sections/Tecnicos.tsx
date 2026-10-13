import Image from "next/image";
import { HiCheck, HiBriefcase } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import Modal from "@/components/ui/Modal";
import Reveal from "@/components/ui/Reveal";
import { TECNICOS, withBasePath } from "@/lib/constants";

const COURSE_IMAGES: Record<string, string> = {
  ADM: withBasePath("/img/images/NEMADM-alunos.png"),
  DS: withBasePath("/img/images/NEMSIS-alunos.png"),
};

const BADGE_LABELS: Record<string, string> = {
  ADM: "ADM",
  DS: "DES",
};

export default function Tecnicos() {
  return (
    <section id="ensino" className="scroll-mt-20 bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Ensino Médio Técnico"
          title="Profissão antes do diploma: os cursos técnicos do Vicente Rijo"
          description="Três anos de formação que colocam o seu filho à frente, com um diploma técnico reconhecido e portas abertas para o mercado de trabalho. Nosso foco é a empregabilidade."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {TECNICOS.map((curso, i) => (
            <Reveal key={curso.code} delay={i * 120}>
              <article className="group h-full overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm transition-shadow hover:shadow-xl hover:shadow-navy-950/10">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={COURSE_IMAGES[curso.code]}
                    alt={`Alunos do curso técnico em ${curso.name} do Colégio Vicente Rijo`}
                    width={640}
                    height={360}
                    className="absolute inset-4 h-[calc(100%-2rem)] w-[calc(100%-2rem)] translate-y-5 rounded-2xl object-cover object-top sm:inset-7 sm:h-[calc(100%-3.5rem)] sm:w-[calc(100%-3.5rem)]"
                    style={curso.code === "DS" ? { objectPosition: "50% 15%" } : undefined}
                  />
                  <span className="absolute left-4 top-9 sm:left-8 sm:top-13 inline-flex items-center gap-1.5 rounded-full bg-navy-950/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                    <HiBriefcase className="h-3.5 w-3.5 text-gold-300" />
                    Técnico em {BADGE_LABELS[curso.code] ?? curso.code}
                  </span>
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl font-semibold text-navy-950">
                    {curso.name}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-navy-800/70 sm:text-lg">
                    {curso.description}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {curso.topics.map((topic) => (
                      <li
                        key={topic}
                        className="inline-flex items-center gap-1.5 rounded-full bg-gold-50 px-3 py-1 text-xs font-medium text-gold-700"
                      >
                        <HiCheck className="h-3.5 w-3.5" />
                        {topic}
                      </li>
                    ))}
                  </ul>

                  <Modal
                    data={curso.details}
                    enrollLabel={curso.code === "ADM" ? "Matricular no Técnico em ADM" : "Matricular no Técnico em Sistemas"}
                    buttonClassName="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-navy-950 shadow-sm transition-colors hover:bg-gold-400"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
