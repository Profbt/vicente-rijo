import Image from "next/image";
import { HiStar } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import Modal from "@/components/ui/Modal";
import Reveal from "@/components/ui/Reveal";
import { NAAHS, withBasePath } from "@/lib/constants";

export default function Naahs() {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Atendimento especializado"
          title="NAAHS: talentos do Fundamental ao Ensino Médio"
          description="O Vicente Rijo é polo regional de atendimento educacional especializado a estudantes com altas habilidades e superdotação, com enriquecimento curricular e acompanhamento próximo."
        />

        <Reveal className="mt-14">
          <article className="mx-auto flex max-w-4xl flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-sm sm:flex-row">
            <div className="relative h-56 sm:h-auto sm:w-2/5">
              <Image
                src={withBasePath("/img/images/naahs.png")}
                alt="Sala do NAAHS: atendimento a altas habilidades"
                width={400}
                height={400}
                className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] rounded-2xl object-contain object-top origin-top scale-[1.15] sm:inset-3 sm:h-[calc(100%-1.5rem)] sm:w-[calc(100%-1.5rem)]"
              />
            </div>
            <div className="flex flex-col justify-center p-7 sm:w-3/5 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                Polo Regional de Altas Habilidades
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-navy-950">
                {NAAHS.name}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-navy-800/70 sm:text-lg">
                {NAAHS.description}
              </p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy-950 px-4 py-1.5 text-xs font-semibold text-white">
                <HiStar className="h-3.5 w-3.5 text-gold-300" />
                {NAAHS.highlight}
              </p>
              <Modal
                data={NAAHS.details}
                buttonClassName="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-navy-950 shadow-sm transition-colors hover:bg-gold-400"
              />
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
