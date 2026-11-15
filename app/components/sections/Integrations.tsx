"use client";

import { integrations } from "../../lib/copy";
import { Reveal } from "../ui/primitives";

export function Integrations() {
  return (
    <section id="integracoes" className="relative pt-16 lg:pt-[72px] pb-16 lg:pb-[72px]">
      <div className="lp-container flex flex-col gap-10">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center gap-5">
          <Reveal>
            <h2 className="lp-h2" style={{ maxWidth: 657 }}>
              {integrations.title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="lp-lead lp-lead-dark" style={{ maxWidth: 657 }}>
              {integrations.support}
            </p>
          </Reveal>
        </div>

        {/* Chips */}
        <Reveal delay={0.14}>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {integrations.items.map((i) => (
              <span
                key={i.label}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-300 hover:opacity-80"
                style={{
                  color: "var(--on-dark)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <span
                  className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-[0.625rem] font-bold"
                  style={{
                    background: "var(--brand-grad)",
                    color: "#fff",
                  }}
                >
                  {i.short}
                </span>
                {i.label}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Fluxo de automação */}
        <Reveal delay={0.2}>
          <div className="lp-card-glow p-5 sm:p-8">
            <div className="flex items-center justify-between gap-3 mb-5">
              <span className="text-sm font-semibold" style={{ color: "var(--on-dark)" }}>
                {integrations.flowTitle}
              </span>
              <span
                className="text-[0.6875rem] font-bold tabular-nums"
                style={{ color: "var(--on-dark-3)" }}
              >
                {integrations.flowCount}
              </span>
            </div>

            <div className="flex flex-col gap-2.5">
              {integrations.flow.map((s, i) => (
                <div
                  key={s.title}
                  className="flex items-start gap-4 rounded-xl px-4 py-3.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderLeft: `2px solid ${i === 0 ? "#00a8ff" : "rgba(255,255,255,0.14)"}`,
                  }}
                >
                  <span
                    className="text-[0.6875rem] font-bold uppercase tracking-[0.08em] shrink-0 mt-0.5"
                    style={{ color: "var(--on-dark-3)", minWidth: 92 }}
                  >
                    {s.step}
                  </span>
                  <div className="min-w-0">
                    <div
                      className="text-sm font-medium"
                      style={{ color: "var(--on-dark)" }}
                    >
                      {s.title}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--on-dark-3)" }}>
                      {s.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
