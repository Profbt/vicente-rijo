export default function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  dark?: boolean;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <p
          className={`text-xs font-semibold uppercase tracking-[0.25em] ${
            dark ? "text-gold-300" : "text-gold-600"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`mt-3 font-display text-3xl font-semibold text-balance sm:text-4xl ${
          dark ? "text-white" : "text-navy-950"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            dark ? "text-navy-100/80" : "text-navy-800/70"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
