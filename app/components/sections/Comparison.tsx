"use client";

import { comparison } from "../../lib/copy";
import { Reveal } from "../ui/primitives";

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
      className="rounded-2xl p-6 lg:p-8 h-full flex flex-col gap-6"
      style={{
        background: isAfter ? "rgba(0,120,255,0.10)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${isAfter ? "rgba(0,168,255,0.3)" : "rgba(255,255,255,0.07)"}`,
      }}
    >
      <span
        className="lp-label"
        style={{ color: isAfter ? "#4dc3ff" : "var(--on-dark-3)" }}
      >
        {label}
      </span>

      <ul className="flex flex-col gap-4 flex-1">
        {rows.map((r) => (
          <li key={r} className="flex items-start gap-3">
            <span
              className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: isAfter ? "#4dc3ff" : "rgba(255,255,255,0.22)",
              }}
              aria-hidden="true"
            />
            <span
              className="text-base leading-relaxed"
              style={{ color: isAfter ? "var(--on-dark)" : "var(--on-dark-3)" }}
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
    <section id="comparacao" className="relative pt-10 lg:pt-[40px] pb-10 lg:pb-[40px]">
      <div className="lp-container flex flex-col gap-10">
        <Reveal>
          <h2 className="lp-h2 text-center" style={{ maxWidth: 760, marginInline: "auto" }}>
            {comparison.title}
          </h2>
        </Reveal>

        {/* Grid com gap 8px, igual ao modelo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Reveal>
            <Column
              label={comparison.before.label}
              rows={comparison.before.rows}
              variant="before"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <Column
              label={comparison.after.label}
              rows={comparison.after.rows}
              variant="after"
            />
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <p
            className="text-center font-medium"
            style={{ fontSize: "1.125rem", color: "var(--on-dark-2)" }}
          >
            {comparison.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
