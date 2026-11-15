"use client";

import { useEffect } from "react";

// Destaque do card #documentos no clique da seta: repetir a animação a cada
// clique (o :target só dispara quando o hash muda) e não piscar ao abrir a URL.
export default function DocsFlash() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const link = (event.target as Element).closest('a[href="#documentos"]');
      const card = document.getElementById("documentos");
      if (!link || !card) return;

      card.classList.remove("docs-flash");
      void card.offsetWidth; // reinicia a animação
      card.classList.add("docs-flash");
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
