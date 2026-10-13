import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  HiLocationMarker,
  HiMail,
  HiPhone,
  HiClock,
  HiPhotograph,
  HiArrowLeft,
} from "react-icons/hi";
import { SCHOOL, withBasePath } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a secretaria do Colégio Estadual Vicente Rijo. Matrículas, documentos e informações em Londrina-PR.",
};

export default function ContatoPage() {
  return (
    <div className="bg-cream">
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800/70 transition-colors hover:text-navy-950"
        >
          <HiArrowLeft className="h-4 w-4" />
          Voltar ao início
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">
              Fale com a gente
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-navy-950">
              Contato e matrículas
            </h1>
            <p className="mt-4 text-base leading-relaxed text-navy-800/70">
              A secretaria está pronta para atender você. Seja para matrícula,
              documentos, rematrícula ou dúvidas sobre o dia a dia do colégio.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  `${SCHOOL.address}, ${SCHOOL.neighborhood}, ${SCHOOL.city}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-2xl border border-navy-100 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                  <HiLocationMarker className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-950">Endereço</p>
                  <p className="mt-1 text-sm text-navy-800/70">
                    {SCHOOL.address}, {SCHOOL.neighborhood}
                    <br />
                    {SCHOOL.city}-{SCHOOL.state} · CEP {SCHOOL.cep}
                  </p>
                </div>
              </a>

              <a
                href={`tel:${SCHOOL.phone.replace(/[^\d+]/g, "")}`}
                className="flex items-start gap-4 rounded-2xl border border-navy-100 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                  <HiPhone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-950">Telefone</p>
                  <p className="mt-1 text-sm text-navy-800/70">{SCHOOL.phone}</p>
                </div>
              </a>

              <a
                href={`mailto:${SCHOOL.email}`}
                className="flex items-start gap-4 rounded-2xl border border-navy-100 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                  <HiMail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-950">E-mail</p>
                  <p className="break-all text-sm text-navy-800/70">{SCHOOL.email}</p>
                </div>
              </a>

              <a
                href={SCHOOL.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-2xl border border-navy-100 bg-white p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                  <HiPhotograph className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-950">Instagram</p>
                  <p className="mt-1 text-sm text-navy-800/70">{SCHOOL.instagram}</p>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-2xl border border-navy-100 bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                  <HiClock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy-950">
                    Horário da secretaria
                  </p>
                  <p className="mt-1 text-sm text-navy-800/70">
                    Segunda a sexta, das 8h às 12h e das 13h às 17h.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-3xl border border-navy-100">
              <Image
                src={withBasePath("/img/hero/fachada.webp")}
                alt="Fachada do Colégio Estadual Vicente Rijo"
                width={640}
                height={480}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>

            <div className="rounded-3xl bg-navy-950 p-8">
              <h2 className="font-display text-2xl font-semibold text-white">
                Matrículas 2026
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-navy-100/75">
                Leve os documentos do aluno e do responsável à secretaria, das
                <strong className="text-white"> 8h às 12h</strong>. Ensino 100%
                gratuito, sem mensalidade.
              </p>
              <Link
                href="/#matriculas"
                className="mt-6 inline-block rounded-full bg-gold-500 px-6 py-3 text-sm font-bold text-navy-950 transition-colors hover:bg-gold-400"
              >
                Ver passo a passo da matrícula
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
