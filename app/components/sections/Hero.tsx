"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SmartphoneFrame } from "../product/SmartphoneFrame";
import { PhoneVideo } from "../product/PhoneVideo";
import { FloatingEvents } from "../product/FloatingEvents";
import { DynamicWord } from "../product/DynamicWord";
import { hero } from "../../lib/copy";
import { trackCtaClick } from "../../lib/analytics";

const EASE = [0.16, 1, 0.3, 1] as const;

const TABS = [
  {
    key: "atende",
    label: "Atende 24/7",
    line: "Resposta em segundos, a qualquer hora — inclusive quando a recepção já desligou.",
  },
  {
    key: "qualifica",
    label: "Qualifica",
    line: "A IA pergunta o que precisa, registra a origem e identifica o procedimento de interesse.",
  },
  {
    key: "agenda",
    label: "Agenda",
    line: "Consulta a agenda, oferece horários livres e marca a consulta na própria conversa.",
  },
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
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
    >
      {/* Brilho vindo de baixo — assinatura do modelo */}
      <div
        className="absolute inset-x-0 bottom-0 h-[520px] pointer-events-none"
        style={{
          background:
            "radial-gradient(90% 60% at 50% 100%, rgba(0,80,200,0.22) 0%, rgba(0,168,255,0.08) 38%, transparent 72%)",
          filter: "blur(30px)",
        }}
        aria-hidden="true"
      />
      <div className="lp-grid" aria-hidden="true" />

      <div className="relative lp-container flex flex-col items-center text-center">
        {/* Badges */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center justify-center gap-2.5"
        >
          {hero.badges.map((b) =>
            b.kind === "new" ? (
              <span key={b.label} className="lp-pill-new">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                {b.label}
                <span aria-hidden="true">→</span>
              </span>
            ) : (
              <span key={b.label} className="lp-pill">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
                {b.label}
              </span>
            ),
          )}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.08, ease: EASE }}
          className="mt-7 font-semibold"
          style={{
            fontSize: "clamp(2.35rem, 6vw, 4.25rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.035em",
            maxWidth: 940,
          }}
        >
          <span className="block">{hero.titleLine1}</span>
          <span className="block mt-1">
            <span className="lp-accent">{hero.titleLine2}</span>
          </span>
        </motion.h1>

        {/* Support */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.16, ease: EASE }}
          className="lp-lead mt-7"
          style={{ maxWidth: 640 }}
        >
          {hero.support}
        </motion.p>

        {/* Rotating word */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.24, ease: EASE }}
          className="mt-6 text-lg sm:text-xl font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          <DynamicWord />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          className="mt-9 flex flex-col items-center gap-3"
        >
          <a href="#diagnostico" onClick={handleCta} className="lp-btn-primary">
            {hero.cta}
          </a>
          <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
            {hero.ctaMicro}
          </p>
        </motion.div>

        {/* Mockup do produto */}
        <motion.div
          initial={{ opacity: 0, y: 44, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.42, ease: EASE }}
          className="relative mt-16 lg:mt-20 flex justify-center w-full"
          style={{ perspective: 1400 }}
        >
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-x-24 -inset-y-16"
              style={{
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(0,120,255,0.14) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
              aria-hidden="true"
            />
            <div className="relative z-10 origin-top scale-[0.78] sm:scale-[0.88] lg:scale-95">
              <SmartphoneFrame>
                <PhoneVideo />
              </SmartphoneFrame>
            </div>
            <div className="absolute inset-0 -z-0">
              <FloatingEvents layer="mid" />
            </div>
          </div>
        </motion.div>

        {/* Segmentado — mecanismo do modelo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.58, ease: EASE }}
          className="mt-14 lg:mt-4 flex flex-col items-center gap-5"
        >
          <div
            className="inline-flex items-center p-1 rounded-full"
            style={{
              border: "1px solid var(--border-default)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            {TABS.map((t, i) => (
              <button
                key={t.key}
                onClick={() => setTab(i)}
                className="relative px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300"
                style={{
                  color:
                    tab === i
                      ? "var(--text-primary)"
                      : "var(--text-tertiary)",
                }}
              >
                {tab === i && (
                  <motion.span
                    layoutId="hero-tab"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,80,200,0.28) 0%, rgba(0,168,255,0.28) 100%)",
                      border: "1px solid var(--border-accent)",
                    }}
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
                <span className="relative z-10">{t.label}</span>
              </button>
            ))}
          </div>

          <p
            className="lp-body"
            style={{ maxWidth: 520, minHeight: 52 }}
            aria-live="polite"
          >
            {TABS[tab].line}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
