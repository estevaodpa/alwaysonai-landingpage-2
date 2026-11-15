"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import type { Seg } from "../../lib/copy";

const EASE = [0.16, 1, 0.3, 1] as const;

// ── Segmented text with highlighted spans ───────────────────────────────────
export function Hi({ children }: { children: ReactNode }) {
  return (
    <strong style={{ color: "#00a8ff", fontWeight: 700 }} className="font-bold">
      {children}
    </strong>
  );
}

export function Segs({
  segs,
  style,
  className,
}: {
  segs: Seg[];
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <span style={style} className={className}>
      {segs.map((s, i) =>
        s.hi ? (
          <Hi key={i}>{s.t}</Hi>
        ) : (
          <span key={i}>{s.t}</span>
        ),
      )}
    </span>
  );
}

// ── Reveal on scroll ────────────────────────────────────────────────────────
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Section shell ───────────────────────────────────────────────────────────
export function Section({
  id,
  children,
  className = "",
  surface = "light",
  style,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  surface?: "light" | "white" | "dark";
  style?: React.CSSProperties;
}) {
  const bg =
    surface === "dark"
      ? "var(--bg-dark)"
      : surface === "white"
        ? "var(--bg-white)"
        : "var(--bg-light)";
  return (
    <section
      id={id}
      className={`lp-section overflow-clip ${className}`}
      style={{ background: bg, ...style }}
    >
      {children}
    </section>
  );
}

// ── Section heading block (kicker → title → support) ───────────────────────
export function SectionHead({
  kicker,
  title,
  titleHi,
  support,
  supportSegs,
  tone = "dark",
  width = 841,
  className = "",
}: {
  kicker?: string;
  title?: string;
  titleHi?: string;
  support?: string;
  supportSegs?: Seg[];
  /** "dark" = seção escura (texto branco) · "light" = seção clara */
  tone?: "dark" | "light";
  width?: number;
  className?: string;
}) {
  const isDark = tone === "dark";
  return (
    <div
      className={`flex flex-col items-center text-center gap-5 ${className}`}
      style={{ maxWidth: width, marginInline: "auto" }}
    >
      {kicker && (
        <Reveal>
          <p
            className="lp-label"
            style={{ color: isDark ? "var(--on-dark-3)" : "var(--ink-3)" }}
          >
            {kicker}
          </p>
        </Reveal>
      )}
      {title && (
        <Reveal delay={0.06}>
          <h2
            className="lp-h2"
            style={{ color: isDark ? "var(--on-dark)" : "var(--ink)" }}
          >
            {title}
            {titleHi && (
              <>
                {" "}
                <span
                  className={isDark ? "lp-accent" : "lp-accent-solid"}
                  style={isDark ? undefined : { color: "var(--brand-2)" }}
                >
                  {titleHi}
                </span>
              </>
            )}
          </h2>
        </Reveal>
      )}
      {(support || supportSegs) && (
        <Reveal delay={0.12}>
          <p
            className="lp-lead"
            style={{
              maxWidth: 700,
              color: isDark ? "var(--on-dark-3)" : "var(--ink-3)",
            }}
          >
            {supportSegs ? <Segs segs={supportSegs} /> : support}
          </p>
        </Reveal>
      )}
    </div>
  );
}
