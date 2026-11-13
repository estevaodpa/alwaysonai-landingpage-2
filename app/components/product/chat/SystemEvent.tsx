"use client";

import { motion } from "framer-motion";

interface SystemEventProps {
  label: string;
}

export function SystemEvent({ label }: SystemEventProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="self-center flex items-center gap-1.5 rounded-full px-3 py-1"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,80,200,0.08) 0%, rgba(0,168,255,0.08) 100%)",
        border: "1px solid rgba(0,168,255,0.15)",
      }}
    >
      <motion.span
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, #0050c8 0%, #00a8ff 100%)",
        }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
      <span className="text-[11px] text-[var(--text-tertiary)]">{label}</span>
    </motion.div>
  );
}
