"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { ConversationLine } from "../../lib/conversation";

const EASE = [0.16, 1, 0.3, 1] as const;

export function RealChat({
  lines,
  isTyping,
}: {
  lines: ConversationLine[];
  isTyping: boolean;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [lines.length, isTyping]);

  return (
    <div className="flex h-full w-full flex-col bg-[#0b141a]">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-2 bg-[#1f2c34] px-3 py-2.5">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M11 4 6.5 9 11 14"
            stroke="#8696a0"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
          style={{ background: "linear-gradient(135deg, #1e9cff, #0050c8)", color: "#fff" }}
        >
          G
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-[0.8125rem] font-semibold text-[#e9edef]">
            Secretária IA · Gabriela
          </div>
          <div className="text-[0.6875rem] text-[#8696a0]">online</div>
        </div>
        <svg width="17" height="17" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path
            d="M8.9 12.4a2.9 2.9 0 0 0 2.9-2.9V6.3a2.9 2.9 0 0 0-5.8 0v3.2a2.9 2.9 0 0 0 2.9 2.9Zm4-2.4a4 4 0 0 0-8 0M9 13.6v2m-2 0h4"
            stroke="#8696a0"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Conversa */}
      <div
        ref={scrollRef}
        className="chat-scroll relative flex-1 overflow-y-auto px-2.5 py-3"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        {/* Separador de data */}
        <div className="mb-3 flex justify-center">
          <span
            className="rounded-full px-3 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.08em]"
            style={{ background: "#1f2c34", color: "#8696a0" }}
          >
            Hoje
          </span>
        </div>

        {/* Aviso de criptografia */}
        <div className="mb-4 rounded-lg px-3 py-2 text-center text-[0.625rem] leading-relaxed"
          style={{ background: "rgba(255,255,255,0.035)", color: "#8a7a52" }}
        >
          🔒 As mensagens são protegidas com criptografia de ponta a ponta.
        </div>

        <div className="flex flex-col gap-2.5">
          {lines.map((line, i) => {
            const outgoing = line.kind === "outgoing";
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, ease: EASE }}
                className={`flex flex-col ${outgoing ? "items-end" : "items-start"}`}
              >
                <span className="mb-1 px-1 text-[0.625rem] text-[#8696a0]">
                  {outgoing ? "Secretária IA · Gabriela" : "Paciente"}
                </span>
                <div
                  className="relative max-w-[86%] rounded-xl px-3 py-2 text-[0.8125rem] leading-snug"
                  style={{
                    background: outgoing ? "#0e4d63" : "#1f2c34",
                    color: "#e9edef",
                    borderTopRightRadius: outgoing ? 3 : 12,
                    borderTopLeftRadius: outgoing ? 12 : 3,
                  }}
                >
                  {line.text}
                  <span
                    className="ml-2 inline-block text-[0.625rem] tabular-nums"
                    style={{ color: "rgba(233,237,239,0.55)" }}
                  >
                    {line.time} {outgoing && "✓✓"}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-end"
            >
              <span className="mb-1 px-1 text-[0.625rem] text-[#8696a0]">
                Secretária IA · Gabriela
              </span>
              <div
                className="flex items-center gap-1 rounded-xl px-3 py-3"
                style={{ background: "#0e4d63" }}
                aria-label="digitando"
              >
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-[#8696a0]"
                    animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="flex shrink-0 items-center gap-2 bg-[#1f2c34] px-3 py-2.5">
        <span className="text-[0.8125rem] text-[#8696a0]">Mensagem</span>
        <span className="ml-auto flex h-8 w-8 items-center justify-center rounded-full"
          style={{ background: "var(--brand-grad)" }}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M2 8h12M9 3l5 5-5 5"
              stroke="#fff"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
