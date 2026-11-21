"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  buildSteps,
  diagnosticQuestions,
  drainProgressSaves,
  enqueueProgressSave,
  sendDiagnosticToN8n,
  diagnosticConfig,
  type Option,
} from "../lib/diagnostic";
import { diagnosticUi } from "../lib/copy";
import {
  trackDiagnosticComplete,
  trackDiagnosticStart,
  trackWhatsAppClick,
} from "../lib/analytics";

const EASE = [0.16, 1, 0.3, 1] as const;
const WHITE = "#ffffff";
const CYAN = "#4dc3ff";

type Phase = "intro" | "questions" | "contact" | "final";

function maskPhone(value: string): string {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0) return "";
  if (d.length <= 2) return `(${d}`;
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function phoneValid(value: string): boolean {
  return value.replace(/\D/g, "").length >= 10;
}

function createLeadId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

const LOG_LABELS: Record<string, string> = {
  marketing: "marketing",
  marketing_channels: "canais",
  volume: "contatos/dia",
  atendimento: "atendimento",
  dor: "dor",
  estrutura: "unidades",
  faturamento: "faturamento",
  momento: "momento",
};

function LogReadout({ answers }: { answers: Record<string, string | string[]> }) {
  const entries = Object.entries(answers).filter(
    ([key, value]) => key !== `${key}_custom` && value !== undefined && value !== "",
  );
  if (!entries.length) return null;

  return (
    <div
      className="rounded-xl px-3.5 py-2.5 font-mono text-[0.6875rem] leading-relaxed"
      style={{
        background: "rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.05)",
        color: "rgba(77,195,255,0.65)",
      }}
      aria-live="polite"
    >
      {entries.slice(-4).map(([key, value]) => (
        <div key={key} className="truncate">
          <span style={{ color: "rgba(255,255,255,0.25)" }}>&gt; </span>
          {LOG_LABELS[key] ?? key} ={" "}
          <span style={{ color: "rgba(255,255,255,0.75)" }}>
            {Array.isArray(value) ? value.join(", ") : value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function DiagnosticModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [customText, setCustomText] = useState("");
  const [stepIdx, setStepIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [contact, setContact] = useState({ name: "", clinic: "", whatsapp: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const leadRef = useRef<{ id: string; createdAt: string }>({ id: "", createdAt: "" });
  const saveSeqRef = useRef(0);

  const steps = useMemo(() => buildSteps(answers), [answers]);
  const current = steps[stepIdx];
  const q = current?.q;
  const primaryTotal = diagnosticQuestions.length;

  useEffect(() => {
    leadRef.current = { id: createLeadId(), createdAt: new Date().toISOString() };
  }, []);

  const queueProgressSave = (
    etapa: string,
    snapshot: Record<string, string | string[]>,
  ) => {
    if (!leadRef.current.id) return;
    saveSeqRef.current += 1;
    enqueueProgressSave(
      leadRef.current.id,
      snapshot,
      { name: "", clinic: "", whatsapp: "" },
      {
        status: "em_andamento",
        etapa,
        save_seq: saveSeqRef.current,
        criado_em: leadRef.current.createdAt,
        atualizado_em: new Date().toISOString(),
      },
    );
  };

  const goBack = () => {
    if (phase === "contact") {
      setPhase("questions");
      setStepIdx(steps.length - 1);
      return;
    }
    if (phase === "questions" && stepIdx === 0) {
      setPhase("intro");
      return;
    }
    if (stepIdx > 0) {
      setDirection(-1);
      setStepIdx(stepIdx - 1);
    }
  };

  const advanceFromCurrent = () => {
    if (!q) return;
    const snapshot = { ...answers };
    if (q.hasCustomText && customText.trim()) {
      snapshot[`${q.id}_custom`] = customText.trim();
    }
    const newSteps = buildSteps(snapshot);
    const pos = newSteps.findIndex((s) => s.q.id === q.id);
    queueProgressSave(q.id, snapshot);
    setDirection(1);
    setCustomText("");
    const nextIdx = pos + 1;
    if (nextIdx >= newSteps.length) {
      window.setTimeout(() => setPhase("contact"), 180);
    } else {
      setStepIdx(nextIdx);
    }
  };

  const selectOption = (option: Option) => {
    if (!q) return;
    const qid = q.id;

    if (q.type === "multi") {
      const arr = Array.isArray(answers[qid]) ? (answers[qid] as string[]) : [];
      const next = arr.includes(option.value)
        ? arr.filter((v) => v !== option.value)
        : [...arr, option.value];
      setAnswers((prev) => ({ ...prev, [qid]: next }));
      return;
    }

    if (q.hasCustomText && option.value === "outro") {
      setAnswers((prev) => ({ ...prev, [qid]: option.value }));
      return;
    }

    const newAnswers = { ...answers, [qid]: option.value };
    const newSteps = buildSteps(newAnswers);
    const pos = newSteps.findIndex((s) => s.q.id === qid);
    setAnswers(newAnswers);
    setDirection(1);
    queueProgressSave(qid, newAnswers);
    const nextIdx = pos + 1;
    if (nextIdx >= newSteps.length) {
      window.setTimeout(() => setPhase("contact"), 180);
    } else {
      window.setTimeout(() => setStepIdx(nextIdx), 180);
    }
  };

  const submitContact = async () => {
    if (!contact.name.trim() || !contact.clinic.trim() || !phoneValid(contact.whatsapp))
      return;
    setSubmitting(true);
    setSubmitError(false);
    await drainProgressSaves(leadRef.current.id, 4000);
    saveSeqRef.current += 1;
    const finishedAt = new Date().toISOString();
    const result = await sendDiagnosticToN8n(answers, contact, leadRef.current.id, {
      status: "concluido",
      etapa: "concluido",
      save_seq: saveSeqRef.current,
      criado_em: leadRef.current.createdAt || finishedAt,
      atualizado_em: finishedAt,
    });
    setSubmitting(false);
    if (result.ok) {
      trackDiagnosticComplete();
      setPhase("final");
    } else {
      setSubmitError(true);
    }
  };

  const whatsappUrl = `https://wa.me/${diagnosticConfig.whatsappNumber}?text=${encodeURIComponent(
    diagnosticConfig.whatsappMessage,
  )}`;

  const progress =
    phase === "final"
      ? 1
      : phase === "contact"
        ? steps.length / (steps.length + 1)
        : (stepIdx + 1) / (steps.length + 1);

  const selectedValue = q ? answers[q.id] : undefined;
  const selectedArr = Array.isArray(selectedValue) ? (selectedValue as string[]) : [];
  const isCustomOpen = Boolean(q?.hasCustomText && selectedArr.includes("outro"));
  const isMulti = q?.type === "multi";
  const canContinue =
    isMulti && selectedArr.length > 0 && (!isCustomOpen || customText.trim().length > 0);

  const optionStyle = (selected: boolean) => ({
    borderColor: selected ? "rgba(0,168,255,0.55)" : "rgba(255,255,255,0.09)",
    background: selected ? "rgba(0,168,255,0.10)" : "rgba(255,255,255,0.02)",
    color: selected ? CYAN : WHITE,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={phase === "intro" ? onClose : undefined}
            aria-hidden="true"
          />

          <div className="absolute inset-0 flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative w-full max-w-[560px] h-[94dvh] sm:h-auto sm:max-h-[92dvh] rounded-3xl border flex flex-col overflow-hidden"
              style={{
                background: "linear-gradient(180deg, #0a0e17 0%, #070b14 100%)",
                borderColor: "rgba(255,255,255,0.1)",
                boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Diagnóstico de elegibilidade"
            >
              {/* Cabeçalho */}
              <div className="shrink-0 px-6 pt-6 pb-4">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="lp-label" style={{ color: "rgba(77,195,255,0.8)" }}>
                    {diagnosticUi.kicker}
                  </span>
                  <button
                    onClick={onClose}
                    aria-label="Fechar diagnóstico"
                    className="flex h-8 w-8 items-center justify-center rounded-lg transition-colors"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3.5 3.5l9 9m0-9l-9 9"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                {phase !== "intro" && (
                  <>
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <button
                        onClick={goBack}
                        className="text-xs font-medium px-2 py-1 -ml-2 rounded-lg"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      >
                        ← Voltar
                      </button>
                      <span
                        className="text-xs font-medium tabular-nums"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                      >
                        {phase === "final"
                          ? "Análise concluída"
                          : phase === "contact"
                            ? "Identificação"
                            : `Etapa ${(current?.primaryIndex ?? 0) + 1} de ${primaryTotal}`}
                      </span>
                    </div>
                    <div
                      className="h-px w-full overflow-hidden rounded-full"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #0050c8, #00a8ff)" }}
                        initial={false}
                        animate={{ width: `${Math.max(4, progress * 100)}%` }}
                        transition={{ duration: 0.5, ease: EASE }}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Corpo */}
              <div className="flex-1 overflow-y-auto px-6 pb-8 chat-scroll">
                {/* Intro */}
                {phase === "intro" && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="py-4"
                  >
                    <h2
                      className="font-semibold"
                      style={{
                        fontSize: "1.5rem",
                        lineHeight: 1.25,
                        letterSpacing: "-0.02em",
                        color: WHITE,
                      }}
                    >
                      {diagnosticUi.introTitle}
                    </h2>
                    <p
                      className="mt-4 text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      {diagnosticUi.introSupport}
                    </p>
                    <p
                      className="mt-4 text-xs"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {diagnosticUi.introMeta}
                    </p>
                    <button
                      onClick={() => {
                        trackDiagnosticStart();
                        setPhase("questions");
                      }}
                      className="lp-btn mt-8 w-full"
                    >
                      {diagnosticUi.startLabel}
                    </button>
                  </motion.div>
                )}

                {/* Perguntas */}
                {phase === "questions" && q && (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, x: direction * 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.32, ease: EASE }}
                  >
                    <h3
                      className="font-semibold"
                      style={{
                        fontSize: "1.375rem",
                        lineHeight: 1.28,
                        letterSpacing: "-0.015em",
                        color: WHITE,
                      }}
                    >
                      {q.prompt}
                    </h3>
                    {q.subtext && (
                      <p
                        className="mt-2 text-xs"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      >
                        {q.subtext}
                      </p>
                    )}

                    <div className="mt-6 flex flex-col gap-2.5">
                      {q.options?.map((o, i) => {
                        const selected = Array.isArray(selectedValue)
                          ? (selectedValue as string[]).includes(o.value)
                          : selectedValue === o.value;
                        return (
                          <button
                            key={o.value}
                            onClick={() => selectOption(o)}
                            className="w-full text-left px-5 py-3.5 rounded-2xl font-medium transition-all duration-200"
                            style={optionStyle(selected)}
                          >
                            <span className="mr-3 text-xs opacity-40 tabular-nums">
                              {i + 1}
                            </span>
                            {o.label}
                          </button>
                        );
                      })}
                    </div>

                    {isCustomOpen && (
                      <textarea
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder={q.customLabel ?? "Conte para a gente"}
                        rows={3}
                        className="mt-3 w-full px-4 py-3 rounded-2xl border outline-none font-medium resize-none"
                        style={{
                          borderColor: "rgba(255,255,255,0.12)",
                          background: "rgba(255,255,255,0.02)",
                          color: WHITE,
                          fontSize: "16px",
                        }}
                      />
                    )}

                    {isMulti && (
                      <button
                        onClick={advanceFromCurrent}
                        disabled={!canContinue}
                        className="lp-btn mt-6 w-full disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Continuar
                      </button>
                    )}

                    <div className="mt-6">
                      <LogReadout answers={answers} />
                    </div>
                  </motion.div>
                )}

                {/* Contato */}
                {phase === "contact" && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <h3
                      className="font-semibold"
                      style={{
                        fontSize: "1.25rem",
                        lineHeight: 1.3,
                        letterSpacing: "-0.015em",
                        color: WHITE,
                      }}
                    >
                      {diagnosticUi.contactTitle}
                    </h3>
                    <p
                      className="mt-2 text-xs"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {diagnosticUi.contactSupport}
                    </p>

                    <div className="mt-6 flex flex-col gap-4">
                      {[
                        {
                          label: "Seu Nome",
                          value: contact.name,
                          onChange: (v: string) => setContact((c) => ({ ...c, name: v })),
                          placeholder: "Seu nome",
                          autoComplete: "name",
                        },
                        {
                          label: "Nome da clínica",
                          value: contact.clinic,
                          onChange: (v: string) => setContact((c) => ({ ...c, clinic: v })),
                          placeholder: "Nome da clínica",
                          autoComplete: "organization",
                        },
                        {
                          label: "WhatsApp",
                          value: contact.whatsapp,
                          onChange: (v: string) =>
                            setContact((c) => ({ ...c, whatsapp: maskPhone(v) })),
                          placeholder: "(00) 00000-0000",
                          autoComplete: "tel",
                        },
                      ].map((field) => (
                        <div key={field.label}>
                          <label
                            className="block text-xs font-medium tracking-wide mb-2"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                          >
                            {field.label}
                          </label>
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) => field.onChange(e.target.value)}
                            placeholder={field.placeholder}
                            autoComplete={field.autoComplete}
                            className="w-full px-4 py-3 rounded-xl border bg-transparent outline-none font-medium"
                            style={{
                              borderColor: "rgba(255,255,255,0.12)",
                              color: WHITE,
                              fontSize: "16px",
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {submitError && (
                      <p className="mt-4 text-sm" style={{ color: "#fca5a5" }} role="alert">
                        Não foi possível concluir a análise. Tente novamente.
                      </p>
                    )}

                    <button
                      onClick={submitContact}
                      disabled={
                        !contact.name.trim() ||
                        !contact.clinic.trim() ||
                        !phoneValid(contact.whatsapp) ||
                        submitting
                      }
                      className="lp-btn mt-7 w-full disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Processando…" : diagnosticUi.finishLabel}
                    </button>
                  </motion.div>
                )}

                {/* Final */}
                {phase === "final" && (
                  <motion.div
                    key="final"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="text-center py-4"
                  >
                    <span
                      className="inline-flex h-12 w-12 items-center justify-center rounded-full"
                      style={{
                        background: "rgba(0,168,255,0.12)",
                        border: "1px solid rgba(0,168,255,0.35)",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="22" height="22" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3 8.4 6.3 11.7 13 5"
                          stroke="#4dc3ff"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <h3
                      className="mt-5 font-semibold"
                      style={{
                        fontSize: "1.5rem",
                        letterSpacing: "-0.02em",
                        color: WHITE,
                      }}
                    >
                      {diagnosticUi.finalTitle}
                    </h3>
                    <p
                      className="mt-3 text-sm leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      {diagnosticUi.finalText}
                    </p>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackWhatsAppClick();
                        onClose();
                      }}
                      className="lp-btn mt-8 w-full"
                    >
                      {diagnosticUi.whatsappLabel}
                    </a>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
