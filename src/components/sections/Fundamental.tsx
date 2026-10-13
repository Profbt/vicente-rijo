import Image from "next/image";
import { HiCheckCircle, HiClock } from "react-icons/hi";
import Modal from "@/components/ui/Modal";
import Reveal from "@/components/ui/Reveal";
import { FUNDAMENTAL, withBasePath } from "@/lib/constants";

export default function Fundamental() {
  return (
    <section id="fundamental" className="scroll-mt-20 bg-parana py-20 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal className="self-start">
          <div className="relative p-4 sm:p-6 lg:p-8">
            <Image
              src={withBasePath("/img/images/fundamental-alunos.png")}
              alt="Alunos do Ensino Fundamental Integral do Colégio Vicente Rijo"
              width={640}
              height={480}
              className="aspect-square w-full rounded-3xl border border-white/25 object-cover object-top shadow-xl shadow-navy-950/30"
            />
            <div className="absolute -bottom-5 left-6 flex items-center gap-3 rounded-2xl bg-navy-950 px-5 py-3.5 shadow-lg">
              <Image
                src={withBasePath("/img/brand/parana-integral2.png")}
                alt="Programa Paraná Integral"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <div className="leading-tight">
                <p className="text-sm font-bold text-white">Paraná Integral</p>
                <p className="text-xs text-navy-100/70">Programa do Governo do Estado</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
            Ensino Fundamental · Anos Finais
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white text-balance sm:text-4xl">
            Um dia inteiro de aprendizado, esporte e cuidado para o seu filho
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/85 sm:text-lg">
            No modelo integral, o aluno passa o dia inteiro na escola, estudando,
            brincando e aprendendo a conviver. Alimentação inclusa e ônibus especial
            que leva seu filho ao Terminal Central na saída, às 15h10, para você trabalhar tranquilo.
          </p>

          <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-gold-400 px-6 py-3 text-base font-bold text-navy-950 shadow-lg shadow-navy-950/20">
            <HiClock className="h-5 w-5" />
            Horário integral: {FUNDAMENTAL.schedule}
          </div>

          <ul className="mt-7 space-y-3">
            {FUNDAMENTAL.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-300" />
                <span className="text-base text-white">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#matriculas"
              className="inline-block rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy-950 transition-colors hover:bg-gold-100"
            >
              Matricule no Fundamental Integral
            </a>
            <Modal
              data={FUNDAMENTAL.details}
              enrollLabel="Matricular no Fundamental Integral"
              buttonClassName="inline-flex items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-navy-950 shadow-sm transition-colors hover:bg-gold-400"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
