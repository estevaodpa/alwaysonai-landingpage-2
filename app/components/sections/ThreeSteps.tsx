"use client";

import Image from "next/image";
import { steps } from "../../lib/copy";
import { Reveal } from "../ui/primitives";

export function ThreeSteps() {
  return (
    <section id="como-funciona" className="relative pt-16 lg:pt-[72px] pb-16 lg:pb-[72px]">
      <div className="lp-container">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center gap-5 mb-12 lg:mb-16">
          <Reveal>
            <p className="lp-label" style={{ color: "var(--on-dark-3)" }}>
              {steps.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="lp-h2" style={{ maxWidth: 1000 }}>
              {steps.title}{" "}
              <span className="lp-accent">{steps.titleHi}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lp-lead lp-lead-dark" style={{ maxWidth: 720 }}>
              {steps.support}
            </p>
          </Reveal>
        </div>

        {/* 3 colunas, gap 28px */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {steps.items.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="flex flex-col h-full">
                {/* Card claro */}
                <div
                  className="w-full overflow-hidden mb-5"
                  style={{
                    borderRadius: 16,
                    background: "#f4f5f7",
                    color: "#18191c",
                    minHeight: 300,
                  }}
                >
                  <StepVisual index={i} />
                </div>

                {/* Número + título */}
                <div className="flex items-center gap-3">
                  <span
                    className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold"
                    style={{
                      color: "#4dc3ff",
                      border: "1px solid rgba(0,168,255,0.5)",
                    }}
                  >
                    {s.n}
                  </span>
                  <h3
                    className="font-semibold"
                    style={{
                      fontSize: "1.0625rem",
                      lineHeight: 1.3,
                      letterSpacing: "-0.01em",
                      color: "var(--on-dark)",
                    }}
                  >
                    {s.title}
                  </h3>
                </div>

                <p
                  className="mt-2.5 text-sm leading-relaxed"
                  style={{ color: "var(--on-dark-3)" }}
                >
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="flex flex-col h-full min-h-[300px] p-5">
        <div className="flex items-center gap-2.5">
          <span
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "#1e9cff" }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.2 2.4h9.6v7.2a.8.8 0 0 1-.8.8H8.6l-2.6 2.4v-2.4H3.2a.8.8 0 0 1-.8-.8V3.2a.8.8 0 0 1 .8-.8Z"
                stroke="#fff"
                strokeWidth="1.3"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-sm font-semibold" style={{ color: "#18191c" }}>
            Conectar WhatsApp
          </span>
        </div>

        <div
          className="mt-4 rounded-xl px-4 py-3"
          style={{ background: "rgba(24,25,28,0.05)" }}
        >
          <div
            className="text-[0.6875rem] font-bold uppercase tracking-[0.08em]"
            style={{ color: "#6d6f74" }}
          >
            Número
          </div>
          <div className="mt-1 text-base font-semibold" style={{ color: "#18191c" }}>
            +55 64 99887-7992
          </div>
        </div>

        <div
          className="mt-2.5 rounded-xl px-4 py-3 flex items-center gap-2.5"
          style={{ background: "rgba(16,185,129,0.12)" }}
        >
          <span
            className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
            style={{ background: "#10b981" }}
          >
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path
                d="M1.5 6.2L4.4 9.1L10.5 3"
                stroke="#fff"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-sm font-medium" style={{ color: "#0b5c3b" }}>
            Conectado pela API oficial da Meta
          </span>
        </div>

        <p className="mt-3 text-sm" style={{ color: "#6d6f74" }}>
          O app no celular continua funcionando.
        </p>
      </div>
    );
  }

  if (index === 1) {
    return (
      <div className="flex flex-col h-full min-h-[300px]">
        <div className="flex-1 flex items-center justify-center p-6">
          <div
            className="w-full rounded-2xl px-4 py-4 flex items-center gap-3"
            style={{ background: "rgba(24,25,28,0.05)" }}
          >
            <span
              className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center"
              style={{ background: "#1e9cff" }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="#fff">
                <path d="M4 3.2 8.4 6 4 8.8V3.2Z" />
              </svg>
            </span>
            <div className="flex-1 min-w-0">
              <div
                className="text-sm font-medium leading-snug"
                style={{ color: "#18191c" }}
              >
                Me manda um áudio com seus serviços e preços.
              </div>
              <div
                className="mt-2 h-1 rounded-full overflow-hidden"
                style={{ background: "rgba(24,25,28,0.1)" }}
              >
                <div
                  className="h-full w-[62%] rounded-full"
                  style={{ background: "#1e9cff" }}
                />
              </div>
            </div>
            <span className="text-xs tabular-nums" style={{ color: "#6d6f74" }}>
              0:21
            </span>
          </div>
        </div>

        <div
          className="border-t px-5 py-3.5"
          style={{ borderColor: "rgba(24,25,28,0.08)" }}
        >
          <div
            className="text-[0.6875rem] font-bold uppercase tracking-[0.08em]"
            style={{ color: "#1e9cff" }}
          >
            Seus serviços
          </div>
        </div>
        <div className="px-5 pb-4 flex flex-col gap-1.5">
          {[
            ["Harmonização facial", "R$ 600"],
            ["Limpeza de pele", "R$ 180"],
            ["Avaliação", "grátis"],
          ].map(([svc, price]) => (
            <div
              key={svc}
              className="flex items-center justify-between text-sm"
              style={{ color: "#18191c" }}
            >
              <span>{svc}</span>
              <span className="font-semibold">{price}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-[300px]">
      <div className="flex-1 p-5 flex flex-col justify-end gap-2.5">
        <div
          className="self-end max-w-[85%] rounded-2xl rounded-br-md px-3.5 py-2.5 text-sm"
          style={{ background: "#d9fdd3", color: "#18191c" }}
        >
          Vocês fazem harmonização facial? Quanto custa?
        </div>
        <div
          className="max-w-[85%] rounded-2xl rounded-bl-md px-3.5 py-2.5 text-sm"
          style={{ background: "#fff", color: "#18191c", border: "1px solid rgba(24,25,28,0.08)" }}
        >
          Fazemos sim! R$ 600 por região, e a avaliação é gratuita. Quer marcar?
        </div>
        <div
          className="self-end max-w-[85%] rounded-2xl rounded-br-md px-3.5 py-2.5 text-sm"
          style={{ background: "#d9fdd3", color: "#18191c" }}
        >
          Quero! Sexta à tarde?
        </div>
      </div>
      <div className="px-5 pb-4">
        <Image
          src="/produto/leads_e_procedimentos_esteticista.png"
          alt="Leads e procedimentos da clínica"
          width={1400}
          height={805}
          className="w-full h-auto rounded-xl"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
