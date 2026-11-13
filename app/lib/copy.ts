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
    { label: "Resultados", href: "#resultados" },
    { label: "Perguntas", href: "#faq" },
  ],
  login: "Entrar na plataforma",
  cta: "Fazer diagnóstico",
};

// ── Hero ────────────────────────────────────────────────────────────────────
export const hero = {
  badges: [
    { label: "Feito para clínicas de saúde", kind: "outline" as const },
    { label: "Novo: Diagnóstico da sua clínica", kind: "new" as const },
  ],
  titleLine1: "Seu paciente chega no WhatsApp.",
  titleLine2: "A resposta chega na hora.",
  support:
    "A IA da alwayson.ai responde na hora, tira dúvidas, qualifica o paciente e marca o horário. Sua equipe só entra quando a venda está pronta.",
  cta: "FAZER DIAGNÓSTICO GRÁTIS",
  ctaMicro: "Leva cerca de 2 minutos. Sem compromisso.",
  facts: [
    { label: "Resposta em segundos", detail: "a qualquer hora do dia" },
    { label: "Lead qualificado", detail: "com contexto e intenção" },
    { label: "Horário marcado", detail: "direto na sua agenda" },
  ],
};

// ── Marquee de clientes ─────────────────────────────────────────────────────
export const marquee = {
  headline: "Clínicas que já atendem com IA todos os dias",
  names: [
    "Júlia Marinho · Estética",
    "Giuliano Clovalski · Implante",
    "Larissa Otorrino · Otorrinolaringologia",
    "Doutora Camila Sousa · Odontologia",
  ],
};

// ── Recursos ────────────────────────────────────────────────────────────────
export const features = {
  kicker: "O sistema completo",
  title: "Não é só uma IA respondendo seu WhatsApp.",
  titleHi: "É o atendimento inteiro trabalhando junto.",
  support:
    "Você monta sem programar, conecta com as ferramentas que já usa e acompanha cada resultado em tempo real. Sem contratar ninguém.",
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
      body: "Faz as perguntas certas, identifica o procedimento de interesse, registra a origem e separa quem está pronto para comprar de quem ainda não.",
      bullets: ["Origem registrada", "Procedimento identificado", "Intenção mapeada"],
    },
    {
      tag: "03",
      title: "Agenda sozinho",
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

// ── Números ─────────────────────────────────────────────────────────────────
export const metrics = {
  kicker: "O resultado na prática",
  title: "Números de uma operação rodando.",
  support:
    "Não é promessa. É o painel de uma clínica que atende, qualifica e agenda todos os dias.",
  image: "/produto/numeros_atendimentos.png",
  imageAlt:
    "Visão geral do atendimento no WhatsApp — atendimentos iniciados, agendamentos gerados e taxa de conversão",
  stats: [
    { value: "342", label: "Atendimentos iniciados", hint: "Total de conversas iniciadas no WhatsApp" },
    { value: "264", label: "Agendamentos gerados", hint: "Conversas que viraram agendamento" },
    { value: "77,2%", label: "Taxa de conversão", hint: "Percentual de atendimentos que viraram agendamento" },
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
      quote: "Quanto custa o implante?",
      answer:
        "Responde com o valor que você ensinou, explica o que está incluso, fala de parcelamento e já puxa o próximo passo.",
      image: "/produto/leads_e_procedimentos_odontologia.png",
    },
    {
      name: "Estética",
      quote: "Tem horário essa semana?",
      answer:
        "Consulta a sua agenda, oferece os horários livres e marca sem ninguém da equipe encostar no celular.",
      image: "/produto/leads_e_procedimentos_esteticista.png",
    },
    {
      name: "Clínica geral",
      quote: "Vocês atendem convênio?",
      answer:
        "Informa as regras do seu consultório, explica as condições de pagamento e segue com o pedido do paciente.",
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
      image: "/proofs/julia.png",
      width: 600,
      height: 404,
      highlight: "Desafogou muitooo",
    },
    {
      name: "Giuliano Clovalski",
      profession: "Implante",
      image: "/proofs/giuliano.png",
      width: 600,
      height: 405,
      highlight: "Ontem mesmo a IA marcou 12 consultas",
    },
    {
      name: "Larissa Otorrino",
      profession: "Otorrino",
      image: "/proofs/larissa.png",
      width: 600,
      height: 400,
      highlight: "não contratei uma atendente não, foi uma sócia kkk",
    },
    {
      name: "Doutora Camila Sousa",
      profession: "Dentista",
      image: "/proofs/camilla.png",
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
    "Se não estiver aqui, o diagnóstico faz o resto — respondemos direto no WhatsApp.",
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
        { label: "Como funciona", href: "#como-funciona" },
        { label: "Recursos", href: "#recursos" },
        { label: "Resultados", href: "#resultados" },
        { label: "Diagnóstico", href: "#diagnostico" },
      ],
    },
    {
      title: "Suporte",
      links: [
        { label: "Perguntas frequentes", href: "#faq" },
        { label: "Entrar na plataforma", href: "#" },
        { label: "Falar com um especialista", href: "#diagnostico" },
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
