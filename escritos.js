/* ============================================================================
   ESCRITOS.JS
   ----------------------------------------------------------------------------
   Blog simplificado sem sistema de usuários.
   - Leitores: só leem. Sem cadastro, sem login, sem comentários, sem curtidas.
   - Admin (ADMIN_UID em firebase-config.js): faz login silenciosamente com
     Google para ver e usar os controles de publicar / editar / excluir.
   ============================================================================ */

/* --------------------------------- INIT FIREBASE --------------------------------- */
firebase.initializeApp(FIREBASE_CONFIG);
const auth  = firebase.auth();
const db    = firebase.firestore();
const googleProvider = new firebase.auth.GoogleAuthProvider();

let currentUser   = null;
let quill         = null;
let editingPostId = null;

/* --------------------------------- HELPERS --------------------------------- */
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

function fmtDate(timestamp) {
  if (!timestamp || !timestamp.toDate) return '';
  return timestamp.toDate().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}
function escapeHTML(str) {
  const d = document.createElement('div'); d.textContent = str; return d.innerHTML;
}
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('visible'), 3200);
}
function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

/* --------------------------------- ÍCONES --------------------------------- */
const ICONS = {
  edit:      '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4z"/>',
  trash:     '<path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
  arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
  postIcon:  '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  google:    '<path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.7-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z"/><path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.3 7.4 24 12 24z"/><path fill="#FBBC05" d="M5.4 14.4c-.2-.7-.4-1.5-.4-2.4s.1-1.6.4-2.4V6.6H1.4A12 12 0 0 0 0 12c0 1.9.5 3.8 1.4 5.4z"/><path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.7l3.4-3.4C17.9 1.2 15.2 0 12 0 7.4 0 3.4 2.7 1.4 6.6l4 3.1C6.3 6.9 8.9 4.8 12 4.8z"/>',
};
function iconSVG(name, cls = '') {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

/* --------------------------------- AUTH ADMIN --------------------------------- */
function renderAdminBar() {
  const bar     = document.getElementById('admin-bar');
  const authBar = document.getElementById('admin-auth-bar');

  if (isAdmin()) {
    bar.classList.add('visible');
    authBar.innerHTML = `<button class="btn btn-outline btn-sm" id="btn-signout">Sair</button>`;
    document.getElementById('btn-signout').addEventListener('click', () => auth.signOut());
  } else {
    bar.classList.remove('visible');
    // Botão discreto de login para a admin — invisível para leitores comuns
    authBar.innerHTML = `<button class="btn-admin-login" id="btn-admin-login" title="Área administrativa" aria-label="Acesso administrativo">${iconSVG('google')}</button>`;
    document.getElementById('btn-admin-login').addEventListener('click', () => {
      auth.signInWithPopup(googleProvider).catch(err => {
        console.error(err);
        showToast('Não foi possível entrar.');
      });
    });
  }
}

/* --------------------------------- LISTAGEM --------------------------------- */
function loadPostsList() {
  const grid = document.getElementById('posts-grid');
  grid.innerHTML = '<p style="opacity:.6;">Carregando escritos…</p>';

  let query = db.collection('posts').orderBy('createdAt', 'desc');
  if (!isAdmin()) query = query.where('published', '==', true);

  query.onSnapshot(snap => {
    if (snap.empty) {
      grid.innerHTML = `
        <div class="empty-state">
          ${iconSVG('postIcon')}
          <p>${isAdmin() ? 'Nenhum escrito ainda. Clique em "Novo escrito" para começar.' : 'Em breve, novos escritos por aqui.'}</p>
        </div>`;
      return;
    }
    grid.innerHTML = snap.docs.map(doc => renderPostCard(doc.id, doc.data())).join('');
    attachCardEvents();
  }, err => {
    console.error(err);
    grid.innerHTML = `<p style="opacity:.6;">Não foi possível carregar os escritos agora.</p>`;
  });
}

function renderPostCard(id, post) {
  return `
    <article class="post-card" data-id="${id}">
      ${!post.published ? '<span class="post-card-draft-badge">Rascunho</span>' : ''}
      ${isAdmin() ? `
        <div class="post-card-admin-actions">
          <button class="edit-btn" data-id="${id}" aria-label="Editar">${iconSVG('edit')}</button>
          <button class="delete-btn" data-id="${id}" aria-label="Excluir">${iconSVG('trash')}</button>
        </div>` : ''}
      <div class="post-card-header">
        <img class="post-card-avatar" src="${CONFIG.logoSemFundo || CONFIG.fotoPrincipal}" alt="${escapeHTML(CONFIG.nome)}" loading="lazy">
        <div class="post-card-header-info">
          <span class="post-card-author">${escapeHTML(CONFIG.nome)}</span>
          <span class="post-card-date">${fmtDate(post.createdAt)}</span>
        </div>
      </div>
      <a href="?post=${id}" class="post-card-link">
        ${post.coverImage ? `<div class="post-card-cover"><img src="${post.coverImage}" alt="${escapeHTML(post.title || '')}" loading="lazy"></div>` : ''}
        <div class="post-card-body">
          <h3>${escapeHTML(post.title || 'Sem título')}</h3>
          <p class="post-card-excerpt">${escapeHTML(post.excerpt || '')}</p>
        </div>
      </a>
    </article>
  `;
}

function attachCardEvents() {
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => { e.preventDefault(); openEditor(btn.dataset.id); });
  });
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => { e.preventDefault(); confirmDeletePost(btn.dataset.id); });
  });
}

/* --------------------------------- POST INDIVIDUAL --------------------------------- */
function loadPostDetail(postId) {
  document.getElementById('view-list').style.display = 'none';
  const view = document.getElementById('view-post');
  view.style.display = 'block';
  view.innerHTML = '<p style="opacity:.6;text-align:center;padding:60px 0;">Carregando…</p>';

  db.collection('posts').doc(postId).get().then(doc => {
    if (!doc.exists || (!doc.data().published && !isAdmin())) {
      view.innerHTML = '<p style="text-align:center;padding:60px 0;">Escrito não encontrado.</p>';
      return;
    }
    const post = doc.data();
    view.innerHTML = `
      <div class="container">
        <a href="escritos.html" class="back-to-blog">${iconSVG('arrowLeft')} Voltar aos Escritos</a>
        <div class="post-detail-header" style="margin-top:24px;">
          <span class="post-card-date">${fmtDate(post.createdAt)}</span>
          <h1>${escapeHTML(post.title || '')}</h1>
        </div>
        ${post.coverImage ? `<div class="post-detail-cover"><img src="${post.coverImage}" alt="${escapeHTML(post.title || '')}"></div>` : ''}
        <div class="post-detail-content">${post.contentHTML || ''}</div>
        <div class="post-detail-actions">
          <a href="escritos.html" class="back-to-blog">${iconSVG('arrowLeft')} Voltar aos Escritos</a>
          ${isAdmin() ? `<div style="display:flex;gap:10px;">
            <button class="btn btn-outline btn-sm" id="detail-edit-btn">${iconSVG('edit')} Editar</button>
            <button class="btn btn-outline btn-sm" id="detail-delete-btn" style="color:#B5453A;">${iconSVG('trash')} Excluir</button>
          </div>` : ''}
        </div>
      </div>
    `;

    if (isAdmin()) {
      document.getElementById('detail-edit-btn').addEventListener('click', () => openEditor(postId));
      document.getElementById('detail-delete-btn').addEventListener('click', () => confirmDeletePost(postId, true));
    }
  });
}

function closePostDetail() {
  document.getElementById('view-post').style.display = 'none';
  document.getElementById('view-post').innerHTML = '';
  document.getElementById('view-list').style.display = 'block';
}

/* --------------------------------- EDITOR (ADMIN) --------------------------------- */
function initQuill() {
  if (quill) return;
  quill = new Quill('#quill-editor', {
    theme: 'snow',
    placeholder: 'Escreva aqui...',
    modules: {
      toolbar: {
        container: [
          [{ header: [2, 3, false] }],
          ['bold', 'italic', 'underline'],
          ['link', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ],
        handlers: {
          image: () => {
            const url = prompt('Cole a URL da imagem:');
            if (url) quill.insertEmbed(quill.getSelection()?.index || 0, 'image', url);
          },
        },
      },
    },
  });
}

function openEditor(postId = null) {
  if (!isAdmin()) return;
  editingPostId = postId;
  initQuill();
  quill.setContents([]);
  document.getElementById('editor-title').value = '';
  document.getElementById('editor-cover').value = '';
  document.getElementById('editor-excerpt').value = '';
  document.getElementById('editor-published').checked = true;
  document.getElementById('editor-heading').textContent = postId ? 'Editar escrito' : 'Novo escrito';

  if (postId) {
    db.collection('posts').doc(postId).get().then(doc => {
      if (!doc.exists) return;
      const p = doc.data();
      document.getElementById('editor-title').value   = p.title || '';
      document.getElementById('editor-cover').value   = p.coverImage || '';
      document.getElementById('editor-excerpt').value = p.excerpt || '';
      document.getElementById('editor-published').checked = !!p.published;
      quill.root.innerHTML = p.contentHTML || '';
    });
  }
  document.getElementById('editor-overlay').classList.add('open');
}

function closeEditor() {
  document.getElementById('editor-overlay').classList.remove('open');
  editingPostId = null;
}

function savePost() {
  if (!isAdmin()) return;
  const title      = document.getElementById('editor-title').value.trim();
  const coverImage = document.getElementById('editor-cover').value.trim();
  const excerpt    = document.getElementById('editor-excerpt').value.trim();
  const published  = document.getElementById('editor-published').checked;
  const contentHTML = quill.root.innerHTML;

  if (!title) { showToast('Dê um título ao escrito antes de salvar.'); return; }

  const data = {
    title, coverImage, excerpt, contentHTML, published,
    authorName: CONFIG.nome,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const saveBtn = document.getElementById('editor-save-btn');
  saveBtn.disabled = true;
  saveBtn.textContent = 'Salvando…';

  const ref   = editingPostId ? db.collection('posts').doc(editingPostId) : db.collection('posts').doc();
  const isNew = !editingPostId;
  if (isNew) data.createdAt = firebase.firestore.FieldValue.serverTimestamp();

  ref.set(data, { merge: true }).then(() => {
    showToast(published ? 'Escrito publicado!' : 'Rascunho salvo.');
    closeEditor();
  }).catch(err => {
    console.error(err);
    showToast('Não foi possível salvar. Tente novamente.');
  }).finally(() => {
    saveBtn.disabled = false;
    saveBtn.textContent = 'Salvar';
  });
}

function confirmDeletePost(postId, fromDetail = false) {
  if (!isAdmin()) return;
  if (!confirm('Excluir este escrito? Essa ação não pode ser desfeita.')) return;
  db.collection('posts').doc(postId).delete().then(() => {
    showToast('Escrito excluído.');
    if (fromDetail) window.location.href = 'escritos.html';
  }).catch(() => showToast('Não foi possível excluir.'));
}

/* --------------------------------- ROTEAMENTO --------------------------------- */
function route() {
  const postId = getQueryParam('post');
  if (postId) loadPostDetail(postId);
  else closePostDetail();
}

/* --------------------------------- HEADER / MENU --------------------------------- */
function initHeaderScroll() {
  const header = document.getElementById('site-header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
function initMobileMenu() {
  const toggle  = document.getElementById('menu-toggle');
  const nav     = document.getElementById('nav-mobile');
  const overlay = document.getElementById('nav-overlay');
  function close() { toggle.classList.remove('open'); nav.classList.remove('open'); overlay.classList.remove('open'); }
  function open()  { toggle.classList.add('open');    nav.classList.add('open');    overlay.classList.add('open'); }
  toggle.addEventListener('click', () => nav.classList.contains('open') ? close() : open());
  overlay.addEventListener('click', close);
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
}

/* --------------------------------- INIT --------------------------------- */
function init() {
  applyTheme();

  // Logo no header
  const logoEl = document.getElementById('logo-text');
  logoEl.innerHTML = `<img src="${CONFIG.logoSemFundo}" alt="${CONFIG.nome}" class="logo-img" onerror="this.style.display='none';this.nextSibling.style.display='inline'"><span style="display:none;">${CONFIG.nome}</span>`;

  document.getElementById('blog-title').textContent    = CONFIG.blogTitulo;
  document.getElementById('blog-subtitle').textContent = CONFIG.blogSubtitulo;
  document.title = `${CONFIG.blogTitulo} | ${CONFIG.nome}`;

  initHeaderScroll();
  initMobileMenu();

  document.getElementById('btn-new-post').addEventListener('click', () => openEditor(null));
  document.getElementById('editor-close-btn').addEventListener('click', closeEditor);
  document.getElementById('editor-save-btn').addEventListener('click', savePost);
  document.getElementById('editor-overlay').addEventListener('click', (e) => { if (e.target.id === 'editor-overlay') closeEditor(); });

  auth.onAuthStateChanged(user => {
    currentUser = user;
    renderAdminBar();
    loadPostsList();
    route();
  });

  window.addEventListener('popstate', route);
}

document.addEventListener('DOMContentLoaded', init);
