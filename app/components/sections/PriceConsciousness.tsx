"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { priceConsciousness as copy } from "../../lib/copy";
import { Reveal } from "../ui/primitives";

const SPRING = { type: "spring" as const, stiffness: 170, damping: 20, mass: 0.9 };

/** Número que conta até o valor quando a seção entra na viewport. */
function CountStat({
  value,
  suffix,
  tone,
  start,
}: {
  value: number;
  suffix: string;
  tone: "bad" | "good";
  start: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const counter = useMotionValue(0);
  const reduced = useReducedMotion();

  // Sempre renderiza 0 no HTML (SSR e cliente); anima via DOM depois da montagem.
  useEffect(() => {
    if (!start) return;
    if (reduced) {
      if (ref.current) ref.current.textContent = String(value);
      return;
    }
    const controls = animate(counter, value, { duration: 1.1, ease: "easeOut" });
    return () => controls.stop();
  }, [start, value, counter, reduced]);

  useMotionValueEvent(counter, "change", (v) => {
    if (ref.current) ref.current.textContent = String(Math.round(v));
  });

  return (
    <span
      className="block font-extrabold leading-none tabular-nums"
      style={{
        fontSize: "clamp(2.5rem, 6vw, 3.75rem)",
        letterSpacing: "-0.05em",
        color: tone === "bad" ? "#fca5a5" : "#ffffff",
      }}
    >
      <span ref={ref}>0</span>
      <motion.span
        style={{ fontSize: "0.5em", marginLeft: 2 }}
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        {suffix}
      </motion.span>
    </span>
  );
}

function CheckRow({
  text,
  good,
  start,
  delay,
}: {
  text: string;
  good: boolean;
  start: boolean;
  delay: number;
}) {
  return (
    <motion.li
      className="flex items-start gap-3"
      initial={{ opacity: 0, x: good ? 14 : -14 }}
      animate={start ? { opacity: 1, x: 0 } : { opacity: 0, x: good ? 14 : -14 }}
      transition={{ ...SPRING, delay }}
    >
      <span
        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
        style={{
          background: good ? "rgba(10,124,255,0.18)" : "rgba(255,255,255,0.05)",
          border: `1px solid ${good ? "rgba(96,165,250,0.45)" : "rgba(255,255,255,0.1)"}`,
        }}
        aria-hidden="true"
      >
        {good ? (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.2 5 8.7l4.5-5"
              stroke="#7dd3fc"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path
              d="M3.5 3.5l5 5m0-5l-5 5"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
      <span
        className="text-sm leading-snug"
        style={{ color: good ? "#e6edf7" : "rgba(255,255,255,0.42)" }}
      >
        {text}
      </span>
    </motion.li>
  );
}

export function PriceConsciousness() {
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const start = inView || !!reduced;

  return (
    <section id="recursos" className="relative pt-10 lg:pt-[40px] pb-10 lg:pb-[40px]">
      <div className="lp-container">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center gap-5 mb-8 lg:mb-10">
          <Reveal>
            <p className="lp-label" style={{ color: "var(--on-dark-3)" }}>
              {copy.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="lp-h2" style={{ maxWidth: 774 }}>
              {copy.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="lp-lead lp-lead-dark" style={{ maxWidth: 700 }}>
              {copy.support}
            </p>
          </Reveal>
        </div>

        {/* Card de comparação */}
        <div ref={gridRef} className="relative max-w-[1040px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0">
            {/* Esquerda — IA genérica */}
            <motion.div
              className="relative flex flex-col rounded-2xl border p-6 lg:p-8"
              style={{
                background: "rgba(255,255,255,0.025)",
                borderColor: "rgba(255,255,255,0.08)",
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ ...SPRING, delay: 0.05 }}
            >
              <span className="lp-label" style={{ color: "rgba(255,255,255,0.4)" }}>
                {copy.labelGeneric}
              </span>

              <div className="mt-6">
                <CountStat
                  value={copy.statGeneric.value}
                  suffix={copy.statGeneric.suffix}
                  tone="bad"
                  start={start}
                />
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {copy.statGeneric.text}
                </p>
              </div>

              <div className="my-6 h-px w-full" style={{ background: "rgba(255,255,255,0.07)" }} />

              <ul className="flex flex-col gap-3.5">
                {copy.generic.map((item, i) => (
                  <CheckRow key={item} text={item} good={false} start={start} delay={0.25 + i * 0.07} />
                ))}
              </ul>
            </motion.div>

            {/* Direita — Secretária Inteligente */}
            <motion.div
              className="relative flex flex-col rounded-2xl border p-6 lg:p-8"
              style={{
                background: "linear-gradient(155deg, rgba(0,80,200,0.2) 0%, rgba(7,16,34,0.6) 100%)",
                borderColor: "rgba(0,168,255,0.38)",
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ ...SPRING, delay: 0.15 }}
            >
              {/* brilho pulsante */}
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{
                  boxShadow: "inset 0 0 40px rgba(0,168,255,0.12)",
                }}
                animate={start ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
                transition={{ duration: 3.2, repeat: start ? Infinity : 0, ease: "easeInOut" }}
                aria-hidden="true"
              />

              <span className="lp-label relative" style={{ color: "#4dc3ff" }}>
                {copy.labelSmart}
              </span>

              <div className="relative mt-6">
                <CountStat
                  value={copy.statSmart.value}
                  suffix={copy.statSmart.suffix}
                  tone="good"
                  start={start}
                />
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {copy.statSmart.text}
                </p>
              </div>

              <div className="relative my-6 h-px w-full" style={{ background: "rgba(0,168,255,0.2)" }} />

              <ul className="relative flex flex-col gap-3.5">
                {copy.smart.map((item, i) => (
                  <CheckRow key={item} text={item} good start={start} delay={0.35 + i * 0.07} />
                ))}
              </ul>
            </motion.div>
          </div>

          {/* VS — centralizado sobre a divisória */}
          <motion.span
            className="absolute left-1/2 top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[0.6875rem] font-extrabold tracking-wide"
            style={{
              background: "#0b0d10",
              border: "1px solid rgba(0,168,255,0.45)",
              color: "#7dd3fc",
              boxShadow: "0 0 0 6px #0b0d10, 0 8px 30px rgba(0,0,0,0.5)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={start ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ ...SPRING, delay: 0.5 }}
          >
            VS
          </motion.span>
        </div>

        {/* Fecho */}
        <Reveal delay={0.1}>
          <p
            className="mt-8 text-center font-medium"
            style={{ fontSize: "1.0625rem", color: "#ffffff", maxWidth: 760, marginInline: "auto" }}
          >
            {copy.footer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
