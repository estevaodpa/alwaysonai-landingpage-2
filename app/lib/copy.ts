// ───────────────────────────────────────────────────────────────────────────
// Todo o texto da LP2 vive aqui. Nenhum componente tem copy hardcoded.
// Conteúdo: site alwayson.ai atual. Formato/estrutura: modelo botconversa.
// ───────────────────────────────────────────────────────────────────────────

export type Seg = { t: string; hi?: boolean };

// ── Marca ───────────────────────────────────────────────────────────────────
export const brand = {
  name: "alwayson.ai",
  tagline: "Atendimento inteligente para clínicas",
};

// ── Navegação ───────────────────────────────────────────────────────────────
export const nav = {
  links: [
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Recursos", href: "#recursos" },
    { label: "Painel", href: "#painel" },
    { label: "Perguntas", href: "#faq" },
  ],
  login: "Entrar na plataforma",
  cta: "Falar com um especialista",
};

// ── Hero ────────────────────────────────────────────────────────────────────
export const hero = {
  lead: "Sua clínica pode estar fechada.",
  leadHi: "Mas seus agendamentos não precisam parar.",

  // Cena de abertura — a dor antes da promessa.
  lossScene: {
    badge: "O custo da demora",
    counterLabel: "DINHEIRO QUE ESCOA POR MÊS",
    counterValue: 3480,
    drainLabel: "RALO DO ATENDIMENTO",
    contexts: [
      {
        time: "18h42",
        tag: "PÓS-EXPEDIENTE",
        line: "O paciente escreveu. Ninguém respondeu.",
        loss: "− R$ 480 por atendimento perdido",
      },
      {
        time: "Sábado · 15h20",
        tag: "FINAL DE SEMANA",
        line: "A clínica fechou. O interesse não espera.",
        loss: "− R$ 720 em um só fim de semana",
      },
      {
        time: "Domingo · 10h05",
        tag: "FORA DO HORÁRIO",
        line: "Quem poderia agendar agora esfria até segunda.",
        loss: "− R$ 1.100 em consultas que não voltam",
      },
      {
        time: "Segunda · 09h12",
        tag: "DEMORA NA RESPOSTA",
        line: "O concorrente respondeu primeiro.",
        loss: "− R$ 980 para a concorrência",
      },
    ],
  },

  promiseTitle: [
    { t: "Tenha uma " },
    { t: "Secretária Inteligente", hi: true },
    { t: " que:" },
  ] as Seg[],
  topics: [
    "Responde em segundos",
    "Conversa naturalmente",
    "Tira dúvidas",
    "Transforma interesse em consultas agendadas",
    "Atende 24 horas por dia no WhatsApp",
    "Com o jeito de atender da sua clínica",
  ],
  cta: "Falar com um especialista",
};

// ── Marquee de parceiras ────────────────────────────────────────────────────
export const marquee = {
  headline: "Clínicas que não perdem mais clientes com a Secretária Inteligente",
  logos: [
    { src: "/parceiros/logo-clinica-renovahair.webp", alt: "Clínica RenovaHair", w: 330 },
    { src: "/parceiros/logo-de-clinica-odontologica-luxuosa.webp", alt: "Clínica Odontológica Luxuosa", w: 215 },
    { src: "/parceiros/logo-dourado-espaco-bella-forma.webp", alt: "Espaço Bella Forma", w: 215 },
    { src: "/parceiros/logo-elegante-espaco-elegance.webp", alt: "Espaço Elegance", w: 220 },
    { src: "/parceiros/logo-futurista-koa-saude-integrada.webp", alt: "KOA Saúde Integrada", w: 165 },
    { src: "/parceiros/logo-luxuoso-dermabelle-em-rose-gold.webp", alt: "DERMABELLE", w: 215 },
    { src: "/parceiros/logo-luxuoso-studio-lumina.webp", alt: "Studio Lumina", w: 215 },
    { src: "/parceiros/logo-minimalista-do-instituto-renova-hair.webp", alt: "Instituto Renova Hair", w: 215 },
    { src: "/parceiros/logo-minimalista-ellos-saude-integrada.webp", alt: "ELLOS Saúde Integrada", w: 165 },
    { src: "/parceiros/logo-odontoprime-com-sorriso-azul.webp", alt: "OdontoPrime", w: 215 },
    { src: "/parceiros/logo-premium-clinica-vitta-essence.webp", alt: "Vitta Essence", w: 165 },
  ],
};

// ── Recursos ────────────────────────────────────────────────────────────────
export const features = {
  kicker: "O sistema completo",
  title: "Toda a operação de atendimento da sua clínica, dentro do WhatsApp.",
  titleHi: "",
  support:
    "Você monta sem programar, conecta com as ferramentas que já usa e acompanha cada resultado em tempo real. Sem contratar ninguém.",
  flow: [
    { label: "Paciente chama no WhatsApp" },
    { label: "A IA entende e responde" },
    { label: "Qualifica o paciente" },
    { label: "Agenda o horário" },
  ],
  items: [
    {
      tag: "01",
      title: "Atende 24 horas por dia",
      body: "Entende texto, áudio e imagem. Responde dúvidas repetidas, tira objeções e informa preços e horários no mesmo tom de voz da sua equipe.",
      bullets: ["Sem fila", "Sem espera", "Sem final de semana"],
    },
    {
      tag: "02",
      title: "Qualifica o lead",
      body: "Faz as perguntas certas, identifica o procedimento de interesse e separa quem está pronto para comprar de quem ainda não.",
      bullets: ["Origem registrada", "Procedimento identificado", "Intenção mapeada"],
    },
    {
      tag: "03",
      title: "Do “oi” ao horário marcado, sozinho",
      body: "Consulta a agenda, oferece horários livres, marca a consulta e confirma o horário na própria conversa. Ninguém precisa encostar no celular.",
      bullets: ["Agenda integrada", "Confirmação automática", "Zero retrabalho"],
    },
    {
      tag: "04",
      title: "Você vê tudo em tempo real",
      body: "Quantas conversas chegaram, quantas viraram agendamento e onde o paciente travou. Decida com números, não no achismo.",
      bullets: ["Painel da operação", "Histórico de contatos", "Exportação"],
    },
  ],
};

// ── Como funciona ───────────────────────────────────────────────────────────
export const steps = {
  kicker: "Como funciona",
  title: "Seu WhatsApp passa a atender",
  titleHi: "ainda hoje, em 3 passos.",
  support:
    "Você não precisa saber programar nem entender de IA. Se você sabe explicar o seu negócio para um funcionário novo, você sabe configurar a alwayson.ai.",
  items: [
    {
      n: "1",
      title: "Conecte o WhatsApp que a clínica já usa",
      body: "Pela conexão oficial da Meta, em poucos cliques. O número continua o mesmo e o app do celular continua funcionando.",
    },
    {
      n: "2",
      title: "A IA aprende a sua clínica",
      body: "Procedimentos, valores, horários, agenda, formas de pagamento, objeções e o tom de voz da sua equipe. Você explica, nós configuramos.",
    },
    {
      n: "3",
      title: "Acompanhe as conversas acontecendo",
      body: "O agente de IA responde na hora. Você acompanha cada atendimento em tempo real e ajusta o que quiser.",
    },
  ],
};

// ── Nichos ──────────────────────────────────────────────────────────────────
export const niches = {
  kicker: "Qualquer clínica",
  title: "Se o seu paciente pergunta,",
  titleHi: "a IA responde.",
  support:
    "Clínica, consultório ou prestador de serviço: as perguntas se repetem. Cada uma sem resposta é um paciente que vai para o concorrente.",
  items: [
    {
      name: "Odontologia",
      question: "Quanto custa o implante?",
      answer:
        "Responde com o valor que você ensinou, explica o que está incluso, fala de parcelamento e já puxa o próximo passo.",
      image: "/produto/leads_e_procedimentos_odontologia.png",
    },
    {
      name: "Estética",
      question: "Tem horário essa semana?",
      answer:
        "Consulta a sua agenda, oferece os horários livres e marca sem ninguém da equipe encostar no celular.",
      image: "/produto/leads_e_procedimentos_esteticista.png",
    },
    {
      name: "Clínica geral",
      question: "A consulta é particular?",
      answer:
        "Explica as formas de pagamento, os convênios aceitos e agenda a avaliação sem ninguém da equipe encostar no celular.",
      image: "/produto/leads_e_procedimentos_medico.png",
    },
  ],
};

// ── Painel / dashboard ──────────────────────────────────────────────────────
export const dashboard = {
  kicker: "A visão do dono",
  title: "Tudo que acontece no atendimento,",
  titleHi: "organizado em um só lugar.",
  support:
    "Um painel da sua clínica, atualizado automaticamente conforme as conversas acontecem. Você acompanha os leads, interesses, objeções e agendamentos sem abrir conversa por conversa.",
  columns: [
    { title: "Novo contato", count: 2, note: "Acabou de entrar em contato" },
    { title: "Conversando", count: 32, note: "Tirando dúvidas e conhecendo a clínica" },
    { title: "Interesse identificado", count: 6, note: "Demonstrou interesse em um tratamento" },
    { title: "Avaliação agendada", count: 4, note: "Confirmou uma data para comparecer" },
  ],
  cards: [
    { name: "Carla Mendes", note: "Limpeza de pele", date: "02/09" },
    { name: "Rafael Souza", note: "Clareamento", date: "02/09" },
    { name: "Juliana Prado", note: "Aparelho", date: "01/09" },
    { name: "Marcelo Tavares", note: "Implante", date: "31/08" },
    { name: "Pedro Lima", note: "Avaliação", date: "31/08" },
    { name: "Cauan Rocha", note: "Avaliação", date: "31/08" },
  ],
  image: "/produto/tabela_clientes.png",
  imageAlt: "Todos os contatos recebidos via WhatsApp com procedimento, horário e status",
};

// ── Personalização ──────────────────────────────────────────────────────────
export const personalization = {
  kicker: "Não é ligar e pronto.",
  title: "Sua clínica não atende como qualquer outra.",
  titleHi: "Sua IA também não deveria.",
  support:
    "Procedimentos, valores, horários, regras, formas de pagamento, dúvidas frequentes, objeções e a maneira como sua clínica conversa.",
  elements: [
    "Procedimentos",
    "Valores",
    "Horários",
    "Agenda",
    "Formas de pagamento",
    "Dúvidas frequentes",
    "Objeções",
    "Tom de voz",
  ],
  generic: {
    label: "IA genérica",
    question: "Vocês parcelam o procedimento?",
    answer:
      "Entre em contato com nossa equipe para verificar as condições disponíveis.",
  },
  personalized: {
    label: "Atendimento personalizado",
    question: "Vocês parcelam o procedimento?",
    answer:
      "Sim! O implante pode ser parcelado em até 10x sem juros. Quer que eu monte uma simulação com o valor exato para você?",
  },
  close: "Não é sua clínica que precisa se adaptar à tecnologia. A tecnologia é que precisa se adaptar à sua clínica.",
};

// ── Comparação ──────────────────────────────────────────────────────────────
export const comparison = {
  kicker: "Antes e depois",
  title: "O mesmo WhatsApp. Outro resultado.",
  before: {
    label: "Hoje",
    rows: [
      "Paciente esperando horas por uma resposta",
      "A equipe repete as mesmas respostas o dia todo",
      "Conversas espalhadas em vários celulares",
      "Ninguém sabe em que pé está cada paciente",
      "Lead que chega à noite esfria até de manhã",
    ],
  },
  after: {
    label: "Com a alwayson.ai",
    rows: [
      "Resposta em segundos, 24 horas por dia",
      "A IA cuida das perguntas repetidas",
      "Todos os atendentes na mesma caixa de entrada",
      "Cada paciente na etapa certa do painel",
      "Lead atendido e qualificado na hora",
    ],
  },
  footnote: "O lead já chegou. A diferença está no que acontece depois que ele chega.",
};

// ── Entregue pronto ─────────────────────────────────────────────────────────
export const ready = {
  kicker: "Pronto para funcionar",
  title: "Sua equipe não precisa aprender mais um sistema.",
  titleHi: "Nós entregamos tudo pronto.",
  consequences: [
    "Ninguém precisa cadastrar lead manualmente.",
    "Ninguém precisa atualizar etapa manualmente.",
    "Ninguém precisa ficar copiando informação do WhatsApp.",
  ],
  items: ["IA personalizada", "Atendimento", "Organização dos clientes", "Automações", "Visão da operação"],
  close: "A conversa acontece no WhatsApp. O resto se organiza sozinho.",
};

// ── Vídeo ───────────────────────────────────────────────────────────────────
export const video = {
  kicker: "Veja funcionando",
  title: "A clínica inteligente,",
  titleHi: "de verdade.",
  support:
    "Um atendimento real, do primeiro “oi” até o horário marcado. É assim que a alwayson.ai funciona na prática.",
};

// ── Diagnóstico ─────────────────────────────────────────────────────────────
export const diagnostic = {
  kicker: "Análise da sua clínica",
  title: "Vamos descobrir se essa operação faz sentido para a sua clínica.",
  support:
    "Primeiro entendemos como seu atendimento funciona hoje. Se houver encaixe, mostramos como a alwayson.ai pode funcionar dentro da sua operação.",
  objections: [
    "Sem apresentação genérica.",
    "Sem compromisso.",
    "Uma análise focada na realidade da sua clínica.",
  ],
  cta: "QUERO SABER SE MINHA CLÍNICA SE ENCAIXA",
  microcopy:
    "Uma conversa para entender sua clínica e mostrar a operação funcionando na prática.",
};

// ── Integrações ─────────────────────────────────────────────────────────────
export const integrations = {
  title: "Integrações",
  support:
    "Conecte as ferramentas que a sua clínica já usa. Quando algo acontece no WhatsApp, o resto acontece sozinho.",
  items: [
    { label: "Google Agenda", short: "GA" },
    { label: "Google Planilhas", short: "GS" },
    { label: "WhatsApp API oficial", short: "WA" },
    { label: "n8n", short: "N8" },
    { label: "CRM de vendas", short: "CRM" },
    { label: "Pagamentos", short: "PIX" },
    { label: "Meta Ads", short: "AD" },
    { label: "E-mail", short: "@" },
  ],
  flowTitle: "Agendou pelo WhatsApp",
  flowCount: "4 etapas · ativa",
  flow: [
    {
      step: "Etapa 1",
      title: "alwayson.ai: evento do atendimento",
      detail: "Mariana agendou pelo WhatsApp — Sexta, 16h30 · avaliação",
    },
    {
      step: "Etapa 2",
      title: "Google Agenda: criar evento",
      detail: "Avaliação · Mariana Souza — Agenda da clínica, sex 16h30",
    },
    {
      step: "Etapa 3",
      title: "Google Planilhas: adicionar linha",
      detail: "Agendamentos 2026 — Nova linha com nome, procedimento e data",
    },
    {
      step: "Etapa 4",
      title: "n8n: enviar confirmação",
      detail: "Link de confirmação enviado no WhatsApp",
    },
  ],
};

// ── Diagnóstico (modal de elegibilidade) ────────────────────────────────────
export const diagnosticUi = {
  kicker: "Diagnóstico de elegibilidade",
  introTitle: "Antes de falar com a nossa equipe, precisamos entender a sua operação.",
  introSupport:
    "Este diagnóstico determina se a Secretária Inteligente é adequada para a sua clínica.",
  introMeta: "Sete perguntas sobre a sua operação.",
  startLabel: "Iniciar análise",
  contactTitle: "Para concluir a análise, identifique a clínica e o responsável.",
  contactSupport: "O resultado será encaminhado para o WhatsApp informado.",
  finishLabel: "Finalizar análise",
  finalTitle: "Análise concluída.",
  finalText: "O cenário da sua clínica já está com a nossa equipe.",
  whatsappLabel: "Continuar pelo WhatsApp",
};

// ── Provas sociais ──────────────────────────────────────────────────────────
export const testimonials = {
  kicker: "Quem usa",
  title: "Quem usa explica melhor.",
  support: [
    { t: "A melhor explicação não vem da gente. Vem de quem " },
    { t: "já usa todos os dias", hi: true },
    { t: " no consultório." },
  ] as Seg[],
  items: [
    {
      name: "Júlia Marinho",
      profession: "Esteticista",
      quote:
        "Recebia reclamação todo dia por demora e a equipe vivia sobrecarregada. Com a IA da alwayson.ai, ela entende o paciente, responde a qualquer hora e até fecha venda sozinha. Na primeira semana o tempo de resposta já tinha caído para menos de uma hora.",
      image: "/proofs/julia.png",
      avatar: "/proofs/avatars/julia.webp",
      width: 600,
      height: 404,
      highlight: "Desafogou muitooo",
    },
    {
      name: "Giuliano Clovalski",
      profession: "Implante",
      quote:
        "Nosso fluxo antigo falhava toda vez que o cliente saía do menu, e as conversas se perdiam. Agora o assistente conversa de forma natural e responde perguntas detalhadas sobre os procedimentos.",
      image: "/proofs/giuliano.png",
      avatar: "/proofs/avatars/giuliano.webp",
      width: 600,
      height: 405,
      highlight: "Ontem mesmo a IA marcou 12 consultas",
    },
    {
      name: "Larissa Otorrino",
      profession: "Otorrino",
      quote:
        "Atender pacientes era grupo de WhatsApp sem fim e planilha manual. Com a alwayson.ai padronizei o atendimento, automatizei as planilhas e hoje atendemos mais gente por dia.",
      image: "/proofs/larissa.png",
      avatar: "/proofs/avatars/larissa.webp",
      width: 600,
      height: 400,
      highlight: "não contratei uma atendente não, foi uma sócia kkk",
    },
    {
      name: "Doutora Camila Sousa",
      profession: "Dentista",
      quote:
        "Percebi que a demora para responder estava me custando consultas. Com a alwayson.ai automatizei agendamentos e orçamentos, e ninguém mais espera. Depois da IA, os pacientes quase não pedem para falar com uma pessoa.",
      image: "/proofs/camilla.png",
      avatar: "/proofs/avatars/camilla.webp",
      width: 600,
      height: 409,
      highlight:
        "Ela contornou a objeção do paciente e marcou a consulta na agenda",
    },
  ],
  closing: {
    headline: "O resultado aparece na rotina.",
    results: [
      { label: "Equipe", value: "mais leve" },
      { label: "Atendimento", value: "mais humano" },
      { label: "Operação", value: "organizada" },
      { label: "Mais conversas", value: "virando agendamentos" },
    ],
    final: [
      { t: "Enquanto a IA conduz as conversas, sua clínica " },
      { t: "ganha tempo", hi: true },
      { t: ", " },
      { t: "controle", hi: true },
      { t: " e mais oportunidades de " },
      { t: "avançar cada paciente", hi: true },
      { t: "." },
    ] as Seg[],
  },
};

// ── FAQ ─────────────────────────────────────────────────────────────────────
export const faq = {
  kicker: "Perguntas frequentes",
  title: "Ficou alguma dúvida?",
  support:
    "Se não estiver aqui, fale direto com a gente no WhatsApp.",
  items: [
    {
      q: "A IA vai atender meus pacientes sozinha? E se ela errar?",
      a: "Vai, com as informações que você ensinar: procedimentos, valores, horários e regras da sua clínica. Você acompanha todas as conversas, ajusta as respostas quando quiser e define quando a conversa passa para uma pessoa da equipe.",
    },
    {
      q: "Preciso trocar o número do WhatsApp?",
      a: "Não. A alwayson.ai conecta o número que a clínica já usa, pela conexão oficial da Meta. O app no celular continua funcionando normalmente.",
    },
    {
      q: "Quanto tempo leva para colocar no ar?",
      a: "O diagnóstico mapeia sua operação em cerca de 2 minutos. A partir daí, montamos o agente de IA com os seus procedimentos, valores e regras, testamos os cenários e entregamos funcionando.",
    },
    {
      q: "A equipe precisa aprender a usar alguma coisa?",
      a: "A equipe não precisa aprender nada novo. O atendimento acontece no WhatsApp, que ela já usa. O painel é opcional — quem quiser acompanhar em tempo real, acompanha.",
    },
    {
      q: "Como o diagnóstico vira uma conversa de verdade?",
      a: "Ao final, você continua pelo WhatsApp com a nossa equipe. As respostas do diagnóstico já vão junto, então começamos entendendo o seu cenário em vez de refazer tudo do zero.",
    },
    {
      q: "Funciona para clínicas de qualquer tamanho?",
      a: "Funciona. O agente de IA é ajustado ao tamanho da operação: uma unidade ou várias, uma recepção ou uma equipe comercial inteira.",
    },
    {
      q: "E se não fizer sentido para a minha clínica?",
      a: "Então a gente diz. O diagnóstico serve justamente para descobrir isso com clareza — antes de qualquer proposta. Sem apresentação genérica e sem compromisso.",
    },
  ],
};

// ── Fechamento ──────────────────────────────────────────────────────────────
export const closing = {
  line1: "Seu próximo paciente pode já estar no WhatsApp.",
  line2: [
    { t: "A diferença está no que acontece " },
    { t: "depois que ele chega", hi: true },
    { t: "." },
  ] as Seg[],
};

// ── Rodapé ──────────────────────────────────────────────────────────────────
export const footer = {
  description: "Atendimento inteligente para clínicas.",
  columns: [
    {
      title: "Produto",
      links: [
        { label: "Recursos", href: "#recursos" },
        { label: "Cases reais", href: "#depoimentos" },
        { label: "Painel da clínica", href: "#painel" },
        { label: "Agenda integrada", href: "#agenda" },
      ],
    },
    {
      title: "Suporte",
      links: [
        { label: "Perguntas frequentes", href: "#faq" },
        {
          label: "Falar com um especialista",
          href: "https://wa.me/5564999877992",
        },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Termos de Serviço", href: "#" },
        { label: "Política de Privacidade", href: "#" },
        { label: "Jurídico: juridico@alwayson.ai", href: "mailto:juridico@alwayson.ai" },
      ],
    },
  ],
};
