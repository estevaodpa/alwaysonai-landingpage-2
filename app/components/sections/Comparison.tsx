"use client";

import { comparison } from "../../lib/copy";
import { Reveal, Section } from "../ui/primitives";

function Column({
  label,
  rows,
  variant,
}: {
  label: string;
  rows: string[];
  variant: "before" | "after";
}) {
  const isAfter = variant === "after";
  return (
    <div
      className="h-full rounded-2xl p-6 lg:p-8"
      style={{
        background: isAfter
          ? "linear-gradient(135deg, rgba(0,80,200,0.18) 0%, rgba(0,168,255,0.10) 100%)"
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${isAfter ? "var(--border-accent)" : "var(--border-subtle)"}`,
      }}
    >
      <span
        className="text-xs font-semibold uppercase tracking-[0.16em]"
        style={{ color: isAfter ? "var(--accent-cyan)" : "var(--text-tertiary)" }}
      >
        {label}
      </span>

      <ul className="mt-6 flex flex-col gap-4">
        {rows.map((r) => (
          <li key={r} className="flex items-start gap-3">
            <span
              className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full"
              style={{
                background: isAfter ? "var(--accent-cyan)" : "rgba(255,255,255,0.2)",
              }}
              aria-hidden="true"
            />
            <span
              className="text-sm lg:text-base leading-relaxed"
              style={{
                color: isAfter ? "var(--text-primary)" : "var(--text-tertiary)",
              }}
            >
              {r}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Comparison() {
  return (
    <Section id="comparacao" surface="base">
      <div className="lp-container">
        <Reveal>
          <h2 className="lp-h2 text-center" style={{ maxWidth: 760, marginInline: "auto" }}>
            {comparison.title}
          </h2>
        </Reveal>

        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          <Reveal>
            <Column
              label={comparison.before.label}
              rows={comparison.before.rows}
              variant="before"
            />
          </Reveal>
          <Reveal delay={0.1}>
            <Column
              label={comparison.after.label}
              rows={comparison.after.rows}
              variant="after"
            />
          </Reveal>
        </div>

        <Reveal delay={0.16}>
          <p
            className="mt-10 text-center font-medium"
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)",
              color: "var(--text-secondary)",
            }}
          >
            {comparison.footnote}
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
