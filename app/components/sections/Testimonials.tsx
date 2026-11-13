"use client";

import Image from "next/image";
import { testimonials } from "../../lib/copy";
import { Reveal, Segs, Section, SectionHead } from "../ui/primitives";

export function Testimonials() {
  return (
    <Section id="depoimentos" surface="lift">
      <div className="lp-container">
        <SectionHead
          kicker={testimonials.kicker}
          title={testimonials.title}
          supportSegs={testimonials.support}
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {testimonials.items.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.07}>
              <figure className="lp-card h-full flex flex-col">
                <div
                  className="overflow-hidden rounded-xl"
                  style={{ border: "1px solid var(--border-subtle)" }}
                >
                  <Image
                    src={p.image}
                    alt={`${p.name} — ${p.profession}`}
                    width={p.width}
                    height={p.height}
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption className="mt-4">
                  <div
                    className="text-xs font-medium tracking-wide"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {p.name} · {p.profession}
                  </div>
                  <div
                    className="mt-1.5 font-medium"
                    style={{
                      fontSize: "clamp(0.95rem, 1.2vw, 1.05rem)",
                      lineHeight: 1.45,
                      color: "var(--text-primary)",
                    }}
                  >
                    “{p.highlight}”
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Conclusão */}
        <Reveal delay={0.12}>
          <div className="mt-14 text-center">
            <div className="flex justify-center mb-8">
              <div
                className="w-24 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(77,195,255,0.3), transparent)",
                }}
              />
            </div>

            <h3
              className="font-semibold"
              style={{
                fontSize: "clamp(1.4rem, 2.6vw, 2rem)",
                lineHeight: 1.3,
                letterSpacing: "-0.015em",
                color: "var(--text-primary)",
              }}
            >
              {testimonials.closing.headline}
            </h3>

            <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-7">
              {testimonials.closing.results.map((r) => (
                <div key={r.label} className="text-center">
                  <div
                    className="text-xs uppercase tracking-[0.12em]"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {r.label}
                  </div>
                  <div
                    className="mt-1.5 font-semibold"
                    style={{
                      fontSize: "clamp(1rem, 1.5vw, 1.3rem)",
                      color: "var(--accent-cyan)",
                    }}
                  >
                    {r.value}
                  </div>
                </div>
              ))}
            </div>

            <p
              className="mt-6 font-medium"
              style={{
                fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)",
                lineHeight: 1.55,
                color: "var(--text-secondary)",
              }}
            >
              <Segs segs={testimonials.closing.final} />
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
