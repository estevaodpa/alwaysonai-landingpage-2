// Conversa real da Espaço Menezes (Secretária IA · Gabriela).
// Textos extraídos das 5 capturas que o cliente mandou.
// Os tempos reais foram comprimidos: a animação roda rápido (~700ms/linha).

export type ConversationLine = {
  kind: "incoming" | "outgoing";
  text: string;
  time: string;
  /** acende a pill correspondente no hero (0..3) */
  heroAction?: number;
  /** acende o passo correspondente no caminho do Case Real (0..4) */
  caseStep?: number;
};

export const conversation: ConversationLine[] = [
  {
    kind: "incoming",
    text: "Bom dia, meu nome é Jeane. Peguei seu contato com a Janaína e gostaria de agendar uma aplicação de enzima.",
    time: "09:45",
  },
  {
    kind: "outgoing",
    text: "Bom dia, Jeane! Sou a Gabriela, secretária do Espaço Menezes.",
    time: "09:45",
    heroAction: 0,
    caseStep: 0,
  },
  {
    kind: "outgoing",
    text: "Para aplicação de enzima, consigo hoje às 11h ou às 16h. Qual prefere?",
    time: "09:46",
    heroAction: 1,
    caseStep: 1,
  },
  { kind: "incoming", text: "Pode ser às 16 horas", time: "09:47" },
  { kind: "outgoing", text: "Perfeito, hoje às 16h fica reservado!", time: "09:48" },
  {
    kind: "outgoing",
    text: "Me confirma seu nome completo para eu deixar registrado?",
    time: "09:48",
    caseStep: 2,
  },
  { kind: "incoming", text: "Jeane Angélica de Jesus", time: "09:48" },
  { kind: "incoming", text: "Me passa o endereço", time: "09:48" },
  {
    kind: "outgoing",
    text: "Fica no Espaço Menezes. Jeane Angélica, hoje às 16h fica reservado pra você. O sinal é R$ 30, que é adiantamento e é abatido do valor do procedimento.",
    time: "09:49",
    heroAction: 2,
    caseStep: 3,
  },
  { kind: "incoming", text: "Ok", time: "09:59" },
  { kind: "incoming", text: "Recebi o comprovante", time: "10:07" },
  {
    kind: "outgoing",
    text: "Recebi seu comprovante, Jeane, e o valor está conferido.",
    time: "10:08",
  },
  {
    kind: "outgoing",
    text: "Comprovante registrado, Jeane! Você está marcada hoje às 16h para aplicação de enzima.",
    time: "11:29",
    heroAction: 3,
    caseStep: 4,
  },
  { kind: "incoming", text: "Ok obrigada 🌷", time: "11:30" },
];

/** Pills do hero — acendem conforme a conversa avança. */
export const HERO_ACTIONS = [
  "Novo lead detectado",
  "Tirar dúvidas",
  "Contornar objeções",
  "Fazer agendamento",
];

/** Caminho do Case Real — cada passo é uma ação que a IA executou. */
export const CASE_STEPS = [
  { title: "Lead identificado", detail: "Jeane chegou pelo WhatsApp" },
  { title: "Dúvida respondida", detail: "Enzima · horários oferecidos" },
  { title: "Dados confirmados", detail: "Nome completo registrado" },
  { title: "Objeção tratada", detail: "Sinal de R$ 30 explicado" },
  { title: "Consulta agendada", detail: "Hoje, 16h · confirmada" },
];

export const LINE_INTERVAL = 2000;
export const RESTART_DELAY = 3200;
