import { PLATFORM_META, LIBRARY_PRESETS } from './presets.js';

const STORAGE_KEYS = {
  LIBRARIES: 'my_elib_libraries_v1',
  RECENT: 'my_elib_recent_v1',
  BOOKMARKS: 'my_elib_bookmarks_v1',
  PROXY: 'my_elib_proxy_v1',
  THEME: 'my_elib_theme_v1'
};

const state = {
  libraries: loadJson(STORAGE_KEYS.LIBRARIES, []),
  recent: loadJson(STORAGE_KEYS.RECENT, []),
  bookmarks: loadJson(STORAGE_KEYS.BOOKMARKS, []),
  proxyUrl: localStorage.getItem(STORAGE_KEYS.PROXY) || '',
  theme: localStorage.getItem(STORAGE_KEYS.THEME) || 'light',
  currentQuery: '',
  resultFilter: 'all',
  libraryPlatformFilter: 'all'
};

// DOM Elements
const el = {
  themeBtn: document.getElementById('btn-theme'),
  searchForm: document.getElementById('search-form'),
  searchInput: document.getElementById('search-input'),
  clearSearchBtn: document.getElementById('btn-clear-search'),
  recentChips: document.getElementById('recent-searches'),
  summaryText: document.getElementById('summary-text'),
  goLibrariesBtn: document.getElementById('btn-go-libraries'),
  proxyBadge: document.getElementById('proxy-badge'),
  proxyDesc: document.getElementById('proxy-desc'),
  openProxyGuideBtn: document.getElementById('btn-open-proxy-guide'),
  searchEmpty: document.getElementById('search-empty'),
  searchResults: document.getElementById('search-results'),
  resultQueryLabel: document.getElementById('result-query-label'),
  resultStats: document.getElementById('result-stats'),
  resultsList: document.getElementById('results-list'),
  myLibrariesList: document.getElementById('my-libraries-list'),
  presetFilter: document.getElementById('preset-filter'),
  presetList: document.getElementById('preset-list'),
  addCustomBtn: document.getElementById('btn-add-custom'),
  bookmarksList: document.getElementById('bookmarks-list'),
  addBookmarkBtn: document.getElementById('btn-add-bookmark'),
  proxyUrlInput: document.getElementById('proxy-url-input'),
  saveProxyBtn: document.getElementById('btn-save-proxy'),
  proxyTestStatus: document.getElementById('proxy-test-status'),
  exportDataBtn: document.getElementById('btn-export-data'),
  importDataInput: document.getElementById('input-import-data'),
  modalLibrary: document.getElementById('modal-library'),
  formLibrary: document.getElementById('form-library'),
  toast: document.getElementById('toast')
};

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveState(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function showToast(message) {
  el.toast.textContent = message;
  el.toast.classList.remove('hidden');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    el.toast.classList.add('hidden');
  }, 2400);
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  el.themeBtn.textContent = state.theme === 'dark' ? '☀️' : '🌙';
}

function switchTab(tabName) {
  document.querySelectorAll('.tab-panel').forEach((panel) => {
    panel.classList.toggle('active', panel.id === `tab-${tabName}`);
  });
  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });
}

function buildSearchUrl(lib, query) {
  const encoded = encodeURIComponent(query);
  if (lib.searchTemplate && lib.searchTemplate.includes('{query}')) {
    return lib.searchTemplate.replaceAll('{query}', encoded);
  }
  const base = lib.url.replace(/\/+$/, '');
  const meta = PLATFORM_META[lib.platform];
  if (lib.platform === 'bookers') {
    return base;
  }
  return `${base}${meta.defaultSearchPath.replace('{query}', encoded)}`;
}

function renderSummaryAndProxy() {
  const counts = { kyobo: 0, bookers: 0, yes24: 0 };
  state.libraries.forEach((lib) => {
    if (counts[lib.platform] !== undefined) counts[lib.platform] += 1;
  });

  if (state.libraries.length === 0) {
    el.summaryText.textContent = '아직 등록된 도서관이 없습니다 (도서관 관리에서 추가해 주세요)';
  } else {
    el.summaryText.textContent =
      `등록 도서관 ${state.libraries.length}곳 (교보 ${counts.kyobo} · 부커스 ${counts.bookers} · 예스24 ${counts.yes24})`;
  }

  if (state.proxyUrl) {
    el.proxyBadge.textContent = '실시간 자동조회 ON';
    el.proxyBadge.className = 'badge badge-live';
    el.proxyDesc.textContent = '프록시 서버가 연결되어 검색 시 교보문고·예스24 소장 여부를 자동으로 확인합니다.';
  } else {
    el.proxyBadge.textContent = '바로가기 모드';
    el.proxyBadge.className = 'badge badge-muted';
    el.proxyDesc.textContent =
      '현재는 각 도서관 검색 페이지로 바로 연결합니다. 설정에서 프록시 URL을 연결하면 소장/대출 가능 여부를 이 화면에서 바로 불러옵니다.';
  }
  el.proxyUrlInput.value = state.proxyUrl;
}

function renderRecentSearches() {
  if (state.recent.length === 0) {
    el.recentChips.classList.add('hidden');
    el.recentChips.innerHTML = '';
    return;
  }
  el.recentChips.classList.remove('hidden');
  el.recentChips.innerHTML = state.recent
    .map((q) => `<button class="chip recent-item" type="button" data-q="${escapeHtml(q)}">${escapeHtml(q)}</button>`)
    .join('');
}

function addRecentSearch(query) {
  const next = [query, ...state.recent.filter((item) => item !== query)].slice(0, 8);
  state.recent = next;
  saveState(STORAGE_KEYS.RECENT, next);
  renderRecentSearches();
}

function renderMyLibraries() {
  const filtered = state.libraries.filter(
    (lib) => state.libraryPlatformFilter === 'all' || lib.platform === state.libraryPlatformFilter
  );

  if (filtered.length === 0) {
    el.myLibrariesList.innerHTML = `
      <div class="empty-state">
        <div class="empty-emoji">🏛️</div>
        <h2>등록된 도서관이 없습니다</h2>
        <p>아래 추천 목록에서 선택하거나 "+ 직접 추가" 버튼으로 이용 중인 전자도서관을 등록하세요.</p>
      </div>
    `;
    return;
  }

  el.myLibrariesList.innerHTML = filtered
    .map((lib) => {
      const meta = PLATFORM_META[lib.platform] || PLATFORM_META.kyobo;
      return `
        <article class="card">
          <div class="card-top">
            <span class="badge ${meta.badgeClass}">${meta.label}</span>
            <button class="danger-sm-btn btn-remove-lib" type="button" data-id="${escapeHtml(lib.id)}">삭제</button>
          </div>
          <h3 class="card-title">${escapeHtml(lib.name)}</h3>
          <p class="card-sub">${escapeHtml(lib.url)}</p>
          ${lib.memo ? `<p class="card-sub">메모: ${escapeHtml(lib.memo)}</p>` : ''}
        </article>
      `;
    })
    .join('');
}

function renderPresets() {
  const keyword = (el.presetFilter.value || '').trim().toLowerCase();
  const existingIds = new Set(state.libraries.map((l) => l.id));

  const items = LIBRARY_PRESETS.filter((p) => {
    const matchPlatform = state.libraryPlatformFilter === 'all' || p.platform === state.libraryPlatformFilter;
    const matchKeyword =
      !keyword || p.name.toLowerCase().includes(keyword) || (p.memo || '').toLowerCase().includes(keyword);
    return matchPlatform && matchKeyword;
  });

  if (items.length === 0) {
    el.presetList.innerHTML = `<p class="card-sub">검색어와 일치하는 추천 도서관이 없습니다. "+ 직접 추가"를 이용해 주세요.</p>`;
    return;
  }

  el.presetList.innerHTML = items
    .map((p) => {
      const meta = PLATFORM_META[p.platform];
      const added = existingIds.has(p.id);
      return `
        <article class="card">
          <div class="card-top">
            <span class="badge ${meta.badgeClass}">${meta.label}</span>
            <button
              class="${added ? 'secondary-btn' : 'primary-sm-btn'} btn-add-preset"
              type="button"
              data-id="${escapeHtml(p.id)}"
              ${added ? 'disabled' : ''}
            >
              ${added ? '등록됨 ✓' : '+ 추가'}
            </button>
          </div>
          <h3 class="card-title">${escapeHtml(p.name)}</h3>
          <p class="card-sub">${escapeHtml(p.url)}${p.memo ? ` · ${escapeHtml(p.memo)}` : ''}</p>
        </article>
      `;
    })
    .join('');
}

function renderBookmarks() {
  if (state.bookmarks.length === 0) {
    el.bookmarksList.innerHTML = `
      <div class="empty-state">
        <div class="empty-emoji">🔖</div>
        <h2>저장된 책이 없습니다</h2>
        <p>검색 결과에서 책을 저장하거나 "+ 책 추가"로 읽고 싶은 책을 기록해 두세요.</p>
      </div>
    `;
    return;
  }

  el.bookmarksList.innerHTML = state.bookmarks
    .map(
      (book) => `
        <article class="card">
          <div class="card-top">
            <h3 class="card-title">${escapeHtml(book.title)}</h3>
            <button class="danger-sm-btn btn-remove-bookmark" type="button" data-id="${escapeHtml(book.id)}">삭제</button>
          </div>
          <p class="card-sub">저장일: ${escapeHtml(book.createdAt)}</p>
          <div class="card-actions">
            <button class="primary-sm-btn btn-search-bookmark" type="button" data-q="${escapeHtml(book.title)}">
              통합검색 하기
            </button>
          </div>
        </article>
      `
    )
    .join('');
}

async function fetchLiveAvailability(lib, query) {
  if (!state.proxyUrl) return null;
  if (lib.platform === 'bookers') {
    return {
      status: 'auth_required',
      message: '부커스는 로그인 후 도서관 앱/웹에서 검색 가능합니다.'
    };
  }

  const targetUrl = buildSearchUrl(lib, query);
  const proxyEndpoint = `${state.proxyUrl.replace(/\/+$/, '')}?url=${encodeURIComponent(targetUrl)}`;

  try {
    const res = await fetch(proxyEndpoint);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    return parseLibraryHtml(lib.platform, html, query);
  } catch (err) {
    return {
      status: 'error',
      message: `실시간 조회 실패 (${err.message}) · 아래 버튼으로 직접 확인해 주세요.`
    };
  }
}

function parseLibraryHtml(platform, html, query) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const text = doc.body ? doc.body.textContent.replace(/\s+/g, ' ').trim() : '';

  if (!text) {
    return { status: 'unknown', message: '응답을 읽을 수 없습니다. 직접 열기로 확인해 주세요.' };
  }

  if (/검색\s*결과가\s*없습니다|검색된\s*도서가\s*없습니다|소장\s*자료가\s*없습니다/.test(text)) {
    return { status: 'not_found', message: '해당 도서관에 소장 도서가 없는 것으로 보입니다.' };
  }

  // 교보문고/예스24 일반 리스트 항목 추출 시도
  const candidates = [];
  const selectors =
    platform === 'kyobo'
      ? ['.book_title', '.title a', '.list_book .tit', 'a[href*="detail"]']
      : ['.goods_name', '.book_name', '.title a', 'a[href*="Detail"]'];

  for (const sel of selectors) {
    doc.querySelectorAll(sel).forEach((node) => {
      const t = node.textContent.replace(/\s+/g, ' ').trim();
      if (t && t.length >= 2 && t.length <= 80 && !candidates.includes(t)) {
        candidates.push(t);
      }
    });
    if (candidates.length >= 3) break;
  }

  const loanMatch = text.match(/대출\s*가능|즉시\s*대출|예약\s*가능|대출중/);
  const loanHint = loanMatch ? ` (${loanMatch[0]})` : '';

  if (candidates.length > 0) {
    return {
      status: 'found',
      message: `검색 결과 발견${loanHint}`,
      items: candidates.slice(0, 3)
    };
  }

  if (text.toLowerCase().includes(query.toLowerCase())) {
    return {
      status: 'found',
      message: `관련 도서 정보가 감지되었습니다${loanHint}. 아래 버튼으로 상세 확인하세요.`
    };
  }

  return {
    status: 'unknown',
    message: '페이지 구조가 다르거나 로그인이 필요합니다. 직접 열기로 확인해 주세요.'
  };
}

async function runSearch(query) {
  const clean = query.trim();
  if (!clean) return;

  state.currentQuery = clean;
  addRecentSearch(clean);
  switchTab('search');

  el.searchEmpty.classList.add('hidden');
  el.searchResults.classList.remove('hidden');
  el.resultQueryLabel.textContent = `"${clean}"`;

  const targets = state.libraries.filter(
    (lib) => state.resultFilter === 'all' || lib.platform === state.resultFilter
  );

  if (state.libraries.length === 0) {
    el.resultStats.textContent = '등록된 도서관 0곳';
    el.resultsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-emoji">🏛️</div>
        <h2>먼저 내 도서관을 등록해 주세요</h2>
        <p>교보문고, 부커스, 예스24 중 이용 중인 지역도서관을 등록하면 여기서 한 번에 검색됩니다.</p>
        <button id="btn-empty-go-lib" class="primary-btn" type="button">도서관 등록하러 가기</button>
      </div>
    `;
    document.getElementById('btn-empty-go-lib')?.addEventListener('click', () => switchTab('libraries'));
    return;
  }

  el.resultStats.textContent = `${targets.length}개 도서관`;

  if (targets.length === 0) {
    el.resultsList.innerHTML = `<div class="empty-state"><p>선택한 플랫폼에 등록된 도서관이 없습니다.</p></div>`;
    return;
  }

  el.resultsList.innerHTML = targets
    .map((lib) => {
      const meta = PLATFORM_META[lib.platform] || PLATFORM_META.kyobo;
      const searchUrl = buildSearchUrl(lib, clean);
      const initialStatus = state.proxyUrl
        ? '실시간 소장 여부 확인 중...'
        : lib.platform === 'bookers'
          ? '부커스는 기관 로그인 후 앱/웹에서 검색할 수 있습니다.'
          : '아래 버튼을 누르면 해당 도서관의 검색 결과 페이지로 바로 이동합니다.';

      return `
        <article class="card" id="result-card-${escapeHtml(lib.id)}">
          <div class="card-top">
            <span class="badge ${meta.badgeClass}">${meta.label}</span>
            <button class="text-btn btn-save-book" type="button" data-q="${escapeHtml(clean)}">🔖 책 저장</button>
          </div>
          <h3 class="card-title">${escapeHtml(lib.name)}</h3>
          <p class="card-sub">${escapeHtml(lib.url)}</p>
          <div class="result-status" id="status-${escapeHtml(lib.id)}">${escapeHtml(initialStatus)}</div>
          <div class="card-actions">
            <a class="primary-sm-btn" href="${escapeHtml(searchUrl)}" target="_blank" rel="noopener noreferrer">
              도서관에서 보기 →
            </a>
          </div>
        </article>
      `;
    })
    .join('');

  if (state.proxyUrl) {
    await Promise.all(
      targets.map(async (lib) => {
        const result = await fetchLiveAvailability(lib, clean);
        const statusEl = document.getElementById(`status-${lib.id}`);
        if (!statusEl || !result) return;

        let html = `<strong>${escapeHtml(result.message)}</strong>`;
        if (result.items && result.items.length > 0) {
          html += `<ul class="result-items">${result.items
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join('')}</ul>`;
        }
        statusEl.innerHTML = html;
      })
    );
  }
}

function openLibraryModal() {
  el.formLibrary.reset();
  el.modalLibrary.classList.remove('hidden');
}

function closeLibraryModal() {
  el.modalLibrary.classList.add('hidden');
}

function addLibrary(lib) {
  state.libraries.push(lib);
  saveState(STORAGE_KEYS.LIBRARIES, state.libraries);
  renderSummaryAndProxy();
  renderMyLibraries();
  renderPresets();
  showToast(`"${lib.name}" 도서관이 등록되었습니다.`);
}

function addBookmark(title) {
  const clean = title.trim();
  if (!clean) return;
  if (state.bookmarks.some((b) => b.title === clean)) {
    showToast('이미 읽을 책 목록에 있습니다.');
    return;
  }
  state.bookmarks.unshift({
    id: `bm-${Date.now()}`,
    title: clean,
    createdAt: new Date().toLocaleDateString('ko-KR')
  });
  saveState(STORAGE_KEYS.BOOKMARKS, state.bookmarks);
  renderBookmarks();
  showToast(`"${clean}" 책을 저장했습니다.`);
}

function bindEvents() {
  // Theme
  el.themeBtn.addEventListener('click', () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
    applyTheme();
  });

  // Bottom nav
  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  el.goLibrariesBtn.addEventListener('click', () => switchTab('libraries'));
  el.openProxyGuideBtn.addEventListener('click', () => switchTab('settings'));

  // Search
  el.searchInput.addEventListener('input', () => {
    el.clearSearchBtn.classList.toggle('hidden', !el.searchInput.value);
  });

  el.clearSearchBtn.addEventListener('click', () => {
    el.searchInput.value = '';
    el.clearSearchBtn.classList.add('hidden');
    el.searchInput.focus();
  });

  el.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    runSearch(el.searchInput.value);
  });

  // Quick sample & recent searches
  document.addEventListener('click', (e) => {
    const sampleBtn = e.target.closest('.quick-sample, .recent-item, .btn-search-bookmark');
    if (sampleBtn) {
      const q = sampleBtn.dataset.q;
      el.searchInput.value = q;
      el.clearSearchBtn.classList.remove('hidden');
      runSearch(q);
      return;
    }

    const saveBookBtn = e.target.closest('.btn-save-book');
    if (saveBookBtn) {
      addBookmark(saveBookBtn.dataset.q);
      return;
    }

    const addPresetBtn = e.target.closest('.btn-add-preset');
    if (addPresetBtn) {
      const preset = LIBRARY_PRESETS.find((p) => p.id === addPresetBtn.dataset.id);
      if (preset && !state.libraries.some((l) => l.id === preset.id)) {
        addLibrary({ ...preset });
      }
      return;
    }

    const removeLibBtn = e.target.closest('.btn-remove-lib');
    if (removeLibBtn) {
      const id = removeLibBtn.dataset.id;
      state.libraries = state.libraries.filter((l) => l.id !== id);
      saveState(STORAGE_KEYS.LIBRARIES, state.libraries);
      renderSummaryAndProxy();
      renderMyLibraries();
      renderPresets();
      showToast('도서관이 삭제되었습니다.');
      return;
    }

    const removeBmBtn = e.target.closest('.btn-remove-bookmark');
    if (removeBmBtn) {
      const id = removeBmBtn.dataset.id;
      state.bookmarks = state.bookmarks.filter((b) => b.id !== id);
      saveState(STORAGE_KEYS.BOOKMARKS, state.bookmarks);
      renderBookmarks();
      showToast('목록에서 삭제했습니다.');
    }
  });

  // Result platform filter
  document.querySelectorAll('.filter-pills .pill').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-pills .pill').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.resultFilter = btn.dataset.filter;
      if (state.currentQuery) runSearch(state.currentQuery);
    });
  });

  // Library platform filter
  document.querySelectorAll('.platform-tabs .ptab').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.platform-tabs .ptab').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.libraryPlatformFilter = btn.dataset.platform;
      renderMyLibraries();
      renderPresets();
    });
  });

  el.presetFilter.addEventListener('input', renderPresets);

  // Modal
  el.addCustomBtn.addEventListener('click', openLibraryModal);
  el.modalLibrary.querySelectorAll('.modal-close, .modal-backdrop').forEach((node) => {
    node.addEventListener('click', closeLibraryModal);
  });

  el.formLibrary.addEventListener('submit', (e) => {
    e.preventDefault();
    const platform = document.getElementById('lib-platform').value;
    const name = document.getElementById('lib-name').value.trim();
    const url = document.getElementById('lib-url').value.trim();
    const searchTemplate = document.getElementById('lib-search-template').value.trim();
    const memo = document.getElementById('lib-memo').value.trim();

    if (!name || !url) return;
    addLibrary({
      id: `custom-${Date.now()}`,
      platform,
      name,
      url,
      searchTemplate,
      memo
    });
    closeLibraryModal();
  });

  // Add bookmark manually
  el.addBookmarkBtn.addEventListener('click', () => {
    const title = prompt('저장할 책 제목을 입력하세요:');
    if (title) addBookmark(title);
  });

  // Proxy settings
  el.saveProxyBtn.addEventListener('click', () => {
    const val = el.proxyUrlInput.value.trim();
    state.proxyUrl = val;
    localStorage.setItem(STORAGE_KEYS.PROXY, val);
    renderSummaryAndProxy();
    el.proxyTestStatus.textContent = val ? '프록시 URL이 저장되었습니다.' : '프록시 설정이 해제되었습니다.';
    showToast('설정이 저장되었습니다.');
  });

  // Export / Import
  el.exportDataBtn.addEventListener('click', () => {
    const payload = {
      libraries: state.libraries,
      bookmarks: state.bookmarks,
      proxyUrl: state.proxyUrl
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `my-ebook-libraries-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  });

  el.importDataInput.addEventListener('change', async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (Array.isArray(data.libraries)) {
        state.libraries = data.libraries;
        saveState(STORAGE_KEYS.LIBRARIES, state.libraries);
      }
      if (Array.isArray(data.bookmarks)) {
        state.bookmarks = data.bookmarks;
        saveState(STORAGE_KEYS.BOOKMARKS, state.bookmarks);
      }
      if (typeof data.proxyUrl === 'string') {
        state.proxyUrl = data.proxyUrl;
        localStorage.setItem(STORAGE_KEYS.PROXY, state.proxyUrl);
      }
      renderSummaryAndProxy();
      renderMyLibraries();
      renderPresets();
      renderBookmarks();
      showToast('데이터를 성공적으로 복원했습니다.');
    } catch {
      showToast('올바른 JSON 백업 파일이 아닙니다.');
    } finally {
      e.target.value = '';
    }
  });
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
}

function init() {
  applyTheme();
  renderSummaryAndProxy();
  renderRecentSearches();
  renderMyLibraries();
  renderPresets();
  renderBookmarks();
  bindEvents();
  registerServiceWorker();
}

init();
