"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { niches } from "../../lib/copy";
import { Reveal } from "../ui/primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Niches() {
  const [active, setActive] = useState(0);
  const [metric, setMetric] = useState(0);
  const item = niches.items[active];
  const m = niches.metrics[metric];

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

        {/* Métricas clicáveis */}
        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 max-w-[900px] mx-auto">
            {niches.metrics.map((mt, i) => {
              const on = i === metric;
              return (
                <button
                  key={mt.label}
                  onClick={() => setMetric(i)}
                  className="text-left rounded-2xl border px-4 py-4 transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: on ? "rgba(0,168,255,0.09)" : "rgba(255,255,255,0.03)",
                    borderColor: on ? "rgba(0,168,255,0.4)" : "rgba(255,255,255,0.09)",
                    boxShadow: on ? "0 12px 32px rgba(0,120,255,0.16)" : "none",
                  }}
                >
                  <p
                    className="text-[0.625rem] font-bold tracking-[0.1em]"
                    style={{ color: on ? "#4dc3ff" : "var(--on-dark-3)" }}
                  >
                    {mt.label}
                  </p>
                  <p
                    className="mt-1 font-semibold tabular-nums"
                    style={{
                      fontSize: "2rem",
                      letterSpacing: "-0.04em",
                      color: on ? "#ffffff" : "rgba(255,255,255,0.7)",
                    }}
                  >
                    {mt.value}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: "var(--on-dark-3)" }}>
                    {mt.note}
                  </p>
                </button>
              );
            })}
          </div>
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="text-center text-sm mb-10"
            style={{ color: "var(--on-dark-2)" }}
          >
            <span className="font-semibold" style={{ color: "#4dc3ff" }}>
              {m.label.toLowerCase()}
                </span>{" "}
              — {m.note}.
          </motion.div>
        </Reveal>

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
