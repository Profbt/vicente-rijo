"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { withBasePath } from "@/lib/constants";

type Slide =
  | {
      src: string;
      alt: string;
      text: { title: string; subtitle: string };
    }
  | {
      src: string;
      alt: string;
      text?: undefined;
    };

const SLIDES: Slide[] = [
  {
    src: "/img/hero/vicente-rijo-aerea-1.jpg",
    alt: "Vista aérea do Colégio Estadual Vicente Rijo em Londrina",
    text: {
      title: "O 3º maior colégio do Paraná",
      subtitle: "Estrutura de respeito para o seu filho estudar, jogar e crescer.",
    },
  },
  { src: "/img/images/carrossel/campo.png", alt: "Campo de futebol do Colégio Estadual Vicente Rijo" },
  { src: "/img/images/carrossel/esportes2.jpg", alt: "Alunos em prática esportiva no Colégio Estadual Vicente Rijo" },
  { src: "/img/images/carrossel/externa.png", alt: "Vista externa do Colégio Estadual Vicente Rijo" },
  { src: "/img/images/carrossel/externa2.png", alt: "Vista externa da estrutura do Colégio Estadual Vicente Rijo" },
  { src: "/img/images/carrossel/formatura1.png", alt: "Cerimônia de formatura no Colégio Estadual Vicente Rijo" },
  { src: "/img/images/carrossel/lab1.png", alt: "Laboratório de informática do Colégio Estadual Vicente Rijo" },
  { src: "/img/images/carrossel/lab2.png", alt: "Laboratório de informática do Colégio Estadual Vicente Rijo" },
  { src: "/img/images/carrossel/lab3.png", alt: "Laboratório do Colégio Estadual Vicente Rijo" },
  { src: "/img/images/carrossel/lab4.png", alt: "Laboratório de informática do Colégio Estadual Vicente Rijo" },
  { src: "/img/images/carrossel/lab5.png", alt: "Laboratório de informática do Colégio Estadual Vicente Rijo" },
  { src: "/img/images/carrossel/ritimica1.png", alt: "Aula de ritmica no Colégio Estadual Vicente Rijo" },
  { src: "/img/images/carrossel/brincadeiras.png", alt: "Alunos em brincadeiras no Colégio Estadual Vicente Rijo" },
  { src: "/img/images/carrossel/eventos.png", alt: "Evento no Colégio Estadual Vicente Rijo" },
  { src: "/img/images/carrossel/eventos2.png", alt: "Evento com público no Colégio Estadual Vicente Rijo" },
];

const AUTOPLAY_MS = 5000;

export default function InfraCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent(((index % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  const goToNext = useCallback(() => {
    setCurrent((i) => (i + 1) % SLIDES.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrent((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;

    timerRef.current = setInterval(goToNext, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, goToNext]);

  return (
    <div
      role="region"
      aria-roledescription="carrossel"
      aria-label="Estrutura do Colégio Estadual Vicente Rijo"
      className="relative overflow-hidden rounded-3xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[21/9] w-full">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            aria-hidden={i !== current}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={withBasePath(slide.src)}
              alt={slide.alt}
              fill
              sizes="(max-width: 1152px) 100vw, 1152px"
              preload={i === 0}
              className="object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />

        {SLIDES[current]?.text ? (
          <div className="absolute bottom-0 left-0 p-6 sm:p-8">
            <p className="font-display text-2xl font-bold text-white sm:text-3xl">
              {SLIDES[current].text.title}
            </p>
            <p className="mt-1 text-base text-white/80">{SLIDES[current].text.subtitle}</p>
          </div>
        ) : null}
      </div>

      <button
        type="button"
        onClick={goToPrev}
        aria-label="Imagem anterior"
        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/50 text-white backdrop-blur-sm transition-colors hover:bg-navy-950/75 sm:left-4"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        type="button"
        onClick={goToNext}
        aria-label="Próxima imagem"
        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-navy-950/50 text-white backdrop-blur-sm transition-colors hover:bg-navy-950/75 sm:right-4"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 sm:bottom-5">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Ir para a imagem ${i + 1}`}
            aria-current={i === current ? "true" : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-gold-400" : "w-2 bg-white/60 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
