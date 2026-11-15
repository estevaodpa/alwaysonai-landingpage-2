"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SmartphoneFrame } from "../product/SmartphoneFrame";
import { PhoneVideo } from "../product/PhoneVideo";
import { HeroEvents } from "./HeroEvents";
import { hero } from "../../lib/copy";
import { trackCtaClick } from "../../lib/analytics";

const EASE = [0.16, 1, 0.3, 1] as const;

// Pills do topo do mockup — mesmo mecanismo do modelo (abas com indicador).
const TABS = [
  { key: "atende", label: "Atende 24/7" },
  { key: "qualifica", label: "Qualifica" },
  { key: "agenda", label: "Agenda" },
];

export function Hero() {
  const [tab, setTab] = useState(0);

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
      className="relative overflow-hidden px-5 md:px-8 pt-24 lg:pt-36 pb-40 lg:pb-[260px]"
      style={{
        background:
          "radial-gradient(90% 38% at 50% 100%, #eaf3ff 24.3%, #f7faff 100%)",
      }}
    >
      {/* Grade em perspectiva — assinatura do hero do modelo */}
      <div className="lp-perspective-grid" aria-hidden="true" />

      <div
        className="relative lp-container flex flex-col items-center"
        style={{ gap: 120, maxWidth: 1520 }}
      >
        {/* Badges + headline + sub + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-center text-center gap-6 w-full"
          style={{ maxWidth: 880 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {hero.badges.map((b) =>
              b.kind === "new" ? (
                <span key={b.label} className="flex items-center gap-2.5">
                  <span className="lp-badge-new inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[0.8125rem] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                    Novo
                  </span>
                  <span className="lp-badge">
                    {b.label}
                    <span aria-hidden="true">→</span>
                  </span>
                </span>
              ) : (
                <span key={b.label} className="lp-badge">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
                  {b.label}
                </span>
              ),
            )}
          </div>

          <h1 className="lp-h1">
            {hero.titleLine1}
            <br />
            <span className="lp-accent-solid">{hero.titleLine2}</span>
          </h1>

          <p className="lp-lead" style={{ maxWidth: 640 }}>
            {hero.support}
          </p>

          <a href="#diagnostico" onClick={handleCta} className="lp-btn mt-2">
            {hero.cta}
          </a>
        </motion.div>

        {/* Pills + mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
          className="relative flex flex-col items-center w-full"
          style={{ maxWidth: 1280 }}
        >
          {/* Abas acima do celular */}
          <div
            className="inline-flex items-center p-1 rounded-full mb-8"
            style={{
              background: "rgba(255,255,255,0.72)",
              border: "1px solid rgba(24,25,28,0.08)",
              backdropFilter: "blur(10px)",
            }}
          >
            {TABS.map((t, i) => (
              <button
                key={t.key}
                onClick={() => setTab(i)}
                className="relative px-5 py-2 rounded-full text-[0.84375rem] font-bold transition-colors duration-300"
                style={{
                  color: tab === i ? "#fff" : "#111b21",
                }}
              >
                {tab === i && (
                  <motion.span
                    layoutId="hero-tab"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--brand-grad)" }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>

          {/* Mockup */}
          <div className="relative w-full" style={{ perspective: 1400 }}>
            {/* Pills de operação ao redor do celular */}
            <HeroEvents />

            <div className="relative flex justify-center">
              <div className="relative">
                <div
                  className="pointer-events-none absolute -inset-x-32 -inset-y-16"
                  style={{
                    background:
                      "radial-gradient(50% 50% at 50% 50%, rgba(0,168,255,0.22) 0%, transparent 70%)",
                    filter: "blur(40px)",
                  }}
                  aria-hidden="true"
                />
                <div className="relative z-10 origin-top scale-[0.82] sm:scale-[0.9] lg:scale-100">
                  <SmartphoneFrame>
                    <PhoneVideo />
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
