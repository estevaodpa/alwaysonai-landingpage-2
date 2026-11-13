"use client";

import { motion } from "framer-motion";

interface ChatBubbleProps {
  text: string;
  timestamp: string;
  direction: "incoming" | "outgoing";
  showTimestamp: boolean;
}

export function ChatBubble({
  text,
  timestamp,
  direction,
  showTimestamp,
}: ChatBubbleProps) {
  const isIncoming = direction === "incoming";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col ${isIncoming ? "self-start items-start" : "self-end items-end"}`}
    >
      <div
        className={`px-3.5 py-2.5 text-sm max-w-[85%] ${
          isIncoming
            ? "bg-[var(--bg-elevated)] rounded-[var(--radius-md)] rounded-tl-[var(--radius-sm)] text-[var(--text-primary)]"
            : "rounded-[var(--radius-md)] rounded-tr-[var(--radius-sm)] text-[var(--text-primary)]"
        }`}
        style={
          !isIncoming
            ? {
                background:
                  "linear-gradient(135deg, rgba(0,80,200,0.18) 0%, rgba(0,168,255,0.18) 100%)",
                border: "1px solid rgba(0,168,255,0.25)",
              }
            : undefined
        }
      >
        {text}
      </div>
      {showTimestamp && (
        <span className="text-[10px] text-[var(--text-tertiary)] mt-1 px-1">
          {timestamp}
        </span>
      )}
    </motion.div>
  );
}
