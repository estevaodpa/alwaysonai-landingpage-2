"use client";

import { marquee } from "../../lib/copy";
import { Reveal } from "../ui/primitives";

export function LogoMarquee() {
  const items = [...marquee.names, ...marquee.names];

  return (
    <section className="relative pt-4 pb-10 lg:pb-16">
      <div className="lp-container flex flex-col items-center gap-6" style={{ maxWidth: 850 }}>
        <Reveal>
          <p
            className="text-center font-semibold"
            style={{ fontSize: "1rem", color: "#18191c" }}
          >
            {marquee.headline}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="lp-marquee w-full">
            <div className="lp-marquee-track">
              {items.map((name, i) => (
                <div
                  key={`${name}-${i}`}
                  className="flex items-center gap-10 lg:gap-16 px-8 lg:px-12 shrink-0"
                >
                  <span
                    className="text-base lg:text-xl font-bold whitespace-nowrap"
                    style={{ color: "#2f3238", opacity: 0.55 }}
                  >
                    {name}
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "#00a8ff" }}
                    aria-hidden="true"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
