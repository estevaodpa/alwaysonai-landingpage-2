"use client";

import { motion, useReducedMotion } from "framer-motion";
import { hero } from "../../lib/copy";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------- primitivas de UI ---------- */

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
        background: "#fff",
        borderColor: "rgba(24,25,28,0.09)",
        color: "#1f2937",
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
      style={{ background: "#0a7cff" }}
    >
      {children}
    </div>
  );
}

function TypingDots({ delay = 0 }: { delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-2 shadow-sm">
      {[0, 1, 2].map((d) => (
        <motion.span
          key={d}
          className="h-1 w-1 rounded-full"
          style={{ background: "#94a3b8" }}
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
        className="self-end rounded bg-[#e8f3ff] px-1.5 py-0.5 text-[0.5625rem] font-bold tabular-nums"
        style={{ color: "#0050c8" }}
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
        className="self-end flex items-center gap-1 rounded bg-[#eaf7f0] px-1.5 py-0.5 text-[0.5625rem] font-bold"
        style={{ color: "#0a7f52" }}
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
        className="flex items-center gap-2 self-end rounded-lg border bg-white px-2.5 py-1.5"
        style={{ borderColor: "rgba(0,80,200,0.14)" }}
        animate={reduced ? {} : { opacity: [0, 0, 1, 1, 0], y: [6, 6, 0, 0, 0] }}
        transition={{ duration: 3.6, times: [0, 0.4, 0.52, 0.84, 1], repeat: reduced ? 0 : Infinity }}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#eef4ff] text-[0.5625rem] font-bold" style={{ color: "#0050c8" }}>
          SEX
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[0.6875rem] font-bold" style={{ color: "#18191c" }}>16h30 · Avaliação</span>
          <span className="text-[0.5625rem]" style={{ color: "#64748b" }}>confirmado no WhatsApp</span>
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ color: "#0a7f52" }}>
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
          <circle cx="27" cy="27" r="23" fill="#fff" stroke="rgba(0,80,200,0.16)" />
          {ticks.map((i) => {
            const a = (i / ticks.length) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={(27 + Math.cos(a) * 18).toFixed(2)}
                y1={(27 + Math.sin(a) * 18).toFixed(2)}
                x2={(27 + Math.cos(a) * 21).toFixed(2)}
                y2={(27 + Math.sin(a) * 21).toFixed(2)}
                stroke="rgba(0,80,200,0.2)"
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
            stroke="#0050c8"
            strokeWidth="1.8"
            strokeLinecap="round"
            animate={reduced ? {} : { rotate: 360 }}
            transition={{ duration: 6, repeat: reduced ? 0 : Infinity, ease: "linear" }}
            style={{ transformOrigin: "27px 27px" }}
          />
          <circle cx="27" cy="27" r="2" fill="#0050c8" />
        </svg>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5">
          <motion.span
            className="h-2 w-2 rounded-full"
            style={{ background: "#f5a524" }}
            animate={reduced ? {} : { opacity: [1, 0.25, 1] }}
            transition={{ duration: 3, repeat: reduced ? 0 : Infinity }}
          />
          <span className="text-[0.625rem] font-bold" style={{ color: "#18191c" }}>Dia</span>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.span
            className="h-2 w-2 rounded-full"
            style={{ background: "#1e3a8a" }}
            animate={reduced ? {} : { opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 3, repeat: reduced ? 0 : Infinity }}
          />
          <span className="text-[0.625rem] font-bold" style={{ color: "#18191c" }}>Noite</span>
        </div>
        <motion.span
          className="mt-0.5 rounded bg-[#eef4ff] px-1.5 py-0.5 text-[0.5625rem] font-bold text-center"
          style={{ color: "#0050c8" }}
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
      <div className="flex items-center gap-2 rounded-lg border bg-white px-2.5 py-2" style={{ borderColor: "rgba(24,25,28,0.09)" }}>
        <span className="h-5 w-5 shrink-0 rounded-md" style={{ background: "linear-gradient(135deg,#7c3aed,#db2777)" }} />
        <motion.span
          className="overflow-hidden whitespace-nowrap text-[0.6875rem] font-bold"
          style={{ color: "#18191c" }}
          initial={false}
          animate={reduced ? { width: "auto" } : { width: ["0%", "0%", "100%", "100%", "0%"] }}
          transition={{ duration: 3.6, times: [0, 0.15, 0.45, 0.85, 1], repeat: reduced ? 0 : Infinity }}
        >
          {name}
        </motion.span>
      </div>
      <motion.div
        className="self-start rounded-md bg-[#f1f5f9] px-2 py-1 text-[0.5625rem] font-semibold"
        style={{ color: "#475569" }}
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
      className="mt-8 grid w-full grid-cols-1 gap-3 sm:grid-cols-2"
      style={{ maxWidth: 860 }}
    >
      {hero.topics.map((topic, i) => {
        const Scene = SCENES[i];
        return (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8% 0px" }}
            transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: EASE }}
            className="flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-white"
            style={{
              borderColor: "rgba(24,25,28,0.09)",
              boxShadow: "0 10px 30px rgba(16,40,80,0.05)",
            }}
          >
            {/* Cena — UI real do produto */}
            <div
              className="relative h-[92px] w-full overflow-hidden"
              style={{
                background: "#f6f8fb",
                borderBottom: "1px solid rgba(24,25,28,0.06)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage: "linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)",
                  backgroundSize: "28px 100%",
                }}
                aria-hidden="true"
              />
              <div className="relative h-full w-full" style={{ paddingTop: 4 }}>
                <Scene />
              </div>
              <span
                className="absolute right-2 top-2 rounded bg-white/80 px-1.5 py-0.5 text-[0.5625rem] font-bold tabular-nums"
                style={{ color: "#94a3b8" }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Texto */}
            <div className="flex flex-1 flex-col px-4 py-3.5">
              <h3 className="text-[0.9375rem] font-semibold leading-snug" style={{ color: "#18191c" }}>
                {topic.title}
              </h3>
              <p className="mt-1 text-[0.8125rem] leading-snug" style={{ color: "#64748b" }}>
                {topic.detail}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
