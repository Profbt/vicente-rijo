import type { Metadata } from "next";
import Link from "next/link";
import { HiArrowLeft, HiPhone, HiOutlineSearch } from "react-icons/hi";
import { SCHOOL } from "@/lib/constants";

// Página 404: noindex porque o nginx já devolve status 404 para este arquivo.
// O canonical herda do layout e resolveria para "/_not-found/", que não existe;
// apontar para a raiz evita esse endereço fantasma em auditorias.
export const metadata: Metadata = {
  title: "Página não encontrada",
  description: "O endereço que você procurou não existe no site do Vicente Rijo.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

const ATALHOS = [
  { label: "Ensino Fundamental Integral", href: "/#fundamental" },
  { label: "Ensino Médio", href: "/#medio" },
  { label: "Cursos técnicos", href: "/#ensino" },
  { label: "Matrículas", href: "/#matriculas" },
  { label: "APMF", href: "/apmf/" },
  { label: "Contato", href: "/contato/" },
];

export default function NotFound() {
  return (
    <div className="bg-cream">
      <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
          <HiOutlineSearch className="h-8 w-8" />
        </div>

        <p className="mt-8 font-display text-7xl font-semibold leading-none text-navy-950 sm:text-8xl">
          404
        </p>

        <h1 className="mt-6 font-display text-3xl font-semibold text-navy-950 sm:text-4xl">
          Essa página não existe
        </h1>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-navy-800/70">
          O endereço que você abriu não foi encontrado. Pode ser um link antigo
          ou um erro de digitação. Abaixo estão os caminhos mais procurados.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold text-navy-950 shadow-sm transition-colors hover:bg-gold-400"
          >
            <HiArrowLeft className="h-4 w-4" />
            Voltar ao início
          </Link>
          <a
            href={`tel:${SCHOOL.phone.replace(/\D/g, "")}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-navy-200 bg-white px-7 py-3.5 text-sm font-bold text-navy-950 transition-colors hover:bg-navy-50"
          >
            <HiPhone className="h-4 w-4" />
            Ligar para a secretaria
          </a>
        </div>

        <div className="mt-14 w-full text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-600">
            Atalhos
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {ATALHOS.map((atalho) => (
              <li key={atalho.href}>
                <Link
                  href={atalho.href}
                  className="block rounded-xl border border-navy-100 bg-white px-4 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-gold-300 hover:text-navy-950"
                >
                  {atalho.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-sm text-navy-800/60">
          {SCHOOL.name} · {SCHOOL.address}, {SCHOOL.neighborhood} ·{" "}
          {SCHOOL.city}-{SCHOOL.state}
        </p>
      </section>
    </div>
  );
}
