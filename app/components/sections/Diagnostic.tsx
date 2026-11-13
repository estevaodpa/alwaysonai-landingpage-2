"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  buildSteps,
  diagnosticConfig,
  diagnosticQuestions,
  drainProgressSaves,
  enqueueProgressSave,
  sendDiagnosticToN8n,
  type Option,
} from "../../lib/diagnostic";
import { diagnostic } from "../../lib/copy";
import {
  trackCtaClick,
  trackDiagnosticComplete,
  trackDiagnosticStart,
  trackWhatsAppClick,
} from "../../lib/analytics";
import { Reveal, Section } from "../ui/primitives";

const EASE = [0.16, 1, 0.3, 1] as const;
const CYAN = "#4dc3ff";
const WHITE = "#ffffff";

// ── Helpers (idênticos ao site alwayson.ai) ─────────────────────────────────
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

// Gerador de identidade do lead — fora do componente para manter a
// renderização pura (regra react-hooks/purity).
function createLeadId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `lead-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

type Phase = "intro" | "questions" | "contact" | "final";

export function Diagnostic() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [customText, setCustomText] = useState("");
  const [stepIdx, setStepIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [contact, setContact] = useState({ name: "", clinic: "", whatsapp: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const leadRef = useRef<{ id: string; createdAt: string }>({
    id: "",
    createdAt: "",
  });
  const saveSeqRef = useRef(0);

  // A identidade do lead nasce no mount — antes de qualquer interação.
  useEffect(() => {
    leadRef.current = { id: createLeadId(), createdAt: new Date().toISOString() };
  }, []);

  const steps = useMemo(() => buildSteps(answers), [answers]);
  const current = steps[stepIdx];
  const q = current?.q;
  const primaryTotal = diagnosticQuestions.length;

  // Salvamento progressivo: não bloqueia o quiz e não envia PII parcial.
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
    const nextIdx = pos + 1;
    if (nextIdx >= newSteps.length) {
      window.setTimeout(() => setPhase("contact"), 180);
    } else {
      setStepIdx(nextIdx);
    }
    setCustomText("");
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
    const result = await sendDiagnosticToN8n(
      answers,
      contact,
      leadRef.current.id,
      {
        status: "concluido",
        etapa: "concluido",
        save_seq: saveSeqRef.current,
        criado_em: leadRef.current.createdAt || finishedAt,
        atualizado_em: finishedAt,
      },
    );
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
        : stepIdx / (steps.length + 1);

  const selectedValue = q ? answers[q.id] : undefined;
  const selectedArr = Array.isArray(selectedValue) ? (selectedValue as string[]) : [];
  const isCustomOpen = Boolean(q?.hasCustomText && selectedArr.includes("outro"));
  const isMulti = q?.type === "multi";
  const canContinue = isMulti
    ? selectedArr.length > 0 && (!isCustomOpen || customText.trim().length > 0)
    : Boolean(selectedValue);

  const optionStyle = (selected: boolean) => ({
    borderColor: selected ? "rgba(0,168,255,0.55)" : "rgba(255,255,255,0.09)",
    background: selected ? "rgba(0,168,255,0.10)" : "rgba(255,255,255,0.02)",
    color: selected ? CYAN : WHITE,
  });

  return (
    <Section id="diagnostico" surface="body">
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,168,255,0.35), transparent)",
        }}
        aria-hidden="true"
      />
      <div className="lp-glow top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[700px]" aria-hidden="true" />

      <div className="relative lp-container">
        {/* Abertura */}
        <div className="text-center max-w-[820px] mx-auto">
          <Reveal>
            <p className="lp-kicker">{diagnostic.kicker}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="lp-h2 mt-4">{diagnostic.title}</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="lp-lead mt-5" style={{ maxWidth: 700, marginInline: "auto" }}>
              {diagnostic.support}
            </p>
          </Reveal>
        </div>

        {/* Cartão do diagnóstico */}
        <Reveal delay={0.16}>
          <div
            className="relative mt-12 lg:mt-16 mx-auto max-w-[760px] overflow-hidden"
            style={{
              borderRadius: 24,
              border: "1px solid var(--border-default)",
              background:
                "linear-gradient(180deg, rgba(18,22,29,0.96) 0%, rgba(11,14,19,0.96) 100%)",
              boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
            }}
          >
            {/* Progresso */}
            {phase !== "intro" && (
              <div className="px-6 pt-6 lg:px-9 lg:pt-8">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <button
                    onClick={goBack}
                    className="text-xs font-medium px-2 py-1 -ml-2 rounded-lg transition-colors"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    ← Voltar
                  </button>
                  <span
                    className="text-xs font-medium tabular-nums"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {phase === "final"
                      ? "Concluído"
                      : phase === "contact"
                        ? "Seus dados"
                        : `Pergunta ${(current?.primaryIndex ?? 0) + 1} de ${primaryTotal}`}
                  </span>
                </div>
                <div className="lp-progress">
                  <div
                    className="lp-progress-bar"
                    style={{ width: `${Math.max(6, progress * 100)}%` }}
                  />
                </div>
              </div>
            )}

            <div className="px-6 pb-8 pt-6 lg:px-9 lg:pb-10">
              {/* ── Intro ─────────────────────────────────────────────── */}
              {phase === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="text-center py-4"
                >
                    <h3 className="lp-h3">Vamos entender como funciona o atendimento da sua clínica.</h3>
                    <p className="lp-body mt-3">
                      Responda algumas perguntas rápidas para chegarmos na conversa já entendendo
                      melhor o seu cenário.
                    </p>
                    <p
                      className="mt-4 text-xs font-medium"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      Leva cerca de 2 minutos.
                    </p>
                    <button
                      onClick={() => {
                        trackDiagnosticStart();
                        setPhase("questions");
                      }}
                      className="lp-btn-primary mt-8 w-full"
                    >
                      {diagnosticConfig.startLabel}
                    </button>
                  </motion.div>
                )}

                {/* ── Perguntas ─────────────────────────────────────────── */}
                {phase === "questions" && q && (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, x: direction * 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.32, ease: EASE }}
                  >
                    <h3
                      className="font-semibold"
                      style={{
                        fontSize: "clamp(1.2rem, 2.4vw, 1.5rem)",
                        lineHeight: 1.3,
                        letterSpacing: "-0.015em",
                        color: WHITE,
                      }}
                    >
                      {q.prompt}
                    </h3>
                    {q.subtext && (
                      <p className="mt-2 text-sm" style={{ color: "var(--text-tertiary)" }}>
                        {q.subtext}
                      </p>
                    )}

                    <div className="mt-6 flex flex-col gap-2.5">
                      {q.options?.map((o) => {
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
                        className="lp-btn-primary mt-6 w-full disabled:opacity-35 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        CONTINUAR
                      </button>
                    )}
                  </motion.div>
                )}

                {/* ── Contato ───────────────────────────────────────────── */}
                {phase === "contact" && (
                  <motion.div
                    key="contact"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <h3
                      className="font-semibold"
                      style={{
                        fontSize: "clamp(1.2rem, 2.4vw, 1.5rem)",
                        lineHeight: 1.3,
                        letterSpacing: "-0.015em",
                        color: WHITE,
                      }}
                    >
                      {diagnosticConfig.contactTitle}
                    </h3>
                    <p className="lp-body mt-3">
                      {diagnosticConfig.contactSupport}
                    </p>

                    <div className="mt-7 flex flex-col gap-5">
                      <div>
                        <label
                          className="block text-xs font-medium tracking-wide mb-2"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Seu nome
                        </label>
                        <input
                          type="text"
                          value={contact.name}
                          onChange={(e) =>
                            setContact((c) => ({ ...c, name: e.target.value }))
                          }
                          placeholder="Como podemos te chamar?"
                          autoComplete="name"
                          className="w-full px-4 py-3 rounded-xl border bg-transparent outline-none font-medium"
                          style={{
                            borderColor: "rgba(255,255,255,0.12)",
                            color: WHITE,
                            fontSize: "16px",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-xs font-medium tracking-wide mb-2"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Nome da clínica
                        </label>
                        <input
                          type="text"
                          value={contact.clinic}
                          onChange={(e) =>
                            setContact((c) => ({ ...c, clinic: e.target.value }))
                          }
                          placeholder="Nome da sua clínica"
                          autoComplete="organization"
                          className="w-full px-4 py-3 rounded-xl border bg-transparent outline-none font-medium"
                          style={{
                            borderColor: "rgba(255,255,255,0.12)",
                            color: WHITE,
                            fontSize: "16px",
                          }}
                        />
                      </div>

                      <div>
                        <label
                          className="block text-xs font-medium tracking-wide mb-2"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          Seu melhor WhatsApp
                        </label>
                        <input
                          type="tel"
                          inputMode="tel"
                          value={contact.whatsapp}
                          onChange={(e) =>
                            setContact((c) => ({
                              ...c,
                              whatsapp: maskPhone(e.target.value),
                            }))
                          }
                          placeholder="(11) 99999-9999"
                          autoComplete="tel"
                          className="w-full px-4 py-3 rounded-xl border bg-transparent outline-none font-medium"
                          style={{
                            borderColor: "rgba(255,255,255,0.12)",
                            color: WHITE,
                            fontSize: "16px",
                          }}
                        />
                      </div>
                    </div>

                    {submitError && (
                      <p
                        className="mt-5 text-sm"
                        style={{ color: "#fca5a5" }}
                        role="alert"
                      >
                        Não conseguimos registrar agora. Tente novamente ou continue pelo
                        WhatsApp — seu diagnóstico não se perde.
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
                      className="lp-btn-primary mt-7 w-full disabled:opacity-35 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {submitting ? "ENVIANDO…" : diagnosticConfig.finishLabel}
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackWhatsAppClick();
                        trackCtaClick("diagnostic_whatsapp_fallback");
                      }}
                      className="mt-3 block text-center text-sm transition-colors"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      Prefere falar direto? Continuar pelo WhatsApp
                    </a>
                  </motion.div>
                )}

                {/* ── Final ─────────────────────────────────────────────── */}
                {phase === "final" && (
                  <motion.div
                    key="final"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="text-center"
                  >
                    <span
                      className="inline-flex items-center justify-center w-14 h-14 rounded-full"
                      style={{
                        background: "rgba(16,185,129,0.14)",
                        border: "1px solid rgba(16,185,129,0.32)",
                      }}
                      aria-hidden="true"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12.5l4.5 4.5L19 7.5"
                          stroke="#34d399"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>

                    <h3
                      className="mt-5 font-semibold"
                      style={{
                        fontSize: "clamp(1.25rem, 2.6vw, 1.6rem)",
                        letterSpacing: "-0.015em",
                        color: WHITE,
                      }}
                    >
                      {diagnosticConfig.finalPrefix}
                      {contact.name.split(" ")[0]}
                      {diagnosticConfig.finalSuffix}
                    </h3>
                    <p className="lp-body mt-3">{diagnosticConfig.finalText}</p>
                    <p className="lp-lead mt-2">{diagnosticConfig.finalNext}</p>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackWhatsAppClick();
                        trackCtaClick("diagnostic_final");
                      }}
                      className="lp-btn-primary mt-8 w-full"
                    >
                      {diagnosticConfig.whatsappLabel}
                    </a>
                  </motion.div>
                )}
            </div>
          </div>
        </Reveal>

        {/* Quebra de objeção */}
        <Reveal delay={0.22}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {diagnostic.objections.map((o) => (
              <span
                key={o}
                className="flex items-center gap-2.5 text-sm"
                style={{ color: "var(--text-tertiary)" }}
              >
                <span
                  className="w-1 h-1 rounded-full shrink-0"
                  style={{ background: "rgba(0,168,255,0.4)" }}
                  aria-hidden="true"
                />
                {o}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
