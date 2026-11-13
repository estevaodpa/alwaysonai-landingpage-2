"use client";

import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="self-end"
    >
      <div
        className="rounded-[var(--radius-md)] rounded-tr-[var(--radius-sm)] px-4 py-3.5 flex items-center gap-1.5"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,80,200,0.18) 0%, rgba(0,168,255,0.18) 100%)",
          border: "1px solid rgba(0,168,255,0.25)",
        }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, #0050c8 0%, #00a8ff 100%)",
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
