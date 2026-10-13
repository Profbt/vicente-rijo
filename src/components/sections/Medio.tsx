import Image from "next/image";
import { HiAcademicCap, HiStar } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import Modal from "@/components/ui/Modal";
import Reveal from "@/components/ui/Reveal";
import { MEDIO, withBasePath } from "@/lib/constants";

export default function Medio() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Ensino Médio Regular"
          title="Ensino Médio com preparação para o futuro"
          description="Formação completa com foco em ENEM, vestibulares e desenvolvimento integral, com o suporte da nossa estrutura e dos nossos professores."
        />

        <div className="mt-14">
          <Reveal>
            <article className="mx-auto flex max-w-4xl flex-col overflow-hidden rounded-3xl border border-navy-100 bg-cream sm:flex-row">
              <div className="relative h-48 sm:h-auto sm:w-2/5">
                <Image
                  src={withBasePath("/img/images/NEM-alunos.png")}
                  alt="Alunos do Ensino Médio Regular do Colégio Vicente Rijo"
                  width={400}
                  height={400}
                  className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] rounded-2xl object-cover object-top sm:inset-3 sm:h-[calc(100%-1.5rem)] sm:w-[calc(100%-1.5rem)]"
                  style={{ objectPosition: "50% 20%" }}
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:w-3/5">
                <div className="flex items-center gap-2 text-gold-600">
                  <HiAcademicCap className="h-5 w-5" />
                  <p className="text-xs font-semibold uppercase tracking-widest">
                    Ensino Médio Regular
                  </p>
                </div>
                <h3 className="mt-3 font-display text-2xl font-semibold text-navy-950">
                  {MEDIO.name}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-navy-800/70 sm:text-lg">
                  {MEDIO.description}
                </p>
                <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-navy-950 px-4 py-1.5 text-xs font-semibold text-white">
                  <HiStar className="h-3.5 w-3.5 text-gold-300" />
                  {MEDIO.highlight}
                </p>
                <Modal
                  data={MEDIO.details}
                  enrollLabel="Matricular no Ensino Médio"
                  buttonClassName="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-gold-500 px-6 py-2.5 text-sm font-bold text-navy-950 shadow-sm transition-colors hover:bg-gold-400"
                />
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
