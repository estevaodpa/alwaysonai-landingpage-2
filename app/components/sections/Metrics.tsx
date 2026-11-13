"use client";

import Image from "next/image";
import { metrics } from "../../lib/copy";
import { Reveal, Section, SectionHead } from "../ui/primitives";

export function Metrics() {
  return (
    <Section id="resultados" surface="body">
      <div className="lp-container">
        <SectionHead
          kicker={metrics.kicker}
          title={metrics.title}
          support={metrics.support}
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {metrics.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="lp-card-lift h-full">
                <div
                  className="font-semibold"
                  style={{
                    fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                    color: "var(--text-primary)",
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="mt-4 text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "var(--accent-cyan)" }}
                >
                  {s.label}
                </div>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  {s.hint}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Print real do painel */}
        <Reveal delay={0.1}>
          <div
            className="mt-6 lg:mt-8 overflow-hidden"
            style={{
              borderRadius: 20,
              border: "1px solid var(--border-default)",
              background: "var(--surface-card)",
            }}
          >
            <Image
              src={metrics.image}
              alt={metrics.imageAlt}
              width={1400}
              height={468}
              className="w-full h-auto"
              loading="lazy"
              decoding="async"
            />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
