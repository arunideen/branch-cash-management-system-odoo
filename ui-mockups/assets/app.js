/* ==========================================================================
   BCMS demo mockups — shared shell + light interactivity
   No dependencies, no build step. Pure static demo.
   ========================================================================== */

/* ---- Inline icon set (Lucide-style, per UIUX §9.4) ---------------------- */
const ICONS = {
  grid:      '<path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>',
  filePlus:  '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v5h5M12 11v6M9 14h6"/>',
  coins:     '<circle cx="8" cy="8" r="6"/><path d="M18.09 10.37A6 6 0 1 1 10.34 18M7 6h1v4M16.71 13.88l.7.71-2.82 2.82"/>',
  list:      '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  inbox:     '<path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  wallet:    '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 1-1 1v-3"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  receipt:   '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/><path d="M8 7h8M8 11h8M8 15h5"/>',
  lock:      '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  check:     '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/>',
  landmark:  '<path d="M3 22h18M6 18v-7M10 18v-7M14 18v-7M18 18v-7M12 2 2 7h20z"/>',
  banknote:  '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
  book:      '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  database:  '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
  users:     '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  chart:     '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
  bell:      '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  search:    '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  menu:      '<path d="M4 6h16M4 12h16M4 18h16"/>',
  chevron:   '<path d="m9 18 6-6-6-6"/>',
  upload:    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5M12 3v12"/>',
  file:      '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z"/><path d="M14 2v5h5"/>',
  alert:     '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3z"/><path d="M12 9v4M12 17h.01"/>',
  clock:     '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  print:     '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  x:         '<path d="M18 6 6 18M6 6l12 12"/>',
  plus:      '<path d="M12 5v14M5 12h14"/>',
  edit:      '<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z"/>',
  download:  '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  filter:    '<path d="M22 3H2l8 9.46V19l4 2v-8.54z"/>',
  eye:       '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  logout:    '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>',
  info:      '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  shield:    '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
};

function icon(name, cls) {
  return `<svg class="ico ${cls||''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]||''}</svg>`;
}

/* ---- Navigation model (mirrors docs/UIUX.md §2 sitemap) ----------------- */
const NAV = [
  { group: 'Overview', items: [
    { id: 'dashboard', label: 'Dashboard', icon: 'grid', href: 'dashboard.html' },
  ]},
  { group: 'Collections', items: [
    { id: 'collection-new', label: 'New Request', icon: 'filePlus', href: 'collection-new.html' },
    { id: 'my-requests', label: 'My Requests', icon: 'list', href: 'my-requests.html' },
  ]},
  { group: 'Payment', items: [
    { id: 'cashier-queue', label: 'Cashier Queue', icon: 'inbox', href: 'cashier-queue.html', tag: '6' },
    { id: 'verify-collect', label: 'Verify & Collect', icon: 'wallet', href: 'verify-collect.html' },
    { id: 'receipt', label: 'Receipt', icon: 'receipt', href: 'receipt.html' },
    { id: 'expenses', label: 'Cash Expense', icon: 'coins', href: 'expenses.html' },
  ]},
  { group: 'Closing & Approvals', items: [
    { id: 'cash-closing', label: 'Cash Closing', icon: 'lock', href: 'cash-closing.html' },
    { id: 'approvals', label: 'Approvals', icon: 'check', href: 'approvals.html', tag: '3' },
    { id: 'deposit', label: 'Bank Deposit', icon: 'landmark', href: 'deposit.html' },
    { id: 'accounting', label: 'Accounting', icon: 'book', href: 'accounting.html', tag: '2' },
  ]},
  { group: 'Administration', items: [
    { id: 'masters', label: 'Masters', icon: 'database', href: 'masters.html' },
    { id: 'users', label: 'User Management', icon: 'users', href: 'users.html' },
  ]},
];

/* ---- Render the shell --------------------------------------------------- */
function buildShell() {
  const page = document.body.dataset.page;
  if (!page) return; // standalone pages (login, index) opt out

  let navHtml = '';
  NAV.forEach(g => {
    navHtml += `<div class="nav-group-label">${g.group}</div>`;
    g.items.forEach(it => {
      const active = it.id === page ? ' active' : '';
      const tag = it.tag ? `<span class="tag">${it.tag}</span>` : '';
      navHtml += `<a class="nav-item${active}" href="${it.href}">${icon(it.icon)}<span>${it.label}</span>${tag}</a>`;
    });
  });

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';
  sidebar.innerHTML = `
    <div class="sidebar-brand">
      <div class="logo">₹</div>
      <div class="brand-text"><b>BCMS</b><span>Prabal Motors Pvt. Ltd.</span></div>
    </div>
    <nav class="nav">${navHtml}</nav>
    <div class="sidebar-foot"><b>Demo build</b> · v1.0 mockups<br>Andheri (Service) branch</div>`;

  const role = document.body.dataset.role || 'Cashier';
  const user = document.body.dataset.user || 'Priya Nair';
  const initials = user.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();

  const topbar = document.createElement('header');
  topbar.className = 'topbar';
  topbar.innerHTML = `
    <button class="hamburger" aria-label="Menu" onclick="document.body.classList.toggle('nav-open')">${icon('menu')}</button>
    <button class="scope-switcher">${icon('landmark')}<span>Andheri (Service)</span><small>Mumbai West</small>${icon('chevron')}</button>
    <div class="search">${icon('search')}<span>Search requests, receipts, customers…</span><kbd>⌘K</kbd></div>
    <div class="spacer"></div>
    <button class="icon-btn" aria-label="Notifications">${icon('bell')}<span class="dot"></span></button>
    <div class="user">
      <div class="avatar">${initials}</div>
      <div class="who"><b>${user}</b><span>${role}</span></div>
    </div>`;

  document.body.insertBefore(topbar, document.body.firstChild);
  document.body.insertBefore(sidebar, document.body.firstChild);
}

/* ---- Helpers ------------------------------------------------------------ */
function inr(n) { return '₹' + Math.round(n).toLocaleString('en-IN'); }

/* Tabs: <div class="tabs" data-tabs>… buttons with data-tab; panels .tab-panel */
function wireTabs() {
  document.querySelectorAll('[data-tabs]').forEach(bar => {
    bar.querySelectorAll('button[data-tab]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.tab;
        bar.querySelectorAll('button[data-tab]').forEach(b => b.classList.toggle('on', b === btn));
        document.querySelectorAll(`.tab-panel[data-panel]`).forEach(p => {
          if (bar.contains(btn)) p.classList.toggle('on', p.dataset.panel === key);
        });
      });
    });
  });
}

/* Denomination calculators: container [data-denom] with .denom-input rows,
   [data-count], [data-subtotal]; a [data-denom-total] output; optional
   [data-required] target to compare against for a status bar. */
function wireDenoms() {
  document.querySelectorAll('[data-denom]').forEach(box => {
    const totalEl = box.querySelector('[data-denom-total]');
    const barEl = document.querySelector(box.dataset.bar || '');
    const required = parseFloat(box.dataset.required || '0');
    function recalc() {
      let total = 0;
      box.querySelectorAll('.denom-input').forEach(inp => {
        const face = parseFloat(inp.dataset.face || '0');
        const cnt = parseInt(inp.value || '0', 10) || 0;
        const sub = face * cnt;
        total += sub;
        const subEl = inp.closest('tr').querySelector('[data-subtotal]');
        if (subEl) subEl.textContent = inr(sub);
      });
      if (totalEl) totalEl.textContent = inr(total);
      if (barEl && required) {
        const pct = Math.min(100, (total / required) * 100);
        const fill = barEl.querySelector('span');
        if (fill) fill.style.width = pct + '%';
        const amt = barEl.querySelector('[data-bar-amt]');
        if (amt) amt.textContent = `${inr(total)} / ${inr(required)}`;
        const ok = total === required;
        barEl.classList.toggle('ok', ok);
        barEl.classList.toggle('warn', !ok);
        const st = barEl.querySelector('[data-bar-status]');
        if (st) st.textContent = ok ? 'Matched ✓' : (total < required ? 'Short by ' + inr(required - total) : 'Over by ' + inr(total - required));
        document.querySelectorAll('[data-match-required]').forEach(b => b.classList.toggle('disabled', !ok));
      }
      // variance (closing): compare total vs [data-expected]
      const expEl = box.dataset.expected ? document.querySelector(box.dataset.expected) : null;
    }
    box.querySelectorAll('.denom-input').forEach(inp => inp.addEventListener('input', recalc));
    recalc();
  });

  /* Cash-closing variance widget */
  const varBox = document.querySelector('[data-variance]');
  if (varBox) {
    const expected = parseFloat(varBox.dataset.expected || '0');
    function upd() {
      let phys = 0;
      document.querySelectorAll('[data-closing-denom] .denom-input').forEach(inp => {
        phys += (parseFloat(inp.dataset.face||'0')) * (parseInt(inp.value||'0',10)||0);
      });
      document.querySelectorAll('[data-phys-total]').forEach(el => el.textContent = inr(phys));
      const variance = phys - expected;
      const vEl = varBox.querySelector('[data-variance-amt]');
      const badge = varBox.querySelector('[data-variance-badge]');
      const reason = document.querySelector('[data-variance-reason]');
      if (vEl) vEl.textContent = (variance >= 0 ? '+' : '−') + inr(Math.abs(variance)).replace('₹','₹');
      if (badge) {
        badge.className = 'badge ' + (variance === 0 ? 'badge-emerald' : 'badge-red');
        badge.innerHTML = variance === 0 ? '<span class="bdot"></span>Balanced' : '<span class="bdot"></span>Variance';
      }
      if (reason) reason.style.display = variance === 0 ? 'none' : 'flex';
    }
    document.querySelectorAll('[data-closing-denom] .denom-input').forEach(inp => inp.addEventListener('input', upd));
    upd();
  }
}

/* Simple modal open/close via [data-open-modal] and [data-close-modal] */
function wireModals() {
  document.querySelectorAll('[data-open-modal]').forEach(btn =>
    btn.addEventListener('click', () => {
      const m = document.getElementById(btn.dataset.openModal);
      if (m) m.classList.add('open');
    }));
  document.querySelectorAll('[data-close-modal]').forEach(btn =>
    btn.addEventListener('click', () => btn.closest('.modal-overlay').classList.remove('open')));
  document.querySelectorAll('.modal-overlay').forEach(ov =>
    ov.addEventListener('click', e => { if (e.target === ov) ov.classList.remove('open'); }));
}

/* Payment mode segmented control on the verify screen */
function wirePaymentMode() {
  const seg = document.querySelector('[data-mode-seg]');
  if (!seg) return;
  seg.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    seg.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
    const mode = b.dataset.mode;
    document.querySelectorAll('[data-mode-panel]').forEach(p =>
      p.style.display = (p.dataset.modePanel === mode || (mode === 'mixed' && p.dataset.modePanel !== 'none')) ? '' : 'none');
  }));
}

document.addEventListener('DOMContentLoaded', () => {
  buildShell();
  wireTabs();
  wireDenoms();
  wireModals();
  wirePaymentMode();
  // expose icon() for inline use in pages
  document.querySelectorAll('[data-icon]').forEach(el => el.innerHTML = icon(el.dataset.icon) + el.innerHTML);
});
