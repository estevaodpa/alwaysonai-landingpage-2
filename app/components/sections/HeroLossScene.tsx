"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { hero } from "../../lib/copy";

const EASE = [0.16, 1, 0.3, 1] as const;
const TOKENS = [0, 1, 2, 3, 4, 5];
const SLOTS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

/**
 * Abertura do hero: mostra o prejuízo antes da promessa.
 * Rótulos de dor em ciclo + dinheiro escoando para o ralo.
 */
export function HeroLossScene() {
  const reduced = useReducedMotion();
  const contexts = hero.lossScene.contexts;
  const [idx, setIdx] = useState(0);
  const counter = useMotionValue(0);
  const counterRef = useRef<HTMLSpanElement>(null);
  const current = contexts[idx];

  useEffect(() => {
    if (reduced) {
      counter.set(hero.lossScene.counterValue);
      return;
    }
    const id = window.setInterval(
      () => setIdx((i) => (i + 1) % contexts.length),
      3400,
    );
    return () => window.clearInterval(id);
  }, [reduced, contexts.length, counter]);

  useEffect(() => {
    if (reduced) return;
    const controls = animate(counter, hero.lossScene.counterValue, {
      duration: 3.4,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [reduced, counter]);

  useMotionValueEvent(counter, "change", (v) => {
    if (counterRef.current) {
      counterRef.current.textContent = Math.round(v).toLocaleString("pt-BR");
    }
  });

  return (
    <div
      className="relative w-full max-w-full overflow-hidden rounded-[24px] border px-5 py-6 sm:px-8 sm:py-7"
      style={{
        background: "linear-gradient(135deg, #0d1424 0%, #070b14 70%)",
        borderColor: "rgba(255,255,255,0.09)",
        boxShadow: "0 24px 60px rgba(6,12,24,0.22)",
      }}
    >
      {/* brilhos de fundo */}
      <div
        className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(225,29,72,0.14), transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-28 right-0 h-72 w-72 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.12), transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative grid grid-cols-1 items-center gap-8 sm:gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Esquerda — a dor em ciclo */}
        <div className="relative z-10 flex w-full min-w-0 flex-col items-start text-left">
          <span
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.625rem] font-extrabold uppercase tracking-[0.12em]"
            style={{
              background: "rgba(251,113,133,0.12)",
              border: "1px solid rgba(251,113,133,0.25)",
              color: "#fda4af",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "#fb7185", boxShadow: "0 0 10px #fb7185" }}
            />
            {hero.lossScene.badge}
          </span>

          <div className="mt-5 w-full min-w-0" style={{ minHeight: 116 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div
                  className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] font-extrabold tracking-[0.1em]"
                  style={{ color: "#fbbf24" }}
                >
                  <span>{current.time}</span>
                  <span style={{ color: "rgba(255,255,255,0.25)" }}>·</span>
                  <span>{current.tag}</span>
                </div>

                <p
                  className="mt-2 font-semibold"
                  style={{
                    fontSize: "clamp(1.05rem, 2vw, 1.4rem)",
                    lineHeight: 1.3,
                    color: "#fff",
                    maxWidth: 470,
                  }}
                >
                  {current.line}
                </p>

                <p
                  className="mt-2 text-[0.8125rem] font-semibold"
                  style={{ color: "#fda4af" }}
                >
                  {current.loss}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-2 flex items-center gap-1.5" aria-hidden="true">
            {contexts.map((c, i) => (
              <motion.span
                key={c.tag}
                className="h-1 rounded-full"
                initial={false}
                animate={{
                  width: i === idx ? 22 : 6,
                  background:
                    i === idx ? "#fbbf24" : "rgba(255,255,255,0.16)",
                }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            ))}
          </div>
        </div>

        {/* Direita — o dinheiro indo pro ralo */}
        <div className="relative z-10 flex w-full flex-col items-center justify-center">
          <div
            role="img"
            aria-label={hero.lossScene.drainLabel}
            className="relative h-[150px] w-[150px] shrink-0 sm:h-[180px] sm:w-[180px]"
          >
            <div
              className="pointer-events-none absolute inset-[-22%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(251,146,60,0.16), transparent 68%)",
              }}
              aria-hidden="true"
            />

            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="loss-drain-core">
                  <stop offset="0%" stopColor="#000000" />
                  <stop offset="100%" stopColor="#0b1220" />
                </radialGradient>
                <linearGradient id="loss-drain-ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.28)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
                </linearGradient>
              </defs>

              <circle
                cx="100"
                cy="100"
                r="86"
                fill="none"
                stroke="url(#loss-drain-ring)"
                strokeWidth="1"
              />
              <circle
                cx="100"
                cy="100"
                r="74"
                fill="url(#loss-drain-core)"
                stroke="rgba(255,255,255,0.14)"
                strokeWidth="2"
              />

              <motion.g
                animate={reduced ? undefined : { rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "100px 100px" }}
              >
                {SLOTS.map((i) => {
                  const a = (i / SLOTS.length) * Math.PI * 2;
                  // toFixed evita divergência de casa decimal entre SSR e cliente.
                  const x1 = (100 + Math.cos(a) * 36).toFixed(2);
                  const y1 = (100 + Math.sin(a) * 36).toFixed(2);
                  const x2 = (100 + Math.cos(a) * 66).toFixed(2);
                  const y2 = (100 + Math.sin(a) * 66).toFixed(2);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgba(255,255,255,0.14)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  );
                })}
              </motion.g>

              <circle
                cx="100"
                cy="100"
                r="26"
                fill="#000"
                stroke="rgba(251,146,60,0.35)"
                strokeWidth="1"
              />
              <circle cx="100" cy="100" r="10" fill="rgba(251,146,60,0.18)" />
            </svg>

            {!reduced &&
              TOKENS.map((i) => (
                <motion.span
                  key={`ripple-${i}`}
                  className="absolute rounded-full border"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: 48,
                    height: 48,
                    marginLeft: -24,
                    marginTop: -24,
                    borderColor: "rgba(251,191,36,0.35)",
                  }}
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: [0.3, 1.5], opacity: [0, 0.55, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    delay: i * 0.36,
                    ease: "easeOut",
                  }}
                />
              ))}

            {TOKENS.map((i) => {
              const drift = -60 + i * 24;
              const rise = -92 + (i % 3) * 16;
              return (
                <motion.div
                  key={`token-${i}`}
                  className="absolute flex h-7 w-11 items-center justify-center rounded-[6px] text-[0.6875rem] font-extrabold"
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: -22,
                    marginTop: -14,
                    background: "linear-gradient(145deg, #fbbf24, #f59e0b)",
                    color: "#3b2600",
                    boxShadow: "0 4px 14px rgba(245,158,11,0.35)",
                    border: "1px solid rgba(255,255,255,0.35)",
                  }}
                  initial={{
                    opacity: 0,
                    y: rise,
                    x: drift,
                    scale: 0.8,
                  }}
                  animate={
                    reduced
                      ? { opacity: 0 }
                      : {
                          opacity: [0, 1, 1, 0],
                          y: [rise, -30, 8, 34],
                          x: [drift, drift * 0.55, 0, 0],
                          scale: [0.8, 1, 0.9, 0.25],
                          rotate: [0, drift < 0 ? -10 : 10, 0, 0],
                        }
                  }
                  transition={{
                    duration: 2.3,
                    repeat: Infinity,
                    delay: i * 0.36,
                    ease: "easeIn",
                    times: [0, 0.25, 0.65, 1],
                  }}
                >
                  R$
                </motion.div>
              );
            })}

            {!reduced &&
              [0, 1, 2].map((i) => (
                <motion.span
                  key={`chip-${i}`}
                  className="absolute right-[-8px] top-[18%] whitespace-nowrap rounded-md px-2 py-1 text-[0.625rem] font-extrabold"
                  style={{
                    background: "rgba(127,29,29,0.85)",
                    color: "#fecdd3",
                    border: "1px solid rgba(251,113,133,0.3)",
                  }}
                  initial={{ opacity: 0, y: 0 }}
                  animate={{ opacity: [0, 0.95, 0], y: [0, -26, -52] }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    delay: 0.5 + i * 0.9,
                    ease: "easeOut",
                  }}
                >
                  − R$ {480 + i * 240}
                </motion.span>
              ))}
          </div>

          <div className="mt-2 text-center">
            <p
              className="text-[0.625rem] font-extrabold uppercase tracking-[0.14em]"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {hero.lossScene.counterLabel}
            </p>
            <p
              className="mt-1 font-semibold tabular-nums"
              style={{
                fontSize: "1.75rem",
                letterSpacing: "-0.03em",
                color: "#fda4af",
              }}
            >
              R$ <span ref={counterRef}>0</span>
              <span
                className="ml-1 text-[0.8125rem] font-medium"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                / mês
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
