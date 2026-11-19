"use client";

import Image from "next/image";
import { features } from "../../lib/copy";
import { Reveal } from "../ui/primitives";
import { CaseReal } from "./CaseReal";
import { DynamicWord } from "../product/DynamicWord";

/** Card com borda gradiente — técnica do modelo (padding 1px + gradiente). */
function Frame({
  children,
  tone = "neutral",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "brand";
  className?: string;
}) {
  return (
    <div
      className={`flex h-full w-full ${className}`}
      style={{
        padding: 1,
        borderRadius: 16,
        background:
          tone === "brand"
            ? "linear-gradient(135deg, #1e9cff 0%, #0050c8 100%)"
            : "linear-gradient(180deg, #2a2d32 0%, #1c1e22 25%)",
      }}
    >
      <div
        className="flex h-full w-full flex-col overflow-hidden"
        style={{ borderRadius: 15, background: "#18191c" }}
      >
        {children}
      </div>
    </div>
  );
}

/** Bloco claro aninhado — como no modelo (fundo creme dentro do card escuro). */
function LightPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`w-full overflow-hidden ${className}`}
      style={{
        borderRadius: 14,
        background: "#f4f5f7",
        color: "#18191c",
      }}
    >
      {children}
    </div>
  );
}

export function Features() {
  return (
    <section id="recursos" className="relative pt-16 lg:pt-[72px] pb-16 lg:pb-[72px]">
      <div className="lp-container">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center gap-5 mb-10 lg:mb-14">
          <Reveal>
            <p className="lp-label" style={{ color: "var(--on-dark-3)" }}>
              {features.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="lp-h2" style={{ maxWidth: 774 }}>
              {features.title}{" "}
              <span className="lp-accent">{features.titleHi}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className="text-lg sm:text-xl font-medium"
              style={{ color: "var(--on-dark-2)" }}
            >
              <DynamicWord />
            </div>
          </Reveal>
        </div>

        {/* Mosaico — 4 colunas × 2 linhas, gap 12px */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* A — 2×2, Case Real */}
          <Reveal className="md:col-span-2 lg:row-span-2">
            <Frame>
              <div className="h-full p-5">
                <CaseReal />
              </div>
            </Frame>
          </Reveal>

          {/* B — coluna 3, linha 1 */}
          <Reveal className="lg:col-start-3 lg:row-start-1">
            <Frame>
              <div className="flex flex-col gap-3 p-5 h-full">
                <div>
                  <span className="lp-label" style={{ color: "var(--on-dark-3)" }}>
                    {features.items[1].tag}
                  </span>
                  <h3
                    className="mt-2.5 font-semibold"
                    style={{
                      fontSize: "1.125rem",
                      lineHeight: 1.25,
                      letterSpacing: "-0.015em",
                      color: "var(--on-dark)",
                    }}
                  >
                    {features.items[1].title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed"
                    style={{ color: "var(--on-dark-3)" }}
                  >
                    {features.items[1].body}
                  </p>
                </div>

                <div className="flex flex-col gap-2 mt-auto">
                  <div
                    className="rounded-xl px-3.5 py-2.5"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <span className="lp-label" style={{ color: "var(--on-dark-3)" }}>
                      IA genérica
                    </span>
                    <p
                      className="mt-1.5 text-xs leading-relaxed"
                      style={{ color: "var(--on-dark-3)" }}
                    >
                      “Entre em contato com nossa equipe para verificar as condições
                      disponíveis.”
                    </p>
                  </div>
                  <div
                    className="rounded-xl px-3.5 py-2.5"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(0,80,200,0.22) 0%, rgba(0,168,255,0.14) 100%)",
                      border: "1px solid rgba(0,168,255,0.3)",
                    }}
                  >
                    <span className="lp-label" style={{ color: "#4dc3ff" }}>
                      Personalizada
                    </span>
                    <p
                      className="mt-1.5 text-xs leading-relaxed"
                      style={{ color: "var(--on-dark)" }}
                    >
                      “Sim! Pode ser parcelado em até 10x sem juros. Quer uma simulação?”
                    </p>
                  </div>
                </div>
              </div>
            </Frame>
          </Reveal>

          {/* D — coluna 3, linha 2 */}
          <Reveal className="lg:col-start-3 lg:row-start-2">
            <Frame>
              <div className="flex flex-col gap-3 p-5 h-full">
                <div>
                  <span className="lp-label" style={{ color: "var(--on-dark-3)" }}>
                    {features.items[3].tag}
                  </span>
                  <h3
                    className="mt-2.5 font-semibold"
                    style={{
                      fontSize: "1.125rem",
                      lineHeight: 1.25,
                      letterSpacing: "-0.015em",
                      color: "var(--on-dark)",
                    }}
                  >
                    {features.items[3].title}
                  </h3>
                </div>
                <LightPanel className="mt-auto">
                  <Image
                    src="/produto/numeros_atendimentos.png"
                    alt="Atendimentos iniciados, agendamentos gerados e taxa de conversão"
                    width={1400}
                    height={468}
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                  />
                </LightPanel>
              </div>
            </Frame>
          </Reveal>

          {/* C — coluna 4, 2 linhas, borda azul */}
          <Reveal className="lg:col-start-4 lg:row-span-2">
            <Frame tone="brand">
              <div className="flex flex-col gap-4 p-5 h-full">
                <div>
                  <span className="lp-label" style={{ color: "rgba(255,255,255,0.6)" }}>
                    {features.items[2].tag}
                  </span>
                  <h3
                    className="mt-2.5 font-semibold"
                    style={{
                      fontSize: "1.125rem",
                      lineHeight: 1.25,
                      letterSpacing: "-0.015em",
                      color: "var(--on-dark)",
                    }}
                  >
                    {features.items[2].title}
                  </h3>
                </div>

                {/* Fluxo vertical — mecanismo do modelo */}
                <div className="flex flex-1 flex-col justify-center gap-0">
                  {features.flow.map((s, i) => (
                    <div key={s.label} className="flex flex-col items-center">
                      <div
                        className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5"
                        style={{
                          background: "rgba(255,255,255,0.08)",
                          border: "1px solid rgba(255,255,255,0.12)",
                        }}
                      >
                        <span
                          className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.18)" }}
                        >
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path
                              d="M1.5 5.2L3.8 7.5L8.5 2.8"
                              stroke="#fff"
                              strokeWidth="1.6"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <span
                          className="text-[0.8125rem] font-medium leading-tight"
                          style={{ color: "#fff" }}
                        >
                          {s.label}
                        </span>
                      </div>
                      {i < features.flow.length - 1 && (
                        <span
                          className="w-px h-6"
                          style={{ background: "rgba(255,255,255,0.35)" }}
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  ))}
                </div>

                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {features.items[2].body}
                </p>
              </div>
            </Frame>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
