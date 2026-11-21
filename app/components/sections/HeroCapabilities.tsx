"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hero } from "../../lib/copy";

const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring" as const, stiffness: 180, damping: 20, mass: 0.8 };

/* ---------- primitivas de UI (tema escuro) ---------- */

function Incoming({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-block max-w-[92%] rounded-[10px] rounded-tl-[3px] border px-2.5 py-1.5 text-[0.6875rem] leading-snug ${className}`}
      style={{
        background: "rgba(255,255,255,0.07)",
        borderColor: "rgba(255,255,255,0.12)",
        color: "#f1f5f9",
      }}
    >
      {children}
    </div>
  );
}

function Outgoing({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`inline-block max-w-[92%] rounded-[10px] rounded-tr-[3px] px-2.5 py-1.5 text-[0.6875rem] leading-snug text-white ${className}`}
      style={{ background: "#0a7cff", boxShadow: "0 4px 14px rgba(10,124,255,0.35)" }}
    >
      {children}
    </div>
  );
}

function TypingDots({ delay = 0 }: { delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full border px-2.5 py-2"
      style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.12)" }}
    >
      {[0, 1, 2].map((d) => (
        <motion.span
          key={d}
          className="h-1 w-1 rounded-full"
          style={{ background: "#93c5fd" }}
          animate={reduced ? {} : { opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
          transition={{
            duration: 1,
            repeat: reduced ? 0 : Infinity,
            delay: delay + d * 0.15,
          }}
        />
      ))}
    </span>
  );
}

/* ---------- cenas ---------- */

function SceneAnswer() {
  const reduced = useReducedMotion();
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-3">
      <motion.div
        className="self-start"
        animate={reduced ? {} : { opacity: [0, 1, 1, 0], x: [-8, 0, 0, 0] }}
        transition={{ duration: 3.2, times: [0, 0.12, 0.82, 1], repeat: reduced ? 0 : Infinity }}
      >
        <Incoming>oi, tem vaga amanhã?</Incoming>
      </motion.div>
      <motion.div
        className="self-end"
        animate={reduced ? {} : { opacity: [0, 0, 1, 1, 0], scale: [0.94, 0.94, 1, 1, 0.96] }}
        transition={{ duration: 3.2, times: [0, 0.34, 0.44, 0.84, 1], repeat: reduced ? 0 : Infinity }}
      >
        <Outgoing>Sim! 14h ou 16h — qual prefere?</Outgoing>
      </motion.div>
      <motion.span
        className="self-end rounded px-1.5 py-0.5 text-[0.5625rem] font-bold tabular-nums"
        style={{ background: "rgba(10,124,255,0.18)", color: "#7dd3fc" }}
        animate={reduced ? {} : { opacity: [0, 0, 1, 0] }}
        transition={{ duration: 3.2, times: [0, 0.4, 0.55, 0.8], repeat: reduced ? 0 : Infinity }}
      >
        respondido em 0,8s
      </motion.span>
    </div>
  );
}

function SceneConversation() {
  const reduced = useReducedMotion();
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-3">
      <motion.div
        className="self-start"
        animate={reduced ? {} : { opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.6, times: [0, 0.1, 0.82, 1], repeat: reduced ? 0 : Infinity }}
      >
        <Incoming>quanto custa o implante?</Incoming>
      </motion.div>
      <motion.div
        className="self-start"
        animate={reduced ? {} : { opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 3.6, times: [0, 0.2, 0.34, 0.8, 1], repeat: reduced ? 0 : Infinity }}
      >
        <TypingDots delay={0.2} />
      </motion.div>
      <motion.div
        className="self-end"
        animate={reduced ? {} : { opacity: [0, 0, 0, 1, 1, 0], y: [4, 4, 4, 0, 0, 0] }}
        transition={{ duration: 3.6, times: [0, 0.42, 0.5, 0.58, 0.84, 1], repeat: reduced ? 0 : Infinity }}
      >
        <Outgoing>Fica entre R$ 2.400 e R$ 3.100. Quer ver as opções?</Outgoing>
      </motion.div>
    </div>
  );
}

function SceneDoubts() {
  const reduced = useReducedMotion();
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-3">
      <motion.div
        className="self-start"
        animate={reduced ? {} : { opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.4, times: [0, 0.12, 0.82, 1], repeat: reduced ? 0 : Infinity }}
      >
        <Incoming>vocês parcelam?</Incoming>
      </motion.div>
      <motion.div
        className="self-end"
        animate={reduced ? {} : { opacity: [0, 0, 1, 1, 0], y: [5, 5, 0, 0, 0] }}
        transition={{ duration: 3.4, times: [0, 0.32, 0.44, 0.84, 1], repeat: reduced ? 0 : Infinity }}
      >
        <Outgoing>Sim, em até 10x sem juros 😊</Outgoing>
      </motion.div>
      <motion.div
        className="self-end flex items-center gap-1 rounded px-1.5 py-0.5 text-[0.5625rem] font-bold"
        style={{ background: "rgba(16,185,129,0.16)", color: "#6ee7b7" }}
        animate={reduced ? {} : { opacity: [0, 0, 0, 1, 0] }}
        transition={{ duration: 3.4, times: [0, 0.45, 0.55, 0.7, 0.9], repeat: reduced ? 0 : Infinity }}
      >
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 6.2 5 8.7l4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        dúvida resolvida
      </motion.div>
    </div>
  );
}

function SceneSchedule() {
  const reduced = useReducedMotion();
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-3">
      <motion.div
        className="self-start"
        animate={reduced ? {} : { opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.6, times: [0, 0.1, 0.78, 1], repeat: reduced ? 0 : Infinity }}
      >
        <Incoming>quero agendar avaliação</Incoming>
      </motion.div>
      <motion.div
        className="flex items-center gap-2 self-end rounded-lg border px-2.5 py-1.5"
        style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(96,165,250,0.3)" }}
        animate={reduced ? {} : { opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, 0] }}
        transition={{ duration: 3.6, times: [0, 0.4, 0.52, 0.84, 1], repeat: reduced ? 0 : Infinity }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#0a7cff] text-[0.5625rem] font-bold text-white">
          SEX
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[0.6875rem] font-bold text-white">16h30 · Avaliação</span>
          <span className="text-[0.5625rem]" style={{ color: "#93c5fd" }}>confirmado no WhatsApp</span>
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: "#6ee7b7" }}>
          <path d="M2.5 6.2 5 8.7l4.5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </div>
  );
}

function SceneAlways() {
  const reduced = useReducedMotion();
  const ticks = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <div className="flex h-full items-center justify-center gap-4 px-3">
      <div className="relative h-[54px] w-[54px] shrink-0">
        <svg viewBox="0 0 54 54" className="h-full w-full" aria-hidden="true">
          <circle cx="27" cy="27" r="23" fill="rgba(255,255,255,0.04)" stroke="rgba(147,197,253,0.3)" />
          {ticks.map((i) => {
            const a = (i / ticks.length) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={(27 + Math.cos(a) * 18).toFixed(2)}
                y1={(27 + Math.sin(a) * 18).toFixed(2)}
                x2={(27 + Math.cos(a) * 21).toFixed(2)}
                y2={(27 + Math.sin(a) * 21).toFixed(2)}
                stroke="rgba(147,197,253,0.45)"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            );
          })}
          <motion.line
            x1="27"
            y1="27"
            x2="27"
            y2="12"
            stroke="#60a5fa"
            strokeWidth="1.8"
            strokeLinecap="round"
            animate={reduced ? {} : { rotate: 360 }}
            transition={{ duration: 6, repeat: reduced ? 0 : Infinity, ease: "linear" }}
            style={{ transformOrigin: "27px 27px" }}
          />
          <circle cx="27" cy="27" r="2" fill="#60a5fa" />
        </svg>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <motion.span
            className="h-2 w-2 rounded-full"
            style={{ background: "#fbbf24" }}
            animate={reduced ? {} : { opacity: [1, 0.25, 1] }}
            transition={{ duration: 3, repeat: reduced ? 0 : Infinity }}
          />
          <span className="text-[0.625rem] font-bold text-white">Dia</span>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.span
            className="h-2 w-2 rounded-full"
            style={{ background: "#60a5fa" }}
            animate={reduced ? {} : { opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 3, repeat: reduced ? 0 : Infinity }}
          />
          <span className="text-[0.625rem] font-bold text-white">Noite</span>
        </div>
        <motion.span
          className="mt-0.5 rounded px-1.5 py-0.5 text-center text-[0.5625rem] font-bold"
          style={{ background: "rgba(10,124,255,0.18)", color: "#7dd3fc" }}
          animate={reduced ? {} : { opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: reduced ? 0 : Infinity }}
        >
          24h · WhatsApp
        </motion.span>
      </div>
    </div>
  );
}

function SceneBrand() {
  const reduced = useReducedMotion();
  const name = "Clínica Bella";
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 px-3">
      <div
        className="flex items-center gap-2 rounded-lg border px-2.5 py-2"
        style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.12)" }}
      >
        <span className="h-5 w-5 shrink-0 rounded-md" style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }} />
        <span className="whitespace-nowrap text-[0.6875rem] font-bold text-white">
          {name}
        </span>
        <motion.span
          className="h-3 w-px shrink-0"
          style={{ background: "#7dd3fc" }}
          animate={reduced ? {} : { opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: reduced ? 0 : Infinity }}
          aria-hidden="true"
        />
      </div>
      <motion.div
        className="self-start rounded px-2 py-1 text-[0.5625rem] font-semibold"
        style={{ background: "rgba(255,255,255,0.06)", color: "#cbd5e1" }}
        animate={reduced ? {} : { opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 3.6, times: [0, 0.45, 0.58, 0.86, 1], repeat: reduced ? 0 : Infinity }}
      >
        tom de voz: acolhedor ✓
      </motion.div>
    </div>
  );
}

const SCENES = [SceneAnswer, SceneConversation, SceneDoubts, SceneSchedule, SceneAlways, SceneBrand];

/* ---------- cards ---------- */

export function HeroCapabilities() {
  return (
    <div
      className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
      style={{ maxWidth: 900 }}
    >
      {hero.topics.map((topic, i) => {
        const Scene = SCENES[i];
        return (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ ...SPRING, delay: (i % 2) * 0.1 }}
            className="group flex w-full min-w-0 flex-col overflow-hidden rounded-[20px] border"
            style={{
              background: "linear-gradient(155deg, #0d1e3d 0%, #071022 100%)",
              borderColor: "rgba(96,165,250,0.16)",
              boxShadow: "0 18px 44px rgba(0,45,120,0.22)",
            }}
            whileHover={{ y: -6 }}
          >
            {/* Cena — UI real do produto */}
            <div
              className="relative h-[104px] w-full shrink-0 overflow-hidden sm:h-[120px]"
              style={{
                background: "linear-gradient(180deg, rgba(10,124,255,0.08) 0%, rgba(7,16,34,0.05) 100%)",
                borderBottom: "1px solid rgba(96,165,250,0.12)",
              }}
            >
              {/* grid de fundo */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                  backgroundSize: "28px 100%",
                }}
                aria-hidden="true"
              />

              {/* varredura de luz contínua */}
              <motion.div
                className="pointer-events-none absolute inset-y-0 w-24"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(147,197,253,0.12), transparent)",
                }}
                initial={{ x: "-20%" }}
                animate={{ x: ["-20%", "120%"] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "linear", delay: i * 0.4 }}
                aria-hidden="true"
              />

              {/* número watermark agressivo */}
              <motion.span
                className="pointer-events-none absolute right-3 top-1 font-extrabold leading-none tabular-nums"
                style={{
                  fontSize: "2.5rem",
                  color: "rgba(96,165,250,0.22)",
                  letterSpacing: "-0.05em",
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ ...SPRING, delay: 0.15 + (i % 2) * 0.1 }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </motion.span>

              <div className="relative h-full w-full" style={{ paddingTop: 6 }}>
                <Scene />
              </div>
            </div>

            {/* Texto — tipografia agressiva */}
            <div className="flex flex-1 flex-col px-5 py-4">
              <h3
                className="font-bold leading-tight tracking-tight text-white"
                style={{ fontSize: "1.25rem", letterSpacing: "-0.02em" }}
              >
                {topic.title}
              </h3>
              <p className="mt-1.5 text-sm leading-snug" style={{ color: "#b6c4dc" }}>
                {topic.detail}
              </p>
            </div>

            {/* linha de brilho no hover */}
            <motion.span
              className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left"
              style={{ background: "linear-gradient(90deg, #0a7cff, #60a5fa)" }}
              initial={false}
              whileHover={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              aria-hidden="true"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
