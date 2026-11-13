"use client";

import { ready } from "../../lib/copy";
import { Reveal, Section, SectionHead } from "../ui/primitives";

export function Ready() {
  return (
    <Section id="pronto" surface="body">
      <div className="relative lp-container flex flex-col items-center">
        <SectionHead
          kicker={ready.kicker}
          title={ready.title}
          titleHi={ready.titleHi}
        />

        <Reveal delay={0.1}>
          <ul className="mt-10 flex flex-col items-center gap-3">
            {ready.consequences.map((c) => (
              <li
                key={c}
                className="flex items-center gap-3 text-sm lg:text-base"
                style={{ color: "var(--text-secondary)" }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(16,185,129,0.14)",
                    border: "1px solid rgba(16,185,129,0.3)",
                  }}
                  aria-hidden="true"
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M1.5 5.2L3.8 7.5L8.5 2.8"
                      stroke="#34d399"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {ready.items.map((item) => (
              <span
                key={item}
                className="lp-pill !text-sm !px-4 !py-2"
                style={{
                  color: "var(--text-primary)",
                  background: "rgba(0,168,255,0.07)",
                  borderColor: "var(--border-accent)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <p
            className="mt-12 text-center font-medium"
            style={{
              fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)",
              lineHeight: 1.4,
              letterSpacing: "-0.015em",
              color: "var(--text-primary)",
              maxWidth: 720,
              marginInline: "auto",
            }}
          >
            A conversa acontece no WhatsApp.{" "}
            <span className="lp-accent">O resto se organiza sozinho.</span>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
