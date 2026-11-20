"use client";

import { motion } from "framer-motion";
import { trackCtaClick } from "../../lib/analytics";
import { useDiagnostic } from "../DiagnosticProvider";
import { Reveal } from "../ui/primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Closing() {
  const { open } = useDiagnostic();

  return (
    <section className="relative py-10 lg:py-16" style={{ background: "#0b0d10" }}>
      <div className="lp-container">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl px-6 py-14 lg:px-16 lg:py-20 text-center"
            style={{
              background:
                "radial-gradient(90% 120% at 50% 0%, #123a52 0%, #0d222f 38%, #0f1012 78%)",
              border: "1px solid rgba(0,168,255,0.26)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.5)",
            }}
          >
            {/* Grade sutil — sem imagem vazando */}
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "70px 70px",
                maskImage:
                  "radial-gradient(ellipse at center, black 10%, transparent 72%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse at center, black 10%, transparent 72%)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute pointer-events-none left-1/2 -translate-x-1/2"
              style={{
                top: -280,
                width: 900,
                height: 460,
                borderRadius: "50%",
                background:
                  "radial-gradient(50% 50% at 50% 50%, rgba(0,168,255,0.32) 0%, rgba(0,80,200,0.12) 45%, transparent 72%)",
                filter: "blur(30px)",
              }}
              aria-hidden="true"
            />

            <div className="relative flex flex-col items-center gap-6">
              <span className="lp-label" style={{ color: "#4dc3ff" }}>
                A decisão é sua
              </span>

              <motion.h2
                initial={{ clipPath: "inset(0 0 100% 0)", y: 24, opacity: 0 }}
                whileInView={{ clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{ duration: 0.8, ease: EASE }}
                className="font-semibold"
                style={{
                  fontSize: "clamp(2rem, 4.4vw, 3.25rem)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.03em",
                  color: "var(--on-dark)",
                  maxWidth: 900,
                }}
              >
                E se o seu WhatsApp respondesse{" "}
                <span className="lp-accent">antes da sua equipe?</span>
              </motion.h2>

              <p
                className="text-base leading-relaxed sm:text-lg"
                style={{ color: "var(--on-dark-2)", maxWidth: 680 }}
              >
                Enquanto você decidir, o paciente já está conversando com outra clínica.
                Coloque a Secretária Inteligente para trabalhar por você — hoje.
              </p>

              <motion.button
                type="button"
                onClick={() => {
                  trackCtaClick("closing_final");
                  open();
                }}
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
                className="lp-btn mt-3 w-full max-w-full !whitespace-normal !px-5 !py-4 !text-sm sm:w-auto sm:!px-8 sm:!py-5 sm:!text-base"
              >
                Secretária Inteligente na minha clínica
              </motion.button>

              <p className="text-sm" style={{ color: "var(--on-dark-3)" }}>
                Sem compromisso. A gente mostra na prática.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
