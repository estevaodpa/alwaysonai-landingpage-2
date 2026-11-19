"use client";

import { motion } from "framer-motion";
import { HERO_ACTIONS } from "../../lib/conversation";

const EASE = [0.16, 1, 0.3, 1] as const;

type Icon = "bolt" | "chat" | "shield" | "calendar";

const CONFIG: { icon: Icon; position: string }[] = [
  { icon: "bolt", position: "left-[14%] top-[4%]" },
  { icon: "chat", position: "left-[16%] top-[24%]" },
  { icon: "shield", position: "right-[14%] top-[6%]" },
  { icon: "calendar", position: "right-[16%] top-[26%]" },
];

function IconSvg({ name }: { name: Icon }) {
  const p = { width: 15, height: 15, viewBox: "0 0 16 16", fill: "none" };
  if (name === "bolt")
    return (
      <svg {...p}>
        <path
          d="M9 1.5 3.5 9H8l-.8 5.5L12.5 7H8l1-5.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (name === "chat")
    return (
      <svg {...p}>
        <path
          d="M2.4 3.2h11.2v7.2a.8.8 0 0 1-.8.8H7.4l-3 2.4v-2.4H3.2a.8.8 0 0 1-.8-.8V4a.8.8 0 0 1 .8-.8Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (name === "shield")
    return (
      <svg {...p}>
        <path
          d="M8 1.6 3.2 3.8v3.9c0 3 2 5.5 4.8 6.7 2.8-1.2 4.8-3.7 4.8-6.7V3.8L8 1.6Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M5.9 8.1 7.4 9.6l3-3.2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  return (
    <svg {...p}>
      <rect x="2" y="3.2" width="12" height="10.3" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M2 6.6h12M5.4 1.8v2.6M10.6 1.8v2.6"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Pills de operação que acendem conforme a conversa avança.
 * activeAction = índice da última ação alcançada (-1 = nenhuma).
 */
export function HeroEvents({ activeAction }: { activeAction: number }) {
  return (
    <>
      {HERO_ACTIONS.map((label, i) => {
        const active = i <= activeAction;
        const cfg = CONFIG[i];
        return (
          <motion.div
            key={label}
            initial={{ opacity: 0 }}
            animate={{
              opacity: active ? 1 : 0.45,
              y: active ? 0 : 6,
              scale: active ? 1 : 0.97,
            }}
            transition={{ duration: 0.5, ease: EASE }}
            className={`absolute ${cfg.position} w-[212px] sm:w-[250px] rounded-2xl px-4 py-3`}
            style={{
              background: active ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.5)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              border: `1px solid ${active ? "rgba(16,185,129,0.4)" : "rgba(24,25,28,0.06)"}`,
              boxShadow: active ? "0 12px 32px rgba(0,0,0,0.08)" : "none",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-500"
                style={{
                  background: active ? "#10b981" : "rgba(24,25,28,0.06)",
                  color: active ? "#fff" : "rgba(24,25,28,0.4)",
                }}
              >
                <IconSvg name={cfg.icon} />
              </span>
              <span
                className="text-sm font-bold leading-tight"
                style={{ color: active ? "#18191c" : "rgba(24,25,28,0.45)" }}
              >
                {label}
              </span>
            </div>
          </motion.div>
        );
      })}
    </>
  );
}
