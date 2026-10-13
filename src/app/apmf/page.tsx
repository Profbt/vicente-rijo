import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  HiHeart,
  HiCash,
  HiEye,
  HiChat,
  HiCheckCircle,
  HiArrowLeft,
  HiChevronDown,
  HiUsers,
  HiLightningBolt,
  HiCog,
  HiStar,
} from "react-icons/hi";
import {
  APMF,
  APMF_CAUSES,
  APMF_FAQ,
  withBasePath,
} from "@/lib/constants";
import CopyPixButton from "@/components/ui/CopyPixButton";

export const metadata: Metadata = {
  title: "APMF · Participe",
  description:
    "A Associação de Pais, Mestres e Funcionários do Colégio Estadual Vicente Rijo. Contribua com o PIX, participe e veja onde o dinheiro é aplicado.",
};

const CAUSE_ICONS = [HiLightningBolt, HiCog, HiStar];

const HOW_TO_PARTICIPATE = [
  {
    icon: HiHeart,
    title: "Associe-se",
    desc: "A APMF é aberta a pais, mestres e funcionários. A diretoria é eleita pela comunidade.",
  },
  {
    icon: HiCash,
    title: "Contribua",
    desc: `Faça uma contribuição mensal (o valor sugerido é de ${APMF.contribution}) pelo PIX ou presencialmente na secretaria.`,
  },
  {
    icon: HiChat,
    title: "Participe",
    desc: "Compareça às reuniões, proponha melhorias e acompanhe a prestação de contas.",
  },
];

export default function ApmfPage() {
  return (
    <div className="bg-white overflow-hidden">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800/70 transition-colors hover:text-navy-950"
        >
          <HiArrowLeft className="h-4 w-4" />
          Voltar ao início
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-300 bg-gold-50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-gold-700">
              <HiHeart className="h-4 w-4" />
              APMF · Vicente Rijo
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold text-navy-950 text-balance sm:text-5xl">
              O Vicente Rijo é forte porque a comunidade participa
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-800/70">
              A Associação de Pais, Mestres e Funcionários é o braço que o Estado
              não alcança. É ela que garante as conquistas extras: o desporto, a
              manutenção ágil e os eventos que fazem a escola viver.
            </p>
            <p className="mt-4 text-base leading-relaxed text-navy-800/70">
              O governo garante a estrutura, a alimentação e o salário dos
              professores. A APMF garante o <strong className="text-navy-950">brilho</strong>,
              e esse brilho começa com a sua participação.
            </p>
          </div>

          <div className="rounded-3xl border border-gold-400/60 bg-gradient-to-b from-gold-500 to-gold-600 p-8 shadow-xl shadow-gold-900/20">
            <div className="flex items-center gap-2">
              <HiCash className="h-6 w-6 text-navy-950" />
              <p className="text-xs font-bold uppercase tracking-widest text-navy-900">
                Contribuição mensal sugerida
              </p>
            </div>
            <p className="mt-4 font-display text-5xl font-bold text-navy-950 sm:text-7xl">
              {APMF.contribution}
            </p>
            <p className="mt-2 text-sm font-medium text-navy-900/80">
              por mês.
            </p>
            <p className="mt-1.5 inline-block rounded-full bg-navy-950/10 px-3.5 py-1.5 text-sm font-bold text-navy-950">
              O valor é só uma sugestão. Você pode doar o quanto quiser e puder.
            </p>

            <div className="mt-8 rounded-2xl bg-navy-950 p-5 sm:p-6">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="text-center sm:text-left">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gold-300">
                    PIX da APMF
                  </p>
                  <p className="mt-1 text-xl font-bold text-white break-all sm:text-2xl">{APMF.cnpj}</p>
                  <p className="mt-2 text-xs text-navy-100/60">
                    Associação de Pais, Mestres e Funcionários do Colégio Estadual Vicente Rijo
                  </p>
                  <CopyPixButton value={APMF.pixCopiaECola} label="Copiar PIX copia e cola" />
                  <p className="mt-2 break-all rounded-lg bg-white/5 px-2.5 py-1.5 text-[10px] leading-snug text-navy-100/50">
                    {APMF.pixCopiaECola}
                  </p>
                </div>
                <div className="shrink-0 rounded-lg bg-white p-2">
                  <Image
                    src={withBasePath("/img/images/qrcode_apmf.png")}
                    alt="QR Code PIX APMF"
                    width={80}
                    height={80}
                    className="h-20 w-20"
                  />
                </div>
              </div>
            </div>

            <p className="mt-5 text-xs text-navy-900/70">
              Contribuição voluntária e não obrigatória. Todo o valor é revertido
              para os alunos.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-navy-950">
            Como participar
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {HOW_TO_PARTICIPATE.map((step, i) => (
              <div
                key={step.title}
                className="rounded-2xl border border-navy-100 bg-white p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="font-display text-4xl font-bold text-navy-100">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-navy-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-800/70">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-semibold text-navy-950">
            Onde o seu dinheiro vai parar
          </h2>
          <p className="mt-3 max-w-2xl text-base text-navy-800/70">
            Nada de caixa-preta. Cada contribuição é direcionada para uma causa
            clara, com impacto direto nos alunos.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {APMF_CAUSES.map((cause, i) => {
              const Icon = CAUSE_ICONS[i] ?? HiStar;
              return (
                <div
                  key={cause.title}
                  className="rounded-2xl border border-navy-100 bg-navy-50/60 p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-950 text-gold-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-navy-950">
                    {cause.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-800/70">
                    {cause.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-navy-950 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
                Transparência
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-white">
                Você tem o direito de saber
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-navy-100/70">
                A APMF é uma associação séria, registrada e fiscalizada. A
                prestação de contas é apresentada aos pais e está sempre aberta
                para consulta.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              {[
                { icon: HiEye, title: "CNPJ próprio", desc: "Contas separadas e auditadas" },
                { icon: HiUsers, title: "Diretoria eleita", desc: "Representantes da comunidade" },
                { icon: HiCheckCircle, title: "Contas abertas", desc: "Disponível para os pais" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6"
                >
                  <item.icon className="h-7 w-7 text-gold-300" />
                  <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                  <p className="mt-1 text-xs text-navy-100/70">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center font-display text-3xl font-semibold text-navy-950">
            Perguntas frequentes
          </h2>
          <div className="mt-10 space-y-3">
            {APMF_FAQ.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-navy-100 bg-white open:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-navy-950 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <HiChevronDown className="h-4 w-4 shrink-0 text-navy-800/50 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-navy-800/70">
                  {item.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 rounded-3xl bg-white p-8 text-center shadow-sm">
            <h3 className="font-display text-2xl font-semibold text-navy-950">
              Comece hoje mesmo
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy-800/70">
              Faça uma contribuição pelo PIX{" "}
              <strong className="text-navy-950">{APMF.cnpj}</strong> ou procure a
              secretaria para se associar. O Vicente Rijo agradece, e o seu filho
              também.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/contato/"
                className="rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-navy-950 transition-colors hover:bg-gold-400"
              >
                Falar com a secretaria
              </Link>
              <Link
                href="/"
                className="rounded-full border border-navy-300 px-7 py-3.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-white"
              >
                Voltar ao início
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
