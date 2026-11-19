"use client";

import { useState } from "react";
import { faq } from "../../lib/copy";
import { Reveal } from "../ui/primitives";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative pt-4 lg:pt-8 pb-16 lg:pb-24 bg-[var(--bg-white)]">
      <div className="lp-container">
        {/* Cabeçalho */}
        <div
          className="flex flex-col items-center text-center gap-5 mb-8 lg:mb-10"
          style={{ maxWidth: 803, marginInline: "auto" }}
        >
          <Reveal>
            <p className="lp-label" style={{ color: "var(--ink-3)" }}>
              {faq.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="lp-h2" style={{ color: "var(--ink)" }}>
              {faq.title}
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lp-lead" style={{ maxWidth: 620 }}>
              {faq.support}
            </p>
          </Reveal>
        </div>

        {/* Acordeão */}
        <div className="flex flex-col gap-2.5" style={{ maxWidth: 803, marginInline: "auto" }}>
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div
                  className="overflow-hidden rounded-2xl transition-colors duration-300"
                  style={{
                    border: `1px solid ${isOpen ? "rgba(0,80,200,0.28)" : "rgba(24,25,28,0.09)"}`,
                    background: "#fff",
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span
                      className="font-semibold"
                      style={{
                        fontSize: "1rem",
                        lineHeight: 1.45,
                        color: "var(--ink)",
                      }}
                    >
                      {item.q}
                    </span>
                    <span
                      className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-all duration-300"
                      style={{
                        background: isOpen ? "var(--brand-grad)" : "rgba(24,25,28,0.05)",
                        border: "1px solid rgba(24,25,28,0.08)",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M6 1.5v9M1.5 6h9"
                          stroke={isOpen ? "#fff" : "#6d6f74"}
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>

                  <div
                    className="lp-accordion-item"
                    data-open={isOpen ? "true" : "false"}
                  >
                    <div className="lp-accordion-inner">
                      <p
                        className="px-6 pb-6 text-[0.9375rem] leading-relaxed"
                        style={{ color: "var(--ink-3)" }}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
