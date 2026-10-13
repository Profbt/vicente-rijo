import Link from "next/link";
import {
  HiClipboardList,
  HiDocument,
  HiCheckCircle,
  HiChevronDown,
  HiQuestionMarkCircle,
} from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  MATRICULAS_STEPS,
  DOCS_NECESSARIOS,
  MATRICULAS_FAQ,
} from "@/lib/constants";

export default function Matriculas() {
  return (
    <section id="matriculas" className="scroll-mt-20 bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Matrículas 2026"
          title="Matrícula simples, sem surpresas"
          description="O ensino é 100% gratuito. Veja como garantir a vaga do seu filho no Vicente Rijo."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          {/* Coluna esquerda: Passo a passo */}
          <div className="pt-7 sm:pt-9">
            <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-navy-950">
              <HiClipboardList className="h-6 w-6 text-gold-600" />
              Passo a passo
            </h3>

            <ol className="relative mt-8 ml-4 space-y-0 border-l-2 border-navy-100">
              {MATRICULAS_STEPS.map((step, i) => (
                <li key={step.title} className="relative pl-8 pb-8 last:pb-0">
                  <span className="absolute -left-[1.05rem] top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-navy-100 bg-white font-display text-base font-bold text-navy-950">
                    {i + 1}
                  </span>
                  <h4 className="text-lg font-semibold text-navy-950">
                    {step.title}
                  </h4>
                  <p className="mt-1 text-base leading-relaxed text-navy-800/70">
                    {step.desc}
                  </p>
                  {step.href ? (
                    <a
                      href={step.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block rounded-full bg-gold-500 px-4 py-1.5 text-xs font-bold text-navy-950 transition-colors hover:bg-gold-400"
                    >
                      {step.linkLabel}
                    </a>
                  ) : null}
                </li>
              ))}
            </ol>

            {/* Caixa de ajuda */}
            <div className="mt-8 rounded-2xl border border-gold-200 bg-gold-50/80 p-6">
              <h4 className="font-display text-xl font-semibold text-navy-950">
                Não sabe por onde começar?
              </h4>
              <p className="mt-2 text-base leading-relaxed text-navy-800/70">
                A secretaria atende das <strong>8h às 16:30h</strong> na Av.
                Juscelino Kubitscheck, 2372, Boa Vista. Leve os documentos e a
                equipe te atende com todo o cuidado.
              </p>
              <Link
                href="/contato/"
                className="mt-5 inline-block rounded-full bg-gold-500 px-6 py-3 text-base font-bold text-navy-950 transition-colors hover:bg-gold-400"
              >
                Falar com a secretaria
              </Link>
            </div>
          </div>

          {/* Coluna direita: Documentos + FAQ */}
          <div className="space-y-8">
            {/* Documentos */}
            <div className="rounded-3xl border border-navy-100 bg-cream p-7 sm:p-9">
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-navy-950">
                <HiDocument className="h-6 w-6 text-gold-600" />
                Documentos necessários
              </h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {DOCS_NECESSARIOS.map((doc) => (
                  <li
                    key={doc}
                    className="flex items-start gap-2.5 rounded-xl bg-white px-4 py-3 text-sm text-navy-900 shadow-sm"
                  >
                    <HiCheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-gold-500" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            {/* FAQ */}
            <div className="rounded-3xl border border-navy-100 bg-cream p-7 sm:p-9">
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-navy-950">
                <HiQuestionMarkCircle className="h-6 w-6 text-gold-600" />
                Perguntas frequentes
              </h3>
              <div className="mt-5 space-y-3">
                {MATRICULAS_FAQ.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-2xl border border-navy-100 bg-white open:shadow-sm"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-navy-950 [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <HiChevronDown className="h-4 w-4 shrink-0 text-navy-800/50 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="px-5 pb-5 text-base leading-relaxed text-navy-800/70">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
