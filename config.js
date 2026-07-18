/* ============================================================================
   CONFIG.JS — Adaptado para a psicanalista
   ÚNICO ARQUIVO DE CONTEÚDO A EDITAR para cada novo cliente.
   ============================================================================ */

/* ------------------------------------------------------------------------
   1. DADOS DO PROFISSIONAL
------------------------------------------------------------------------ */
const CONFIG = {

  // Identidade
  nome: "Fernanda Carvalho",
  genero: "feminino",
  crp: "",
  especialidade: "Psicanalista",
  cidade: "São Paulo",
  estado: "SP",

  // Imagens
  fotoPrincipal: "./assets/hero.png",
  fotoSobreMim: "./assets/sobre mim.png",
  logoSemFundo: "./assets/logo_semfundo.png",
  ogImage: "./assets/hero.png",
  favicon: "./assets/favicon.png",

  // Contato
  telefone: "(12) 98205-2447",
  whatsapp: "5512982052447",
  whatsappMensagemPadrao: "Olá! Encontrei seu site e gostaria de saber mais sobre os atendimentos.",
  instagram: "https://www.instagram.com/psifernandacarvalho.br?igsh=MXB4bGE1OGJheXZ1bg==",
  email: "contatopsifernandacarvalho@hotmail.com",

  // Endereço / Local
  endereco: "Pindamonhangaba - SP",
  cep: "12400-900",
  googleMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470491.1464257471!2d-45.818249780535936!3d-22.887091951498146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ccf035c90d8779%3A0x777b9d2b6f79519!2sPindamonhangaba%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1784385156883!5m2!1spt-BR!2sbr",
  googleMapsLink: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d470491.1464257471!2d-45.818249780535936!3d-22.887091951498146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ccf035c90d8779%3A0x777b9d2b6f79519!2sPindamonhangaba%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1784385156883!5m2!1spt-BR!2sbr",

  // Marca
  urlSite: "https://www.psifernandacarvalho.online",

  // -----------------------------------------------------------------------
  // PALETA DE CORES DA PSICANALISTA
  // -----------------------------------------------------------------------
  corPrimaria:        "#1A4A5B",   // Azul Petróleo — primária
  corPrimariaEscura:  "#0E3340",   // Azul Petróleo — escura
  corSecundaria:      "#C8DCE4",   // Azul Petróleo — secundária (petróleo claro médio)
  corCTA:             "#1A4A5B",   // Azul Petróleo — CTA (botões principais)
  corCTAEscura:       "#0E3340",   // Azul Petróleo — CTA hover
  corBackground:      "#E8F2F6",   // Azul Petróleo — fundo clarinho predominante
  corTexto:           "#0E3340",   // Texto principal (petróleo escuro)
  corCinza:           "#4A6572",   // Texto secundário

  // Escritos (blog)
  blogTitulo: "Escritos",
  blogSubtitulo: "Reflexões sobre a escuta, o inconsciente e os sentidos da vida.",
  blogDescricaoSEO: "Escritos sobre psicanálise, escuta e subjetividade.",

  // Hero — dois títulos + subheadline
  headline1: "Nem todo sofrimento precisa ser suportado sozinho.",
  headline2: "Este é um lugar onde sua história pode ser escutada, no seu tempo.",
  subheadline: "A análise é um espaço onde a palavra pode encontrar lugar. Um tempo para compreender a própria história, elaborar conflitos e construir novos sentidos para aquilo que se vive.",

  // Sobre mim
  sobreMim: "Sou psicanalista, com formação em Psicanálise Clínica fundamentada na obra de Freud e Lacan. Atendo adolescentes e adultos, oferecendo um espaço de escuta singular, onde cada pessoa possa se dizer e elaborar, no seu próprio tempo, aquilo que vive.",

  // Cards "Quem eu sou" — conteúdo dos modais
  minhaFormacao: {
    titulo: "Minha formação",
    conteudo: "Graduação em Psicologia, com especialização em Psicanálise de orientação freudo-lacaniana. Formação complementar em clínica do sofrimento contemporâneo e escuta analítica de crianças e adolescentes."
  },
  minhaEscuta: {
    titulo: "Minha escuta",
    conteudo: "Acredito que cada sujeito carrega uma história única, que precisa ser dita para poder ser elaborada. A escuta analítica não interpreta de fora — ela acompanha, sustenta e oferece espaço para que o próprio sujeito descubra o que não sabia que sabia."
  },
  osAtendimentos: {
    titulo: "Os atendimentos",
    conteudo: "Atendo presencialmente em São Paulo e online para todo o Brasil. As sessões têm frequência semanal, com duração variável conforme o processo de cada analisando. O primeiro contato acontece por WhatsApp, onde conversamos sobre como funciona e agendamos uma entrevista inicial."
  },

  atendimentoOnline: true,
  atendimentoPresencial: true,
  anosExperiencia: 8,

  // "Como funciona" → "Quando a análise pode fazer sentido"
  quandoFazSentido: {
    headline: "Quando a análise pode fazer sentido",
    intro: "A análise pode ser um espaço para quem deseja compreender melhor a própria história e os sentidos do que está vivendo.",
  },
};

/* ------------------------------------------------------------------------
   2. CARDS "QUEM EU SOU" (Sobre Mim)
   Cada card abre um modal com título + conteudo.
------------------------------------------------------------------------ */
const QUEM_EU_SOU_CARDS = [
  {
    icone: "formacao",
    titulo: "Minha trajetória",
    resumo: "Formação e percurso acadêmico.",
    conteudo: `<p>Minha formação foi construída a partir do encontro entre diferentes áreas do conhecimento. A experiência na saúde, os estudos em teologia, filosofia, literatura e, principalmente, a psicanálise contribuíram para a forma como compreendo a singularidade de cada história.</p><p>Entendo a formação do psicanalista como um processo contínuo. Por isso, mantenho meus estudos por meio de supervisão clínica, grupos de leitura e cursos de atualização permanentes.</p><br><strong>Formação</strong><ul><li>Graduação em Farmácia.</li><li>Bacharelado em Teologia.</li><li>Estudos em Filosofia e Letras.</li><li>Pós-graduações em Literatura Brasileira e Literatura Universal.</li><li>Formação em Psicanálise Clínica pelo Instituto Andréia Vermont – IAV.</li><li>Especialização em TEA, TDAH e Neurociências pelo Instituto Andrea Vermont – IAV.</li><li>Graduanda em Psicologia.</li></ul><br><strong>Formação continuada</strong><ul><li>Supervisão clínica no Instituto Suziani Lemos – ISL.</li><li>Grupo permanente de estudos em Psicanálise no ISL.</li><li>Mentoria e Consultorias pelo ISL.</li><li>Formação continuada pela Escola Fluminense de Psicanálise – ESFLUP.</li><li>Cursos de aprofundamento com a Dra. Fernanda Samico.</li><li>Estudos e cursos promovidos pela ESPcast.</li><li>Participação em seminários, grupos de leitura e atividades de atualização em Psicanálise.</li></ul>`,
  },
  {
    icone: "escuta",
    titulo: "Como compreendo a análise",
    resumo: "O que orienta minha escuta clínica.",
    conteudo: `<p>Acredito que toda história merece um lugar onde possa ser escutada.</p><p>Nem sempre encontramos, na vida cotidiana, um espaço onde seja possível falar sem a necessidade de corresponder a expectativas, justificar sentimentos ou encontrar respostas imediatas.</p><p>A análise oferece esse espaço. Um encontro sustentado pela escuta, no qual cada pessoa pode construir, pouco a pouco, novos sentidos para sua própria história.</p><p>Acredito que o sofrimento não se apresenta da mesma forma para todos. Ainda que duas pessoas vivam experiências semelhantes, cada uma atribui sentidos diferentes ao que vive. Por isso, cada processo analítico é singular. Não há respostas prontas nem interpretações que sirvam para todos.</p><p>Não compreendo a análise como um lugar onde alguém diz ao outro quem ele é. Compreendo-a como um encontro em que, pela palavra e pela escuta, cada pessoa pode descobrir algo novo sobre si mesma.</p><p>Meu compromisso é sustentar esse espaço com ética, respeito e atenção ao tempo de cada pessoa.</p>`,
  },
  {
    icone: "escritos",
    titulo: "Escritos",
    resumo: "Reflexões sobre psicanálise e literatura.",
    conteudo: `<p>Um espaço onde compartilho reflexões sobre psicanálise, literatura e temas da experiência humana.</p><p>Os textos reunidos aqui nasceram de leituras, da prática clínica e das perguntas que atravessam o cotidiano. São convites à reflexão, não respostas prontas.</p>`,
    link: "escritos.html",
  },
];

/* ------------------------------------------------------------------------
   3. TÓPICOS CLICÁVEIS — "Quando a análise pode fazer sentido"
   Cada tópico abre um modal com mais informação.
------------------------------------------------------------------------ */
const QUANDO_FAZ_SENTIDO = [
  {
    texto: "Você vive tentando corresponder às expectativas dos outros.",
    conteudo: "Quando a vida parece ser vivida para os outros — para não decepcionar, para ser amado ou para evitar conflitos —, é comum nos afastarmos daquilo que faz sentido para nós. A análise é um espaço para reencontrar essa escuta.",
  },
  {
    texto: "Percebe que repete os mesmos conflitos.",
    conteudo: "As pessoas mudam. As circunstâncias também. Ainda assim, algumas histórias parecem se repetir. A análise é um espaço para olhar essas repetições com mais cuidado e compreender o que elas podem estar dizendo sobre a sua história.",
  },
  {
    texto: "Atravessa um período de ansiedade ou angústia.",
    conteudo: "A ansiedade e a angústia nem sempre podem ser explicadas de imediato. Às vezes, elas apenas indicam que algo precisa ser escutado com mais cuidado. A análise oferece esse espaço de escuta, respeitando o tempo e a singularidade de cada história.",
  },
  {
    texto: "Está vivendo um luto ou uma mudança importante.",
    conteudo: "Perdas, separações e mudanças importantes podem nos atravessar de maneiras muito diferentes. Elaborar uma perda não é esquecê-la, mas permitir que ela encontre um lugar na própria história. A análise oferece um espaço onde esse processo pode acontecer com tempo, escuta e respeito.",
  },
  {
    texto: "Sente que perdeu o contato consigo mesmo.",
    conteudo: "Há momentos em que seguimos vivendo, cumprindo compromissos e atravessando os dias, mas com a sensação de estarmos distantes de nós mesmos. A análise oferece um espaço para que essa distância possa ser escutada e compreendida.",
  },
  {
    texto: "Busca um lugar onde possa falar e ser escutado.",
    conteudo: "Nem sempre é fácil encontrar um espaço onde possamos falar livremente, sem medo de sermos julgados ou de precisarmos ter todas as respostas. A análise oferece um tempo e um lugar para que a palavra encontre escuta.",
  },
];

/* ------------------------------------------------------------------------
   4. FAQ
------------------------------------------------------------------------ */
const FAQ = [
  { pergunta: "Como acontecem as sessões?", resposta: "As sessões são realizadas semanalmente, em dia e horário previamente combinados. Cada encontro é um espaço de escuta e elaboração, construído de acordo com a singularidade de cada pessoa." },
  { pergunta: "As sessões são online?", resposta: "Sim. Os atendimentos acontecem por videochamada, em um ambiente reservado e sigiloso. Essa modalidade permite que pessoas de diferentes cidades e países possam realizar sua análise." },
  { pergunta: "Onde acontecem os atendimentos presenciais?", resposta: "Os atendimentos presenciais podem ser realizados em Pindamonhangaba ou Taubaté, mediante disponibilidade e agendamento prévio. Caso essa modalidade seja de seu interesse, entre em contato para verificarmos a possibilidade." },
  { pergunta: "Quanto tempo dura cada sessão?", resposta: "Cada sessão tem, em média, 50 minutos." },
  { pergunta: "Como faço para agendar o primeiro encontro?", resposta: "Você pode entrar em contato pelo WhatsApp para esclarecer dúvidas, verificar a disponibilidade de horários e agendar a primeira sessão." },
  { pergunta: "As conversas são sigilosas?", resposta: "Sim. O sigilo é um dos princípios fundamentais da prática psicanalítica e faz parte do compromisso ético que sustenta todo o processo analítico." },
  { pergunta: "Qual é a frequência dos encontros?", resposta: "Os encontros costumam acontecer semanalmente. A frequência é definida de acordo com o processo e as necessidades de cada pessoa." },
  { pergunta: "O atendimento é destinado a quem?", resposta: "Atendo adolescentes e adultos. Os atendimentos são realizados principalmente na modalidade online. Em casos específicos, há possibilidade de atendimento presencial, mediante disponibilidade e agendamento prévio." },
  { pergunta: "Os planos de saúde são aceitos?", resposta: "Os atendimentos são particulares. No momento, não realizo atendimentos por convênios ou planos de saúde." },
  { pergunta: "Preciso saber exatamente o que está acontecendo comigo para começar uma análise?", resposta: "Não. Muitas pessoas procuram a análise sem conseguir explicar exatamente o que estão vivendo. O processo também é um espaço para construir essa compreensão, pouco a pouco." },
];

/* ------------------------------------------------------------------------
   5. DEPOIMENTOS
------------------------------------------------------------------------ */
const DEPOIMENTOS = [
  { nome: "Mariana T.", idade: 34, texto: "Foi a primeira vez que senti que podia falar sem precisar explicar tudo nem ser julgada. A escuta é muito diferente.", estrelas: 5 },
  { nome: "Rodrigo A.", idade: 41, texto: "A análise me ajudou a perceber padrões que eu nem enxergava mais. Um processo que vale cada sessão.", estrelas: 5 },
  { nome: "Camila R.", idade: 29, texto: "Recomendo muito. As sessões online funcionam muito bem e o cuidado é imenso.", estrelas: 5 },
];