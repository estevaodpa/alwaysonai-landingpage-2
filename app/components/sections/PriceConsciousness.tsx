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
const TITLE_COLORS: Record<string, string> = {
  white: "#ffffff",
  red: "#ff6b6b",
  blue: "#4dc3ff",
};

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
        fontSize: "clamp(3.5rem, 9vw, 5.5rem)",
        letterSpacing: "-0.06em",
        color: tone === "bad" ? "#ff6b6b" : "#ffffff",
        textShadow:
          tone === "bad"
            ? "0 0 30px rgba(255,107,107,0.25)"
            : "0 0 30px rgba(77,195,255,0.3)",
      }}
    >
      <span ref={ref}>0</span>
      <motion.span
        style={{ fontSize: "0.46em", marginLeft: 3 }}
        initial={{ opacity: 0 }}
        animate={start ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        {suffix}
      </motion.span>
    </span>
  );
}

function PointRow({
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
      initial={{ opacity: 0, y: 10 }}
      animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ ...SPRING, delay }}
    >
      <span
        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
        style={{
          background: good ? "#0a7cff" : "rgba(255,107,107,0.16)",
          border: `1px solid ${good ? "#4dc3ff" : "rgba(255,107,107,0.5)"}`,
          boxShadow: good ? "0 0 16px rgba(10,124,255,0.4)" : "none",
        }}
        aria-hidden="true"
      >
        {good ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6.2 5 8.7l4.5-5"
              stroke="#fff"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M3.5 3.5l5 5m0-5l-5 5"
              stroke="#ff6b6b"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        )}
      </span>
      <span
        className="text-[0.9375rem] font-semibold leading-snug sm:text-base"
        style={{ color: "#ffffff" }}
      >
        {text}
      </span>
    </motion.li>
  );
}

export function PriceConsciousness() {
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(gridRef, { once: true, margin: "-10% 0px" });
  const titleInView = useInView(titleRef, { once: true, margin: "-10% 0px" });
  const reduced = useReducedMotion();
  const start = inView || !!reduced;
  const titleStart = titleInView || !!reduced;

  return (
    <section id="recursos" className="relative pt-10 lg:pt-[40px] pb-10 lg:pb-[40px]">
      <div className="lp-container">
        {/* Cabeçalho — título gigante e colorido */}
        <div className="flex flex-col items-center text-center gap-5 mb-10 lg:mb-12">
          <Reveal>
            <p
              className="lp-label"
              style={{ color: "#7dd3fc", letterSpacing: "0.14em" }}
            >
              {copy.kicker}
            </p>
          </Reveal>

          <motion.h2
            ref={titleRef}
            className="font-extrabold leading-[1.02] tracking-tight"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
              letterSpacing: "-0.05em",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={titleStart ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ ...SPRING, delay: 0.05 }}
          >
            {copy.titleParts.map((part, i) => (
              <motion.span
                key={i}
                style={{
                  color: TITLE_COLORS[part.color],
                  textShadow:
                    part.color === "red"
                      ? "0 0 34px rgba(255,107,107,0.3)"
                      : part.color === "blue"
                        ? "0 0 34px rgba(77,195,255,0.35)"
                        : "none",
                }}
                initial={{ opacity: 0, y: "40%" }}
                animate={titleStart ? { opacity: 1, y: "0%" } : { opacity: 0, y: "40%" }}
                transition={{ ...SPRING, delay: 0.08 + i * 0.09 }}
                className="inline-block"
              >
                {part.t}
              </motion.span>
            ))}
          </motion.h2>

          <Reveal delay={0.1}>
            <p
              className="font-medium"
              style={{ fontSize: "1.125rem", color: "#e2e8f0", maxWidth: 640 }}
            >
              {copy.support}
            </p>
          </Reveal>
        </div>

        {/* Card de comparação */}
        <div ref={gridRef} className="relative max-w-[1080px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-0">
            {/* Esquerda — IA genérica (vermelho) */}
            <motion.div
              className="relative flex flex-col rounded-2xl border p-6 lg:p-8"
              style={{
                background:
                  "linear-gradient(155deg, rgba(120,20,30,0.22) 0%, rgba(30,10,14,0.5) 100%)",
                borderColor: "rgba(255,107,107,0.45)",
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
                boxShadow: "0 18px 50px rgba(120,20,30,0.25)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ ...SPRING, delay: 0.05 }}
            >
              <span
                className="inline-flex w-fit rounded-full px-3 py-1 text-[0.625rem] font-extrabold uppercase tracking-[0.1em]"
                style={{
                  background: "rgba(255,107,107,0.14)",
                  border: "1px solid rgba(255,107,107,0.4)",
                  color: "#ff9b9b",
                }}
              >
                {copy.labelGeneric}
              </span>

              <div className="mt-6">
                <CountStat
                  value={copy.statGeneric.value}
                  suffix={copy.statGeneric.suffix}
                  tone="bad"
                  start={start}
                />
                <p
                  className="mt-3 text-base font-semibold leading-snug"
                  style={{ color: "#ffffff" }}
                >
                  {copy.statGeneric.text}
                </p>
              </div>

              <div
                className="my-6 h-px w-full"
                style={{ background: "rgba(255,107,107,0.28)" }}
              />

              <ul className="flex flex-col gap-4">
                {copy.generic.map((item, i) => (
                  <PointRow
                    key={item}
                    text={item}
                    good={false}
                    start={start}
                    delay={0.25 + i * 0.08}
                  />
                ))}
              </ul>
            </motion.div>

            {/* Direita — alwayson.ai (azul) */}
            <motion.div
              className="relative flex flex-col rounded-2xl border p-6 lg:p-8"
              style={{
                background:
                  "linear-gradient(155deg, rgba(0,110,255,0.28) 0%, rgba(7,16,34,0.75) 100%)",
                borderColor: "rgba(77,195,255,0.6)",
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                boxShadow: "0 18px 60px rgba(0,100,255,0.3)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ ...SPRING, delay: 0.15 }}
            >
              <motion.div
                className="pointer-events-none absolute inset-0 rounded-2xl"
                style={{ boxShadow: "inset 0 0 60px rgba(77,195,255,0.18)" }}
                animate={start ? { opacity: [0.5, 1, 0.5] } : { opacity: 0 }}
                transition={{ duration: 3.2, repeat: start ? Infinity : 0, ease: "easeInOut" }}
                aria-hidden="true"
              />

              <span
                className="relative inline-flex w-fit rounded-full px-3 py-1 text-[0.625rem] font-extrabold uppercase tracking-[0.1em]"
                style={{
                  background: "rgba(10,124,255,0.22)",
                  border: "1px solid rgba(77,195,255,0.55)",
                  color: "#7dd3fc",
                }}
              >
                {copy.labelSmart}
              </span>

              <div className="relative mt-6">
                <CountStat
                  value={copy.statSmart.value}
                  suffix={copy.statSmart.suffix}
                  tone="good"
                  start={start}
                />
                <p
                  className="mt-3 text-base font-semibold leading-snug"
                  style={{ color: "#ffffff" }}
                >
                  {copy.statSmart.text}
                </p>
              </div>

              <div
                className="relative my-6 h-px w-full"
                style={{ background: "rgba(77,195,255,0.3)" }}
              />

              <ul className="relative flex flex-col gap-4">
                {copy.smart.map((item, i) => (
                  <PointRow
                    key={item}
                    text={item}
                    good
                    start={start}
                    delay={0.35 + i * 0.08}
                  />
                ))}
              </ul>
            </motion.div>
          </div>

          {/* VS centralizado */}
          <motion.span
            className="absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[0.75rem] font-extrabold tracking-wide"
            style={{
              background: "#0b0d10",
              border: "1px solid rgba(77,195,255,0.6)",
              color: "#7dd3fc",
              boxShadow: "0 0 0 6px #0b0d10, 0 8px 30px rgba(0,0,0,0.6)",
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
            className="mt-8 text-center font-semibold"
            style={{ fontSize: "1.125rem", color: "#ffffff", maxWidth: 760, marginInline: "auto" }}
          >
            {copy.footer}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
