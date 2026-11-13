"use client";

import Image from "next/image";
import { niches } from "../../lib/copy";
import { Reveal, Section, SectionHead } from "../ui/primitives";

export function Niches() {
  return (
    <Section id="nichos" surface="body">
      <div className="lp-container">
        <SectionHead
          kicker={niches.kicker}
          title={niches.title}
          titleHi={niches.titleHi}
          support={niches.support}
        />

        <div className="mt-14 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5">
          {niches.items.map((n, i) => (
            <Reveal key={n.name} delay={i * 0.08}>
              <article className="lp-card h-full flex flex-col">
                <span className="lp-pill-badge self-start">{n.name}</span>

                <div
                  className="mt-5 rounded-2xl px-4 py-3 text-sm leading-relaxed"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                >
                  <span
                    className="block text-xs mb-1.5"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Paciente pergunta
                  </span>
                  “{n.quote}”
                </div>

                <div
                  className="mt-3 rounded-2xl px-4 py-3 text-sm leading-relaxed"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(0,80,200,0.16) 0%, rgba(0,168,255,0.16) 100%)",
                    border: "1px solid var(--border-accent)",
                    color: "var(--text-primary)",
                  }}
                >
                  <span
                    className="block text-xs mb-1.5"
                    style={{ color: "var(--accent-cyan)" }}
                  >
                    A IA responde
                  </span>
                  {n.answer}
                </div>

                <div
                  className="mt-5 overflow-hidden flex-1"
                  style={{
                    borderRadius: 14,
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <Image
                    src={n.image}
                    alt={`Leads e procedimentos — ${n.name}`}
                    width={1400}
                    height={805}
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
