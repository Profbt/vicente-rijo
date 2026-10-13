import Link from "next/link";

export default function Cta() {
  return (
    <section className="bg-gold-50">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2 className="max-w-2xl font-display text-3xl font-semibold text-navy-950 text-balance sm:text-4xl">
          A próxima história do Vicente Rijo pode ser a do seu filho
        </h2>
        <p className="max-w-xl text-lg text-navy-800/70">
          Fale com a nossa secretaria e descubra como matricular seu filho. O
          ensino é gratuito e a vaga, uma conquista da família inteira.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/contato/"
            className="rounded-full bg-navy-950 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-navy-800"
          >
            Fazer contato
          </Link>
          <Link
            href="/apmf/"
            className="rounded-full border border-navy-300 px-7 py-3.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-white"
          >
            Conhecer a APMF
          </Link>
        </div>
      </div>
    </section>
  );
}
