"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "../ui/primitives";
import { useDiagnostic } from "../DiagnosticProvider";
import { trackCtaClick } from "../../lib/analytics";

const EASE = [0.16, 1, 0.3, 1] as const;

const BENEFITS = [
  { title: "Agenda sempre atualizada", detail: "Cada consulta marcada no WhatsApp entra na agenda automaticamente." },
  { title: "Sem copiar informação", detail: "Ninguém precisa anotar nome, horário ou procedimento na mão." },
  { title: "Você vê a semana inteira", detail: "Tudo organizado por dia e horário, com o procedimento de cada paciente." },
];

export function AgendaIntegrada() {
  const { open } = useDiagnostic();

  return (
    <section id="agenda" className="relative pt-10 lg:pt-[40px] pb-10 lg:pb-[40px]">
      <div className="lp-container">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center gap-5 mb-10">
          <Reveal>
            <p className="lp-label" style={{ color: "var(--on-dark-3)" }}>
              Agenda integrada
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="lp-h2" style={{ maxWidth: 860 }}>
              A consulta marcada entra na agenda{" "}
              <span className="lp-accent">da sua clínica.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lp-lead lp-lead-dark" style={{ maxWidth: 700 }}>
              Não fica só na conversa. O horário é registrado no sistema, com o nome do
              paciente e o procedimento — pronto para a equipe ver.
            </p>
          </Reveal>
        </div>

        {/* Corpo */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Imagem da agenda em moldura */}
          <Reveal>
            <div
              className="relative rounded-2xl p-px"
              style={{
                background:
                  "linear-gradient(135deg, #1e9cff 0%, #0050c8 45%, rgba(255,255,255,0.1) 100%)",
                boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
              }}
            >
              <div className="overflow-hidden rounded-2xl" style={{ background: "#fff" }}>
                <Image
                  src="/produto/agenda-integrada.webp"
                  alt="Agenda da clínica com consultas agendadas ao longo da semana"
                  width={1111}
                  height={512}
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Card flutuante de confirmação */}
              <motion.div
                initial={{ opacity: 0, y: 20, x: -10 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
                className="absolute -bottom-6 -right-2 sm:-right-6 rounded-xl px-4 py-3"
                style={{
                  background: "rgba(16,22,30,0.96)",
                  border: "1px solid rgba(0,168,255,0.45)",
                  boxShadow: "0 18px 50px rgba(0,0,0,0.5)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{ background: "rgba(16,185,129,0.16)" }}
                  >
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 8.4 6.3 11.7 13 5"
                        stroke="#34d399"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <div>
                    <div
                      className="text-xs font-bold"
                      style={{ color: "var(--on-dark)" }}
                    >
                      Consulta agendada
                    </div>
                    <div className="text-[0.6875rem]" style={{ color: "var(--on-dark-3)" }}>
                      18/09 · 08h · Dr. Henrique
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* Texto + benefícios + CTA */}
          <div className="flex flex-col gap-6">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={0.08 + i * 0.08}>
                <div className="flex gap-4">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                    style={{
                      background: "rgba(0,168,255,0.12)",
                      border: "1px solid rgba(0,168,255,0.3)",
                      color: "#4dc3ff",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div
                      className="font-semibold"
                      style={{ fontSize: "1.0625rem", color: "var(--on-dark)" }}
                    >
                      {b.title}
                    </div>
                    <p
                      className="mt-1.5 text-sm leading-relaxed"
                      style={{ color: "var(--on-dark-3)" }}
                    >
                      {b.detail}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={0.36}>
              <button
                type="button"
                onClick={() => {
                  trackCtaClick("agenda_integrada");
                  open();
                }}
                className="lp-btn mt-2 w-fit"
              >
                Ver a agenda funcionando
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
