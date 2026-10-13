import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { withBasePath } from "@/lib/constants";

const FACTS = [
  {
    image: withBasePath("/img/images/esportes.jpg"),
    imageAlt: "Atletas do Colégio Vicente Rijo em competição",
    title: "Tradição de campeões",
    desc: "Futebol com raízes no Londrina Esporte Clube, ginástica rítmica e atletas que brilham nos 100m rasos, no ciclismo e no BMX. Um histórico de medalhas e recordes em todo o Paraná.",
  },
  {
    image: withBasePath("/img/images/mundo.jpg"),
    imageAlt: "Aluno do Colégio Vicente Rijo em intercâmbio pelo Programa Ganhando o Mundo",
    title: "Ganhando o Mundo",
    desc: "Alunos do Vicente Rijo concorrem a uma vaga pelo programa Ganhando o Mundo, que seleciona por nota e outros critérios. Todo ano temos estudantes escolhidos para estudar no exterior: outro idioma, outra cultura e uma bagagem que levam para a vida.",
  },
  {
    image: withBasePath("/img/images/esportes2.jpg"),
    imageAlt: "Alunos do Colégio Vicente Rijo em atividade esportiva",
    title: "Esporte como formação",
    desc: "Treino, disciplina e superação formam atletas dentro e fora de quadra. O Vicente Rijo é berço de esportistas que hoje competem em clubes e representam o Paraná por todo o país.",
  },
];

export default function Conquistas() {
  return (
    <section id="conquistas" className="scroll-mt-20 bg-navy-950 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          dark
          eyebrow="Conquistas"
          title="O orgulho de Londrina dentro e fora de campo"
          description="O Vicente Rijo é sinônimo de vitória. Ao longo de 80 anos, o colégio construiu uma tradição esportiva e intelectual que enche os pais de orgulho."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {FACTS.map((fact, i) => (
            <Reveal key={fact.title} delay={i * 100}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition-colors hover:border-gold-400/40">
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={fact.image}
                    alt={fact.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-display text-xl font-semibold text-white">
                    {fact.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-navy-100/70">
                    {fact.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
