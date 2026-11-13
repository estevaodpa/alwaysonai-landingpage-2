"use client";

import { closing } from "../../lib/copy";
import { trackCtaClick } from "../../lib/analytics";
import { Reveal, Segs } from "../ui/primitives";

const WHATSAPP_URL =
  "https://wa.me/5564999877992?text=Oi!%20Vim%20pelo%20site%20da%20alwayson.ai%20e%20quero%20falar%20sobre%20a%20minha%20cl%C3%ADnica.";

export function Closing() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--bg-lift) 0%, var(--bg-base) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 10%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 10%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px]"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(0,120,255,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      <div className="relative lp-container py-24 lg:py-32 text-center">
        <Reveal>
          <p
            className="font-medium"
            style={{
              fontSize: "clamp(1.25rem, 2.2vw, 1.6rem)",
              lineHeight: 1.45,
              color: "var(--text-primary)",
            }}
          >
            {closing.line1}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            className="mt-5 font-semibold"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 3.25rem)",
              lineHeight: 1.12,
              letterSpacing: "-0.025em",
              color: "var(--text-primary)",
              maxWidth: 820,
              marginInline: "auto",
            }}
          >
            <Segs segs={closing.line2} />
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-12 flex flex-col items-center gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCtaClick("closing")}
              className="lp-btn-primary"
            >
              FALAR COM UM ESPECIALISTA
            </a>
            <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
              Respondemos no WhatsApp. Sem compromisso.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
