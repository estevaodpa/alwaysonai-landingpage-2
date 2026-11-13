"use client";

import { marquee } from "../../lib/copy";
import { Reveal } from "../ui/primitives";

export function LogoMarquee() {
  const items = [...marquee.names, ...marquee.names];

  return (
    <section
      className="relative py-14 lg:py-16"
      style={{ background: "var(--bg-body)" }}
    >
      <div className="lp-container">
        <Reveal>
          <p
            className="text-center text-sm font-medium"
            style={{ color: "var(--text-tertiary)" }}
          >
            {marquee.headline}
          </p>
        </Reveal>
      </div>

      <div className="lp-marquee mt-8">
        <div className="lp-marquee-track">
          {items.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-10 lg:gap-16 px-10 shrink-0"
            >
              <span
                className="text-base lg:text-lg font-semibold whitespace-nowrap"
                style={{ color: "rgba(255,255,255,0.34)" }}
              >
                {name}
              </span>
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "rgba(0,168,255,0.35)" }}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
