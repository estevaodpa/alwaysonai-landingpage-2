// Unified timeline/state machine for the alwayson.ai demo
// Controls: conversation + typing + AI interpretation + operational events + dynamic word
// Architecture prepared for future: CRM, calendar, scheduling, follow-up, dashboard

export type DemoStage = {
  id: string;
  // Conversation
  message?: { kind: "incoming" | "outgoing"; text: string; timestamp: string };
  typingDuration?: number;
  // AI interpretation (shown in OperationalFeed)
  interpretation?: { number: string; title: string; description: string };
  // Operational event (shown as floating pill)
  event?: { label: string };
  // Dynamic word (shown in "Uma IA personalizada para ___")
  dynamicWord?: string;
  // Timing
  delay: number;
  // Duration this stage remains "active" before fading
  activeDuration: number;
};

export const demoTimeline: DemoStage[] = [
  {
    id: "stage-1",
    event: { label: "Novo lead detectado" },
    interpretation: {
      number: "01",
      title: "NOVO CONTATO",
      description: "Mariana iniciou uma conversa",
    },
    dynamicWord: "ATENDER",
    delay: 600,
    activeDuration: 4000,
  },
  {
    id: "stage-2",
    message: {
      kind: "incoming",
      text: "Olá! Vi vocês e queria saber mais sobre o procedimento.",
      timestamp: "14:32",
    },
    delay: 1200,
    activeDuration: 3000,
  },
  {
    id: "stage-3",
    event: { label: "Intenção identificada" },
    interpretation: {
      number: "02",
      title: "INTENÇÃO IDENTIFICADA",
      description: "Interesse em procedimento estético",
    },
    dynamicWord: "QUALIFICAR",
    delay: 500,
    activeDuration: 4000,
  },
  {
    id: "stage-4",
    message: {
      kind: "outgoing",
      text: "Olá, Mariana! Que bom ter você aqui. Qual procedimento você tem interesse?",
      timestamp: "14:32",
    },
    typingDuration: 2200,
    dynamicWord: "ATENDER",
    delay: 1000,
    activeDuration: 3000,
  },
  {
    id: "stage-5",
    message: {
      kind: "incoming",
      text: "Harmonização facial. Vocês fazem?",
      timestamp: "14:33",
    },
    delay: 2800,
    activeDuration: 3000,
  },
  {
    id: "stage-6",
    event: { label: "Em atendimento" },
    interpretation: {
      number: "03",
      title: "LEAD QUALIFICADO",
      description: "Perfil compatível com harmonização facial",
    },
    dynamicWord: "CONVERTER",
    delay: 400,
    activeDuration: 4000,
  },
  {
    id: "stage-7",
    message: {
      kind: "outgoing",
      text: "Sim! A harmonização facial é uma das nossas especialidades. Vou te explicar como funciona e já verifico as próximas disponibilidades, pode ser?",
      timestamp: "14:33",
    },
    typingDuration: 2800,
    dynamicWord: "AGENDAR",
    delay: 800,
    activeDuration: 3000,
  },
  {
    id: "stage-8",
    message: {
      kind: "incoming",
      text: "Perfeito, obrigada!",
      timestamp: "14:34",
    },
    delay: 2200,
    activeDuration: 3000,
  },
  {
    id: "stage-9",
    interpretation: {
      number: "04",
      title: "INTENÇÃO DE AGENDAMENTO",
      description: "Consultando disponibilidade",
    },
    dynamicWord: "ACOMPANHAR",
    delay: 600,
    activeDuration: 4000,
  },
  {
    id: "stage-10",
    message: {
      kind: "outgoing",
      text: "Temos horários ainda esta semana. Posso te agendar uma avaliação sem compromisso?",
      timestamp: "14:34",
    },
    typingDuration: 2400,
    dynamicWord: "AGENDAR",
    delay: 1000,
    activeDuration: 3000,
  },
];

export const RESTART_DELAY = 5000;
export const CHAT_CONTACT_NAME = "Mariana";
export const CHAT_CONTACT_STATUS = "online";
export const CHAT_HEADER_TITLE = "Clínica Aurora";
