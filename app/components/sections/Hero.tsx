"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { SmartphoneFrame } from "../product/SmartphoneFrame";
import { PhoneVideo } from "../product/PhoneVideo";
import { HeroEvents } from "./HeroEvents";
import { hero } from "../../lib/copy";

const EASE = [0.16, 1, 0.3, 1] as const;

// Rótulos estáticos acima do celular.
const TABS = ["Atende 24/7", "Qualifica", "Agenda"];

// Momentos identificados no vídeo (58s):
// 16s primeiro atendimento · 25s explicação/avaliação · 33s valor e parcelamento · 46s horário
const STAGE_TIMES = [16, 25, 33, 46];

export function Hero() {
  const [videoTime, setVideoTime] = useState(0);
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
        style={{ gap: 72, maxWidth: 1520 }}
      >
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex flex-col items-center text-center w-full"
          style={{ maxWidth: 1040 }}
        >
          {/* Abertura */}
          <h1
            className="font-semibold"
            style={{
              fontSize: "clamp(2.1rem, 4.6vw, 3.4rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.035em",
              color: "#18191c",
            }}
          >
            <span className="block">{hero.lead}</span>
            <span className="block mt-1">
              Mas seus <span className="lp-accent">agendamentos</span> não precisam parar.
            </span>
          </h1>

          <p
            className="mt-6 font-medium"
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)",
              lineHeight: 1.5,
              color: "#2f3238",
              maxWidth: 780,
            }}
          >
            Cada paciente atendido na hora certa é uma oportunidade a mais de{" "}
            <span className="lp-accent">faturamento</span>.
          </p>

          {/* Bloco de destaque — Secretária Inteligente */}
          <div className="mt-9 w-full" style={{ maxWidth: 860 }}>
            <p
              style={{
                fontSize: "clamp(1.125rem, 2.1vw, 1.5rem)",
                lineHeight: 1.55,
                color: "#2f3238",
              }}
            >
              Imagine uma{" "}
              <span className="brand-highlight">Secretária Inteligente</span> que responde em
              segundos, conversa naturalmente, tira dúvidas e transforma o interesse em
              consultas agendadas.
            </p>
          </div>

          <div className="mt-7 flex flex-col items-center gap-3">
            <p
              className="font-medium"
              style={{ fontSize: "1.0625rem", color: "#2f3238" }}
            >
              Tudo no WhatsApp, <span className="lp-accent">24 horas por dia</span>, com o jeito
              de atender da sua clínica.
            </p>
            <p
              className="text-sm"
              style={{ color: "#6d6f74", maxWidth: 620 }}
            >
              {hero.closing}
            </p>
          </div>
        </motion.div>

        {/* Rótulos estáticos + celular com vídeo */}
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
