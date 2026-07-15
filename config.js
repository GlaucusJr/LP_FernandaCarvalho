/* ============================================================================
   CONFIG.JS — Adaptado para a psicanalista
   ÚNICO ARQUIVO DE CONTEÚDO A EDITAR para cada novo cliente.
   ============================================================================ */

/* ------------------------------------------------------------------------
   1. DADOS DO PROFISSIONAL
------------------------------------------------------------------------ */
const CONFIG = {

  // Identidade
  nome: "Dra. Ana Paula Mello",
  genero: "feminino",
  crp: "CRP 06/123456",
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
  telefone: "(11) 99999-0000",
  whatsapp: "5511999990000",
  whatsappMensagemPadrao: "Olá! Encontrei seu site e gostaria de saber mais sobre os atendimentos.",
  instagram: "https://instagram.com/",
  email: "contato@exemplo.com.br",

  // Endereço / Local
  endereco: "Rua Exemplo, 100 — Jardim Paulista, São Paulo - SP",
  cep: "01310-000",
  googleMaps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0!2d-46.65!3d-23.56!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSão+Paulo!5e0!3m2!1spt-BR!2sbr!4v1700000000000",
  googleMapsLink: "https://maps.google.com/?q=Jardim+Paulista,+São+Paulo+-+SP",

  // Marca
  urlSite: "https://www.exemplo.com.br",

  // -----------------------------------------------------------------------
  // PALETA DE CORES DA PSICANALISTA
  // -----------------------------------------------------------------------
  corPrimaria:        "#1A4A5B",   // Água Profunda — primária
  corPrimariaEscura:  "#0E3340",   // Água Profunda — escura
  corSecundaria:      "#D6EEE9",   // Água Profunda — secundária pastel
  corCTA:             "#2E9E88",   // Água Profunda — CTA verde-água
  corCTAEscura:       "#238A76",   // Água Profunda — CTA hover
  corBackground:      "#F2F9F8",   // Água Profunda — fundo geral
  corTexto:           "#243840",   // Água Profunda — texto principal
  corCinza:           "#5A6E74",   // Texto secundário

  // Escritos (blog)
  blogTitulo: "Escritos",
  blogSubtitulo: "Reflexões sobre a escuta, o inconsciente e os sentidos da vida.",
  blogDescricaoSEO: "Escritos sobre psicanálise, escuta e subjetividade.",

  // Hero — dois títulos + subheadline
  headline1: "Nem todo sofrimento precisa ser suportado sozinho.",
  headline2: "Este é um lugar onde sua história pode ser escutada, no seu tempo.",
  subheadline: "A análise é um espaço onde a palavra pode encontrar lugar. Um tempo para compreender a própria história, elaborar conflitos e construir novos sentidos para aquilo que se vive.",

  // Sobre mim
  sobreMim: "Sou psicanalista com formação em psicanálise clínica de orientação freudo-lacaniana. Atendo adultos em sofrimento psíquico, buscando oferecer um espaço de escuta singular — um lugar onde cada pessoa possa se dizer e, a partir disso, encontrar novos caminhos.",

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
    titulo: "Minha formação",
    resumo: "Trajetória acadêmica e clínica.",
    conteudo: CONFIG.minhaFormacao.conteudo,
  },
  {
    icone: "escuta",
    titulo: "Minha escuta",
    resumo: "Como acontece a escuta analítica.",
    conteudo: CONFIG.minhaEscuta.conteudo,
  },
  {
    icone: "atendimentos",
    titulo: "Os atendimentos",
    resumo: "Como funciona, presencial e online.",
    conteudo: CONFIG.osAtendimentos.conteudo,
  },
  {
    icone: "escritos",
    titulo: "Escritos",
    resumo: "Reflexões sobre psicanálise.",
    conteudo: "Os Escritos são um espaço onde compartilho reflexões sobre a escuta, a clínica e a vida psíquica. Não são artigos acadêmicos — são pensamentos que surgem da prática e da leitura, escritos para quem quer se aproximar da psicanálise de um jeito acessível.",
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
    conteudo: "Quando a vida parece ser vivida para os outros — para não decepcioná-los, para ser amado, para não criar conflito — algo do próprio desejo fica silenciado. A análise pode ajudar a escutar o que você quer, mais além do que esperam de você.",
  },
  {
    texto: "Percebe que repete os mesmos conflitos.",
    conteudo: "Relações que terminam sempre do mesmo jeito. Situações que se repetem mesmo quando tudo parece diferente. A psicanálise parte do princípio de que essas repetições têm sentido — e que é possível compreendê-las para sair delas.",
  },
  {
    texto: "Atravessa um período de ansiedade ou angústia.",
    conteudo: "A angústia é um sinal de que algo no sujeito precisa de atenção. Ela não é um defeito a ser corrigido, mas uma mensagem que merece ser escutada. A análise oferece um espaço para que essa escuta aconteça, com tempo e sem pressa.",
  },
  {
    texto: "Está vivendo um luto ou uma mudança importante.",
    conteudo: "Perdas, separações, mudanças de fase — esses momentos podem mobilizar muito. Elaborar uma perda não é esquecê-la, mas encontrar um lugar para ela na própria história. A análise acompanha esse processo.",
  },
  {
    texto: "Sente que perdeu o contato consigo mesmo.",
    conteudo: "Uma sensação de que a vida está passando sem que você esteja nela de verdade. De que algo falta, mas você não sabe o quê. A análise pode ser um espaço para reencontrar o fio da própria história.",
  },
  {
    texto: "Busca um lugar onde possa falar e ser escutado.",
    conteudo: "Às vezes o que mais falta é simplesmente um espaço onde se possa dizer o que se pensa, sem julgamento e sem pressa por respostas. A análise é exatamente isso: um lugar de palavra e escuta.",
  },
];

/* ------------------------------------------------------------------------
   4. FAQ
------------------------------------------------------------------------ */
const FAQ = [
  { pergunta: "Como funciona a análise online?", resposta: "As sessões acontecem por videochamada, em plataforma segura, com a mesma presença e qualidade do atendimento presencial. O ambiente que você cria do seu lado também faz parte do espaço analítico." },
  { pergunta: "Qual a duração e frequência das sessões?", resposta: "As sessões têm duração variável — na psicanálise, o tempo não é fixo como em outras abordagens. A frequência costuma ser semanal, podendo variar conforme o processo de cada analisando." },
  { pergunta: "Planos de saúde são aceitos?", resposta: "O atendimento é particular. Ao final de cada mês pode ser fornecido recibo para reembolso, caso seu convênio ofereça essa opção." },
  { pergunta: "Como agendar uma primeira conversa?", resposta: "O contato inicial acontece pelo WhatsApp. Conversamos brevemente sobre como funciona, tiramos dúvidas e agendamos uma entrevista inicial sem compromisso." },
  { pergunta: "As sessões são sigilosas?", resposta: "Sim. O sigilo profissional é garantido conforme o Código de Ética do Psicólogo e os princípios éticos da psicanálise." },
  { pergunta: "Psicanálise e psicologia são a mesma coisa?", resposta: "A psicanálise é uma das abordagens dentro da psicologia, mas tem fundamentos, técnica e objetivos próprios. Enquanto outras abordagens buscam modificar comportamentos ou aliviar sintomas, a psicanálise propõe escutar o que está por trás deles." },
];

/* ------------------------------------------------------------------------
   5. DEPOIMENTOS
------------------------------------------------------------------------ */
const DEPOIMENTOS = [
  { nome: "Mariana T.", idade: 34, texto: "Foi a primeira vez que senti que podia falar sem precisar explicar tudo nem ser julgada. A escuta é muito diferente.", estrelas: 5 },
  { nome: "Rodrigo A.", idade: 41, texto: "A análise me ajudou a perceber padrões que eu nem enxergava mais. Um processo que vale cada sessão.", estrelas: 5 },
  { nome: "Camila R.", idade: 29, texto: "Recomendo muito. As sessões online funcionam muito bem e o cuidado é imenso.", estrelas: 5 },
];
