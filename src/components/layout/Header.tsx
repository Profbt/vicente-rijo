"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiMenu, HiX, HiExternalLink } from "react-icons/hi";
import { withBasePath } from "@/lib/constants";

const LINKS = [
  { label: "Por que o VR", href: "/#por-que" },
  { label: "Ensino", href: "/#fundamental" },
  { label: "Estrutura", href: "/#estrutura" },
  { label: "Conquistas", href: "/#conquistas" },
  { label: "Matrículas", href: "/#matriculas" },
  { label: "APMF", href: "/#apmf" },
];

const PORTALS = [
  {
    label: "Pais",
    title: "Portal dos Pais",
    href: "https://sites.google.com/escola.pr.gov.br/vicenterijoescolaonline/in%C3%ADcio",
  },
  {
    label: "Alunos",
    title: "Portal do Aluno",
    href: "https://portaldoalunovr.vercel.app/",
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur transition-shadow ${
        scrolled ? "shadow-sm shadow-navy-950/5" : ""
      }`}
    >
      <div className="hidden border-b border-white/10 bg-navy-950 lg:block">
        <div className="mx-auto flex h-9 max-w-6xl items-center justify-end gap-6 px-4 sm:px-6">
          {PORTALS.map((portal) => (
            <a
              key={portal.href}
              href={portal.href}
              target="_blank"
              rel="noopener noreferrer"
              title={portal.title}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-navy-100/75 transition-colors hover:text-gold-300"
            >
              <HiExternalLink className="h-3.5 w-3.5" aria-hidden />
              {portal.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <Image
            src={withBasePath("/img/brand/logo_escola.png")}
            alt="Logo do Colégio Estadual Vicente Rijo"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="leading-none">
            <span className="block text-[11px] font-semibold uppercase tracking-widest text-navy-800/60 -mb-1">
              Colégio Estadual
            </span>
            <span className="block font-display text-xl font-bold text-navy-950 sm:text-2xl">
              Vicente Rijo
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy-900/70 transition-colors hover:text-navy-950"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#matriculas"
            className="rounded-full bg-navy-950 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
          >
            Matricule-se
          </Link>
        </nav>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-navy-950 lg:hidden"
        >
          {open ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-navy-100 bg-white lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-4">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-navy-900/80 hover:bg-navy-50"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 border-t border-navy-100" />
            {PORTALS.map((portal) => (
              <a
                key={portal.href}
                href={portal.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-md px-3 py-3 text-base font-medium text-navy-900/80 hover:bg-navy-50"
              >
                <HiExternalLink className="h-4 w-4 text-navy-800/50" aria-hidden />
                {portal.title}
              </a>
            ))}
            <Link
              href="/#matriculas"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-navy-950 px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Matricule-se
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
