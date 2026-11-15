import variants from "./image-variants.json";

// next/image com export estático: nada de otimização em runtime. O build pré-gera
// as variantes (scripts/optimize-images.mjs) e o loader só aponta para a certa.
const WIDTHS = variants as Record<string, number[]>;

export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
}): string {
  const available = WIDTHS[src];

  // Fora do pipeline (ícones, imagens pequenas): servida como está em public.
  if (!available) return src;

  const chosen = available.find((w) => w >= width) ?? available.at(-1);

  return `/img/opt/${src.replace(/^\/img\//, "").replace(/\.[^.]+$/, "")}-${chosen}.webp`;
}
