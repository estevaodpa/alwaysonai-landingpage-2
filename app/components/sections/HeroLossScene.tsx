"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { hero } from "../../lib/copy";

const EASE = [0.16, 1, 0.3, 1] as const;
const CONTEXTS = hero.lossScene.contexts;
const SLOTS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const CUMULATIVE = CONTEXTS.reduce<number[]>((acc, c) => {
  acc.push(c.loss + (acc.length ? acc[acc.length - 1] : 0));
  return acc;
}, []);
const CYCLE_MS = 3400;

/**
 * Elemento gráfico do hero: mensagens chegando, ficando sem resposta e
 * virando fichas que escoam para o ralo — em loop contínuo, na paleta da marca.
 */
export function HeroLossScene() {
  const reduced = useReducedMotion();
  const [cycle, setCycle] = useState(0);
  const counter = useMotionValue(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const idx = cycle % CONTEXTS.length;
  const current = CONTEXTS[idx];

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [reduced]);

  useEffect(() => {
    if (reduced) {
      counter.set(hero.lossScene.counterValue);
      return;
    }
    const previous = idx === 0 ? 0 : CUMULATIVE[idx - 1];
    counter.set(previous);
    const controls = animate(counter, CUMULATIVE[idx], {
      duration: 0.7,
      delay: 1.7,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [cycle, idx, counter, reduced]);

  useMotionValueEvent(counter, "change", (v) => {
    if (counterRef.current) {
      counterRef.current.textContent = Math.round(v).toLocaleString("pt-BR");
    }
  });

  return (
    <div
      data-hero-scene=""
      className="relative w-full max-w-full overflow-hidden rounded-[20px] border px-4 py-4 sm:px-6 sm:py-5"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.62) 100%)",
        borderColor: "rgba(0,80,200,0.10)",
        boxShadow: "0 18px 50px rgba(0,80,200,0.06)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
    >
      {/* Linha superior — status, contexto e contador */}
      <div className="flex flex-wrap items-end justify-between gap-x-5 gap-y-3">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
          <span
            className="inline-flex items-center gap-2 text-[0.625rem] font-extrabold uppercase tracking-[0.16em]"
            style={{ color: "#0050c8" }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <motion.span
                className="absolute inset-0 rounded-full"
                style={{ background: "#00a8ff" }}
                animate={
                  reduced ? undefined : { scale: [1, 2, 1], opacity: [0.9, 0, 0.9] }
                }
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
              />
              <span
                className="relative h-2 w-2 rounded-full"
                style={{ background: "#0050c8" }}
              />
            </span>
            {hero.lossScene.live}
          </span>

          <span
            className="hidden h-3 w-px sm:block"
            style={{ background: "rgba(0,80,200,0.16)" }}
            aria-hidden="true"
          />

          <motion.span
            key={`ctx-${idx}`}
            className="text-[0.625rem] font-extrabold uppercase tracking-[0.14em]"
            style={{ color: "#64748b" }}
            initial={reduced ? false : { opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {current.time} · {current.tag}
          </motion.span>
        </div>

        <div className="shrink-0 text-right">
          <p
            className="text-[0.5625rem] font-extrabold uppercase tracking-[0.16em]"
            style={{ color: "#94a3b8" }}
          >
            {hero.lossScene.counterLabel}
          </p>
          <p
            className="mt-0.5 font-semibold tabular-nums"
            style={{ fontSize: "1.25rem", letterSpacing: "-0.03em", color: "#0050c8" }}
          >
            R$ <span data-hero-counter="" ref={counterRef}>0</span>
            <span
              className="ml-1 text-[0.6875rem] font-medium"
              style={{ color: "#94a3b8" }}
            >
              / mês
            </span>
          </p>
        </div>
      </div>

      {/* Esteira — a perda acontecendo */}
      <div
        className="relative mt-4 h-[108px] w-full overflow-hidden rounded-xl sm:h-[92px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,80,200,0.045) 0%, rgba(0,168,255,0.02) 55%, rgba(0,80,200,0.07) 100%)",
          border: "1px solid rgba(0,80,200,0.07)",
        }}
      >
        {/*-grade*/}
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0,80,200,0.07) 1px, transparent 1px)",
            backgroundSize: "64px 100%",
            maskImage: "linear-gradient(180deg, transparent, black 30%, black 70%, transparent)",
            WebkitMaskImage:
              "linear-gradient(180deg, transparent, black 30%, black 70%, transparent)",
          }}
          aria-hidden="true"
        />

        {/* varredura de luz */}
        {!reduced && (
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-24"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
            }}
            initial={{ x: "-20%" }}
            animate={{ x: ["-20%", "120%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            aria-hidden="true"
          />
        )}

        {/* sparkline caindo */}
        <svg
          className="pointer-events-none absolute bottom-0 left-0 h-8 w-full"
          viewBox="0 0 600 30"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <motion.path
            d="M0 4 C 90 5, 130 10, 210 11 S 340 18, 430 20 S 540 26, 600 27"
            fill="none"
            stroke="rgba(0,80,200,0.25)"
            strokeWidth="1"
            initial={{ pathLength: reduced ? 1 : 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: reduced ? 0 : Infinity, ease: "linear" }}
          />
        </svg>

        {/* rastro da ficha até o ralo */}
        {!reduced && (
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <motion.path
              key={`trail-${cycle}`}
              d="M300 64 C 480 16, 680 16, 840 50"
              fill="none"
              stroke="rgba(0,80,200,0.26)"
              strokeWidth="1"
              strokeDasharray="3 5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.9, 0.9, 0] }}
              transition={{
                duration: 2.6,
                times: [0, 0.5, 0.85, 1],
                delay: 0.5,
                ease: "easeInOut",
              }}
            />
          </svg>
        )}

        {/* mensagem entrando */}
        <motion.div
          data-hero-message=""
          key={`msg-${cycle}`}
          className="absolute left-3 top-1/2 z-20 flex max-w-[54%] items-center gap-2 rounded-full border bg-white/95 px-3 py-2 sm:left-5 sm:max-w-[62%]"
          style={{
            borderColor: "rgba(0,80,200,0.12)",
            marginTop: -17,
            boxShadow: "0 6px 18px rgba(0,80,200,0.08)",
          }}
          initial={reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -34 }}
          animate={
            reduced
              ? { opacity: 1, x: 0 }
              : { opacity: [0, 1, 1, 0], x: [-34, 0, 0, -16] }
          }
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 3.2, times: [0, 0.12, 0.76, 1], ease: EASE }
          }
        >
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: "#00a8ff" }}
            aria-hidden="true"
          />
          <span
            className="truncate text-[0.6875rem] font-semibold sm:text-xs"
            style={{ color: "#0f172a" }}
          >
            {current.message}
          </span>

          {/* digitando… */}
          {!reduced && (
            <span className="flex shrink-0 items-center gap-0.5" aria-hidden="true">
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="h-1 w-1 rounded-full"
                  style={{ background: "#00a8ff" }}
                  animate={{ opacity: [0.3, 1, 0.3, 0], y: [0, -2, 0, 0] }}
                  transition={{
                    duration: 1.5,
                    times: [0, 0.3, 0.6, 0.8],
                    delay: 0.3 + d * 0.14,
                  }}
                />
              ))}
            </span>
          )}

          {/* sem resposta */}
          <motion.span
            className="ml-0.5 hidden shrink-0 items-center gap-1 whitespace-nowrap text-[0.625rem] font-semibold sm:inline-flex"
            style={{ color: "#94a3b8" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: reduced ? 1 : [0, 0, 1, 1] }}
            transition={
              reduced
                ? { duration: 0 }
                : { duration: 3.2, times: [0, 0.34, 0.46, 1] }
            }
          >
            <svg width="9" height="9" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <circle cx="6" cy="6" r="4.6" stroke="currentColor" strokeWidth="1" />
              <path d="M6 3.4V6l1.8 1.2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
            {current.reply}
          </motion.span>
        </motion.div>

        {/* ficha saindo da mensagem e caindo no ralo */}
        <motion.div
          data-hero-coin=""
          key={`coin-${cycle}`}
          className="absolute z-30 flex h-6 w-6 items-center justify-center rounded-full border text-[0.625rem] font-extrabold text-white"
          style={{
            marginLeft: -12,
            marginTop: -12,
            background: "var(--brand-grad-btn)",
            borderColor: "rgba(255,255,255,0.5)",
            boxShadow: "0 6px 18px rgba(0,80,200,0.35)",
          }}
          initial={
            reduced
              ? { opacity: 0 }
              : { left: "32%", top: "64%", opacity: 0, scale: 0.6 }
          }
          animate={
            reduced
              ? { opacity: 0 }
              : {
                  left: ["32%", "48%", "68%", "84%"],
                  top: ["64%", "30%", "30%", "50%"],
                  opacity: [0, 1, 1, 0],
                  scale: [0.6, 1, 0.9, 0.3],
                }
          }
          transition={
            reduced
              ? { duration: 0 }
              : {
                  duration: 2.6,
                  times: [0, 0.2, 0.6, 1],
                  delay: 0.5,
                  ease: "easeInOut",
                }
          }
        >
          R$
        </motion.div>

        {/* ralo */}
        <div
          role="img"
          aria-label={hero.lossScene.drainLabel}
          className="absolute right-[3%] z-10 h-[62px] w-[62px] sm:right-[6%] sm:h-[72px] sm:w-[72px]"
          style={{ top: "calc(50% - 31px)" }}
        >
          <svg viewBox="0 0 80 80" className="absolute inset-0 h-full w-full" aria-hidden="true">
            <circle cx="40" cy="40" r="37" fill="none" stroke="rgba(0,80,200,0.16)" strokeWidth="1" />
            <circle cx="40" cy="40" r="30" fill="rgba(255,255,255,0.7)" stroke="rgba(0,80,200,0.25)" strokeWidth="1" />
            <circle cx="40" cy="40" r="20" fill="none" stroke="rgba(0,80,200,0.14)" strokeWidth="1" />
            <motion.g
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "40px 40px" }}
            >
              {SLOTS.map((i) => {
                const a = (i / SLOTS.length) * Math.PI * 2;
                return (
                  <line
                    key={i}
                    x1={(40 + Math.cos(a) * 12).toFixed(2)}
                    y1={(40 + Math.sin(a) * 12).toFixed(2)}
                    x2={(40 + Math.cos(a) * 25).toFixed(2)}
                    y2={(40 + Math.sin(a) * 25).toFixed(2)}
                    stroke="rgba(0,80,200,0.18)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                );
              })}
            </motion.g>
            <circle cx="40" cy="40" r="7" fill="rgba(0,80,200,0.12)" />
          </svg>

          {!reduced && (
            <>
              <motion.span
                key={`wave-a-${cycle}`}
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: "rgba(0,168,255,0.4)" }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [0.5, 1.6], opacity: [0, 0.55, 0] }}
                transition={{ duration: 1.2, delay: 2.4, ease: "easeOut" }}
              />
              <motion.span
                key={`wave-b-${cycle}`}
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: "rgba(0,80,200,0.3)" }}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: [0.5, 2], opacity: [0, 0.4, 0] }}
                transition={{ duration: 1.5, delay: 2.55, ease: "easeOut" }}
              />
            </>
          )}
        </div>

        {/* valor da perda subindo junto com a ficha */}
        {!reduced && (
          <motion.span
            key={`loss-${cycle}`}
            className="absolute right-[13%] top-[14%] z-20 whitespace-nowrap rounded-md px-2 py-1 text-[0.625rem] font-extrabold tabular-nums sm:right-[18%]"
            style={{
              background: "rgba(255,255,255,0.92)",
              color: "#0050c8",
              border: "1px solid rgba(0,80,200,0.14)",
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: [0, 1, 1, 0], y: [6, 0, -8, -18] }}
            transition={{ duration: 2, times: [0, 0.15, 0.65, 1], delay: 1.9 }}
          >
            + R$ {current.loss.toLocaleString("pt-BR")}
          </motion.span>
        )}
      </div>
    </div>
  );
}
