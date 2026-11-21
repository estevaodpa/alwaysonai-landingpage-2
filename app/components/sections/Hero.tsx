"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SmartphoneFrame } from "../product/SmartphoneFrame";
import { PhoneVideo } from "../product/PhoneVideo";
import { HeroEvents } from "./HeroEvents";
import { HeroLossScene } from "./HeroLossScene";
import { useDiagnostic } from "../DiagnosticProvider";
import { hero } from "../../lib/copy";
import { trackCtaClick } from "../../lib/analytics";

const EASE = [0.16, 1, 0.3, 1] as const;

// Rótulos estáticos acima do celular.
const TABS = ["Atende 24/7", "Qualifica", "Agenda"];

// Momentos identificados no vídeo (58s):
// 16s primeiro atendimento · 25s explicação/avaliação · 33s valor e parcelamento · 46s horário
const STAGE_TIMES = [16, 25, 33, 46];

export function Hero() {
  const [videoTime, setVideoTime] = useState(0);
  const [activeTopic, setActiveTopic] = useState(0);
  const reduced = useReducedMotion();
  const { open } = useDiagnostic();
  const onTime = useCallback((t: number) => setVideoTime(t), []);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(
      () => setActiveTopic((v) => (v + 1) % hero.topics.length),
      1100,
    );
    return () => window.clearInterval(id);
  }, [reduced]);

  let activeAction = -1;
  STAGE_TIMES.forEach((t, i) => {
    if (videoTime >= t) activeAction = i;
  });

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 md:px-8 pt-24 lg:pt-36 pb-28 lg:pb-[120px]"
      style={{
        background:
          "radial-gradient(90% 38% at 50% 100%, #eaf3ff 24.3%, #f7faff 100%)",
      }}
    >
      {/* Grade em perspectiva */}
      <div className="lp-perspective-grid" aria-hidden="true" />

      <div
        className="relative lp-container flex flex-col items-center"
        style={{ gap: 38, maxWidth: 1520 }}
      >
        {/* Cena de abertura — o custo da demora */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.06, ease: EASE }}
          className="w-full"
          style={{ maxWidth: 1040 }}
        >
          <HeroLossScene />
        </motion.div>

        {/* Copy — coreografia de abertura */}
        <div className="flex flex-col items-center text-center w-full" style={{ maxWidth: 1040 }}>
          <motion.h1
            initial={{ clipPath: "inset(0 0 100% 0)", y: 26, opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.2, ease: EASE }}
            className="font-semibold"
            style={{
              fontSize: "clamp(2.1rem, 4.6vw, 3.4rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              color: "#18191c",
            }}
          >
            {hero.lead}
          </motion.h1>

          <motion.h2
            initial={{ clipPath: "inset(0 0 100% 0)", y: 26, opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.34, ease: EASE }}
            className="font-semibold"
            style={{
              fontSize: "clamp(2.1rem, 4.6vw, 3.4rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              color: "#18191c",
              marginTop: 4,
            }}
          >
            Mas seus <span className="lp-accent">agendamentos</span> não precisam parar.
          </motion.h2>

          {/* A virada — título + tópicos animados */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.54, ease: EASE }}
            className="mt-9"
          >
            <p
              className="font-semibold"
              style={{
                fontSize: "clamp(1.125rem, 2.1vw, 1.5rem)",
                lineHeight: 1.45,
                color: "#2f3238",
              }}
            >
              {hero.promiseTitle.map((seg, i) =>
                seg.hi ? (
                  <span key={i} className="brand-highlight">
                    {seg.t}
                  </span>
                ) : (
                  <span key={i}>{seg.t}</span>
                ),
              )}
            </p>
          </motion.div>

          <div
            className="mt-6 grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2"
            style={{ maxWidth: 840 }}
          >
            {hero.topics.map((topic, i) => {
              const active = i === activeTopic;
              return (
                <motion.div
                  key={topic}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.66 + i * 0.08, ease: EASE }}
                  className="w-full min-w-0"
                >
                  <motion.div
                    data-hero-topic={active ? "active" : undefined}
                    className="relative flex w-full min-w-0 items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-left sm:px-5"
                    animate={{
                      background: active
                        ? "rgba(255,255,255,0.96)"
                        : "rgba(255,255,255,0.7)",
                      borderColor: active
                        ? "rgba(0,80,200,0.28)"
                        : "rgba(24,25,28,0.08)",
                      boxShadow: active
                        ? "0 12px 32px rgba(0,80,200,0.12)"
                        : "0 8px 24px rgba(16,40,80,0.04)",
                    }}
                    transition={{ duration: 0.45, ease: EASE }}
                    style={{ backdropFilter: "blur(6px)" }}
                  >
                    <motion.span
                      className="relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                      style={{ background: "var(--brand-grad)", color: "#fff" }}
                      animate={{
                        scale: active ? 1.08 : 1,
                        boxShadow: active
                          ? "0 0 0 4px rgba(0,168,255,0.18)"
                          : "0 0 0 0 rgba(0,168,255,0)",
                      }}
                      transition={{ duration: 0.45, ease: EASE }}
                      aria-hidden="true"
                    >
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3.3 8.4 6.3 11.4 12.7 4.8"
                          stroke="currentColor"
                          strokeWidth="1.9"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.span>
                    <motion.span
                      className="relative z-10 text-[0.9375rem] font-semibold leading-snug"
                      animate={{ color: active ? "#0050c8" : "#18191c" }}
                      transition={{ duration: 0.4, ease: EASE }}
                    >
                      {topic}
                    </motion.span>
                    <motion.span
                      className="pointer-events-none absolute inset-y-0 left-0 w-1/3"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
                      }}
                      initial={{ x: "-120%" }}
                      animate={{ x: ["-120%", "420%"] }}
                      transition={{
                        duration: 1.3,
                        repeat: reduced ? 0 : Infinity,
                        repeatDelay: 4,
                        delay: 1 + i * 0.2,
                        ease: "easeInOut",
                      }}
                      aria-hidden="true"
                    />
                    <motion.span
                      className="absolute bottom-0 left-0 h-0.5 w-full origin-left"
                      style={{ background: "var(--brand-grad)" }}
                      initial={false}
                      animate={{ scaleX: active ? 1 : 0 }}
                      transition={{ duration: 0.9, ease: EASE }}
                      aria-hidden="true"
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <motion.button
            type="button"
            onClick={() => {
              trackCtaClick("hero");
              open();
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.16, ease: EASE }}
            className="lp-btn mt-8 !px-7 !py-4"
          >
            {hero.cta}
          </motion.button>
        </div>

        {/* Rótulos estáticos + celular com vídeo */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
          className="relative flex flex-col items-center w-full"
          style={{ maxWidth: 1280 }}
        >
          <div
            className="inline-flex items-center p-1 rounded-full mb-6"
            style={{
              background: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(24,25,28,0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            {TABS.map((label, i) => (
              <span
                key={label}
                className="px-5 py-2 rounded-full text-[0.84375rem] font-bold"
                style={{
                  color: i === 0 ? "#fff" : "#111b21",
                  background: i === 0 ? "var(--brand-grad)" : "transparent",
                }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="relative w-full" style={{ perspective: 1400 }}>
            <HeroEvents activeAction={activeAction} />

            <div className="relative flex justify-center">
              <div className="relative">
                <div
                  className="pointer-events-none absolute -inset-x-32 -inset-y-16"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 50% 50%, rgba(0,168,255,0.2) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative z-10 origin-top scale-[0.82] sm:scale-[0.9] lg:scale-100">
                  <SmartphoneFrame>
                    <PhoneVideo onTime={onTime} />
                  </SmartphoneFrame>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
