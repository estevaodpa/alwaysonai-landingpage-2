"use client";

import { useState } from "react";
import { faq } from "../../lib/copy";
import { Reveal, Section, SectionHead } from "../ui/primitives";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" surface="lift">
      <div className="lp-container">
        <SectionHead
          kicker={faq.kicker}
          title={faq.title}
          support={faq.support}
        />

        <div className="mt-12 max-w-[820px] mx-auto flex flex-col gap-2.5">
          {faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <div
                  className="overflow-hidden rounded-2xl transition-colors duration-300"
                  style={{
                    border: `1px solid ${isOpen ? "var(--border-accent)" : "var(--border-default)"}`,
                    background: "var(--surface-card)",
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span
                      className="font-medium"
                      style={{
                        fontSize: "clamp(0.95rem, 1.3vw, 1.0625rem)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {item.q}
                    </span>
                    <span
                      className="shrink-0 flex items-center justify-center w-7 h-7 rounded-full transition-transform duration-300"
                      style={{
                        background: isOpen ? "var(--gradient-brand)" : "rgba(255,255,255,0.06)",
                        border: "1px solid var(--border-default)",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M6 1.5v9M1.5 6h9"
                          stroke={isOpen ? "#fff" : "#9ba1ac"}
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
                        className="px-6 pb-6 text-sm leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
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
    </Section>
  );
}
