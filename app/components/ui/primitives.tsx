"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import type { Seg } from "../../lib/copy";

const CYAN = "#4dc3ff";
const EASE = [0.16, 1, 0.3, 1] as const;

// ── Segmented text with highlighted spans ───────────────────────────────────
export function Hi({ children }: { children: ReactNode }) {
  return (
    <strong style={{ color: CYAN, fontWeight: 700 }} className="font-bold">
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
  y = 28,
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
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
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
  style,
  surface = "base",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  surface?: "base" | "body" | "lift";
}) {
  const bg =
    surface === "lift"
      ? "var(--bg-lift)"
      : surface === "body"
        ? "var(--bg-body)"
        : "transparent";
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
  center = true,
  className = "",
}: {
  kicker?: string;
  title?: string;
  titleHi?: string;
  support?: string;
  supportSegs?: Seg[];
  center?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${center ? "text-center mx-auto" : ""} ${className}`}
      style={center ? { maxWidth: 820 } : undefined}
    >
      {kicker && (
        <Reveal>
          <p className="lp-kicker">{kicker}</p>
        </Reveal>
      )}
      {title && (
        <Reveal delay={0.06}>
          <h2 className="lp-h2 mt-4">
            {title}
            {titleHi && (
              <>
                {" "}
                <span className="lp-accent">{titleHi}</span>
              </>
            )}
          </h2>
        </Reveal>
      )}
      {(support || supportSegs) && (
        <Reveal delay={0.12}>
          <p
            className="lp-lead mt-5"
            style={center ? { maxWidth: 700, marginInline: "auto" } : undefined}
          >
            {supportSegs ? <Segs segs={supportSegs} /> : support}
          </p>
        </Reveal>
      )}
    </div>
  );
}
