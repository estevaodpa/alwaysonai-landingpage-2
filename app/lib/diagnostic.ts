// Etapa 8 — "Diagnóstico da sua clínica".
//
// Experiência guiada de qualificação, aberta pelos CTAs da landing.
// Ainda NÃO conecta com n8n, Google Sheets, e-mail ou API de WhatsApp.
// Os dados ficam em estado local para demonstração.
//
// Estrutura: perguntas (com lógica condicional) → contato → tela final.
// O "Pergunta X de 7" mapeia as 7 perguntas principais. A pergunta condicional
// (canais de marketing) é um sub-passo da Pergunta 1 e não incrementa o contador.

export type Option = { label: string; value: string };

export type QuestionType = "single" | "multi" | "text";

export type Question = {
  id: string;
  type: QuestionType;
  prompt: string;
  subtext?: string;
  options?: Option[];
  /** Índice da pergunta principal (0-6). A condicional herda o índice da pergunta 1. */
  primaryIndex: number;
  /** Pergunta condicional exibida quando a resposta é "sim". */
  revealQuestion?: Question;
  /** Quando a opção "outro" é escolhida, abre um campo curto. */
  hasCustomText?: boolean;
  customLabel?: string;
};

export const diagnosticQuestions: Question[] = [
  {
    id: "marketing",
    type: "single",
    primaryIndex: 0,
    prompt: "Hoje sua clínica investe em marketing para atrair novos pacientes?",
    options: [
      { label: "Sim", value: "sim" },
      { label: "Não", value: "nao" },
    ],
    revealQuestion: {
      id: "marketing_channels",
      type: "multi",
      primaryIndex: 0,
      prompt: "Quais canais ajudam a trazer pacientes hoje?",
      subtext: "Pode selecionar mais de um.",
      options: [
        { label: "Tráfego pago", value: "trafego_pago" },
        { label: "Instagram / conteúdo", value: "instagram" },
        { label: "Google", value: "google" },
        { label: "Indicações", value: "indicacoes" },
        { label: "Parcerias", value: "parcerias" },
        { label: "Outros", value: "outros" },
      ],
    },
  },
  {
    id: "volume",
    type: "single",
    primaryIndex: 1,
    prompt: "Em média, quantos novos contatos chegam por dia no WhatsApp da clínica?",
    options: [
      { label: "Até 5", value: "ate_5" },
      { label: "6 a 15", value: "6_15" },
      { label: "16 a 30", value: "16_30" },
      { label: "31 a 60", value: "31_60" },
      { label: "Mais de 60", value: "mais_60" },
    ],
  },
  {
    id: "atendimento",
    type: "single",
    primaryIndex: 2,
    prompt: "Quem cuida desses contatos hoje?",
    options: [
      { label: "Eu mesmo(a)", value: "eu" },
      { label: "1 pessoa na recepção", value: "1_pessoa" },
      { label: "2 a 3 pessoas", value: "2_3" },
      { label: "4 ou mais pessoas", value: "4_mais" },
      { label: "Equipe comercial", value: "equipe_comercial" },
    ],
  },
  {
    id: "dor",
    type: "multi",
    primaryIndex: 3,
    prompt: "Qual dessas situações mais incomoda você no atendimento hoje?",
    subtext: "Pode selecionar mais de uma.",
    options: [
      { label: "Demora para responder", value: "demora" },
      { label: "Leads ficam sem acompanhamento", value: "sem_acompanhamento" },
      { label: "Equipe sobrecarregada", value: "sobrecarregada" },
      { label: "Não tenho controle do que acontece nas conversas", value: "sem_controle" },
      { label: "Quero aumentar os agendamentos", value: "aumentar_agendamentos" },
      { label: "Outro", value: "outro" },
    ],
    hasCustomText: true,
    customLabel: "Conte para a gente",
  },
  {
    id: "estrutura",
    type: "single",
    primaryIndex: 4,
    prompt: "Quantas unidades sua clínica possui?",
    options: [
      { label: "1 unidade", value: "1" },
      { label: "2 unidades", value: "2" },
      { label: "3 a 5 unidades", value: "3_5" },
      { label: "6 ou mais", value: "6_mais" },
    ],
  },
  {
    id: "faturamento",
    type: "single",
    primaryIndex: 5,
    prompt: "Qual é aproximadamente o faturamento mensal da clínica?",
    subtext:
      "Isso nos ajuda a entender o tamanho da operação e pensar em uma estrutura compatível.",
    options: [
      { label: "Até R$ 30 mil", value: "ate_30" },
      { label: "R$ 30 mil a R$ 70 mil", value: "30_70" },
      { label: "R$ 70 mil a R$ 150 mil", value: "70_150" },
      { label: "R$ 150 mil a R$ 300 mil", value: "150_300" },
      { label: "Acima de R$ 300 mil", value: "300_mais" },
    ],
  },
  {
    id: "momento",
    type: "single",
    primaryIndex: 6,
    prompt:
      "Se encontrarmos uma solução que faça sentido, quando você gostaria de melhorar essa operação?",
    options: [
      { label: "Quero resolver isso agora", value: "agora" },
      { label: "Nas próximas semanas", value: "semanas" },
      { label: "Nos próximos 2 a 3 meses", value: "2_3_meses" },
      { label: "Estou apenas conhecendo possibilidades", value: "conhecendo" },
    ],
  },
];

// Configuração do diagnóstico. O número de WhatsApp deve ser configurado aqui.
// Formato internacional, sem símbolos: 55 + DDD + número.
export const diagnosticConfig = {
  title: "Diagnóstico da sua clínica",
  openingTitle: "Vamos entender como funciona o atendimento da sua clínica.",
  openingSupport:
    "Responda algumas perguntas rápidas para chegarmos na conversa já entendendo melhor o seu cenário.",
  openingTime: "Leva cerca de 2 minutos.",
  startLabel: "COMEÇAR DIAGNÓSTICO",
  contactTitle: "Estamos quase terminando.",
  contactSupport:
    "Agora só precisamos saber com quem estamos falando para continuar o diagnóstico.",
  finishLabel: "FINALIZAR DIAGNÓSTICO",
  finalPrefix: "Pronto, ",
  finalSuffix: ".",
  finalText: "Já entendemos melhor o cenário da sua clínica.",
  finalNext: "O próximo passo é continuar essa conversa diretamente com nossa equipe.",
  whatsappLabel: "CONTINUAR PELO WHATSAPP",
  // ── Configurável depois ───────────────────────────────────────────────────
  whatsappNumber: "5564999877992",
  whatsappMessage:
    "Oi! Acabei de preencher o diagnóstico da minha clínica no site e gostaria de saber mais sobre a clínica inteligente.",
  // ── n8n webhook (Production URL) ─────────────────────────────────────────
  // Padrão de produção. Pode ser sobrescrito pela variável de ambiente
  // NEXT_PUBLIC_N8N_WEBHOOK_URL (ex.: para apontar a um ambiente de teste).
  n8nWebhookUrl: "https://n8n-n8n.3qgwdw.easypanel.host/webhook/alwaysonai-diagnostico-v2",
};

// ── Origem / UTMs ────────────────────────────────────────────────────────────
// Lê os parâmetros de UTM da URL atual. Retorna sempre os 5 campos, vazios
// quando não presentes, para o payload ter estrutura estável no n8n.
export function getUtmParams(): {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
} {
  const params = new URLSearchParams(
    typeof window !== "undefined" ? window.location.search : "",
  );
  return {
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_content: params.get("utm_content") ?? "",
    utm_term: params.get("utm_term") ?? "",
  };
}

// Progresso de uma sessão de diagnóstico. O `save_seq` é um contador
// monotônico da sessão e, junto do encadeamento de envios no cliente,
// garante que o n8n receba as atualizações em ordem.
export type DiagnosticProgress = {
  status: "em_andamento" | "concluido";
  etapa: string;
  save_seq: number;
  criado_em: string;
  atualizado_em: string;
};

// Monta o payload estruturado que será enviado ao webhook do n8n.
// Formato pensado para o fluxo do n8n: respostas por pergunta + contato.
// O campo `score` fica preparado (null) para receber um score invisível depois.
// `leadId` é o identificador único do diagnóstico (UUID), gerado uma única vez
// ao iniciar o diagnóstico e reutilizado caso o envio seja tentado novamente.
export function buildDiagnosticPayload(
  answers: Record<string, string | string[]>,
  contact: { name: string; clinic: string; whatsapp: string },
  leadId: string,
  progress?: DiagnosticProgress,
) {
  return {
    source: "landing-alwayson",
    type: "diagnostico",
    lead_id: leadId,
    origem: getUtmParams(),
    respostas: {
      ...answers,
    },
    contato: {
      nome: contact.name,
      clinica: contact.clinic,
      whatsapp: contact.whatsapp,
    },
    score: null,
    enviado_em: new Date().toISOString(),
    ...(progress
      ? {
          status: progress.status,
          etapa: progress.etapa,
          save_seq: progress.save_seq,
          criado_em: progress.criado_em,
          atualizado_em: progress.atualizado_em,
        }
      : {}),
  };
}

// URL do webhook: permite apontar para um ambiente de teste via
// NEXT_PUBLIC_N8N_WEBHOOK_URL sem alterar a produção como padrão.
function resolveWebhookUrl(): string {
  return process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || diagnosticConfig.n8nWebhookUrl;
}

// Envia o payload ao webhook do n8n. Retorna { ok: true } apenas quando o
// POST responde HTTP 2xx e o corpo JSON traz success: true. Caso contrário
// (erro de rede, HTTP não-2xx ou success !== true) retorna { ok: false }.
export async function sendDiagnosticToN8n(
  answers: Record<string, string | string[]>,
  contact: { name: string; clinic: string; whatsapp: string },
  leadId: string,
  progress?: DiagnosticProgress,
  timeoutMs = 10000,
): Promise<{ ok: boolean }> {
  const webhookUrl = resolveWebhookUrl();
  if (!webhookUrl) return { ok: false };
  const payload = buildDiagnosticPayload(answers, contact, leadId, progress);
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) return { ok: false };
    const data = (await res.json().catch(() => null)) as { success?: boolean } | null;
    if (!data || data.success !== true) return { ok: false };
    return { ok: true };
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(timer);
  }
}

// Fila de salvamento progressivo por sessão (leadId): cada save só é
// enviado após o anterior terminar, então o n8n recebe em ordem e uma
// atualização antiga nunca sobrescreve uma mais recente no transporte.
// Fire-and-forget: falhas são silenciosas e nunca travam o quiz.
const progressChains = new Map<string, Promise<void>>();

export function enqueueProgressSave(
  leadId: string,
  answers: Record<string, string | string[]>,
  contact: { name: string; clinic: string; whatsapp: string },
  progress: DiagnosticProgress,
): void {
  const prev = progressChains.get(leadId) ?? Promise.resolve();
  const next = prev
    .catch(() => {})
    .then(() => sendDiagnosticToN8n(answers, contact, leadId, progress, 8000))
    .then(
      () => {},
      () => {},
    );
  progressChains.set(leadId, next);
  next.finally(() => {
    if (progressChains.get(leadId) === next) progressChains.delete(leadId);
  });
}

// Aguarda os saves pendentes da sessão (com teto de tempo). O envio final
// usa isso para garantir que o "concluido" chegue depois dos parciais.
export async function drainProgressSaves(leadId: string, timeoutMs = 4000): Promise<void> {
  const pending = progressChains.get(leadId);
  if (!pending) return;
  await Promise.race([
    pending.catch(() => {}),
    new Promise<void>((resolve) => setTimeout(resolve, timeoutMs)),
  ]);
}

// Monta a sequência de passos considerando a resposta da pergunta 1.
// A pergunta condicional "canais" só entra quando marketing = "sim".
export function buildSteps(
  answers: Record<string, string | string[]>,
): { q: Question; primaryIndex: number }[] {
  const steps: { q: Question; primaryIndex: number }[] = [];
  for (const q of diagnosticQuestions) {
    steps.push({ q, primaryIndex: q.primaryIndex });
    if (q.revealQuestion && answers[q.id] === "sim") {
      steps.push({ q: q.revealQuestion, primaryIndex: q.primaryIndex });
    }
  }
  return steps;
}
