"use client";

import { useEffect, useState } from "react";

// Palavras rotativas na frase "Uma IA personalizada para ___".
// Implementado com CSS puro (grid empilhado + fade) para evitar
// hydration mismatch entre SSR e cliente — framer-motion com `filter`
// no estado inicial serializa diferente no HTML do servidor.
const WORDS = ["ATENDER", "QUALIFICAR", "CONVERTER", "AGENDAR", "ACOMPANHAR"];
const INTERVAL_MS = 3000;

export function DynamicWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % WORDS.length),
      INTERVAL_MS,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-block align-baseline">
      <span className="text-[var(--text-secondary)] font-normal">
        Uma IA personalizada para{" "}
      </span>
      <span className="relative inline-grid align-baseline">
        {WORDS.map((word, i) => (
          <span
            key={word}
            aria-hidden={i !== index}
            className="col-start-1 row-start-1 whitespace-nowrap font-semibold transition-opacity duration-500 ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
          >
            <span className="lp-accent">{word}</span>
          </span>
        ))}
      </span>
    </span>
  );
}
