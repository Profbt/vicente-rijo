import Link from "next/link";
import Image from "next/image";
import { HiHeart, HiCash, HiEye, HiChat } from "react-icons/hi";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import CopyPixButton from "@/components/ui/CopyPixButton";
import { APMF, APMF_CAUSES, withBasePath } from "@/lib/constants";

const TRANSPARENCY = [
  {
    icon: HiCash,
    title: "CNPJ próprio",
    desc: "A APMF tem CNPJ próprio e contas separadas. O dinheiro é todo revertido para manutenções e compras de material e mobiliário para a escola.",
  },
  {
    icon: HiEye,
    title: "Diretoria eleita",
    desc: "Pais eleitos pela comunidade. Você também pode se candidatar e participar.",
  },
  {
    icon: HiChat,
    title: "Prestação de contas aberta",
    desc: "Tudo é registrado e apresentado aos pais. Transparência é o nosso cartão de visita.",
  },
];

export default function Apmf() {
  return (
    <section id="apmf" className="scroll-mt-20 relative overflow-hidden bg-navy-950 py-20 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-navy-700/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="APMF · Associação de Pais, Mestres e Funcionários"
          title="O Vicente Rijo é forte porque a comunidade participa"
          description="O governo garante a escola. A APMF garante o brilho. Com uma contribuição pequena por mês, você faz a diferença direto na vida do seu filho."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="h-full rounded-3xl border border-gold-400/40 bg-gradient-to-b from-gold-500 to-gold-600 p-8 shadow-xl shadow-gold-900/30">
              <div className="flex items-center gap-2">
                <HiHeart className="h-6 w-6 text-navy-950" />
                <p className="text-xs font-bold uppercase tracking-widest text-navy-900">
                  Contribuição mensal sugerida
                </p>
              </div>
              <p className="mt-4 font-display text-6xl font-bold text-navy-950">
                {APMF.contribution}
              </p>
              <p className="mt-2 text-base font-medium text-navy-900/80">
                por mês. O valor é só uma sugestão. Você pode doar o quanto quiser
                e puder.
              </p>

              <div className="mt-8 flex flex-col items-center gap-6">
                <div className="rounded-2xl bg-white p-4 shadow-lg">
                  <Image
                    src={withBasePath("/img/images/qrcode_apmf.png")}
                    alt="QR Code PIX APMF"
                    width={180}
                    height={180}
                    className="h-44 w-44"
                  />
                </div>

                <div className="w-full rounded-2xl bg-navy-950 p-5">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-gold-300">
                    PIX da APMF
                  </p>
                  <p className="mt-1 text-lg font-semibold text-white">{APMF.cnpj}</p>
                  <p className="mt-1 text-xs text-navy-100/60">
                    Associação de Pais, Mestres e Funcionários do Colégio Estadual Vicente Rijo
                  </p>
                  <CopyPixButton value={APMF.pixCopiaECola} label="Copiar PIX copia e cola" />
                </div>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-navy-900/70">
                Confira o que a sua participação já conquistou no{" "}
                <Link href="/apmf/" className="font-bold underline underline-offset-2">
                  site da APMF
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="grid gap-4">
              {TRANSPARENCY.map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-gold-300">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="mt-1 text-base leading-relaxed text-navy-100/70">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {APMF_CAUSES.map((cause, i) => (
                <Reveal key={cause.title} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-5">
                    <h4 className="font-display text-lg font-semibold text-gold-200">
                      {cause.title}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-navy-100/70">
                      {cause.desc}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={200}>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/apmf/"
                  className="rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-navy-950 transition-colors hover:bg-gold-400"
                >
                  Quero participar
                </Link>
                <p className="text-sm text-navy-100/60">
                  Contribuição voluntária · Participe das reuniões · Proponha melhorias
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
