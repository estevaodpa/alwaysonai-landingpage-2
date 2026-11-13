"use client";

import { features } from "../../lib/copy";
import { Reveal, Section, SectionHead } from "../ui/primitives";

export function Features() {
  return (
    <Section id="recursos" surface="base">
      <div className="lp-glow top-0 left-1/2 -translate-x-1/2 w-[900px] h-[520px]" aria-hidden="true" />

      <div className="relative lp-container">
        <SectionHead
          kicker={features.kicker}
          title={features.title}
          titleHi={features.titleHi}
          support={features.support}
        />

        <div className="mt-14 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
          {features.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.07}>
              <article className="lp-card h-full flex flex-col">
                <span className="lp-pill-badge self-start">{item.tag}</span>
                <h3 className="lp-h3 mt-5">{item.title}</h3>
                <p className="lp-body mt-3 flex-1">{item.body}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {item.bullets.map((b) => (
                    <li
                      key={b}
                      className="lp-pill !text-xs !px-3 !py-1.5"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="w-1 h-1 rounded-full"
                        style={{ background: "var(--accent-cyan)" }}
                        aria-hidden="true"
                      />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
