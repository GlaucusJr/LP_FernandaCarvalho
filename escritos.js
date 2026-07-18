/* ============================================================================
   ESCRITOS.JS — Blog da psicanalista
   Leitores: apenas leitura. Admin: e-mail + senha via Firebase.
============================================================================ */

/* ── FIREBASE ── */
firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();
const db   = firebase.firestore();

let currentUser = null;

/* ── HELPERS ── */
function isAdmin() { return !!currentUser && currentUser.uid === ADMIN_UID; }

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

function fmtDate(ts) {
  if (!ts || !ts.toDate) return '';
  return ts.toDate().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}
function escapeHTML(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('visible');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove('visible'), 3200);
}
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
function hideLoader() {
  const l = document.getElementById('loader');
  if (l) l.classList.add('hidden');
}

/* ── ÍCONES ── */
const ICONS = {
  edit:      '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/>',
  trash:     '<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  postIcon:  '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  key:       '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 3-9.6 9.6"/><path d="m15.5 7.5 3 3M18 5l3 3"/>',
};
function iconSVG(name) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
    style="width:18px;height:18px;display:inline-block;vertical-align:middle;">
    ${ICONS[name] || ''}
  </svg>`;
}

/* ── MOBILE MENU (FIX: nunca era inicializado na página de escritos) ── */
function initMobileMenu() {
  const toggle  = document.getElementById('menu-toggle');
  const nav     = document.getElementById('nav-mobile');
  const overlay = document.getElementById('nav-overlay');
  if (!toggle || !nav || !overlay) return;

  function closeMenu() {
    toggle.classList.remove('open');
    nav.classList.remove('open');
    overlay.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  function openMenu() {
    toggle.classList.add('open');
    nav.classList.add('open');
    overlay.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  toggle.addEventListener('click', () => nav.classList.contains('open') ? closeMenu() : openMenu());
  overlay.addEventListener('click', closeMenu);
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}

/* ── HEADER SCROLL ── */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ── ADMIN AUTH BAR ── */
function renderAdminBar() {
  const bar     = document.getElementById('admin-bar');
  const authBar = document.getElementById('admin-auth-bar');
  if (!authBar) return;

  if (isAdmin()) {
    if (bar) bar.classList.add('visible');
    authBar.innerHTML = `
      <div style="display:flex;gap:8px;">
        <button class="btn btn-outline btn-sm" id="btn-go-admin">Painel Admin</button>
        <button class="btn btn-outline btn-sm" id="btn-signout" style="opacity:.8;">Sair</button>
      </div>`;
    document.getElementById('btn-go-admin').addEventListener('click', () => { window.location.href = 'admin.html'; });
    document.getElementById('btn-signout').addEventListener('click', () => auth.signOut());
  } else {
    if (bar) bar.classList.remove('visible');
    authBar.innerHTML = `
      <button class="btn-admin-login" id="btn-admin-login"
        title="Área administrativa" aria-label="Acesso administrativo">
        ${iconSVG('key')}
      </button>`;
    document.getElementById('btn-admin-login').addEventListener('click', () => { window.location.href = 'admin.html'; });
  }
}

/* ── CONTEÚDO ESTÁTICO DO CONFIG ── */
function renderBlogHeader() {
  const titleEl = document.getElementById('blog-title');
  const subEl   = document.getElementById('blog-subtitle');
  if (titleEl) titleEl.textContent = CONFIG.blogTitulo   || 'Escritos';
  if (subEl)   subEl.textContent   = CONFIG.blogSubtitulo || '';
  document.title = `${CONFIG.blogTitulo || 'Escritos'} | ${CONFIG.nome}`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', CONFIG.blogDescricaoSEO || CONFIG.blogSubtitulo || '');

  /* Logo fallback com nome da profissional */
  const nameEl = document.getElementById('escritos-logo-name');
  if (nameEl) nameEl.textContent = CONFIG.nome || '';
}

function renderFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── FIREBASE AUTH ── */
/* Fallback: esconde o loader após 5s caso o Firebase trave */
setTimeout(hideLoader, 5000);

auth.onAuthStateChanged(user => {
  currentUser = user;
  applyTheme();
  renderAdminBar();
  hideLoader(); /* ← loader some aqui, assim que o Firebase responde */

  const postId = getQueryParam('post');
  if (postId) {
    loadPostDetail(postId);
  } else {
    closePostDetail();
    loadPostsList();
  }
});

/* ── LISTAGEM DE POSTS ── */
function loadPostsList() {
  const grid = document.getElementById('posts-grid');
  if (!grid) return;
  grid.innerHTML = '<p style="opacity:.5;text-align:center;padding:40px 0;">Carregando…</p>';

  let query = db.collection('posts').orderBy('createdAt', 'desc');
  if (!isAdmin()) query = query.where('published', '==', true);

  query.onSnapshot(snap => {
    if (snap.empty) {
      grid.innerHTML = `
        <div class="empty-state">
          ${iconSVG('postIcon')}
          <p style="margin-top:12px;">
            ${isAdmin()
              ? 'Nenhum artigo ainda. Clique em "Novo post" para começar.'
              : 'Em breve, novos textos e reflexões por aqui.'}
          </p>
        </div>`;
      return;
    }
    grid.innerHTML = snap.docs.map(doc => renderPostCard(doc.id, doc.data())).join('');
    attachCardEvents();
  }, err => {
    console.error(err);
    grid.innerHTML = '<p style="opacity:.5;text-align:center;padding:40px 0;">Não foi possível carregar os artigos.</p>';
  });
}

function renderPostCard(id, post) {
  return `
    <article class="post-card" data-id="${id}">
      ${!post.published ? '<span class="post-card-draft-badge">Rascunho</span>' : ''}
      ${isAdmin() ? `
        <div class="post-card-admin-actions">
          <button class="edit-btn"   data-id="${id}" aria-label="Editar">${iconSVG('edit')}</button>
          <button class="delete-btn" data-id="${id}" aria-label="Excluir">${iconSVG('trash')}</button>
        </div>` : ''}
      <div class="post-card-header">
        <img class="post-card-avatar"
          src="${CONFIG.logoSemFundo || CONFIG.fotoPrincipal}"
          alt="${escapeHTML(CONFIG.nome)}" loading="lazy">
        <div class="post-card-header-info">
          <span class="post-card-author">${escapeHTML(CONFIG.nome)}</span>
          <span class="post-card-date">${fmtDate(post.createdAt)}</span>
        </div>
      </div>
      <a href="?post=${id}" class="post-card-link">
        ${post.coverImage
          ? `<div class="post-card-cover">
               <img src="${post.coverImage}" alt="${escapeHTML(post.title || '')}" loading="lazy">
             </div>`
          : ''}
        <div class="post-card-body">
          <h3>${escapeHTML(post.title || 'Sem título')}</h3>
          <p class="post-card-excerpt">${escapeHTML(post.excerpt || '')}</p>
        </div>
      </a>
    </article>`;
}

function attachCardEvents() {
  document.querySelectorAll('.edit-btn').forEach(btn =>
    btn.addEventListener('click', e => { e.preventDefault(); goToAdminEditor(btn.dataset.id); }));
  document.querySelectorAll('.delete-btn').forEach(btn =>
    btn.addEventListener('click', e => { e.preventDefault(); confirmDeletePost(btn.dataset.id); }));
}

/* Redireciona para o painel admin — editor vive lá */
function goToAdminEditor(postId) {
  window.location.href = postId
    ? `admin.html?edit=${encodeURIComponent(postId)}`
    : 'admin.html?new=1';
}

/* ── POST INDIVIDUAL ── */
function loadPostDetail(postId) {
  const viewList = document.getElementById('view-list');
  const view     = document.getElementById('view-post');
  if (viewList) viewList.style.display = 'none';
  if (!view) return;

  view.style.display = 'block';
  view.innerHTML = '<p style="opacity:.5;text-align:center;padding:80px 0;">Carregando artigo…</p>';

  db.collection('posts').doc(postId).get().then(doc => {
    if (!doc.exists || (!doc.data().published && !isAdmin())) {
      view.innerHTML = '<p style="text-align:center;padding:80px 0;">Artigo não encontrado.</p>';
      return;
    }
    const post = doc.data();
    view.innerHTML = `
      <div class="container">
        <a href="escritos.html" class="back-to-blog">${iconSVG('arrowLeft')} Voltar aos Artigos</a>
        <div class="post-detail-header" style="margin-top:24px;">
          <span class="post-card-date">${fmtDate(post.createdAt)}</span>
          <h1>${escapeHTML(post.title || '')}</h1>
        </div>
        ${post.coverImage
          ? `<div class="post-detail-cover">
               <img src="${post.coverImage}" alt="${escapeHTML(post.title || '')}">
             </div>`
          : ''}
        <div class="post-detail-content">${post.contentHTML || ''}</div>
        <div class="post-detail-actions">
          <a href="escritos.html" class="back-to-blog">${iconSVG('arrowLeft')} Voltar aos Artigos</a>
          ${isAdmin() ? `
            <div style="display:flex;gap:10px;">
              <button class="btn btn-outline btn-sm" id="detail-edit-btn">
                ${iconSVG('edit')} Editar
              </button>
              <button class="btn btn-outline btn-sm" id="detail-delete-btn" style="color:#B5453A;">
                ${iconSVG('trash')} Excluir
              </button>
            </div>` : ''}
        </div>
      </div>`;

    if (isAdmin()) {
      document.getElementById('detail-edit-btn')  .addEventListener('click', () => goToAdminEditor(postId));
      document.getElementById('detail-delete-btn').addEventListener('click', () => confirmDeletePost(postId, true));
    }
  }).catch(err => {
    console.error(err);
    view.innerHTML = '<p style="text-align:center;padding:80px 0;">Erro ao carregar o artigo.</p>';
  });
}

function closePostDetail() {
  const viewPost = document.getElementById('view-post');
  const viewList = document.getElementById('view-list');
  if (viewPost) { viewPost.style.display = 'none'; viewPost.innerHTML = ''; }
  if (viewList) viewList.style.display = 'block';
}

/* ── EXCLUSÃO ── */
function confirmDeletePost(postId, fromDetail = false) {
  if (!isAdmin()) return;
  if (!confirm('Deseja realmente excluir este artigo? Esta ação não pode ser desfeita.')) return;
  db.collection('posts').doc(postId).delete()
    .then(() => {
      showToast('Artigo removido.');
      if (fromDetail) window.location.href = 'escritos.html';
    })
    .catch(err => { console.error(err); showToast('Erro ao excluir o artigo.'); });
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  renderBlogHeader();
  renderFooterYear();
  initMobileMenu();    /* FIX: menu mobile agora funciona em escritos.html */
  initHeaderScroll();  /* FIX: header scroll agora funciona em escritos.html */

  const btnNewPost = document.getElementById('btn-new-post');
  if (btnNewPost) btnNewPost.addEventListener('click', () => goToAdminEditor());
});