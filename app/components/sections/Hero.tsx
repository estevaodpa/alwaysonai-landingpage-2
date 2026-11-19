"use client";

import { motion } from "framer-motion";
import { SmartphoneFrame } from "../product/SmartphoneFrame";
import { RealChat } from "../product/RealChat";
import { HeroEvents } from "./HeroEvents";
import { useConversation } from "../../hooks/use-conversation";
import { hero } from "../../lib/copy";
import { trackCtaClick } from "../../lib/analytics";

const EASE = [0.16, 1, 0.3, 1] as const;

// Rótulos estáticos — sem clique, sem troca de conteúdo.
const TABS = ["Atende 24/7", "Qualifica", "Agenda"];

export function Hero() {
  const { lines, isTyping, activeHeroAction } = useConversation();

  const handleCta = (e: React.MouseEvent) => {
    e.preventDefault();
    trackCtaClick("hero");
    document
      .querySelector("#diagnostico")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
        style={{ gap: 72, maxWidth: 1520 }}
      >
        {/* Headline + sub + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-center text-center gap-6 w-full"
          style={{ maxWidth: 1000 }}
        >
          <h1 className="lp-h1" style={{ fontSize: "clamp(2.25rem, 5vw, 3.35rem)" }}>
            {hero.titleLine1}
            <br />
            <span className="lp-accent-solid">{hero.titleLine2}</span>
            <br />
            <span className="lp-accent-solid">{hero.titleLine3}</span>
          </h1>

          <p className="lp-lead" style={{ maxWidth: 680 }}>
            {hero.support}
          </p>

          <a href="#diagnostico" onClick={handleCta} className="lp-btn mt-2">
            {hero.cta}
          </a>
        </motion.div>

        {/* Rótulos estáticos + celular */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
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
                  background:
                    i === 0 ? "var(--brand-grad)" : "transparent",
                }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="relative w-full" style={{ perspective: 1400 }}>
            <HeroEvents activeAction={activeHeroAction} />

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
                    <RealChat lines={lines} isTyping={isTyping} />
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
