"use client";

import { LayoutGroup, motion } from "framer-motion";
import { dashboard } from "../../lib/copy";
import { useConversation } from "../../hooks/use-conversation";
import { RealChat } from "../product/RealChat";
import { SmartphoneFrame } from "../product/SmartphoneFrame";
import { Reveal } from "../ui/primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

const COLUMNS = [
  { title: "Novo contato", color: "#00a8ff", allow: "novo" },
  { title: "Qualificado", color: "#7878ff", allow: "qualificado" },
  { title: "Avaliação agendada", color: "#10b981", allow: "agendado" },
  { title: "Fechou", color: "#f59e0b", allow: "fechou" },
] as const;

const FILLERS: Record<string, { name: string; note: string; tag: string }[]> = {
  novo: [{ name: "Rafael Lima", note: "Perguntou sobre limpeza de pele.", tag: "Fechado" }],
  qualificado: [
    { name: "Juliana Costa", note: "Peeling. Prefere sábado de manhã.", tag: "interesse_peeling" },
  ],
  agendado: [
    { name: "Bruno Alves", note: "Avaliação qui, 10h.", tag: "Fechado" },
  ],
  fechou: [
    { name: "Carla Mendes", note: "Preenchimento labial. Pago no Pix.", tag: "Fechado" },
    { name: "Pedro Rocha", note: "Limpeza de pele, pacote 3 sessões.", tag: "Fechado" },
  ],
};

/** Em qual coluna o lead principal está, conforme o passo da conversa. */
function columnForStep(step: number): number {
  if (step <= 0) return 0;
  if (step <= 2) return 1;
  if (step === 3) return 2;
  return 3;
}

export function Dashboard() {
  const { lines, isTyping, activeCaseStep } = useConversation();
  const leadColumn = columnForStep(activeCaseStep);

  return (
    <section id="painel" className="relative pt-16 lg:pt-[72px] pb-16 lg:pb-[72px]">
      <div className="lp-container">
        <div className="flex flex-col items-center text-center gap-5 mb-12 lg:mb-16">
          <Reveal>
            <p className="lp-label" style={{ color: "var(--on-dark-3)" }}>
              {dashboard.kicker}
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="lp-h2" style={{ maxWidth: 921 }}>
              {dashboard.title}{" "}
              <span className="lp-accent">{dashboard.titleHi}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lp-lead lp-lead-dark" style={{ maxWidth: 700 }}>
              {dashboard.support}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.14}>
          <LayoutGroup id="crm">
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6 lg:gap-8 items-center">
              {/* Celular com a conversa */}
              <div
                className="mx-auto"
                style={{ zoom: 0.84 }}
              >
                <SmartphoneFrame>
                  <RealChat lines={lines} isTyping={isTyping} />
                </SmartphoneFrame>
              </div>

              {/* Janela do CRM */}
              <div
                className="overflow-hidden"
                style={{
                  borderRadius: 16,
                  background: "#f7f8fa",
                  border: "1px solid rgba(255,255,255,0.14)",
                  boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
                }}
              >
                {/* Barra do navegador */}
                <div
                  className="flex items-center gap-3 px-4 py-3"
                  style={{ background: "#e8eaee", borderBottom: "1px solid #d8dbe0" }}
                >
                  <div className="flex items-center gap-1.5">
                    {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                      <span
                        key={c}
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                  <div
                    className="flex flex-1 items-center gap-2 rounded-md px-3 py-1.5 text-xs"
                    style={{ background: "#fff", color: "#6d6f74" }}
                  >
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <rect x="2.5" y="5.3" width="7" height="5.2" rx="1.2" stroke="#9ba1ac" strokeWidth="1.1" />
                      <path d="M4 5.3V3.8a2 2 0 0 1 4 0v1.5" stroke="#9ba1ac" strokeWidth="1.1" />
                    </svg>
                    app.alwayson.ai/kanban
                  </div>
                </div>

                {/* Cabeçalho do app */}
                <div
                  className="flex items-center justify-between px-5 py-4"
                  style={{ background: "#fff", borderBottom: "1px solid #e8eaee" }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="flex h-6 w-6 items-center justify-center rounded-md text-[0.625rem] font-bold"
                      style={{ background: "linear-gradient(135deg,#1e9cff,#0050c8)", color: "#fff" }}
                    >
                      a
                    </span>
                    <span className="text-sm font-bold" style={{ color: "#18191c" }}>
                      Kanban
                    </span>
                  </div>
                  <span
                    className="rounded-md px-3 py-1.5 text-[0.6875rem] font-medium"
                    style={{ background: "#f2f4f7", color: "#2f3238" }}
                  >
                    Funil de vendas ▾
                  </span>
                </div>

                {/* Colunas */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 p-3">
                  {COLUMNS.map((col, i) => {
                    const isLeadHere = leadColumn === i;
                    return (
                      <div
                        key={col.title}
                        className="rounded-lg p-2.5"
                        style={{
                          background: "#f0f2f5",
                          border: isLeadHere ? "1px solid rgba(0,168,255,0.5)" : "1px solid transparent",
                          minHeight: 330,
                        }}
                      >
                        <div className="mb-2.5 flex items-center justify-between gap-1 px-0.5">
                          <div className="flex items-center gap-1.5">
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ background: col.color }}
                            />
                            <span
                              className="text-[0.6875rem] font-bold"
                              style={{ color: "#2f3238" }}
                            >
                              {col.title}
                            </span>
                          </div>
                          <span
                            className="rounded px-1.5 text-[0.625rem] font-bold tabular-nums"
                            style={{ background: "#e4e7ec", color: "#6d6f74" }}
                          >
                            {FILLERS[col.allow].length + (isLeadHere ? 1 : 0)}
                          </span>
                        </div>

                        <div className="flex flex-col gap-2">
                          {/* Card principal que se move entre colunas */}
                          {isLeadHere && (
                            <motion.div
                              layoutId="lead-card"
                              transition={{ duration: 0.6, ease: EASE }}
                              className="rounded-lg bg-white p-2.5"
                              style={{
                                border: "2px solid #00a8ff",
                                boxShadow: "0 6px 20px rgba(0,120,255,0.18)",
                              }}
                            >
                              <div className="flex items-start gap-2">
                                <span
                                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-bold"
                                  style={{ background: "#dbeafe", color: "#0050c8" }}
                                >
                                  MB
                                </span>
                                <span className="text-[0.75rem] font-bold leading-tight" style={{ color: "#18191c" }}>
                                  Márcio Barbosa
                                </span>
                              </div>
                              <p className="mt-2 text-[0.6875rem] leading-snug" style={{ color: "#6d6f74" }}>
                                {activeCaseStep <= 0
                                  ? "Chegou pelo WhatsApp agora."
                                  : activeCaseStep <= 2
                                    ? "Interesse em implante. Dados confirmados."
                                    : activeCaseStep === 3
                                      ? "Valor explicado. Aguardando horário."
                                      : "Avaliação agendada · 18/09 · 08h"}
                              </p>
                              <div className="mt-2 flex items-center justify-between gap-1">
                                <span className="flex items-center gap-0.5">
                                  <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                                  <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                                  <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                                </span>
                                <span
                                  className="rounded px-1.5 py-0.5 text-[0.5625rem] font-semibold"
                                  style={{
                                    background: activeCaseStep >= 3 ? "#dcfce7" : "#e0f2fe",
                                    color: activeCaseStep >= 3 ? "#166534" : "#0050c8",
                                  }}
                                >
                                  {activeCaseStep >= 3 ? "Agente de IA" : "Novo"}
                                </span>
                              </div>
                            </motion.div>
                          )}

                          {FILLERS[col.allow].map((c) => (
                            <div
                              key={c.name}
                              className="rounded-lg bg-white p-2.5"
                              style={{ border: "1px solid #e8eaee" }}
                            >
                              <div className="flex items-start gap-2">
                                <span
                                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[0.625rem] font-bold"
                                  style={{ background: "#eef0f3", color: "#6d6f74" }}
                                >
                                  {c.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                                </span>
                                <span className="text-[0.75rem] font-bold leading-tight" style={{ color: "#18191c" }}>
                                  {c.name}
                                </span>
                              </div>
                              <p className="mt-2 text-[0.6875rem] leading-snug" style={{ color: "#6d6f74" }}>
                                {c.note}
                              </p>
                              <div className="mt-2 flex items-center justify-between">
                                <span className="flex items-center gap-0.5">
                                  <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                                  <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                                </span>
                                <span className="text-[0.5625rem] text-gray-400">{c.tag}</span>
                              </div>
                            </div>
                          ))}

                          <div
                            className="rounded-lg px-2 py-1.5 text-center text-[0.6875rem]"
                            style={{ border: "1px dashed #d8dbe0", color: "#9ba1ac" }}
                          >
                            + Adicionar cartão
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </LayoutGroup>
        </Reveal>
      </div>
    </section>
  );
}
