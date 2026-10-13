"use client";

import Image from "next/image";
import { withBasePath } from "@/lib/constants";
import { useEffect, useRef, useState } from "react";
import { HiHeart } from "react-icons/hi";

function CountUp({ target, suffix = "", duration = 2000, className = "" }: { target: number; suffix?: string; duration?: number; className?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLParagraphElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  const formatted = count.toLocaleString("pt-BR");
  return (
    <p ref={ref} className={`font-display text-2xl sm:text-4xl font-bold text-gold-300 tabular-nums ${className}`}>
      {formatted}
      {suffix}
    </p>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-navy-950 lg:min-h-[700px]">
      <Image
        src={withBasePath("/img/hero/fachada.webp")}
        alt="Fachada do Colégio Estadual Vicente Rijo"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/70 to-navy-950/95" />
      <div className="pointer-events-none absolute inset-0 bg-image [background-size:100px_100px] [background-image:linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(245,197,24,0.08),transparent_60%)]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 pb-20 pt-16 text-center sm:px-6 lg:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-300">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
          Desde 1946 · 80 anos
        </span>

        <h1 className="mt-7 font-display text-5xl font-bold leading-[1.05] text-white text-balance sm:text-6xl lg:text-[4rem]">
          Educação pública de qualidade
          <br />
          para o{" "}
          <span className="bg-gradient-to-r from-gold-300 to-gold-400 bg-clip-text text-transparent">
            seu filho
          </span>
        </h1>

        <p
          className="mt-7 max-w-xl text-lg leading-relaxed text-white/60 sm:text-xl"
          style={{ textShadow: "0 2px 8px rgba(0,0,0,.7)" }}
        >
          Um dos maiores colégios estaduais do Paraná, com 80 anos formando
          gerações. Fundamental Integral, ensino técnico e médio, estrutura
          completa e um lugar seguro para o seu filho crescer.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#matriculas"
            className="rounded-full bg-gradient-to-r from-gold-500 to-gold-400 px-8 py-4 text-base font-bold text-navy-950 shadow-lg shadow-gold-500/25 transition-all hover:from-gold-400 hover:to-gold-300 hover:shadow-gold-400/35"
          >
            Quero matricular meu filho
          </a>
          <a
            href="#por-que"
            className="rounded-full border border-gold-400/30 px-8 py-4 text-base font-semibold text-gold-300 transition-colors hover:border-gold-400/50 hover:bg-gold-400/5"
          >
            Conheça o Colégio
          </a>
          <a
            href="#apmf"
            className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 px-8 py-4 text-base font-semibold text-gold-300 transition-colors hover:border-gold-400/50 hover:bg-gold-400/5"
          >
            <HiHeart className="h-5 w-5 animate-heartbeat text-gold-400" />
            Conheça a APMF
          </a>
        </div>

        <div className="mt-14 grid w-full max-w-md grid-cols-3 gap-4 sm:gap-8 border-t border-white/10 pt-8">
          <div className="text-center">
            <CountUp target={1000} suffix="+" className="inline-block w-20 sm:w-32 text-center" />
            <p className="mt-1.5 text-[10px] sm:text-sm uppercase tracking-wider text-white/40">
              alunos
            </p>
          </div>
          <div className="text-center">
            <CountUp target={100} suffix="+" className="inline-block w-16 sm:w-24 text-center" />
            <p className="mt-1.5 text-[10px] sm:text-sm uppercase tracking-wider text-white/40">
              professores
            </p>
          </div>
          <div className="text-center">
            <CountUp target={25541} suffix=" m²" duration={2500} className="inline-block w-28 sm:w-48 text-center" />
            <p className="mt-1.5 w-28 sm:w-48 text-center text-[10px] sm:text-sm uppercase tracking-wider text-white/40">
              de estrutura
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
