"use client";

import Image from "next/image";
import { closing } from "../../lib/copy";
import { trackCtaClick } from "../../lib/analytics";
import { Reveal } from "../ui/primitives";

const WHATSAPP_URL =
  "https://wa.me/5564999877992?text=Oi!%20Vim%20pelo%20site%20da%20alwayson.ai%20e%20quero%20falar%20sobre%20a%20minha%20cl%C3%ADnica.";

export function Closing() {
  return (
    <section className="relative pt-8 pb-16 lg:pb-24">
      <div className="lp-container">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{ background: "#0f1012", minHeight: 520 }}
          >
            {/* Foto */}
            <Image
              src="/produto/foto_agendamento_grupo.png"
              alt="Atendimento do WhatsApp com consulta agendada pela IA"
              width={1074}
              height={738}
              className="absolute inset-0 w-full h-full object-cover object-right"
              style={{ opacity: 0.55 }}
              loading="lazy"
              decoding="async"
            />

            {/* Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(10,12,16,0.98) 0%, rgba(10,12,16,0.92) 40%, rgba(10,12,16,0.35) 100%)",
              }}
              aria-hidden="true"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(60% 70% at 15% 50%, rgba(0,120,255,0.18) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />

            {/* Conteúdo alinhado à esquerda — como no modelo */}
            <div className="relative flex flex-col items-start justify-center gap-6 p-8 sm:p-12 lg:p-16 min-h-[520px]">
              <span className="lp-label" style={{ color: "#4dc3ff" }}>
                Para empresas
              </span>

              <h2
                className="font-semibold"
                style={{
                  fontSize: "clamp(1.85rem, 3.6vw, 2.75rem)",
                  lineHeight: 1.14,
                  letterSpacing: "-0.025em",
                  color: "#ffffff",
                  maxWidth: 520,
                }}
              >
                Operação maior?{" "}
                <span className="lp-accent">
                  A gente desenha tudo para a sua clínica.
                </span>
              </h2>

              <p
                className="text-base leading-relaxed"
                style={{ color: "rgba(255,255,255,0.45)", maxWidth: 460 }}
              >
                {closing.line1}
              </p>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCtaClick("closing")}
                className="lp-btn mt-2"
              >
                Falar com um especialista
              </a>
              <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                Respondemos no WhatsApp. Sem compromisso.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
