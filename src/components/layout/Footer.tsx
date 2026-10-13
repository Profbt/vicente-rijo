import Link from "next/link";
import Image from "next/image";
import { HiLocationMarker, HiMail, HiPhone, HiPhotograph, HiOfficeBuilding, HiSparkles } from "react-icons/hi";
import { SCHOOL, withBasePath } from "@/lib/constants";

const FULL_SITE_URL = "https://profbt.github.io/SITE_VR/";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={withBasePath("/img/brand/logo_escola.png")}
              alt="Logo do Colégio Estadual Vicente Rijo"
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
            />
            <div className="leading-tight">
              <p className="font-display text-lg font-bold text-white">
                Colégio Estadual Vicente Rijo
              </p>
              <p className="text-xs uppercase tracking-widest text-gold-300">
                80 anos em Londrina
              </p>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-100/70">
            Um dos maiores colégios estaduais do Paraná. Educação pública,
            gratuita e de qualidade desde 1946.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
            O colégio
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <Link href="/#por-que" className="text-navy-100/70 transition-colors hover:text-white">
                Por que o Vicente Rijo
              </Link>
            </li>
            <li>
              <Link href="/#ensino" className="text-navy-100/70 transition-colors hover:text-white">
                Ensino Fundamental e Técnico
              </Link>
            </li>
            <li>
              <Link href="/#estrutura" className="text-navy-100/70 transition-colors hover:text-white">
                Estrutura completa
              </Link>
            </li>
            <li>
              <Link href="/apmf/" className="text-navy-100/70 transition-colors hover:text-white">
                APMF · Participe
              </Link>
            </li>
            <li>
              <Link href="/contato/" className="text-navy-100/70 transition-colors hover:text-white">
                Contato e matrículas
              </Link>
            </li>
            <li>
              <a
                href={FULL_SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-navy-100/70 transition-colors hover:text-white"
              >
                <HiSparkles className="h-4 w-4" />
                Site completo
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-white">
            Contato
          </h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2.5">
              <HiLocationMarker className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
              <span className="text-navy-100/70">
                {SCHOOL.address}, {SCHOOL.neighborhood}, {SCHOOL.city}-{SCHOOL.state}
                <br />
                CEP {SCHOOL.cep}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <HiPhone className="h-4 w-4 shrink-0 text-gold-300" />
              <a href={`tel:${SCHOOL.phone.replace(/[^\d+]/g, "")}`} className="text-navy-100/70 hover:text-white">
                {SCHOOL.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <HiMail className="h-4 w-4 shrink-0 text-gold-300" />
              <a href={`mailto:${SCHOOL.email}`} className="break-all text-navy-100/70 hover:text-white">
                {SCHOOL.email}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <HiPhotograph className="h-4 w-4 shrink-0 text-gold-300" />
              <a
                href={SCHOOL.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-100/70 hover:text-white"
              >
                {SCHOOL.instagram}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-navy-100/50 sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {SCHOOL.name} · {SCHOOL.city}, {SCHOOL.state}</p>
          <p className="flex items-center gap-1">
            <HiOfficeBuilding className="h-3.5 w-3.5" />
            Educação pública, gratuita e de qualidade.
          </p>
        </div>
      </div>
    </footer>
  );
}
