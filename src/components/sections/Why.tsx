import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { withBasePath } from "@/lib/constants";

const REASONS = [
  {
    title: "Segurança em primeiro lugar",
    desc: "Portões controlados e ambiente monitorado 24h. Nós sabemos onde seu filho está e com quem aprende. Programa escola segura do governo do estado do Paraná.",
    image: withBasePath("/img/images/seguranca2.jpg"),
    imageAlt: "Segurança no Colégio Vicente Rijo: portões controlados e ambiente monitorado",
  },
  {
    title: "Alimentação de verdade",
    desc: "Refeitório para 200 pessoas com merenda de qualidade, refeições balanceadas elaborada e acompanhada por nutricionistas. Ambiente climatizado, limpo e seguro.",
    image: withBasePath("/img/images/alimentacao.png"),
    imageAlt: "Refeitório do Colégio Vicente Rijo: merenda de qualidade para os alunos",
  },
  {
    title: "Dia completo para os pequenos",
    desc: "No Fundamental Integral, o aluno fica de 8h às 15h10, com alimentação completa inclusa e ônibus especial que leva as crianças ao Terminal Central após a saída.",
    image: withBasePath("/img/images/diatodo.png"),
    imageAlt: "Rotina do dia completo no Fundamental Integral do Colégio Vicente Rijo",
  },
  {
    title: "Ensino que abre portas",
    desc: "Fundamental, técnico e médio com professores dedicados, Programa Ganhando o Mundo e centenas de aprovações em vestibulares e pelo programa Aprova Paraná.",
    image: withBasePath("/img/images/ensino.png"),
    imageAlt: "Ensino que abre portas no Colégio Vicente Rijo",
  },
  {
    title: "Esporte e conquistas",
    desc: "Ginásio, quadras, campo profissional e um histórico de campeões que orgulha Londrina. Sede do Acethac (Ginástica Rítmica) e do time sub-15 do Londrina Esporte Clube.",
    image: withBasePath("/img/images/esporte.png"),
    imageAlt: "Estrutura esportiva e conquistas do Colégio Vicente Rijo",
  },
  {
    title: "NAAHS · ir além",
    desc: "Programa exclusivo para alunos com altas habilidades: robótica, ciências, liderança e acompanhamento personalizado. Seu filho pode fazer parte.",
    image: withBasePath("/img/images/comunidade.png"),
    imageAlt: "Programa NAAHS do Colégio Vicente Rijo: para alunos com altas habilidades",
  },
];

export default function Why() {
  return (
    <section id="por-que" className="scroll-mt-20 bg-cream py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Por que o Vicente Rijo"
          title="O lugar certo para o seu filho crescer"
          description="O Vicente Rijo é mais que uma escola: é um espaço de segurança, cuidado e oportunidade, mantido pela comunidade que o ama."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 60}>
              <div className="group h-full overflow-hidden rounded-2xl border border-navy-100 bg-white transition-shadow hover:shadow-lg hover:shadow-navy-950/5">
                <div className="relative aspect-[3/1] w-full overflow-hidden">
                  <Image
                    src={reason.image}
                    alt={reason.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold text-navy-950">
                    {reason.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-navy-800/70">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
