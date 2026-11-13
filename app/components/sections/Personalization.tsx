"use client";

import { personalization } from "../../lib/copy";
import { Reveal, Section, SectionHead } from "../ui/primitives";

export function Personalization() {
  return (
    <Section id="personalizacao" surface="body">
      <div className="lp-container">
        <SectionHead
          kicker={personalization.kicker}
          title={personalization.title}
          titleHi={personalization.titleHi}
          support={personalization.support}
        />

        {/* Chips do que a IA aprende */}
        <Reveal delay={0.14}>
          <div className="mt-12 flex flex-wrap justify-center gap-2.5">
            {personalization.elements.map((el) => (
              <span
                key={el}
                className="lp-pill !text-sm !px-4 !py-2"
                style={{
                  color: "var(--text-secondary)",
                  background: "rgba(0,168,255,0.06)",
                  borderColor: "var(--border-accent)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--accent-cyan)" }}
                  aria-hidden="true"
                />
                {el}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Genérica vs personalizada */}
        <div className="mt-12 lg:mt-14 grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 max-w-[900px] mx-auto">
          <Reveal>
            <div
              className="h-full rounded-2xl p-6"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-[0.12em]"
                style={{ color: "var(--text-tertiary)" }}
              >
                {personalization.generic.label}
              </span>
              <p
                className="mt-4 text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                “{personalization.generic.question}”
              </p>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "var(--text-tertiary)" }}
              >
                {personalization.generic.answer}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div
              className="h-full rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,80,200,0.16) 0%, rgba(0,168,255,0.12) 100%)",
                border: "1px solid var(--border-accent)",
                boxShadow: "0 20px 60px rgba(0,120,255,0.16)",
              }}
            >
              <span
                className="text-xs font-semibold uppercase tracking-[0.12em]"
                style={{ color: "var(--accent-cyan)" }}
              >
                {personalization.personalized.label}
              </span>
              <p
                className="mt-4 text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                “{personalization.personalized.question}”
              </p>
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {personalization.personalized.answer}
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <p
            className="mt-12 text-center font-medium"
            style={{
              fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)",
              lineHeight: 1.4,
              letterSpacing: "-0.015em",
              color: "var(--text-primary)",
              maxWidth: 760,
              marginInline: "auto",
            }}
          >
            Não é sua clínica que precisa se adaptar à tecnologia.{" "}
            <span className="lp-accent">
              A tecnologia é que precisa se adaptar à sua clínica.
            </span>
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
