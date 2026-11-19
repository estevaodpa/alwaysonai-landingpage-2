"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue } from "framer-motion";
import { SmartphoneFrame } from "../product/SmartphoneFrame";
import { RealChat } from "../product/RealChat";
import { useConversation } from "../../hooks/use-conversation";
import { CASE_STEPS } from "../../lib/conversation";

const EASE = [0.16, 1, 0.3, 1] as const;

function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const value = useMotionValue(0);
  const [text, setText] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(value, to, { duration: 1.5, ease: "easeOut" });
    const unsub = value.on("change", (v) =>
      setText(Math.round(v).toLocaleString("pt-BR")),
    );
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, value]);

  return (
    <span ref={ref}>
      {text}
      {suffix}
    </span>
  );
}

function MiniChart({ show }: { show: boolean }) {
  return (
    <svg viewBox="0 0 170 46" className="h-11 w-full" fill="none" aria-hidden="true">
      <path d="M0 45.5H170" stroke="rgba(255,255,255,0.08)" />
      <path d="M0 25H170" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 4" />
      <motion.path
        d="M0 40 L18 34 L36 38 L54 24 L72 29 L90 16 L108 21 L126 11 L144 16 L170 6"
        stroke="#4dc3ff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={show ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.4, ease: EASE }}
      />
    </svg>
  );
}

export function CaseReal() {
  const { lines, isTyping, activeCaseStep } = useConversation();
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { once: true, margin: "-40px" });

  return (
    <div className="flex h-full flex-col">
      {/* Cabeçalho */}
      <div className="mb-4">
        <span className="lp-label" style={{ color: "var(--on-dark-3)" }}>
          Case Real na prática
        </span>
        <h3
          className="mt-2 font-semibold"
          style={{
            fontSize: "1.125rem",
            lineHeight: 1.25,
            letterSpacing: "-0.015em",
            color: "var(--on-dark)",
          }}
        >
          Fora do horário comercial. Resposta em até 1 minuto.
        </h3>
      </div>

      {/* Corpo: celular + painéis (empilha no mobile) */}
      <div className="flex flex-1 flex-col items-center gap-5 overflow-hidden lg:flex-row lg:items-stretch lg:gap-4">
        {/* Celular real */}
        <div className="shrink-0" style={{ width: 245, height: 504 }}>
          <div style={{ transform: "scale(0.72)", transformOrigin: "top left" }}>
            <SmartphoneFrame>
              <RealChat lines={lines} isTyping={isTyping} />
            </SmartphoneFrame>
          </div>
        </div>

        {/* Caminho da IA + métricas */}
        <div ref={panelRef} className="flex w-full min-w-0 flex-1 flex-col gap-3">
          <div className="flex-1">
            <span className="lp-label" style={{ color: "var(--on-dark-3)" }}>
              O que a IA fez
            </span>
            <div className="mt-3 flex flex-col">
              {CASE_STEPS.map((step, i) => {
                const active = i <= activeCaseStep;
                const last = i === CASE_STEPS.length - 1;
                return (
                  <div key={step.title} className="flex gap-2.5">
                    <div className="flex flex-col items-center">
                      <motion.span
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-bold"
                        animate={{
                          background: active ? "var(--brand-grad)" : "rgba(255,255,255,0.08)",
                          color: active ? "#fff" : "rgba(255,255,255,0.4)",
                          scale: active ? 1 : 0.9,
                        }}
                        transition={{ duration: 0.4, ease: EASE }}
                      >
                        {i + 1}
                      </motion.span>
                      {!last && (
                        <span
                          className="my-1 w-px flex-1"
                          style={{
                            background: active
                              ? "rgba(0,168,255,0.45)"
                              : "rgba(255,255,255,0.08)",
                            minHeight: 16,
                          }}
                        />
                      )}
                    </div>
                    <div className="min-w-0 pb-3">
                      <div
                        className="text-[0.8125rem] font-semibold leading-tight"
                        style={{ color: active ? "var(--on-dark)" : "rgba(255,255,255,0.4)" }}
                      >
                        {step.title}
                      </div>
                      <div
                        className="mt-0.5 text-[0.6875rem] leading-snug"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {step.detail}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Painel de métricas */}
          <div
            className="rounded-xl p-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <MiniChart show={inView} />
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[
                { value: 505, label: "contatos" },
                { value: 273, label: "agendadas" },
                { value: 54, label: "% conversão", suffix: "%" },
              ].map((m) => (
                <div key={m.label}>
                  <div
                    className="text-sm font-bold tabular-nums"
                    style={{ color: "#4dc3ff" }}
                  >
                    <CountUp to={m.value} suffix={m.suffix ?? ""} />
                  </div>
                  <div
                    className="text-[0.625rem] leading-tight"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Texto do case (fora do card, abaixo) */}
    </div>
  );
}
