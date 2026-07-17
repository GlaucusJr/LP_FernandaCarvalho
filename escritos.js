/* ============================================================================
   ESCRITOS.JS (BLOG DE PSICOLOGIA)
   ----------------------------------------------------------------------------
   Blog simplificado focado em artigos e textos de psicologia.
   - Leitores: apenas leitura, sem cadastro ou comentários.
   - Admin: publicação de textos via E-mail e Senha.
   ============================================================================ */

/* --------------------------------- INIT FIREBASE --------------------------------- */
firebase.initializeApp(FIREBASE_CONFIG);
const auth  = firebase.auth();
const db    = firebase.firestore();

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
  postIcon:  '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 20V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16"/>', // Ícone que lembra livro/artigo
  key:       '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 3-9.6 9.6"/><path d="m15.5 7.5 3 3M18 5l3 3"/>',
};
function iconSVG(name, cls = '') {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] || ''}</svg>`;
}

/* --------------------------------- AUTH ADMIN --------------------------------- */
function renderAdminBar() {
  const bar     = document.getElementById('admin-bar');
  const authBar = document.getElementById('admin-auth-bar');

  if (isAdmin()) {
    if (bar) bar.classList.add('visible');
    authBar.innerHTML = `<button class="btn btn-outline btn-sm" id="btn-signout">Sair</button>`;
    document.getElementById('btn-signout').addEventListener('click', () => auth.signOut());
  } else {
    if (bar) bar.classList.remove('visible');
    authBar.innerHTML = `<button class="btn-admin-login" id="btn-admin-login" title="Área administrativa" aria-label="Acesso administrativo">${iconSVG('key')}</button>`;
    document.getElementById('btn-admin-login').addEventListener('click', () => {
      window.location.href = 'admin.html';
    });
  }
}

// Monitora o estado de autenticação
auth.onAuthStateChanged(user => {
  currentUser = user;
  renderAdminBar();
  applyTheme();

  const postId = getQueryParam('post');
  if (postId) {
    loadPostDetail(postId);
  } else {
    closePostDetail();
    loadPostsList();
  }
});

/* --------------------------------- LISTAGEM --------------------------------- */
function loadPostsList() {
  const grid = document.getElementById('posts-grid');
  if (!grid) return;
  grid.innerHTML = '<p style="opacity:.6;">Carregando artigos…</p>';

  let query = db.collection('posts').orderBy('createdAt', 'desc');
  if (!isAdmin()) query = query.where('published', '==', true);

  query.onSnapshot(snap => {
    if (snap.empty) {
      grid.innerHTML = `
        <div class="empty-state">
          ${iconSVG('postIcon')}
          <p>${isAdmin() ? 'Nenhum artigo publicado. Clique em "Novo Texto" para começar.' : 'Em breve, novos textos e reflexões por aqui.'}</p>
        </div>`;
      return;
    }
    grid.innerHTML = snap.docs.map(doc => renderPostCard(doc.id, doc.data())).join('');
    attachCardEvents();
  }, err => {
    console.error(err);
    grid.innerHTML = `<p style="opacity:.6;">Não foi possível carregar as publicações agora.</p>`;
  });
}

function renderPostCard(id, post) {
  return `
    <article class="post-card" data-id="${id}">
      ${!post.published ? '<span class="post-card-draft-badge">Rascunho</span>' : ''}
      ${isAdmin() ? `
        <div class="post-card-admin-actions">
          <button class="edit-btn" data-id="${id}" aria-label="Editar Texto">${iconSVG('edit')}</button>
          <button class="delete-btn" data-id="${id}" aria-label="Excluir Texto">${iconSVG('trash')}</button>
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

/* --------------------------------- ARTIGO INDIVIDUAL --------------------------------- */
function loadPostDetail(postId) {
  const viewList = document.getElementById('view-list');
  if (viewList) viewList.style.display = 'none';
  
  const view = document.getElementById('view-post');
  if (!view) return;
  view.style.display = 'block';
  view.innerHTML = '<p style="opacity:.6;text-align:center;padding:60px 0;">Carregando artigo…</p>';

  db.collection('posts').doc(postId).get().then(doc => {
    if (!doc.exists || (!doc.data().published && !isAdmin())) {
      view.innerHTML = '<p style="text-align:center;padding:60px 0;">Artigo não encontrado.</p>';
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
        ${post.coverImage ? `<div class="post-detail-cover"><img src="${post.coverImage}" alt="${escapeHTML(post.title || '')}"></div>` : ''}
        <div class="post-detail-content">${post.contentHTML || ''}</div>
        <div class="post-detail-actions">
          <a href="escritos.html" class="back-to-blog">${iconSVG('arrowLeft')} Voltar aos Artigos</a>
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
  const viewPost = document.getElementById('view-post');
  const viewList = document.getElementById('view-list');
  if (viewPost) { viewPost.style.display = 'none'; viewPost.innerHTML = ''; }
  if (viewList) viewList.style.display = 'block';
}

/* --------------------------------- EDITOR (ADMIN) --------------------------------- */
function initQuill() {
  if (quill) return;
  quill = new Quill('#quill-editor', {
    theme: 'snow',
    placeholder: 'Escreva seu texto ou reflexão de psicologia aqui...',
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
            const url = prompt('Cole a URL da imagem de cobertura ou ilustração:');
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
  document.getElementById('editor-heading').textContent = postId ? 'Editar artigo' : 'Novo texto / artigo';

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

  if (!title) { showToast('Dê um título ao seu artigo antes de salvar.'); return; }

  const saveBtn = document.getElementById('editor-save-btn');
  if (saveBtn) { saveBtn.disabled = true; saveBtn.textContent = 'Salvando…'; }

  const data = {
    title, coverImage, excerpt, contentHTML, published,
    authorName: CONFIG.nome,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const ref = editingPostId ? db.collection('posts').doc(editingPostId) : db.collection('posts').doc();
  if (!editingPostId) data.createdAt = firebase.firestore.FieldValue.serverTimestamp();

  ref.set(data, { merge: true })
    .then(() => {
      showToast(published ? '✓ Artigo publicado com sucesso!' : '✓ Rascunho salvo.');
      closeEditor();
    })
    .catch(err => { console.error(err); showToast('Erro ao salvar o artigo.'); })
    .finally(() => { if (saveBtn) { saveBtn.disabled = false; saveBtn.textContent = 'Salvar'; } });
}

function confirmDeletePost(postId, fromDetail = false) {
  if (!isAdmin()) return;
  if (confirm('Deseja realmente excluir este artigo permanentemente?')) {
    db.collection('posts').doc(postId).delete()
      .then(() => {
        showToast('Artigo removido.');
        if (fromDetail) window.location.href = 'escritos.html';
      })
      .catch(err => { console.error(err); showToast('Erro ao excluir.'); });
  }
}

/* --------------------------------- BIND EVENTS --------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  const btnNewPost = document.getElementById('btn-new-post');
  if (btnNewPost) btnNewPost.addEventListener('click', () => openEditor());

  const btnCloseEditor = document.getElementById('editor-close-btn');
  if (btnCloseEditor) btnCloseEditor.addEventListener('click', closeEditor);

  const btnSavePost = document.getElementById('editor-save-btn');
  if (btnSavePost) btnSavePost.addEventListener('click', savePost);
});
