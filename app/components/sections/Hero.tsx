"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { SmartphoneFrame } from "../product/SmartphoneFrame";
import { PhoneVideo } from "../product/PhoneVideo";
import { HeroEvents } from "./HeroEvents";
import { HeroCapabilities } from "./HeroCapabilities";
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
  const { open } = useDiagnostic();
  const onTime = useCallback((t: number) => setVideoTime(t), []);

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
        {/* Copy — coreografia de abertura */}
        <div className="flex flex-col items-center text-center w-full" style={{ maxWidth: 1040 }}>
          <motion.h1
            initial={{ clipPath: "inset(0 0 100% 0)", y: 26, opacity: 0 }}
            animate={{ clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.12, ease: EASE }}
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
            transition={{ duration: 0.85, delay: 0.28, ease: EASE }}
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

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
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
              {hero.promiseTitle}
            </p>
          </motion.div>

          <HeroCapabilities />

          <motion.button
            type="button"
            onClick={() => {
              trackCtaClick("hero");
              open();
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
            className="lp-btn mt-8 w-full max-w-full !whitespace-normal !px-4 !py-4 !text-sm sm:w-auto sm:!px-7 sm:!text-base"
          >
            {hero.cta}
          </motion.button>
        </div>

        {/* Rótulos estáticos + celular com vídeo */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.85, ease: EASE }}
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
