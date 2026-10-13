"use client";

import { useState } from "react";
import { HiClipboard, HiCheck } from "react-icons/hi";

export default function CopyPixButton({
  value,
  label = "Copiar PIX",
}: {
  value: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = value;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-2 text-xs font-semibold text-gold-300 transition-colors hover:bg-gold-400/20"
    >
      {copied ? (
        <>
          <HiCheck className="h-4 w-4" />
          Copiado!
        </>
      ) : (
        <>
          <HiClipboard className="h-4 w-4" />
          {label}
        </>
      )}
    </button>
  );
}
