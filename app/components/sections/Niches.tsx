"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { niches } from "../../lib/copy";
import { Reveal } from "../ui/primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Niches() {
  const [active, setActive] = useState(0);
  const item = niches.items[active];

  return (
    <section id="nichos" className="relative pt-10 lg:pt-[40px] pb-10 lg:pb-[40px]">
      <div className="lp-container">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center gap-5 mb-8 lg:mb-10">
          <Reveal>
            <p className="lp-label" style={{ color: "var(--on-dark-3)" }}>
              {niches.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="lp-h2" style={{ maxWidth: 921 }}>
              {niches.title}{" "}
              <span className="lp-accent">{niches.titleHi}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lp-lead lp-lead-dark" style={{ maxWidth: 700 }}>
              {niches.support}
            </p>
          </Reveal>
        </div>

        {/* Lista de nichos + conversa */}
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-16 items-start">
            {/* Nichos */}
            <div className="flex flex-col gap-1.5">
              {niches.items.map((n, i) => (
                <button
                  key={n.name}
                  onClick={() => setActive(i)}
                  className="text-left px-4 py-2.5 rounded-lg transition-colors duration-300"
                  style={{
                    color:
                      i === active ? "var(--on-dark)" : "rgba(255,255,255,0.45)",
                    background:
                      i === active ? "rgba(255,255,255,0.05)" : "transparent",
                  }}
                >
                  <span className="lp-label">{n.name}</span>
                </button>
              ))}
            </div>

            {/* Conversa + print */}
            <div className="flex flex-col gap-6">
              <div
                className="rounded-2xl p-5 sm:p-7"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* Remount por key — AnimatePresence mode="wait" trava nesta versão */}
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                >
                  <p className="text-sm" style={{ color: "var(--on-dark-3)" }}>
                    Paciente pergunta
                  </p>
                  <p
                    className="mt-2 text-lg font-semibold"
                    style={{ color: "var(--on-dark)" }}
                  >
                    “{item.question}”
                  </p>
                  <p
                    className="mt-4 text-sm leading-relaxed"
                    style={{ color: "var(--on-dark-2)" }}
                  >
                    {item.answer}
                  </p>
                </motion.div>
              </div>

              <div
                className="overflow-hidden rounded-2xl"
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <Image
                  key={item.image}
                  src={item.image}
                  alt={`Leads e procedimentos — ${item.name}`}
                  width={1400}
                  height={805}
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
