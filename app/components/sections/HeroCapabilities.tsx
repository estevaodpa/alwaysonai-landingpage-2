"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { hero } from "../../lib/copy";

const EASE = [0.16, 1, 0.3, 1] as const;
const SPRING = { type: "spring" as const, stiffness: 160, damping: 20, mass: 0.9 };

/** Texto revelado linha a linha com máscara — a animação é a tipografia. */
function RevealLine({
  children,
  delay,
  start,
}: {
  children: React.ReactNode;
  delay: number;
  start: boolean;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "110%", opacity: 0 }}
        animate={start ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
        transition={{ ...SPRING, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function HeroCapabilities() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const start = inView || !!reduced;

  return (
    <div
      ref={ref}
      className="mt-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2"
      style={{ maxWidth: 900 }}
    >
      {hero.topics.map((topic, i) => {
        const words = topic.title.split(" ");
        const mid = Math.ceil(words.length / 2);
        const line1 = words.slice(0, mid).join(" ");
        const line2 = words.slice(mid).join(" ");

        return (
          <motion.div
            key={topic.title}
            initial={{ opacity: 0, y: 24 }}
            animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ ...SPRING, delay: (i % 2) * 0.08 }}
            className="group relative flex w-full min-w-0 flex-col justify-end overflow-hidden rounded-[20px] border px-5 py-6 sm:px-6 sm:py-7"
            style={{
              background: "linear-gradient(155deg, #0d1e3d 0%, #071022 100%)",
              borderColor: "rgba(96,165,250,0.16)",
              boxShadow: "0 18px 44px rgba(0,45,120,0.22)",
              minHeight: 190,
            }}
            whileHover={{ y: -6 }}
          >
            <motion.span
              className="pointer-events-none absolute -right-1 -top-5 font-extrabold leading-none tabular-nums"
              style={{
                fontSize: "7rem",
                color: "rgba(96,165,250,0.10)",
                letterSpacing: "-0.07em",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={start ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ ...SPRING, delay: 0.1 }}
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </motion.span>

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(70% 60% at 80% 10%, rgba(10,124,255,0.14), transparent 70%)",
              }}
              aria-hidden="true"
            />

            <h3
              className="relative z-10 font-bold leading-[1.08] tracking-tight text-white"
              style={{ fontSize: "1.5rem", letterSpacing: "-0.03em" }}
            >
              <RevealLine delay={0.12 + (i % 2) * 0.06} start={start}>
                {line1}
              </RevealLine>
              {line2 && (
                <RevealLine delay={0.22 + (i % 2) * 0.06} start={start}>
                  {line2}
                </RevealLine>
              )}
            </h3>

            <motion.p
              className="relative z-10 mt-3 text-sm leading-snug"
              style={{ color: "#b6c4dc", maxWidth: 340 }}
              initial={{ opacity: 0 }}
              animate={start ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.36 + (i % 2) * 0.06, ease: EASE }}
            >
              {topic.detail}
            </motion.p>

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
