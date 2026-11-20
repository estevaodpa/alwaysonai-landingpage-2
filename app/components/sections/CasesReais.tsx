"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "../ui/primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

const STEPS = [
  {
    n: "01",
    label: "Primeiro contato",
    img: "/cases/case-01.webp",
    alt: "Paciente procura a clínica fora do horário comercial",
    beneficio: "Resposta em menos de 1 minuto",
    hora: "09:45",
  },
  {
    n: "02",
    label: "Qualificação",
    img: "/cases/case-02.webp",
    alt: "Secretária confirma horário e nome da paciente",
    beneficio: "Conversa natural, do jeito da clínica",
    hora: "09:47",
  },
  {
    n: "03",
    label: "Dúvidas e valores",
    img: "/cases/case-03.webp",
    alt: "Secretária explica endereço, sinal e valores",
    beneficio: "Tira dúvidas e contorna objeções",
    hora: "09:49",
  },
  {
    n: "04",
    label: "Comprovante",
    img: "/cases/case-04.webp",
    alt: "Secretária confere o comprovante enviado",
    beneficio: "Confirma o pagamento sozinha",
    hora: "10:08",
  },
  {
    n: "05",
    label: "Agendamento",
    img: "/cases/case-05.webp",
    alt: "Consulta confirmada pela secretária de IA",
    beneficio: "Consulta marcada sem ninguém da equipe",
    hora: "11:29",
  },
];

export function CasesReais() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 82%", "end 45%"],
  });
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      className="relative pt-10 lg:pt-[40px] pb-10 lg:pb-[40px] overflow-hidden"
      style={{ background: "var(--bg-dark-2)" }}
    >
      <div
        className="absolute pointer-events-none left-1/2 top-1/3 -translate-x-1/2"
        style={{
          width: 900,
          height: 700,
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(0,120,255,0.13) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        aria-hidden="true"
      />

      <div className="relative lp-container">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center gap-5 mb-10 lg:mb-12">
          <Reveal>
            <p className="lp-label" style={{ color: "#4dc3ff" }}>
              Case real na prática
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2
              className="font-semibold"
              style={{
                fontSize: "clamp(1.9rem, 3.8vw, 2.75rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "var(--on-dark)",
                maxWidth: 820,
              }}
            >
              Do primeiro “oi” à consulta marcada.{" "}
              <span className="lp-accent">Sem ninguém da equipe.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lp-lead lp-lead-dark" style={{ maxWidth: 640 }}>
              Cada passo abaixo aconteceu de verdade no WhatsApp de uma clínica.
            </p>
          </Reveal>
        </div>

        {/* Caminho scroll-driven */}
        <div ref={trackRef} className="relative">
          {/* Linha central que se desenha */}
          <div
            className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: "rgba(255,255,255,0.1)" }}
            aria-hidden="true"
          >
            <motion.div
              className="w-full h-full"
              style={{
                scaleY: lineProgress,
                originY: 0,
                background: "linear-gradient(180deg, #00a8ff, #0050c8)",
                boxShadow: "0 0 14px rgba(0,168,255,0.6)",
              }}
            />
          </div>

          <div className="flex flex-col gap-10 lg:gap-14">
            {STEPS.map((step, i) => {
              const alignRight = i % 2 === 1;
              return (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-12% 0px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className={`relative pl-12 w-full min-w-0 max-w-full md:pl-0 md:w-[calc(50%-32px)] ${
                    alignRight ? "md:ml-auto" : "md:mr-auto"
                  }`}
                >
                  {/* Nó do caminho */}
                  <span
                    className={`absolute top-6 flex h-4 w-4 -translate-y-1/2 items-center justify-center rounded-full ${
                      alignRight
                        ? "left-[12px] md:left-[-40px]"
                        : "left-[12px] md:left-auto md:right-[-40px]"
                    }`}
                    style={{
                      background: "var(--bg-dark-2)",
                      border: "2px solid #00a8ff",
                      boxShadow: "0 0 16px rgba(0,168,255,0.5)",
                    }}
                    aria-hidden="true"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00a8ff]" />
                  </span>

                  <div
                    className="overflow-hidden rounded-2xl"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.35)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-3 px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="text-xs font-bold tabular-nums"
                          style={{ color: "#4dc3ff" }}
                        >
                          {step.n}
                        </span>
                        <span
                          className="lp-label"
                          style={{ color: "var(--on-dark-2)" }}
                        >
                          {step.label}
                        </span>
                      </div>
                      <span
                        className="rounded-full px-2.5 py-1 text-[0.6875rem] font-bold tabular-nums"
                        style={{
                          background: "rgba(0,168,255,0.12)",
                          border: "1px solid rgba(0,168,255,0.28)",
                          color: "#4dc3ff",
                        }}
                      >
                        {step.hora}
                      </span>
                    </div>

                    <div className="px-3">
                      <div
                        className="overflow-hidden rounded-xl"
                        style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        <Image
                          src={step.img}
                          alt={step.alt}
                          width={900}
                          height={600}
                          className="w-full h-auto"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </div>

                    <div className="px-5 py-5">
                      <p
                        className="font-semibold leading-snug"
                        style={{
                          fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                          color: "var(--on-dark)",
                        }}
                      >
                        {step.beneficio}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Fechamento */}
        <Reveal delay={0.1}>
          <div
            className="relative mt-12 lg:mt-16 overflow-hidden rounded-3xl px-6 py-10 lg:px-12 lg:py-14 text-center"
            style={{
              background: "linear-gradient(135deg, #0d2738 0%, #0f1012 60%)",
              border: "1px solid rgba(0,168,255,0.3)",
              boxShadow: "0 30px 90px rgba(0,0,0,0.5)",
            }}
          >
            <div
              className="absolute pointer-events-none left-1/2 top-0 -translate-x-1/2"
              style={{
                width: 700,
                height: 300,
                background:
                  "radial-gradient(50% 50% at 50% 0%, rgba(0,168,255,0.28) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
              aria-hidden="true"
            />

            <div className="relative flex flex-wrap items-center justify-center gap-3 mb-7">
              <span
                className="rounded-full px-4 py-2 text-sm font-bold tabular-nums"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "var(--on-dark-2)",
                }}
              >
                Lead entrou · 09:45
              </span>
              <span style={{ color: "#4dc3ff" }}>→</span>
              <span
                className="rounded-full px-4 py-2 text-sm font-bold tabular-nums"
                style={{
                  background: "rgba(0,168,255,0.14)",
                  border: "1px solid rgba(0,168,255,0.4)",
                  color: "#4dc3ff",
                }}
              >
                Agendado · 09:49
              </span>
            </div>

            <h3
              className="font-semibold"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 3rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.03em",
                color: "var(--on-dark)",
                maxWidth: 820,
                marginInline: "auto",
              }}
            >
              Secretária de IA responde em{" "}
              <span className="lp-accent">menos de 1 minuto</span>.
            </h3>

            <p
              className="mt-6 font-medium"
              style={{
                fontSize: "clamp(1.0625rem, 2vw, 1.35rem)",
                color: "var(--on-dark-2)",
                maxWidth: 700,
                marginInline: "auto",
              }}
            >
              Sem ela, esse agendamento não existiria.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
