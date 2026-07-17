/* ============================================================================
   SCRIPT.JS — Landing page da psicanalista
   Todo o conteúdo dinâmico é montado a partir de config.js.
   ============================================================================ */

/* ------------------------------ ÍCONES ------------------------------ */
const ICONS = {
  formacao:    '<path d="M12 2l2.6 6.2L21 9l-5 4.6L17.4 21 12 17.6 6.6 21 8 13.6 3 9l6.4-.8z"/>',
  escuta:      '<path d="M4 12a8 8 0 0 1 16 0v5a2 2 0 0 1-2 2h-1v-7h3M4 12v5a2 2 0 0 0 2 2h1v-7H4"/>',
  atendimentos:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>',
  escritos:    '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  check:       '<path d="M20 6L9 17l-5-5"/>',
  whatsapp:    '<path d="M17.6 6.3A8 8 0 0 0 4 16.4L3 21l4.7-1a8 8 0 0 0 12-6.7 8 8 0 0 0-2.1-6.9z" fill="currentColor" stroke="none"/><path d="M9 10.5c.3 1.8 2.7 4.2 4.5 4.5.7.1 1.3-.4 1.6-1l.3-.7-2-1-.5.6c-1-.4-1.9-1.3-2.3-2.3l.6-.5-1-2-.7.3c-.6.3-1 .9-1 1.6z" fill="var(--primary-dark)" stroke="none"/>',
  close:       '<path d="M18 6L6 18M6 6l12 12"/>',
  arrowRight:  '<path d="M5 12h14M12 5l7 7-7 7"/>',
  star:        '<path d="M12 2l3 6.5 7 .7-5.3 4.7 1.6 6.8L12 17.3 5.7 20.7l1.6-6.8L2 9.2l7-.7z" fill="currentColor" stroke="none"/>',
  sigilo:      '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  arrowUp:     '<path d="M12 19V5M5 12l7-7 7 7"/>',
  instagram:   '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1"/>',
  calendario:  '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
};

function iconSVG(name, extraClass = '') {
  const path = ICONS[name] || ICONS.check;
  return `<svg class="${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

/* --------------------------------- TEMA --------------------------------- */
function applyTheme() {
  const r = document.documentElement.style;
  r.setProperty('--primary',      CONFIG.corPrimaria);
  r.setProperty('--primary-dark', CONFIG.corPrimariaEscura);
  r.setProperty('--secondary',    CONFIG.corSecundaria);
  r.setProperty('--accent',       CONFIG.corCTA);
  r.setProperty('--accent-dark',  CONFIG.corCTAEscura);
  r.setProperty('--background',   CONFIG.corBackground);
  r.setProperty('--text',         CONFIG.corTexto);
  r.setProperty('--gray',         CONFIG.corCinza);
}

/* --------------------------------- HELPERS --------------------------------- */
function whatsappLink(msg) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg || CONFIG.whatsappMensagemPadrao)}`;
}
function generoTexto(masc, fem) {
  return (CONFIG.genero || '').toLowerCase().startsWith('fem') ? fem : masc;
}

/* --------------------------------- HEADER (logo imagem) --------------------------------- */
function renderHeader() {
  const logoEl = document.getElementById('logo-text');
  // Usa a logo como imagem; se não carregar, cai para o nome em texto
  logoEl.innerHTML = `<img src="${CONFIG.logoSemFundo}" alt="${CONFIG.nome}" class="logo-img" onerror="this.style.display='none';this.nextSibling.style.display='inline'"><span style="display:none;">${CONFIG.nome.split(' ')[0]} <span>${CONFIG.nome.split(' ').slice(1).join(' ')}</span></span>`;

  document.querySelectorAll('.wa-link').forEach(el => el.href = whatsappLink());
  document.querySelectorAll('.wa-link-text').forEach(el => el.textContent = 'Falar no WhatsApp');
}

/* --------------------------------- HERO (foto esquerda, texto direita) --------------------------------- */
function renderHero() {
  // Mídia: ESQUERDA
  document.getElementById('hero-media').innerHTML = `
    <div class="hero-photo-wrap" data-animate="fade-right">
      <img src="${CONFIG.fotoPrincipal}" alt="Foto de ${CONFIG.nome}, ${CONFIG.especialidade}" width="640" height="800" loading="eager" fetchpriority="high">
    </div>
  `;

  // Texto: DIREITA — dois headlines + subheadline
  document.getElementById('hero-content').innerHTML = `
    <h1 class="hero-h1-main" data-animate="fade-up">${CONFIG.headline1}</h1>
    <h2 class="hero-h1-sub" data-animate="fade-up">${CONFIG.headline2}</h2>
    <p class="sub" data-animate="fade-up">${CONFIG.subheadline}</p>
    <div class="hero-actions" data-animate="fade-up">
      <a class="btn btn-primary" href="${whatsappLink()}" target="_blank" rel="noopener">${iconSVG('whatsapp')} Agendar pelo WhatsApp</a>
      <a class="btn btn-outline" href="escritos.html">${iconSVG('escritos')} Ler os Escritos</a>
    </div>
    <div class="hero-seals" data-animate="fade-up">
      <span class="seal">${iconSVG('check')} Atendimento Online</span>
      <span class="seal">${iconSVG('check')} Atendimento Presencial</span>
      <span class="seal">${iconSVG('sigilo')} Sigilo Profissional</span>
    </div>
  `;
}

/* --------------------------------- SOBRE (Quem eu sou + cards modais) --------------------------------- */
function renderAbout() {
  document.getElementById('about-photo').innerHTML = `
    <img src="${CONFIG.fotoSobreMim}" alt="${CONFIG.nome} — sobre mim" width="600" height="800" loading="lazy">
  `;

  document.getElementById('about-text').innerHTML = `
    <div class="eyebrow">Quem eu sou</div>
    <h2>Um espaço de escuta para a sua história</h2>
    <p class="lead">${CONFIG.sobreMim}</p>
    <div class="quem-cards" id="quem-cards">
      ${QUEM_EU_SOU_CARDS.map((card, i) => `
        <button class="quem-card" data-modal="quem-${i}" aria-haspopup="dialog">
          <div class="quem-card-icon">${iconSVG(card.icone)}</div>
          <div class="quem-card-body">
            <strong>${card.titulo}</strong>
            <span>${card.resumo}</span>
          </div>
          <div class="quem-card-arrow">${iconSVG('arrowRight')}</div>
        </button>
      `).join('')}
    </div>
  `;

  // Modais dos cards
  QUEM_EU_SOU_CARDS.forEach((card, i) => {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = `modal-quem-${i}`;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', card.titulo);
    modal.innerHTML = `
      <div class="modal-box modal-box-rich">
        <button class="modal-close" aria-label="Fechar">${iconSVG('close')}</button>
        <div class="modal-icon">${iconSVG(card.icone)}</div>
        <h3>${card.titulo}</h3>
        <div class="modal-rich-content">${card.conteudo}</div>
        ${card.link ? `<a href="${card.link}" class="btn btn-primary" style="margin-top:20px;align-self:flex-start;">${iconSVG('arrowRight')} Ver os Escritos</a>` : ''}
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });
  });

  document.querySelectorAll('.quem-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = `modal-${btn.dataset.modal}`;
      openModal(document.getElementById(id));
    });
  });
}

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('open');
  document.body.classList.add('modal-open');
  modal.querySelector('.modal-close').focus();
}
function closeModal(modal) {
  modal.classList.remove('open');
  document.body.classList.remove('modal-open');
}

/* --------------------------------- QUANDO FAZ SENTIDO (tópicos modais) --------------------------------- */
function renderQuandoFazSentido() {
  const section = document.getElementById('quando-section');
  if (!section) return;

  section.innerHTML = `
    <div class="container">
      <div class="section-head center">
        <div class="eyebrow">Para quem</div>
        <h2>${CONFIG.quandoFazSentido.headline}</h2>
        <p>${CONFIG.quandoFazSentido.intro}</p>
      </div>
      <div class="topicos-list" id="topicos-list">
        ${QUANDO_FAZ_SENTIDO.map((t, i) => `
          <button class="topico-item" data-modal="topico-${i}" aria-haspopup="dialog">
            <span class="topico-check" aria-hidden="true"></span>
            <span class="topico-texto">${t.texto}</span>
            <span class="topico-arrow">${iconSVG('arrowRight')}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;

  QUANDO_FAZ_SENTIDO.forEach((t, i) => {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = `modal-topico-${i}`;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', t.texto);
    modal.innerHTML = `
      <div class="modal-box">
        <button class="modal-close" aria-label="Fechar">${iconSVG('close')}</button>
        <p class="modal-topico-label">${t.texto}</p>
        <p>${t.conteudo}</p>
        <a href="${whatsappLink()}" target="_blank" rel="noopener" class="btn btn-primary" style="margin-top:24px;align-self:flex-start;">${iconSVG('whatsapp')} Entrar em contato</a>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });
  });

  document.querySelectorAll('.topico-item').forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(document.getElementById(`modal-${btn.dataset.modal}`));
    });
  });
}

/* --------------------------------- CAMINHOS PARA A ANÁLISE --------------------------------- */
const CAMINHOS_ITEMS = [
  "Quando a ansiedade parece ocupar espaço demais",
  "Quando uma perda muda a forma de viver",
  "Quando os relacionamentos se tornam fonte de sofrimento",
  "Quando algumas histórias insistem em se repetir",
  "Quando sentimos que estamos vivendo mais para os outros do que para nós mesmos",
  "Quando uma pergunta começa a insistir: <strong>O que eu desejo?</strong>",
];

function renderTestimonials() {
  const section = document.getElementById('depoimentos');
  if (!section) return;

  // Rewrite the section heading
  const headEl = section.querySelector('.section-head');
  if (headEl) {
    headEl.innerHTML = `
      <div class="eyebrow">Caminhos para a Análise</div>
      <h2>Em que momentos a análise pode fazer sentido?</h2>
    `;
  }

  const el = document.getElementById('testi-track');
  if (!el) return;

  el.className = 'caminhos-topicos';
  el.innerHTML = CAMINHOS_ITEMS.map((item, i) => `
    <div class="caminho-topico-item" data-animate="fade-up" style="transition-delay:${i * 0.07}s">
      <span class="caminho-topico-check" aria-hidden="true"></span>
      <span class="caminho-topico-texto">${item}</span>
    </div>
  `).join('');
}

/* --------------------------------- COMO DAR O PRIMEIRO PASSO --------------------------------- */
function renderPrimeiroPasso() {
  // Insert after #depoimentos section
  const depoimentosSection = document.getElementById('depoimentos');
  if (!depoimentosSection) return;

  const section = document.createElement('section');
  section.className = 'primeiro-passo-section';
  section.id = 'primeiro-passo';
  section.setAttribute('aria-labelledby', 'primeiro-passo-heading');
  section.innerHTML = `
    <div class="container">
      <div class="section-head center">
        <div class="eyebrow">Início</div>
        <h2 id="primeiro-passo-heading">Como dar o primeiro passo</h2>
      </div>
      <div class="trilha-vertical">
        <div class="trilha-vertical-spine" aria-hidden="true"></div>

        <div class="trilha-vertical-item trilha-v-left" data-animate="fade-right" style="transition-delay:0s">
          <div class="trilha-v-body">
            <h3>Entre em contato</h3>
            <p>Se desejar iniciar uma análise, entre em contato pelo WhatsApp para esclarecer dúvidas, verificar a disponibilidade de horários e agendar um primeiro encontro.</p>
          </div>
          <div class="trilha-v-center">
            <div class="trilha-v-num">01</div>
          </div>
          <div class="trilha-v-empty"></div>
        </div>

        <div class="trilha-vertical-item trilha-v-right" data-animate="fade-left" style="transition-delay:0.12s">
          <div class="trilha-v-empty"></div>
          <div class="trilha-v-center">
            <div class="trilha-v-num">02</div>
          </div>
          <div class="trilha-v-body">
            <h3>Primeiro encontro</h3>
            <p>A primeira sessão é um espaço para que você possa falar sobre o que motivou sua busca e conhecer como o trabalho analítico acontece.</p>
          </div>
        </div>

        <div class="trilha-vertical-item trilha-v-left" data-animate="fade-right" style="transition-delay:0.24s">
          <div class="trilha-v-body">
            <h3>Início do processo</h3>
            <p>Se entendermos que a análise é o caminho adequado, definiremos juntos a continuidade dos encontros.</p>
          </div>
          <div class="trilha-v-center">
            <div class="trilha-v-num">03</div>
          </div>
          <div class="trilha-v-empty"></div>
        </div>

        <div class="trilha-vertical-item trilha-v-right" data-animate="fade-left" style="transition-delay:0.36s">
          <div class="trilha-v-empty"></div>
          <div class="trilha-v-center">
            <div class="trilha-v-num">04</div>
          </div>
          <div class="trilha-v-body">
            <h3>Um percurso singular</h3>
            <p>Cada análise é única. O processo se constrói ao longo do tempo, respeitando a história e o ritmo de cada pessoa.</p>
          </div>
        </div>

      </div>
    </div>
  `;
  depoimentosSection.after(section);
}

/* --------------------------------- MINHA CLÍNICA --------------------------------- */
const CLINICA_ITEMS = [
  {
    titulo: "Escuta sem respostas prontas",
    resumo: "Um espaço para novos sentidos surgirem.",
    conteudo: "Cada pessoa chega com uma história singular. Meu trabalho não é oferecer soluções prontas, mas sustentar um espaço em que novos sentidos possam surgir. A escuta analítica não interpreta de fora — ela acompanha, sustenta e oferece um lugar para que o próprio sujeito descubra o que não sabia que sabia.",
  },
  {
    titulo: "Respeito ao tempo de cada processo",
    resumo: "Nenhum percurso é igual ao outro.",
    conteudo: "A análise acontece no ritmo de cada pessoa. Não existe um percurso igual ao outro, nem um tempo pré-determinado para que as coisas façam sentido. O processo é construído junto, respeitando a história, o momento e a singularidade de quem está na análise.",
  },
  {
    titulo: "Formação permanente",
    resumo: "Estudo contínuo como sustentação da prática.",
    conteudo: "A prática clínica é sustentada pelo estudo contínuo, pela supervisão e pela própria experiência de análise. Mantenho minha formação ativa por meio de grupos de leitura, supervisão clínica, seminários e cursos de atualização permanentes.",
  },
  {
    titulo: "Ética e confidencialidade",
    resumo: "Sigilo e respeito em cada encontro.",
    conteudo: "Toda análise acontece em um espaço de escuta comprometido com o sigilo, o respeito e a singularidade de cada história. O sigilo é um dos princípios fundamentais da prática psicanalítica e faz parte do compromisso ético que sustenta todo o processo analítico.",
  },
];

function renderMinhaClinica() {
  const primeiroPasso = document.getElementById('primeiro-passo');
  if (!primeiroPasso) return;

  const section = document.createElement('section');
  section.className = 'minha-clinica-section';
  section.id = 'minha-clinica';
  section.setAttribute('aria-labelledby', 'clinica-heading');
  section.innerHTML = `
    <div class="container">
      <div class="section-head center">
        <div class="eyebrow">Princípios</div>
        <h2 id="clinica-heading">Minha Clínica</h2>
        <p>Princípios que orientam meu trabalho</p>
      </div>
      <div class="clinica-topicos-list" id="clinica-topicos-list">
        ${CLINICA_ITEMS.map((item, i) => `
          <button class="clinica-topico-item" data-modal="clinica-${i}" aria-haspopup="dialog" data-animate="fade-up" style="transition-delay:${i * 0.08}s">
            <span class="clinica-topico-check" aria-hidden="true"></span>
            <div class="clinica-topico-body">
              <strong class="clinica-topico-titulo">${item.titulo}</strong>
              <span class="clinica-topico-resumo">${item.resumo}</span>
            </div>
            <span class="clinica-topico-arrow">${iconSVG('arrowRight')}</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
  primeiroPasso.after(section);

  // Modais dos princípios
  CLINICA_ITEMS.forEach((item, i) => {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = `modal-clinica-${i}`;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', item.titulo);
    modal.innerHTML = `
      <div class="modal-box">
        <button class="modal-close" aria-label="Fechar">${iconSVG('close')}</button>
        <p class="modal-topico-label">${item.titulo}</p>
        <p>${item.conteudo}</p>
        <a href="${whatsappLink()}" target="_blank" rel="noopener" class="btn btn-primary" style="margin-top:24px;align-self:flex-start;">${iconSVG('whatsapp')} Entrar em contato</a>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(modal); });
  });

  document.querySelectorAll('.clinica-topico-item').forEach(btn => {
    btn.addEventListener('click', () => {
      openModal(document.getElementById(`modal-${btn.dataset.modal}`));
    });
  });
}

/* --------------------------------- FAQ --------------------------------- */
function renderFAQ() {
  const el = document.getElementById('faq-list');
  if (!el) return;
  el.innerHTML = FAQ.map((f, i) => `
    <div class="faq-item">
      <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}">
        ${f.pergunta}
        <span class="icon-plus" aria-hidden="true"></span>
      </button>
      <div class="faq-answer" id="faq-answer-${i}"><p>${f.resposta}</p></div>
    </div>
  `).join('');

  el.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      el.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-question').setAttribute('aria-expanded','false');
        o.querySelector('.faq-answer').style.maxHeight = '';
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded','true');
        item.querySelector('.faq-answer').style.maxHeight = item.querySelector('.faq-answer').scrollHeight + 'px';
      }
    });
  });
}

/* --------------------------------- CTA FINAL --------------------------------- */
function renderCTAFinal() {
  const el = document.getElementById('cta-final-content');
  if (!el) return;
  el.innerHTML = `
    <div class="eyebrow">Um Convite</div>
    <h2>Toda análise começa com um primeiro encontro.</h2>
    <p>Se você acredita que este pode ser o seu momento, será um prazer caminhar ao seu lado nesse início de percurso.</p>
    <div class="cta-final-actions">
      <a class="btn btn-primary" href="${whatsappLink()}" target="_blank" rel="noopener">${iconSVG('whatsapp')} Agendar um primeiro encontro</a>
    </div>
  `;
}

/* --------------------------------- FOOTER --------------------------------- */
function renderFooter() {
  const el = document.getElementById('footer-content');
  if (!el) return;
  el.innerHTML = `
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="#top" class="logo" aria-label="Página inicial">
          <img src="${CONFIG.logoSemFundo}" alt="${CONFIG.nome}" class="logo-img logo-img-footer" onerror="this.style.display='none';this.nextSibling.style.display='inline'"><span style="display:none;">${CONFIG.nome}</span>
        </a>
        <p>${CONFIG.especialidade}</p>
        <div class="footer-social">
          ${CONFIG.instagram ? `<a href="${CONFIG.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${iconSVG('instagram')}</a>` : ''}
          <a href="${whatsappLink()}" target="_blank" rel="noopener" aria-label="WhatsApp">${iconSVG('whatsapp')}</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Navegação</h4>
        <ul>
          <li><a href="#quem-eu-sou">Quem eu sou</a></li>
          <li><a href="#quando">Quando faz sentido</a></li>
          <li><a href="#faq">Dúvidas</a></li>
          <li><a href="escritos.html">Escritos</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Contato</h4>
        <ul>
          <li><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li>
          <li><span>${CONFIG.horarios || 'Segunda a sexta, das 9h às 18h'}</span></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Localização</h4>
        <p style="margin-bottom:14px;color:rgba(255,255,255,0.7);font-size:0.9rem;">${CONFIG.endereco}</p>
        <div class="footer-map"><iframe src="${CONFIG.googleMaps}" loading="lazy" title="Localização" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} ${CONFIG.nome}. Todos os direitos reservados.</span>
      <span><a href="#">Política de Privacidade</a></span>
    </div>
  `;
}

/* --------------------------------- SEO --------------------------------- */
function renderSEO() {
  document.title = `${CONFIG.nome} | Psicanalista em ${CONFIG.cidade}`;
  const desc = `${CONFIG.nome}, psicanalista. Atendimento presencial em ${CONFIG.cidade} e online para todo o Brasil.`;
  const tag = document.querySelector('meta[name="description"]');
  if (tag) tag.setAttribute('content', desc);
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', CONFIG.urlSite);
}

/* --------------------------------- INTERAÇÕES --------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav-mobile');
  const overlay = document.getElementById('nav-overlay');
  function close() { toggle.classList.remove('open'); nav.classList.remove('open'); overlay.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); }
  function open() { toggle.classList.add('open'); nav.classList.add('open'); overlay.classList.add('open'); toggle.setAttribute('aria-expanded','true'); }
  toggle.addEventListener('click', () => nav.classList.contains('open') ? close() : open());
  overlay.addEventListener('click', close);
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 500), { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}
function initScrollAnimations() {
  const items = document.querySelectorAll('[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); observer.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  items.forEach(item => observer.observe(item));
}
function initKeyboardModal() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => closeModal(m));
    }
  });
}
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  window.addEventListener('load', () => setTimeout(() => loader.classList.add('hidden'), 350));
  setTimeout(() => loader.classList.add('hidden'), 2500);
}

/* --------------------------------- INIT --------------------------------- */
function init() {
  applyTheme();
  renderSEO();
  renderHeader();
  renderHero();
  renderAbout();
  renderQuandoFazSentido();
  renderTestimonials();
  renderPrimeiroPasso();
  renderMinhaClinica();
  renderFAQ();
  renderCTAFinal();
  renderFooter();

  initHeaderScroll();
  initMobileMenu();
  initBackToTop();
  initScrollAnimations();
  initKeyboardModal();
  initLoader();
}

document.addEventListener('DOMContentLoaded', init);
