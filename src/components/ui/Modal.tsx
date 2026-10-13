'use client';

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  HiAcademicCap,
  HiArrowRight,
  HiBadgeCheck,
  HiBookOpen,
  HiBriefcase,
  HiCalculator,
  HiCash,
  HiCheckCircle,
  HiChip,
  HiClipboardList,
  HiCode,
  HiColorSwatch,
  HiCube,
  HiDatabase,
  HiDesktopComputer,
  HiGlobe,
  HiHeart,
  HiIdentification,
  HiInformationCircle,
  HiLightBulb,
  HiOfficeBuilding,
  HiPhone,
  HiPuzzle,
  HiScale,
  HiServer,
  HiSpeakerphone,
  HiSparkles,
  HiTerminal,
  HiUserCircle,
  HiUsers,
  HiX,
} from "react-icons/hi";
import type { IconType } from "react-icons";
import type { ModalData, ModalItem } from "@/lib/constants";
import { withBasePath } from "@/lib/constants";

const ITEM_ICONS: Record<string, IconType> = {
  briefcase: HiBriefcase,
  users: HiUsers,
  cash: HiCash,
  megaphone: HiSpeakerphone,
  cube: HiCube,
  chip: HiChip,
  "academic-cap": HiAcademicCap,
  badge: HiBadgeCheck,
  terminal: HiTerminal,
  code: HiCode,
  server: HiServer,
  database: HiDatabase,
  desktop: HiDesktopComputer,
  puzzle: HiPuzzle,
  "book-open": HiBookOpen,
  "light-bulb": HiLightBulb,
  swatch: HiColorSwatch,
  heart: HiHeart,
  sparkles: HiSparkles,
  calculator: HiCalculator,
  clipboard: HiClipboardList,
  phone: HiPhone,
  scale: HiScale,
  globe: HiGlobe,
  "user-circle": HiUserCircle,
  identification: HiIdentification,
  "office-building": HiOfficeBuilding,
};

function ItemIcon({ icon, dark }: { icon?: string; dark?: boolean }) {
  const Icon = icon ? ITEM_ICONS[icon] : undefined;
  if (Icon) {
    return (
      <Icon
        className={`h-5 w-5 shrink-0 ${dark ? "text-navy-950" : "text-gold-700"}`}
      />
    );
  }
  return <HiCheckCircle className="h-5 w-5 shrink-0 text-gold-500" />;
}

function SectionItems({ items, highlight }: { items: ModalItem[]; highlight?: boolean }) {
  if (highlight) {
    return (
      <div className="mt-4 rounded-2xl border border-gold-200 bg-gradient-to-br from-gold-50 to-cream p-5 sm:p-7">
        {items.map((item, i) => (
          <div
            key={item.title}
            className={`flex items-start gap-4 ${
              i > 0 ? "mt-5 border-t border-gold-200/70 pt-5" : ""
            }`}
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-500 text-navy-950 shadow-sm">
              <ItemIcon icon={item.icon} dark />
            </div>
            <div className="min-w-0">
              <p className="flex items-center gap-2 font-display text-lg font-semibold text-navy-950 sm:text-xl">
                {item.title}
              </p>
              <p className="mt-1 text-base leading-relaxed text-navy-800/75 sm:text-lg">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`mt-4 grid gap-3 ${items.length === 1 ? "sm:grid-cols-1" : "sm:grid-cols-2"}`}>
      {items.map((item) => (
        <div
          key={item.title}
          className="flex items-start gap-3 rounded-2xl border border-navy-100 bg-cream px-4 py-4 transition-colors hover:border-gold-200 hover:bg-gold-50 sm:px-5 sm:py-5"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold-100">
            <ItemIcon icon={item.icon} />
          </div>
          <div>
            <p className="text-base font-semibold text-navy-950">
              {item.title}
            </p>
            <p className="mt-0.5 text-base leading-relaxed text-navy-800/70">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

type ModalProps = {
  data: ModalData;
  buttonLabel?: string;
  buttonClassName?: string;
  enrollLabel?: string;
};

export default function Modal({
  data,
  buttonLabel = "Saiba mais",
  buttonClassName,
  enrollLabel,
}: ModalProps) {
  const [open, setOpen] = useState(false);

  const handleEnroll = () => {
    setOpen(false);
    setTimeout(() => {
      const target = document.getElementById("matriculas");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={buttonClassName}
      >
        <HiInformationCircle className="h-4 w-4" />
        {buttonLabel}
      </button>
    );
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={data.title}
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      onClick={() => setOpen(false)}
    >
      <div className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />

      <div
        onClick={(event) => event.stopPropagation()}
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="h-1.5 bg-gradient-to-r from-gold-400 via-gold-500 to-gold-600" />

        <header
          className={`relative shrink-0 overflow-hidden min-h-[240px] sm:min-h-[300px] ${
            data.accent === "parana" ? "bg-parana" : "bg-navy-950"
          }`}
        >
          {data.image && (
            <img
              src={withBasePath(data.image)}
              alt={data.title}
              className="modal-image-in absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: data.imagePosition ?? "center 25%" }}
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(227,181,60,0.12),transparent_55%)]" />
          <div className="relative z-10 flex min-h-[240px] sm:min-h-[300px] flex-col justify-end px-7 pb-8 pt-16 sm:px-10 sm:pb-10 sm:pt-20">
            <p className="text-sm font-semibold uppercase leading-snug tracking-widest text-gold-300">
              {data.eyebrow}
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold leading-snug text-white sm:text-4xl">
              {data.title}
            </h3>
          </div>
          <button
            type="button"
            aria-label="Fechar"
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 z-20 rounded-full border border-white/15 bg-black/30 p-2 text-white/70 backdrop-blur-sm transition-colors hover:border-gold-400 hover:text-gold-300 sm:right-6 sm:top-6"
          >
            <HiX className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-7 py-6 sm:px-10 sm:py-8">
          <p className="rounded-2xl border border-navy-100 bg-cream px-5 py-4 text-base leading-relaxed text-navy-800/80 sm:text-lg">
            {data.intro}
          </p>

          {data.sections.map((section) => (
            <div key={section.title} className="mt-7">
              <h4 className="font-display text-xl font-semibold text-navy-950 sm:text-2xl">
                {section.title}
              </h4>
              {section.intro && (
                <p className="mt-1 text-base leading-relaxed text-navy-800/70 sm:text-lg">
                  {section.intro}
                </p>
              )}
              <SectionItems items={section.items} highlight={section.highlight} />
            </div>
          ))}

          {enrollLabel && (
            <button
              type="button"
              onClick={handleEnroll}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 px-6 py-4 text-base font-bold text-navy-950 shadow-sm transition-all hover:from-gold-400 hover:to-gold-500"
            >
              {enrollLabel}
              <HiArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>

        <footer className="border-t border-navy-100 px-7 py-4 sm:px-10">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full rounded-full border border-navy-200 px-6 py-3 text-base font-semibold text-navy-800 transition-colors hover:bg-navy-50"
          >
            Fechar
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
}
