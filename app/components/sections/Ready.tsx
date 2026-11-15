"use client";

import { ready } from "../../lib/copy";
import { Reveal } from "../ui/primitives";

export function Ready() {
  return (
    <section id="pronto" className="relative pt-16 lg:pt-[72px] pb-16 lg:pb-[72px]">
      <div className="lp-container flex flex-col items-center gap-8">
        <Reveal>
          <h2 className="lp-h2 text-center" style={{ maxWidth: 821 }}>
            {ready.title}{" "}
            <span className="lp-accent">{ready.titleHi}</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <ul className="flex flex-col items-center gap-3">
            {ready.consequences.map((c) => (
              <li
                key={c}
                className="flex items-center gap-3 text-base"
                style={{ color: "var(--on-dark-2)" }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(16,185,129,0.14)",
                    border: "1px solid rgba(16,185,129,0.32)",
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

        <Reveal delay={0.14}>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {ready.items.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-4 py-2.5 rounded-xl text-sm font-medium"
                style={{
                  color: "var(--on-dark)",
                  background: "rgba(0,168,255,0.08)",
                  border: "1px solid rgba(0,168,255,0.22)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p
            className="text-center font-medium"
            style={{
              fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)",
              lineHeight: 1.4,
              color: "var(--on-dark)",
              maxWidth: 720,
            }}
          >
            A conversa acontece no WhatsApp.{" "}
            <span className="lp-accent">O resto se organiza sozinho.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
