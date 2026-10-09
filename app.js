'use strict';
/* =========================================================
   Malar Goat Management System
   Pure HTML/CSS/JS. Data lives in the browser (localStorage).
   Login session uses sessionStorage.
   ========================================================= */

/* ---------------- Constants ---------------- */
const DB_KEY = 'malarGoatDB_v1';
const SESSION_KEY = 'malarGoatSession';
const CATEGORIES = ['Feed & fodder', 'Medicine', 'Labour', 'Shed & equipment', 'Transport', 'Electricity & water', 'Other'];
const HEALTH_TYPES = ['Vaccination', 'Deworming', 'Treatment', 'Check-up', 'Pregnancy check', 'Kidding (delivery)'];
const BREEDS = ['Tellicherry', 'Boer', 'Salem Black', 'Kanni Aadu', 'Kodi Aadu', 'Jamunapari', 'Barbari', 'Sirohi', 'Osmanabadi', 'Mixed'];
const TASKS = ['Fed', 'Gave water', 'Cleaned shed', 'Checked health'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const CHART_COLORS = ['#1F4D3A', '#6E9F3B', '#F2C230', '#C9822B', '#4E86A8', '#B3362A', '#8C7AA9', '#7A8A80', '#2F9C95'];

/* ---------------- Icons ---------------- */
const ICONS = {
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  tag: '<path d="M20.6 13.4l-7.2 7.2a2 2 0 01-2.8 0L3 13V3h10l7.6 7.6a2 2 0 010 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  wallet: '<rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M16 15h2"/>',
  trend: '<path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 000-7.8z"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  report: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  gear: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.8.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.8V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  download: '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/>',
  upload: '<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><path d="M17 8l-5-5-5 5M12 3v12"/>',
  logout: '<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><path d="M16 17l5-5-5-5M21 12H9"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  check: '<path d="M20 6L9 17l-5-5"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',
  x: '<path d="M18 6L6 18M6 6l12 12"/>',
  more: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>',
  printer: '<path d="M6 9V2h12v7"/><rect x="6" y="14" width="12" height="8"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/>',
  left: '<path d="M15 18l-6-6 6-6"/>',
  right: '<path d="M9 18l6-6-6-6"/>'
};
const icon = (n, s = 20) => `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`;

/* ---------------- Small helpers ---------------- */
const $ = s => document.querySelector(s);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const pad = n => String(n).padStart(2, '0');
const ymd = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = () => ymd(new Date());
const parse = s => { const [y, m, d] = String(s).split('-').map(Number); return new Date(y, (m || 1) - 1, d || 1); };
const addDays = (s, n) => { const d = parse(s); d.setDate(d.getDate() + n); return ymd(d); };
const thisMonth = () => today().slice(0, 7);
const monthEnd = m => { const d = parse(m + '-01'); d.setMonth(d.getMonth() + 1); d.setDate(0); return ymd(d); };
const shiftMonth = (m, n) => { const d = parse(m + '-01'); d.setMonth(d.getMonth() + n); return ymd(d).slice(0, 7); };
const daysBetween = (a, b) => Math.round((parse(b) - parse(a)) / 864e5);
const fmtDate = s => { if (!s) return '—'; const d = parse(s); return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; };
const monthLabel = m => { const d = parse(m + '-01'); return `${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}`; };
const money = n => (n < 0 ? '−' : '') + '₹' + Math.abs(Math.round(+n || 0)).toLocaleString('en-IN');
const plMoney = n => `<span class="${n >= 0 ? 'pos' : 'neg'}">${n >= 0 ? '+' + money(n) : money(n)}</span>`;
const sum = (arr, f) => arr.reduce((t, x) => t + (+(typeof f === 'function' ? f(x) : x[f]) || 0), 0);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const nowTime = () => { const d = new Date(); return pad(d.getHours()) + ':' + pad(d.getMinutes()); };
const fmtTime = t => { if (!t) return ''; const [h, m] = t.split(':').map(Number); return `${(h % 12) || 12}:${pad(m)} ${h < 12 ? 'AM' : 'PM'}`; };
const inRange = (d, f, t) => !!d && (!f || d >= f) && (!t || d <= t);
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

/* ---------------- Database ---------------- */
const defaultDB = () => ({
  settings: { farmName: 'Malar Goat Farm', owner: 'Malar', username: 'malar', password: 'malar123' },
  goats: [], expenses: [], sales: [], health: [], attendance: []
});
function loadDB() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (raw) {
      const d = JSON.parse(raw), base = defaultDB();
      return { ...base, ...d, settings: { ...base.settings, ...(d.settings || {}) } };
    }
  } catch (e) { console.warn('Could not read saved data', e); }
  return defaultDB();
}
let db = loadDB();
function save() {
  try { localStorage.setItem(DB_KEY, JSON.stringify(db)); }
  catch (e) { toast('Phone storage is full. Remove some goat photos, then download a backup.', 'bad'); }
}

/* ---------------- UI state ---------------- */
const ui = {
  goatQ: '', goatStatus: 'Active',
  expMonth: thisMonth(), expCat: '',
  calMonth: thisMonth(),
  rPreset: 'month', rFrom: thisMonth() + '-01', rTo: today()
};

/* ---------------- Goat lookups & maths ---------------- */
const goatById = id => db.goats.find(g => g.id === id);
const saleOf = gid => db.sales.find(s => s.goatId === gid);
const goatLabel = id => { const g = goatById(id); return g ? `${g.tag} – ${g.name}` : 'All goats'; };
const arrival = g => (g.source === 'Born on farm' ? (g.dob || g.purchaseDate) : (g.purchaseDate || g.dob)) || '1970-01-01';
function leaving(g) {
  if (g.status === 'Sold') { const s = saleOf(g.id); return s ? s.date : null; }
  if (g.status === 'Dead') return g.deathDate || null;
  return null;
}
function onFarm(g, date) {
  if (date < arrival(g)) return false;
  const l = leaving(g);
  return !(l && date > l);
}
function ageMonths(dob, until) {
  if (!dob) return null;
  const a = parse(dob), b = until ? parse(until) : new Date();
  let m = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
  if (b.getDate() < a.getDate()) m--;
  return m;
}
function ageText(dob, until) {
  if (!dob) return 'Age not set';
  const m = ageMonths(dob, until);
  if (m < 0) return '—';
  if (m < 1) return plural(Math.max(0, daysBetween(dob, until || today())), 'day');
  const y = Math.floor(m / 12), mm = m % 12;
  return [y ? `${y} yr` : '', mm ? `${mm} mo` : ''].filter(Boolean).join(' ');
}

/* All money going out, in one list: spending + health costs + buying goats */
function spendItems() {
  return [
    ...db.expenses.map(e => ({ id: e.id, date: e.date, category: e.category, goatId: e.goatId, amount: +e.amount || 0, note: e.note, kind: 'expense' })),
    ...db.health.filter(h => +h.cost > 0).map(h => ({ id: h.id, date: h.date, category: 'Health & vet', goatId: h.goatId, amount: +h.cost, note: h.type + (h.detail ? ': ' + h.detail : ''), kind: 'health' })),
    ...db.goats.filter(g => +g.purchaseCost > 0).map(g => ({ id: g.id, date: g.purchaseDate || g.dob || '', category: 'Buying goats', goatId: g.id, amount: +g.purchaseCost, note: `Bought ${g.tag} ${g.name}${g.seller ? ' from ' + g.seller : ''}`, kind: 'purchase' }))
  ];
}

/* Cost of every goat:
   purchase + costs spent only on that goat + equal share of common costs
   (common cost on a day is split between all goats on the farm that day) */
function costMap() {
  const m = {};
  db.goats.forEach(g => { m[g.id] = { purchase: +g.purchaseCost || 0, direct: 0, shared: 0, total: 0 }; });
  const items = [...db.expenses, ...db.health.map(h => ({ date: h.date, goatId: h.goatId, amount: +h.cost || 0 }))];
  items.forEach(e => {
    const amt = +e.amount || 0;
    if (!amt) return;
    if (e.goatId && m[e.goatId]) { m[e.goatId].direct += amt; return; }
    const present = db.goats.filter(g => onFarm(g, e.date));
    if (!present.length) return;
    const share = amt / present.length;
    present.forEach(g => { m[g.id].shared += share; });
  });
  Object.values(m).forEach(c => { c.total = c.purchase + c.direct + c.shared; });
  return m;
}

function finance(from, to) {
  const items = spendItems().filter(i => inRange(i.date, from, to));
  const byCat = {};
  items.forEach(i => { byCat[i.category] = (byCat[i.category] || 0) + i.amount; });
  const sales = db.sales.filter(s => inRange(s.date, from, to));
  const spent = sum(items, 'amount'), income = sum(sales, 'price');
  return { items, byCat, sales, spent, income, net: income - spent };
}

function healthDue(days = 14) {
  const limit = addDays(today(), days);
  return db.health.filter(h => {
    if (!h.nextDue || h.nextDue > limit) return false;
    if (h.goatId) { const g = goatById(h.goatId); if (!g || g.status !== 'Active') return false; }
    return !db.health.some(x => x.id !== h.id && x.goatId === h.goatId && x.type === h.type && x.date >= h.nextDue && x.date > h.date);
  }).sort((a, b) => a.nextDue.localeCompare(b.nextDue));
}

function streaks() {
  const set = new Set(db.attendance.map(a => a.date));
  let cur = 0, d = today();
  if (!set.has(d)) d = addDays(d, -1);
  while (set.has(d)) { cur++; d = addDays(d, -1); }
  const dates = [...set].sort();
  let best = 0, run = 0, prev = null;
  dates.forEach(x => { run = prev && daysBetween(prev, x) === 1 ? run + 1 : 1; best = Math.max(best, run); prev = x; });
  return { cur, best };
}

function nextTag() {
  let max = 0;
  db.goats.forEach(g => { const m = /(\d+)\s*$/.exec(g.tag || ''); if (m) max = Math.max(max, +m[1]); });
  return 'MG-' + String(max + 1).padStart(3, '0');
}

/* ---------------- UI primitives ---------------- */
function toast(msg, type = '') {
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = msg;
  $('#toasts').appendChild(el);
  setTimeout(() => el.remove(), 3200);
}
function openModal(title, body, opts = {}) {
  const root = $('#modal');
  root.innerHTML = `<div class="modal-backdrop" data-close></div>
    <div class="modal ${opts.wide ? 'wide' : ''}" role="dialog" aria-modal="true" aria-labelledby="mtitle">
      <div class="modal-head"><h2 id="mtitle">${title}</h2><button class="icon-btn" data-close aria-label="Close">${icon('x')}</button></div>
      <div class="modal-body">${body}</div>
    </div>`;
  root.classList.add('open');
  root.querySelectorAll('[data-close]').forEach(b => { b.onclick = closeModal; });
  setTimeout(() => { const f = root.querySelector('.modal-body input:not([type=hidden]):not([type=checkbox]), .modal-body select'); if (f && window.innerWidth > 700) f.focus(); }, 60);
}
function closeModal() { const r = $('#modal'); r.classList.remove('open'); r.innerHTML = ''; }
function confirmBox(message, okLabel = 'Yes, continue', danger = true) {
  return new Promise(res => {
    openModal('Please confirm', `<p style="margin:0;font-size:17px">${message}</p>
      <div class="form-actions"><button class="btn btn-ghost" id="cNo">Cancel</button><button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" id="cYes">${okLabel}</button></div>`);
    $('#cNo').onclick = () => { closeModal(); res(false); };
    $('#cYes').onclick = () => { closeModal(); res(true); };
  });
}
const F = (label, input, hint = '', cls = '') => `<label class="field ${cls}">${label}${input}${hint ? `<small>${hint}</small>` : ''}</label>`;
const sel = (name, opts, val, extra = '') => `<select name="${name}" ${extra}>${opts.map(o => { const [v, l] = Array.isArray(o) ? o : [o, o]; return `<option value="${esc(v)}" ${String(v) === String(val ?? '') ? 'selected' : ''}>${esc(l)}</option>`; }).join('')}</select>`;
const kpi = (label, value, sub = '', cls = '') => `<div class="kpi ${cls}"><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div>${sub ? `<div class="kpi-sub">${sub}</div>` : ''}</div>`;
const emptyBox = (title, text, btns = '') => `<div class="empty"><h3>${title}</h3><p>${text}</p>${btns ? `<div class="btns">${btns}</div>` : ''}</div>`;
function goatOptions(selected, { shared = false, onlyActive = false, keep = '' } = {}) {
  const list = db.goats.filter(g => !onlyActive || g.status === 'Active' || g.id === keep).sort((a, b) => a.tag.localeCompare(b.tag, undefined, { numeric: true }));
  const opts = list.map(g => [g.id, `${g.tag} – ${g.name}${g.status !== 'Active' ? ' (' + g.status.toLowerCase() + ')' : ''}`]);
  if (shared) opts.unshift(['', 'All goats (common cost)']);
  return opts.map(([v, l]) => `<option value="${esc(v)}" ${v === (selected || '') ? 'selected' : ''}>${esc(l)}</option>`).join('');
}
function statusPill(s) { return `<span class="pill ${s === 'Sold' ? 'sold' : s === 'Dead' ? 'dead' : ''}">${s}</span>`; }

/* ---------------- Charts ---------------- */
let charts = [];
function clearCharts() { charts.forEach(c => c.destroy()); charts = []; }
function makeChart(id, cfg) {
  const el = document.getElementById(id);
  if (!el || !window.Chart) return;
  charts.push(new Chart(el, cfg));
}
if (window.Chart) {
  Chart.defaults.font.family = "'Hind', system-ui, sans-serif";
  Chart.defaults.font.size = 13;
  Chart.defaults.color = '#5D6B63';
  Chart.defaults.plugins.legend.labels.boxWidth = 12;
}
const rupeeTick = v => '₹' + (Math.abs(v) >= 1000 ? (v / 1000).toLocaleString('en-IN') + 'k' : v);

/* =========================================================
   PAGES
   ========================================================= */
const PAGES = {
  dashboard: { title: 'Dashboard', icon: 'home', render: renderDashboard, after: afterDashboard },
  goats: { title: 'Goats', icon: 'tag', render: renderGoats },
  attendance: { title: 'Farm visits', icon: 'calendar', render: renderAttendance },
  expenses: { title: 'Spending', icon: 'wallet', render: renderExpenses },
  sales: { title: 'Sales', icon: 'trend', render: renderSales },
  health: { title: 'Health', icon: 'heart', render: renderHealth },
  reports: { title: 'Reports', icon: 'report', render: renderReports, after: afterReports },
  settings: { title: 'Settings', icon: 'gear', render: renderSettings }
};
const BOTTOM = ['dashboard', 'goats', 'attendance', 'expenses'];

/* ---------------- Dashboard ---------------- */
function helloBlock() {
  const h = new Date().getHours();
  const greet = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  const v = db.attendance.find(a => a.date === today());
  return `<section class="hello">
    <div><h2>${greet}, ${esc(db.settings.owner || 'Malar')}</h2><p>${DAYS[new Date().getDay()]}, ${fmtDate(today())}</p></div>
    ${v ? `<div class="visit-done">${icon('check', 24)}<div><strong>Today's farm visit is marked</strong><br><span>${fmtTime(v.time)}</span></div></div>`
        : `<button class="btn btn-tag btn-lg" data-action="checkIn">${icon('check')} Mark today's visit</button>`}
  </section>`;
}

function renderDashboard() {
  if (!db.goats.length && !db.expenses.length) {
    return helloBlock() + `<div class="card">${emptyBox('Your farm is empty', 'Add your first goat to start tracking costs, sales and profit. You can also load sample data to see how everything looks.',
      `<button class="btn btn-primary" data-action="addGoat">${icon('plus')} Add first goat</button><button class="btn btn-ghost" data-action="sample">Load sample data</button>`)}</div>`;
  }
  const t = today(), m = thisMonth();
  const active = db.goats.filter(g => g.status === 'Active');
  const females = active.filter(g => g.gender === 'Female').length;
  const kids = active.filter(g => { const a = ageMonths(g.dob); return a !== null && a < 6; }).length;
  const fm = finance(m + '-01', t), fAll = finance(), fToday = finance(t, t);
  const visitsM = db.attendance.filter(a => a.date.startsWith(m) && a.date <= t).length;
  const daysSoFar = parse(t).getDate();
  const cm = costMap();
  const soldPL = sum(db.sales, s => s.price - (cm[s.goatId]?.total || 0));
  const due = healthDue(14);

  const recent = [
    ...db.expenses.map(e => ({ date: e.date, text: `${e.category}${e.goatId ? ' for ' + goatLabel(e.goatId) : ''}`, amt: -e.amount })),
    ...db.sales.map(s => ({ date: s.date, text: `Sold ${goatLabel(s.goatId)}`, amt: +s.price })),
    ...db.health.map(h => ({ date: h.date, text: `${h.type}: ${h.goatId ? goatLabel(h.goatId) : 'all goats'}`, amt: h.cost ? -h.cost : null })),
    ...db.attendance.map(a => ({ date: a.date, text: `Farm visit at ${fmtTime(a.time)}`, amt: null })),
    ...db.goats.map(g => ({ date: arrival(g), text: `${g.source === 'Born on farm' ? 'Born' : 'Bought'}: ${g.tag} – ${g.name}`, amt: g.purchaseCost ? -g.purchaseCost : null }))
  ].filter(r => r.date && r.date <= t).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);

  return `${helloBlock()}
  <div class="kpis">
    ${kpi('Goats on farm', active.length, `${females} female, ${active.length - females} male${kids ? `, ${kids} kids` : ''}`)}
    ${kpi('Spent this month', money(fm.spent), `Today ${money(fToday.spent)}`)}
    ${kpi('Sales this month', money(fm.income), plural(fm.sales.length, 'goat') + ' sold')}
    ${kpi('Profit on goats sold', `${soldPL >= 0 ? '' : '−'}${money(Math.abs(soldPL))}`, `${plural(db.sales.length, 'sale')} so far`, db.sales.length ? (soldPL >= 0 ? 'profit' : 'loss') : '')}
    ${kpi('Farm cash balance', money(fAll.net), `All sales minus all spending`)}
    ${kpi('Visits this month', `${visitsM} / ${daysSoFar}`, `${daysSoFar ? Math.round(visitsM / daysSoFar * 100) : 0}% of days`)}
  </div>

  <div class="grid g2">
    <div class="card"><div class="card-head"><div><h2>Money in and out</h2><p class="card-sub">Last 6 months</p></div></div><div class="chart-box"><canvas id="chMonthly"></canvas></div></div>
    <div class="card"><div class="card-head"><div><h2>Where the money goes</h2><p class="card-sub">All time, by type</p></div></div><div class="chart-box"><canvas id="chCats"></canvas></div></div>
  </div>
  <div class="grid g2">
    <div class="card"><div class="card-head"><div><h2>Daily spending</h2><p class="card-sub">Last 30 days</p></div></div><div class="chart-box"><canvas id="chDaily"></canvas></div></div>
    <div class="card"><div class="card-head"><div><h2>Goats by breed</h2><p class="card-sub">Goats on farm now</p></div></div><div class="chart-box"><canvas id="chBreed"></canvas></div></div>
  </div>
  <div class="grid g2">
    <div class="card"><div class="card-head"><h2>Health due soon</h2><a class="btn btn-ghost btn-sm" href="#health">All health</a></div>
      ${due.length ? `<ul class="list">${due.slice(0, 6).map(h => `<li><div class="l-main"><b>${esc(h.type)}</b><span>${h.goatId ? esc(goatLabel(h.goatId)) : 'All goats'}${h.detail ? ' – ' + esc(h.detail) : ''}</span></div>${h.nextDue < t ? `<span class="pill loss">Overdue ${fmtDate(h.nextDue)}</span>` : `<span class="pill warn">${fmtDate(h.nextDue)}</span>`}</li>`).join('')}</ul>`
        : `<p class="muted" style="margin:0">Nothing due in the next 14 days.</p>`}
    </div>
    <div class="card"><div class="card-head"><h2>Recent activity</h2></div>
      ${recent.length ? `<ul class="list">${recent.map(r => `<li><div class="l-main"><b>${esc(r.text)}</b><span>${fmtDate(r.date)}</span></div>${r.amt === null ? '' : plMoney(r.amt)}</li>`).join('')}</ul>` : '<p class="muted">No activity yet.</p>'}
    </div>
  </div>`;
}

function afterDashboard() {
  if (!db.goats.length && !db.expenses.length) return;
  const months = Array.from({ length: 6 }, (_, i) => shiftMonth(thisMonth(), i - 5));
  const fin = months.map(m => finance(m + '-01', monthEnd(m)));
  makeChart('chMonthly', {
    type: 'bar',
    data: { labels: months.map(m => MONTHS[parse(m + '-01').getMonth()]), datasets: [
      { label: 'Sales', data: fin.map(f => f.income), backgroundColor: '#6E9F3B', borderRadius: 6 },
      { label: 'Spending', data: fin.map(f => f.spent), backgroundColor: '#F2C230', borderRadius: 6 }] },
    options: { maintainAspectRatio: false, scales: { y: { ticks: { callback: rupeeTick } } }, plugins: { tooltip: { callbacks: { label: c => `${c.dataset.label}: ${money(c.raw)}` } } } }
  });
  const cats = finance().byCat, ck = Object.keys(cats).sort((a, b) => cats[b] - cats[a]);
  makeChart('chCats', {
    type: 'doughnut',
    data: { labels: ck, datasets: [{ data: ck.map(k => Math.round(cats[k])), backgroundColor: CHART_COLORS, borderWidth: 2, borderColor: '#fff' }] },
    options: { maintainAspectRatio: false, cutout: '62%', plugins: { legend: { position: 'right' }, tooltip: { callbacks: { label: c => `${c.label}: ${money(c.raw)}` } } } }
  });
  const days = Array.from({ length: 30 }, (_, i) => addDays(today(), i - 29));
  const items = spendItems();
  makeChart('chDaily', {
    type: 'line',
    data: { labels: days.map(d => { const x = parse(d); return `${x.getDate()} ${MONTHS[x.getMonth()]}`; }), datasets: [{ label: 'Spent', data: days.map(d => sum(items.filter(i => i.date === d), 'amount')), borderColor: '#1F4D3A', backgroundColor: 'rgba(110,159,59,.18)', fill: true, tension: .3, pointRadius: 2 }] },
    options: { maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => money(c.raw) } } }, scales: { y: { ticks: { callback: rupeeTick } }, x: { ticks: { maxTicksLimit: 8 } } } }
  });
  const breeds = {};
  db.goats.filter(g => g.status === 'Active').forEach(g => { const b = g.breed || 'Not set'; breeds[b] = (breeds[b] || 0) + 1; });
  const bk = Object.keys(breeds).sort((a, b) => breeds[b] - breeds[a]);
  makeChart('chBreed', {
    type: 'bar',
    data: { labels: bk, datasets: [{ label: 'Goats', data: bk.map(k => breeds[k]), backgroundColor: '#F2C230', borderRadius: 6 }] },
    options: { indexAxis: 'y', maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { x: { ticks: { precision: 0 } } } }
  });
}

/* ---------------- Goats ---------------- */
function renderGoats() {
  const counts = s => s === 'All' ? db.goats.length : db.goats.filter(g => g.status === s).length;
  return `<div class="toolbar">
    <div class="search grow">${icon('search', 18)}<input type="search" placeholder="Search tag, name, breed or colour" value="${esc(ui.goatQ)}" data-input="goatQ" aria-label="Search goats"></div>
    <div class="chips">${['Active', 'Sold', 'Dead', 'All'].map(s => `<button class="chip ${ui.goatStatus === s ? 'on' : ''}" data-action="goatStatus" data-v="${s}">${s === 'Active' ? 'On farm' : s} (${counts(s)})</button>`).join('')}</div>
    <button class="btn btn-primary" data-action="addGoat">${icon('plus')} Add goat</button>
  </div>
  <div id="goatGrid">${goatGrid()}</div>`;
}
function goatGrid() {
  const q = ui.goatQ.trim().toLowerCase();
  const list = db.goats
    .filter(g => (ui.goatStatus === 'All' || g.status === ui.goatStatus) && (!q || [g.tag, g.name, g.breed, g.color].join(' ').toLowerCase().includes(q)))
    .sort((a, b) => a.tag.localeCompare(b.tag, undefined, { numeric: true }));
  if (!list.length) {
    return `<div class="card">${db.goats.length ? emptyBox('No goats match', 'Try a different search or choose another filter.')
      : emptyBox('No goats yet', 'Add each goat with the number written on its ear tag.', `<button class="btn btn-primary" data-action="addGoat">${icon('plus')} Add goat</button>`)}</div>`;
  }
  return `<div class="tag-grid">${list.map(g => {
    const cls = g.status === 'Sold' ? 'sold' : g.status === 'Dead' ? 'dead' : '';
    return `<button class="etag ${cls}" data-action="viewGoat" data-id="${g.id}" aria-label="Open ${esc(g.tag)} ${esc(g.name)}">
      ${g.photo ? `<img class="etag-photo" src="${g.photo}" alt="">` : ''}
      <span class="etag-no">${esc(g.tag)}</span>
      <span class="etag-name">${esc(g.name)}</span>
      <span class="etag-meta">${g.gender === 'Male' ? '♂ Male' : '♀ Female'}${g.breed ? ', ' + esc(g.breed) : ''}<br>${ageText(g.dob, leaving(g))}</span>
      ${g.status !== 'Active' ? `<span class="etag-status">${g.status}</span>` : ''}
    </button>`;
  }).join('')}</div>`;
}

function compressImage(file, max = 360) {
  return new Promise((res) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const r = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * r); c.height = Math.round(img.height * r);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      res(c.toDataURL('image/jpeg', 0.72));
    };
    img.onerror = () => { URL.revokeObjectURL(url); res(''); };
    img.src = url;
  });
}

function goatForm(id) {
  const g = id ? goatById(id) : {};
  const isNew = !id;
  const mothers = db.goats.filter(x => x.gender === 'Female' && x.id !== id);
  openModal(isNew ? 'Add a goat' : `Edit ${esc(g.tag)}`, `
  <form id="goatForm" novalidate>
    <div class="form-grid">
      ${F('Ear tag number', `<input name="tag" required maxlength="20" value="${esc(g.tag || nextTag())}">`, 'The number written on the tag')}
      ${F('Name', `<input name="name" required maxlength="40" value="${esc(g.name || '')}" placeholder="e.g. Lakshmi">`)}
      ${F('Gender', sel('gender', ['Female', 'Male'], g.gender || 'Female'))}
      ${F('Breed', `<input name="breed" list="breedList" value="${esc(g.breed || '')}" placeholder="Choose or type"><datalist id="breedList">${BREEDS.map(b => `<option value="${b}">`).join('')}</datalist>`)}
      ${F('Date of birth', `<input type="date" name="dob" max="${today()}" value="${g.dob || ''}">`, 'A rough date is fine. Used to show age.')}
      ${F('Colour or marks', `<input name="color" value="${esc(g.color || '')}" placeholder="e.g. Black with white face">`)}
      ${F('How it came to the farm', sel('source', ['Purchased', 'Born on farm'], g.source || 'Purchased', 'id="srcSel"'))}
      ${F('Mother', `<select name="motherId"><option value="">Not known</option>${mothers.map(x => `<option value="${x.id}" ${x.id === g.motherId ? 'selected' : ''}>${esc(x.tag)} – ${esc(x.name)}</option>`).join('')}</select>`)}
    </div>
    <div class="form-grid" id="buyFields" style="margin-top:14px">
      ${F('Purchase date', `<input type="date" name="purchaseDate" max="${today()}" value="${g.purchaseDate || today()}">`)}
      ${F('Purchase cost (₹)', `<input type="number" name="purchaseCost" min="0" step="1" inputmode="numeric" value="${g.purchaseCost ?? ''}" placeholder="0">`)}
      ${F('Bought from', `<input name="seller" value="${esc(g.seller || '')}" placeholder="Seller or market name">`, '', 'full')}
    </div>
    <div class="form-grid" style="margin-top:14px">
      ${F('Weight (kg)', `<input type="number" name="weight" min="0" step="0.1" inputmode="decimal" value="${g.weight ?? ''}">`)}
      ${F('Photo', `<input type="file" name="photoFile" accept="image/*">`, g.photo ? '<label class="check" style="font-size:14px"><input type="checkbox" name="removePhoto"> Remove current photo</label>' : 'Optional. Kept small to save space.')}
      ${F('Notes', `<textarea name="notes" placeholder="Anything to remember">${esc(g.notes || '')}</textarea>`, '', 'full')}
    </div>
    <p class="form-err" id="gErr"></p>
    <div class="form-actions"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary" type="submit">${isNew ? 'Add goat' : 'Save changes'}</button></div>
  </form>`);
  const form = $('#goatForm');
  form.querySelector('[data-close]').onclick = closeModal;
  const toggleBuy = () => { $('#buyFields').hidden = form.elements.source.value !== 'Purchased'; };
  form.elements.source.onchange = toggleBuy; toggleBuy();
  form.onsubmit = async e => {
    e.preventDefault();
    const err = msg => { $('#gErr').textContent = msg; };
    const tag = form.elements.tag.value.trim(), name = form.elements.name.value.trim();
    if (!tag) return err('Enter the ear tag number.');
    if (!name) return err('Enter a name for the goat.');
    if (db.goats.some(x => x.id !== id && x.tag.toLowerCase() === tag.toLowerCase())) return err(`Tag ${tag} is already used by another goat.`);
    const purchased = form.elements.source.value === 'Purchased';
    if (purchased && !form.elements.purchaseDate.value) return err('Enter the purchase date.');
    if (!purchased && !form.elements.dob.value) return err('Enter the date of birth for a goat born on the farm.');
    let photo = g.photo || '';
    const file = form.elements.photoFile.files[0];
    if (file) photo = await compressImage(file);
    if (form.elements.removePhoto && form.elements.removePhoto.checked) photo = '';
    const rec = {
      ...g, id: id || uid(), tag, name,
      gender: form.elements.gender.value, breed: form.elements.breed.value.trim(), dob: form.elements.dob.value, color: form.elements.color.value.trim(),
      source: form.elements.source.value, motherId: form.elements.motherId.value,
      purchaseDate: purchased ? form.elements.purchaseDate.value : '', purchaseCost: purchased ? (+form.elements.purchaseCost.value || 0) : 0,
      seller: purchased ? form.elements.seller.value.trim() : '',
      weight: form.elements.weight.value ? +form.elements.weight.value : '', notes: form.elements.notes.value.trim(), photo,
      status: g.status || 'Active', createdAt: g.createdAt || Date.now()
    };
    if (isNew) db.goats.push(rec); else db.goats[db.goats.findIndex(x => x.id === id)] = rec;
    save(); closeModal(); render();
    toast(isNew ? `${tag} added` : 'Changes saved');
  };
}

function viewGoat(id) {
  const g = goatById(id);
  if (!g) return;
  const c = costMap()[id];
  const s = saleOf(id);
  const mother = goatById(g.motherId);
  const kids = db.goats.filter(k => k.motherId === id);
  const hist = [
    ...db.expenses.filter(e => e.goatId === id).map(e => ({ date: e.date, what: e.category, note: e.note, amt: +e.amount })),
    ...db.health.filter(h => h.goatId === id).map(h => ({ date: h.date, what: h.type, note: [h.detail, h.nextDue ? 'next due ' + fmtDate(h.nextDue) : ''].filter(Boolean).join(', '), amt: +h.cost || 0 }))
  ].sort((a, b) => b.date.localeCompare(a.date));
  const cls = g.status === 'Sold' ? 'sold' : g.status === 'Dead' ? 'dead' : '';
  const profit = s ? s.price - c.total : null;

  openModal(`${esc(g.tag)} – ${esc(g.name)}`, `
    <div class="goat-head">
      ${g.photo ? `<img src="${g.photo}" alt="Photo of ${esc(g.name)}">` : `<div class="mini-tag ${cls}">${esc(g.tag)}</div>`}
      <div><h3>${esc(g.name)}</h3><div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:4px">${statusPill(g.status)}<span class="pill gray">${g.gender}</span>${g.breed ? `<span class="pill gray">${esc(g.breed)}</span>` : ''}</div></div>
    </div>
    <dl class="dl">
      <div><dt>Age${g.status !== 'Active' ? ' (at ' + (g.status === 'Sold' ? 'sale' : 'death') + ')' : ''}</dt><dd>${ageText(g.dob, leaving(g))}</dd></div>
      <div><dt>Date of birth</dt><dd>${fmtDate(g.dob)}</dd></div>
      <div><dt>Came to farm</dt><dd>${g.source === 'Born on farm' ? 'Born ' + fmtDate(g.dob) : 'Bought ' + fmtDate(g.purchaseDate)}</dd></div>
      <div><dt>Weight</dt><dd>${g.weight ? g.weight + ' kg' : '—'}</dd></div>
      <div><dt>Colour</dt><dd>${esc(g.color) || '—'}</dd></div>
      <div><dt>Mother</dt><dd>${mother ? `<button class="link-btn" data-action="viewGoat" data-id="${mother.id}">${esc(mother.tag)}</button>` : '—'}</dd></div>
      ${g.seller ? `<div><dt>Bought from</dt><dd>${esc(g.seller)}</dd></div>` : ''}
      ${g.status === 'Dead' ? `<div><dt>Died on</dt><dd>${fmtDate(g.deathDate)}</dd></div>` : ''}
    </dl>
    ${g.notes ? `<p class="muted" style="margin:12px 0 0">${esc(g.notes)}</p>` : ''}

    <div class="cost-box">
      <div class="cost-line"><span>Buying cost</span><span>${money(c.purchase)}</span></div>
      <div class="cost-line"><span>Spent only on this goat</span><span>${money(c.direct)}</span></div>
      <div class="cost-line"><span>Share of common costs</span><span>${money(c.shared)}</span></div>
      <div class="cost-line total"><span>Total cost ${s ? 'until sale' : 'so far'}</span><span>${money(c.total)}</span></div>
      ${s ? `<div class="cost-line"><span>Sold for (${fmtDate(s.date)}${s.buyer ? ', to ' + esc(s.buyer) : ''})</span><span>${money(s.price)}</span></div>
             <div class="cost-line result"><span>${profit >= 0 ? 'Profit' : 'Loss'}</span>${plMoney(profit)}</div>` : ''}
      <small>Common costs like feed and labour are split equally between all goats on the farm that day.</small>
    </div>

    ${kids.length ? `<h3 class="section-title">Kids (${kids.length})</h3><div class="chips">${kids.map(k => `<button class="chip" data-action="viewGoat" data-id="${k.id}">${esc(k.tag)} – ${esc(k.name)}</button>`).join('')}</div>` : ''}

    <h3 class="section-title">Spending and health history</h3>
    ${hist.length ? `<div class="table-wrap"><table><thead><tr><th>Date</th><th>What</th><th>Details</th><th class="num">Amount</th></tr></thead><tbody>
      ${hist.map(h => `<tr><td>${fmtDate(h.date)}</td><td>${esc(h.what)}</td><td class="note">${esc(h.note || '')}</td><td class="num">${h.amt ? money(h.amt) : '—'}</td></tr>`).join('')}
    </tbody></table></div>` : '<p class="muted">Nothing recorded only for this goat yet.</p>'}

    <div class="actions-row">
      <button class="btn btn-ghost" data-action="editGoat" data-id="${id}">${icon('edit', 18)} Edit</button>
      ${g.status === 'Active' ? `<button class="btn btn-primary" data-action="sellGoat" data-id="${id}">${icon('trend', 18)} Record sale</button>
        <button class="btn btn-ghost" data-action="addHealth" data-goat="${id}">${icon('heart', 18)} Add health record</button>
        <button class="btn btn-ghost" data-action="addExpense" data-goat="${id}">${icon('wallet', 18)} Add spending</button>
        <button class="btn btn-ghost" data-action="deadGoat" data-id="${id}">Mark as died</button>` : ''}
      ${g.status === 'Dead' ? `<button class="btn btn-ghost" data-action="reviveGoat" data-id="${id}">Mark as on farm again</button>` : ''}
      ${s ? `<button class="btn btn-ghost" data-action="deleteSale" data-id="${s.id}">Undo sale</button>` : ''}
      <button class="btn btn-danger-ghost" data-action="deleteGoat" data-id="${id}">${icon('trash', 18)} Delete</button>
    </div>`, { wide: true });
}

function deadForm(id) {
  const g = goatById(id);
  openModal(`Mark ${esc(g.tag)} as died`, `<form id="deadForm" class="form-grid">
    ${F('Date', `<input type="date" name="date" required max="${today()}" value="${today()}">`)}
    ${F('Reason', `<input name="reason" placeholder="e.g. Illness">`)}
    <div class="full form-actions" style="margin-top:6px"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-danger">Mark as died</button></div></form>`);
  const f = $('#deadForm');
  f.querySelector('[data-close]').onclick = closeModal;
  f.onsubmit = e => {
    e.preventDefault();
    Object.assign(g, { status: 'Dead', deathDate: f.elements.date.value, deathReason: f.elements.reason.value.trim() });
    if (f.elements.reason.value.trim()) g.notes = [g.notes, 'Died: ' + f.elements.reason.value.trim()].filter(Boolean).join('\n');
    save(); closeModal(); render(); toast(`${g.tag} marked as died`);
  };
}

/* ---------------- Spending ---------------- */
function renderExpenses() {
  const all = spendItems().filter(i => ui.expMonth === 'all' || (i.date || '').startsWith(ui.expMonth));
  const items = all.filter(i => !ui.expCat || i.category === ui.expCat).sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  const byCat = {};
  all.forEach(i => { byCat[i.category] = (byCat[i.category] || 0) + i.amount; });
  const total = sum(items, 'amount');
  const maxCat = Math.max(1, ...Object.values(byCat));
  const allCats = [...CATEGORIES, 'Health & vet', 'Buying goats'];
  let perDay = '';
  if (ui.expMonth !== 'all') {
    const days = ui.expMonth === thisMonth() ? parse(today()).getDate() : parse(monthEnd(ui.expMonth)).getDate();
    perDay = money(total / Math.max(1, days)) + ' per day on average';
  }
  return `<div class="toolbar">
    <input type="month" data-change="expMonth" value="${ui.expMonth === 'all' ? '' : ui.expMonth}" aria-label="Month">
    <button class="chip ${ui.expMonth === 'all' ? 'on' : ''}" data-action="expAll">All time</button>
    <select data-change="expCat" aria-label="Type">${[['', 'All types'], ...allCats.map(c => [c, c])].map(([v, l]) => `<option value="${esc(v)}" ${v === ui.expCat ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>
    <span class="grow"></span>
    <button class="btn btn-primary" data-action="addExpense">${icon('plus')} Add spending</button>
  </div>
  <div class="grid g-side">
    <div class="card">
      <h2>${money(total)}</h2>
      <p class="card-sub">${ui.expMonth === 'all' ? 'Spent in total' : 'Spent in ' + monthLabel(ui.expMonth)}${ui.expCat ? ' on ' + esc(ui.expCat) : ''}${perDay ? '<br>' + perDay : ''}</p>
      <div style="margin-top:16px">${Object.keys(byCat).length ? Object.keys(byCat).sort((a, b) => byCat[b] - byCat[a]).map(k => `<div class="bar-row"><span>${esc(k)}</span><span class="bar"><i style="width:${byCat[k] / maxCat * 100}%"></i></span><span class="num">${money(byCat[k])}</span></div>`).join('') : '<p class="muted">No spending in this period.</p>'}</div>
    </div>
    <div class="card" style="padding:0;border:0;background:none">
      ${items.length ? `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Type</th><th>For</th><th>Details</th><th class="num">Amount</th><th></th></tr></thead><tbody>
        ${items.map(i => `<tr><td>${fmtDate(i.date)}</td><td>${esc(i.category)}</td><td>${i.goatId ? esc(goatLabel(i.goatId)) : '<span class="muted">All goats</span>'}</td><td class="note">${esc(i.note || '')}</td><td class="num">${money(i.amount)}</td>
          <td><div class="row-actions">${i.kind === 'expense' ? `<button class="icon-btn" data-action="editExpense" data-id="${i.id}" aria-label="Edit">${icon('edit', 16)}</button><button class="icon-btn danger" data-action="deleteExpense" data-id="${i.id}" aria-label="Delete">${icon('trash', 16)}</button>`
            : i.kind === 'health' ? `<button class="btn btn-ghost btn-sm" data-action="editHealth" data-id="${i.id}">Open</button>` : `<button class="btn btn-ghost btn-sm" data-action="viewGoat" data-id="${i.id}">Open</button>`}</div></td></tr>`).join('')}
        </tbody><tfoot><tr><td colspan="4">Total</td><td class="num">${money(total)}</td><td></td></tr></tfoot></table></div>`
        : `<div class="card">${emptyBox('No spending here', 'Record food, medicine, labour and other costs to see where the money goes.', `<button class="btn btn-primary" data-action="addExpense">${icon('plus')} Add spending</button>`)}</div>`}
    </div>
  </div>`;
}

function expenseForm(id, goatId) {
  const e = id ? db.expenses.find(x => x.id === id) : { goatId: goatId || '', category: 'Feed & fodder', date: today() };
  openModal(id ? 'Edit spending' : 'Add spending', `<form id="expForm" class="form-grid">
    ${F('Date', `<input type="date" name="date" required max="${today()}" value="${e.date}">`)}
    ${F('Type', sel('category', CATEGORIES, e.category))}
    ${F('Amount (₹)', `<input type="number" name="amount" required min="1" step="1" inputmode="numeric" value="${e.amount ?? ''}" placeholder="0">`)}
    ${F('For which goat', `<select name="goatId">${goatOptions(e.goatId, { shared: true, onlyActive: true, keep: e.goatId })}</select>`, 'Pick “All goats” for feed and other common costs')}
    ${F('Details', `<input name="note" value="${esc(e.note || '')}" placeholder="e.g. 2 bags of concentrate feed">`, '', 'full')}
    <p class="form-err full" id="eErr" style="margin:0"></p>
    <div class="full form-actions" style="margin-top:0"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">${id ? 'Save changes' : 'Add spending'}</button></div>
  </form>`);
  const f = $('#expForm');
  f.querySelector('[data-close]').onclick = closeModal;
  f.onsubmit = ev => {
    ev.preventDefault();
    if (!(+f.elements.amount.value > 0)) { $('#eErr').textContent = 'Enter an amount more than 0.'; return; }
    const rec = { id: id || uid(), date: f.elements.date.value, category: f.elements.category.value, amount: +f.elements.amount.value, goatId: f.elements.goatId.value, note: f.elements.note.value.trim() };
    if (id) db.expenses[db.expenses.findIndex(x => x.id === id)] = rec; else db.expenses.push(rec);
    save(); closeModal(); render(); toast(id ? 'Changes saved' : `${money(rec.amount)} added`);
  };
}

/* ---------------- Sales ---------------- */
function renderSales() {
  const cm = costMap();
  const rows = [...db.sales].sort((a, b) => b.date.localeCompare(a.date)).map(s => ({ s, g: goatById(s.goatId), cost: cm[s.goatId]?.total || 0 }));
  const income = sum(rows, r => r.s.price), cost = sum(rows, 'cost'), pl = income - cost;
  const wins = rows.filter(r => r.s.price >= r.cost).length;
  return `<div class="page-head"><p>Profit for each goat is the sale price minus everything spent on it: buying cost, its own costs and its share of common costs.</p>
    <button class="btn btn-primary" data-action="sellGoat">${icon('plus')} Record a sale</button></div>
  <div class="kpis">
    ${kpi('Goats sold', rows.length, rows.length ? `${wins} at profit, ${rows.length - wins} at loss` : '')}
    ${kpi('Total sales', money(income))}
    ${kpi('Total cost of sold goats', money(cost))}
    ${kpi(pl >= 0 ? 'Total profit' : 'Total loss', money(Math.abs(pl)), rows.length ? `Average ${money(pl / rows.length)} per goat` : '', rows.length ? (pl >= 0 ? 'profit' : 'loss') : '')}
  </div>
  ${rows.length ? `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Goat</th><th>Age</th><th>Buyer</th><th class="num">Sold for</th><th class="num">Total cost</th><th class="num">Profit / loss</th><th></th></tr></thead><tbody>
    ${rows.map(({ s, g, cost }) => `<tr><td>${fmtDate(s.date)}</td><td>${g ? `<button class="link-btn" data-action="viewGoat" data-id="${g.id}">${esc(g.tag)} – ${esc(g.name)}</button>` : 'Deleted goat'}</td><td>${g ? ageText(g.dob, s.date) : ''}</td><td>${esc(s.buyer || '—')}${s.phone ? `<br><small class="muted">${esc(s.phone)}</small>` : ''}</td>
      <td class="num">${money(s.price)}</td><td class="num">${money(cost)}</td><td class="num">${plMoney(s.price - cost)}</td>
      <td><div class="row-actions"><button class="icon-btn danger" data-action="deleteSale" data-id="${s.id}" aria-label="Undo sale">${icon('trash', 16)}</button></div></td></tr>`).join('')}
  </tbody><tfoot><tr><td colspan="4">Total</td><td class="num">${money(income)}</td><td class="num">${money(cost)}</td><td class="num">${plMoney(pl)}</td><td></td></tr></tfoot></table></div>`
  : `<div class="card">${emptyBox('No sales yet', 'When you sell a goat, record it here to see the profit or loss straight away.', `<button class="btn btn-primary" data-action="sellGoat">${icon('plus')} Record a sale</button>`)}</div>`}`;
}

function saleForm(goatId) {
  if (!db.goats.some(g => g.status === 'Active')) { toast('There are no goats on the farm to sell.', 'bad'); return; }
  const cm = costMap();
  openModal('Record a sale', `<form id="saleForm" class="form-grid">
    ${F('Goat', `<select name="goatId" required>${goatOptions(goatId, { onlyActive: true })}</select>`, '', 'full')}
    ${F('Sale date', `<input type="date" name="date" required max="${today()}" value="${today()}">`)}
    ${F('Sold for (₹)', `<input type="number" name="price" required min="0" step="1" inputmode="numeric" placeholder="0">`)}
    ${F('Buyer name', `<input name="buyer" placeholder="Optional">`)}
    ${F('Buyer phone', `<input name="phone" inputmode="tel" placeholder="Optional">`)}
    ${F('Weight at sale (kg)', `<input type="number" name="weight" min="0" step="0.1" inputmode="decimal">`)}
    ${F('Notes', `<input name="note" placeholder="Optional">`)}
    <div class="full preview" id="salePrev"></div>
    <p class="form-err full" id="sErr" style="margin:0"></p>
    <div class="full form-actions" style="margin-top:0"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">Save sale</button></div>
  </form>`);
  const f = $('#saleForm');
  f.querySelector('[data-close]').onclick = closeModal;
  const prev = () => {
    const c = cm[f.elements.goatId.value] || { total: 0, purchase: 0, direct: 0, shared: 0 };
    const p = +f.elements.price.value || 0;
    $('#salePrev').innerHTML = `<div class="cost-line"><span>Total cost of this goat so far</span><b>${money(c.total)}</b></div>
      <div class="cost-line"><small class="muted" style="margin:0">Buying ${money(c.purchase)} + own costs ${money(c.direct)} + common share ${money(c.shared)}</small></div>
      ${p ? `<div class="cost-line result"><span>${p - c.total >= 0 ? 'Profit' : 'Loss'}</span>${plMoney(p - c.total)}</div>` : '<div class="cost-line muted"><span>Enter the price to see profit or loss</span></div>'}`;
  };
  f.elements.goatId.onchange = prev; f.elements.price.oninput = prev; prev();
  f.onsubmit = e => {
    e.preventDefault();
    const g = goatById(f.elements.goatId.value);
    if (!g) return;
    if (!(+f.elements.price.value >= 0) || f.elements.price.value === '') { $('#sErr').textContent = 'Enter the sale price.'; return; }
    if (f.elements.date.value < arrival(g)) { $('#sErr').textContent = `Sale date is before ${g.tag} came to the farm.`; return; }
    db.sales.push({ id: uid(), goatId: g.id, date: f.elements.date.value, price: +f.elements.price.value, buyer: f.elements.buyer.value.trim(), phone: f.elements.phone.value.trim(), weight: f.elements.weight.value ? +f.elements.weight.value : '', note: f.elements.note.value.trim() });
    g.status = 'Sold';
    if (f.elements.weight.value) g.weight = +f.elements.weight.value;
    save(); closeModal(); render();
    const pl = +f.elements.price.value - (costMap()[g.id]?.total || 0);
    toast(`${g.tag} sold. ${pl >= 0 ? 'Profit' : 'Loss'} ${money(Math.abs(pl))}`);
  };
}

/* ---------------- Health ---------------- */
function renderHealth() {
  const due = healthDue(30), t = today();
  const rows = [...db.health].sort((a, b) => b.date.localeCompare(a.date));
  return `<div class="page-head"><p>Vaccinations, deworming and treatments. Add a next due date to get a reminder on the dashboard.</p>
    <button class="btn btn-primary" data-action="addHealth">${icon('plus')} Add health record</button></div>
  ${due.length ? `<div class="card" style="margin-bottom:16px"><div class="card-head"><h2>Due in the next 30 days</h2></div><ul class="list">
    ${due.map(h => `<li><div class="l-main"><b>${esc(h.type)}${h.detail ? ' – ' + esc(h.detail) : ''}</b><span>${h.goatId ? esc(goatLabel(h.goatId)) : 'All goats'}</span></div>
      <div style="display:flex;gap:8px;align-items:center">${h.nextDue < t ? `<span class="pill loss">Overdue ${fmtDate(h.nextDue)}</span>` : `<span class="pill warn">${fmtDate(h.nextDue)}</span>`}<button class="btn btn-ghost btn-sm" data-action="healthDone" data-id="${h.id}">Mark done</button></div></li>`).join('')}
  </ul></div>` : ''}
  ${rows.length ? `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Goat</th><th>Type</th><th>Details</th><th class="num">Cost</th><th>Next due</th><th></th></tr></thead><tbody>
    ${rows.map(h => `<tr><td>${fmtDate(h.date)}</td><td>${h.goatId ? esc(goatLabel(h.goatId)) : '<span class="muted">All goats</span>'}</td><td>${esc(h.type)}</td><td class="note">${esc(h.detail || '')}</td><td class="num">${h.cost ? money(h.cost) : '—'}</td><td>${h.nextDue ? fmtDate(h.nextDue) : '—'}</td>
      <td><div class="row-actions"><button class="icon-btn" data-action="editHealth" data-id="${h.id}" aria-label="Edit">${icon('edit', 16)}</button><button class="icon-btn danger" data-action="deleteHealth" data-id="${h.id}" aria-label="Delete">${icon('trash', 16)}</button></div></td></tr>`).join('')}
  </tbody></table></div>`
  : `<div class="card">${emptyBox('No health records yet', 'Record vaccinations and treatments so you never miss the next dose.', `<button class="btn btn-primary" data-action="addHealth">${icon('plus')} Add health record</button>`)}</div>`}`;
}

function healthForm(id, goatId, preset) {
  const h = id ? db.health.find(x => x.id === id) : { goatId: goatId || '', type: 'Vaccination', date: today(), ...(preset || {}) };
  openModal(id ? 'Edit health record' : 'Add health record', `<form id="hForm" class="form-grid">
    ${F('Goat', `<select name="goatId">${goatOptions(h.goatId, { shared: true, onlyActive: true, keep: h.goatId }).replace('All goats (common cost)', 'All goats')}</select>`)}
    ${F('Date', `<input type="date" name="date" required max="${today()}" value="${h.date}">`)}
    ${F('Type', sel('type', HEALTH_TYPES, h.type))}
    ${F('Medicine or vaccine', `<input name="detail" value="${esc(h.detail || '')}" placeholder="e.g. PPR vaccine">`)}
    ${F('Cost (₹)', `<input type="number" name="cost" min="0" step="1" inputmode="numeric" value="${h.cost || ''}" placeholder="0">`, 'Added to spending automatically')}
    ${F('Next due date', `<input type="date" name="nextDue" value="${h.nextDue || ''}">`, 'Optional reminder')}
    <div class="full form-actions" style="margin-top:4px"><button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">${id ? 'Save changes' : 'Add record'}</button></div>
  </form>`);
  const f = $('#hForm');
  f.querySelector('[data-close]').onclick = closeModal;
  f.onsubmit = e => {
    e.preventDefault();
    const rec = { id: id || uid(), goatId: f.elements.goatId.value, date: f.elements.date.value, type: f.elements.type.value, detail: f.elements.detail.value.trim(), cost: +f.elements.cost.value || 0, nextDue: f.elements.nextDue.value };
    if (id) db.health[db.health.findIndex(x => x.id === id)] = rec; else db.health.push(rec);
    save(); closeModal(); render(); toast(id ? 'Changes saved' : 'Health record added');
  };
}

/* ---------------- Attendance (farm visits) ---------------- */
function renderAttendance() {
  const m = ui.calMonth, t = today(), tm = thisMonth();
  const first = parse(m + '-01');
  const nDays = parse(monthEnd(m)).getDate();
  const visits = Object.fromEntries(db.attendance.map(a => [a.date, a]));
  const possible = m === tm ? parse(t).getDate() : m < tm ? nDays : 0;
  const visited = db.attendance.filter(a => a.date.startsWith(m) && a.date <= t).length;
  const st = streaks();
  const todayV = visits[t];
  let cells = '';
  for (let i = 0; i < first.getDay(); i++) cells += '<div class="cal-d blank"></div>';
  for (let d = 1; d <= nDays; d++) {
    const ds = `${m}-${pad(d)}`, v = visits[ds];
    const cls = [v ? 'visited' : ds < t ? 'missed' : '', ds === t ? 'today' : '', ds > t ? 'future' : ''].join(' ');
    cells += `<button class="cal-d ${cls}" ${ds > t ? 'disabled' : `data-action="dayClick" data-date="${ds}"`} aria-label="${fmtDate(ds)}${v ? ', visited' : ''}">${d}${v ? `<small>${fmtTime(v.time)}</small>` : ''}</button>`;
  }
  const list = db.attendance.filter(a => a.date.startsWith(m)).sort((a, b) => b.date.localeCompare(a.date));
  return `<div class="hello" style="margin-bottom:16px">
      <div><h2>${todayV ? 'Visited today' : 'Not visited yet today'}</h2><p>${todayV ? `Marked at ${fmtTime(todayV.time)}${todayV.tasks?.length ? ' – ' + esc(todayV.tasks.join(', ')) : ''}` : 'Tap the button when you reach the farm.'}</p></div>
      ${todayV ? `<button class="btn btn-tag" data-action="dayClick" data-date="${t}">Edit today's visit</button>` : `<button class="btn btn-tag btn-lg" data-action="checkIn">${icon('check')} Mark today's visit</button>`}
    </div>
    <div class="kpis">
      ${kpi('Days visited', `${visited} / ${possible}`, monthLabel(m))}
      ${kpi('Visit rate', `${possible ? Math.round(visited / possible * 100) : 0}%`, `${Math.max(0, possible - visited)} days missed`)}
      ${kpi('Current streak', plural(st.cur, 'day'), 'Visits in a row')}
      ${kpi('Best streak', plural(st.best, 'day'), 'All time')}
    </div>
    <div class="grid g-side" style="grid-template-columns:minmax(0,2fr) minmax(0,1fr)">
      <div class="card">
        <div class="card-head"><div class="cal-nav"><button class="icon-btn" data-action="calPrev" aria-label="Previous month">${icon('left')}</button><h2>${monthLabel(m)}</h2><button class="icon-btn" data-action="calNext" aria-label="Next month" ${m >= tm ? 'disabled' : ''}>${icon('right')}</button></div>
          ${m !== tm ? `<button class="btn btn-ghost btn-sm" data-action="calToday">This month</button>` : ''}</div>
        <div class="cal">${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => `<div class="cal-h">${d}</div>`).join('')}${cells}</div>
        <div class="legend"><span><i style="background:var(--leaf)"></i>Visited</span><span><i style="background:#FBF0EE;border:1px solid #F0D3CE"></i>Missed</span><span>Tap any past day to add or change a visit.</span></div>
      </div>
      <div class="card"><h2 style="margin-bottom:10px">Visits in ${MONTHS_FULL[first.getMonth()]}</h2>
        ${list.length ? `<ul class="list">${list.map(a => `<li><div class="l-main"><b>${fmtDate(a.date)}</b><span>${fmtTime(a.time)}${a.tasks?.length ? ' – ' + esc(a.tasks.join(', ')) : ''}${a.note ? '<br>' + esc(a.note) : ''}</span></div></li>`).join('')}</ul>` : '<p class="muted">No visits marked this month.</p>'}
      </div>
    </div>`;
}

function quickCheckIn() {
  const t = today();
  if (db.attendance.some(a => a.date === t)) { toast('Today is already marked'); return; }
  db.attendance.push({ id: uid(), date: t, time: nowTime(), tasks: [], note: '' });
  save(); render();
  toast(`Visit marked at ${fmtTime(nowTime())}`);
}

function visitForm(date) {
  const v = db.attendance.find(a => a.date === date);
  openModal(v ? `Visit on ${fmtDate(date)}` : `Mark visit for ${fmtDate(date)}`, `<form id="vForm" class="form-grid">
    ${F('Time reached farm', `<input type="time" name="time" required value="${v ? v.time : (date === today() ? nowTime() : '08:00')}">`)}
    <div></div>
    <div class="field full">Work done<div class="tasks">${TASKS.map(t => `<label class="task"><input type="checkbox" name="tasks" value="${t}" ${v?.tasks?.includes(t) ? 'checked' : ''}> ${t}</label>`).join('')}</div></div>
    ${F('Note', `<input name="note" value="${esc(v?.note || '')}" placeholder="Optional">`, '', 'full')}
    <div class="full form-actions" style="margin-top:4px">
      ${v ? `<button type="button" class="btn btn-danger-ghost" id="vDel" style="margin-right:auto">Remove visit</button>` : ''}
      <button type="button" class="btn btn-ghost" data-close>Cancel</button><button class="btn btn-primary">Save visit</button></div>
  </form>`);
  const f = $('#vForm');
  f.querySelector('[data-close]').onclick = closeModal;
  if (v) $('#vDel').onclick = () => { db.attendance = db.attendance.filter(a => a.date !== date); save(); closeModal(); render(); toast('Visit removed'); };
  f.onsubmit = e => {
    e.preventDefault();
    const rec = { id: v?.id || uid(), date, time: f.elements.time.value, tasks: [...f.querySelectorAll('[name=tasks]:checked')].map(x => x.value), note: f.elements.note.value.trim() };
    db.attendance = db.attendance.filter(a => a.date !== date).concat(rec);
    save(); closeModal(); render(); toast('Visit saved');
  };
}

/* ---------------- Reports ---------------- */
function presetRange(p) {
  const t = today(), m = thisMonth();
  if (p === 'month') return [m + '-01', t];
  if (p === 'last') { const lm = shiftMonth(m, -1); return [lm + '-01', monthEnd(lm)]; }
  if (p === '3m') return [shiftMonth(m, -2) + '-01', t];
  if (p === 'year') return [t.slice(0, 4) + '-01-01', t];
  const dates = [...spendItems().map(i => i.date), ...db.sales.map(s => s.date), ...db.attendance.map(a => a.date), ...db.goats.map(arrival)].filter(d => d && d > '1971');
  return [dates.length ? dates.sort()[0] : t, t];
}

function renderReports() {
  const from = ui.rFrom, to = ui.rTo, t = today();
  const f = finance(from, to), cm = costMap();
  const visitEnd = to > t ? t : to;
  const possible = Math.max(0, daysBetween(from, visitEnd) + 1);
  const visits = db.attendance.filter(a => inRange(a.date, from, visitEnd)).length;
  const bought = db.goats.filter(g => g.source === 'Purchased' && inRange(g.purchaseDate, from, to)).length;
  const born = db.goats.filter(g => g.source === 'Born on farm' && inRange(g.dob, from, to)).length;
  const died = db.goats.filter(g => g.status === 'Dead' && inRange(g.deathDate, from, to)).length;
  const salesPL = sum(f.sales, s => s.price - (cm[s.goatId]?.total || 0));
  const months = [];
  for (let m = from.slice(0, 7); m <= to.slice(0, 7) && months.length < 60; m = shiftMonth(m, 1)) months.push(m);
  const monthly = months.map(m => {
    const a = m + '-01' < from ? from : m + '-01', b = monthEnd(m) > to ? to : monthEnd(m);
    const fx = finance(a, b);
    const bEnd = b > t ? t : b;
    return { m, spent: fx.spent, income: fx.income, net: fx.net, visits: db.attendance.filter(x => inRange(x.date, a, bEnd)).length, days: Math.max(0, daysBetween(a, bEnd) + 1) };
  });
  const cats = Object.keys(f.byCat).sort((a, b) => f.byCat[b] - f.byCat[a]);
  const presets = [['month', 'This month'], ['last', 'Last month'], ['3m', 'Last 3 months'], ['year', 'This year'], ['all', 'All time']];

  return `<div class="toolbar no-print">
    <div class="chips">${presets.map(([k, l]) => `<button class="chip ${ui.rPreset === k ? 'on' : ''}" data-action="rPreset" data-v="${k}">${l}</button>`).join('')}</div>
    <input type="date" data-change="rFrom" value="${from}" aria-label="From date"><span class="muted">to</span><input type="date" data-change="rTo" value="${to}" aria-label="To date">
    <span class="grow"></span>
    <button class="btn btn-ghost" data-action="print">${icon('printer', 18)} Print</button>
    <button class="btn btn-primary" data-action="exportRange">${icon('download', 18)} Download Excel</button>
  </div>
  <h2 style="font-size:22px;margin-bottom:12px">${esc(db.settings.farmName)}: ${fmtDate(from)} to ${fmtDate(to)}</h2>
  <div class="kpis">
    ${kpi('Total spending', money(f.spent), plural(f.items.length, 'entry'))}
    ${kpi('Total sales', money(f.income), plural(f.sales.length, 'goat') + ' sold')}
    ${kpi(f.net >= 0 ? 'Cash gain' : 'Cash shortfall', money(Math.abs(f.net)), 'Sales minus spending', f.net >= 0 ? 'profit' : 'loss')}
    ${kpi('Profit on goats sold', `${salesPL >= 0 ? '' : '−'}${money(Math.abs(salesPL))}`, 'After each goat’s full cost', f.sales.length ? (salesPL >= 0 ? 'profit' : 'loss') : '')}
    ${kpi('Farm visits', `${visits} / ${possible}`, `${possible ? Math.round(visits / possible * 100) : 0}% of days`)}
    ${kpi('Herd changes', `+${bought + born} / −${f.sales.length + died}`, `${bought} bought, ${born} born, ${f.sales.length} sold, ${died} died`)}
  </div>

  <div class="grid g2">
    <div class="card"><h2 style="margin-bottom:10px">Month by month</h2><div class="chart-box" style="height:220px"><canvas id="chReport"></canvas></div></div>
    <div class="card"><h2 style="margin-bottom:10px">Spending by type</h2>
      ${cats.length ? `<div class="table-wrap"><table><thead><tr><th>Type</th><th class="num">Amount</th><th class="num">Share</th></tr></thead><tbody>
        ${cats.map(c => `<tr><td>${esc(c)}</td><td class="num">${money(f.byCat[c])}</td><td class="num">${Math.round(f.byCat[c] / f.spent * 100)}%</td></tr>`).join('')}
      </tbody><tfoot><tr><td>Total</td><td class="num">${money(f.spent)}</td><td class="num">100%</td></tr></tfoot></table></div>` : '<p class="muted">No spending in this period.</p>'}
    </div>
  </div>

  <div class="card" style="margin-bottom:16px"><h2 style="margin-bottom:10px">Monthly summary</h2>
    <div class="table-wrap"><table><thead><tr><th>Month</th><th class="num">Spending</th><th class="num">Sales</th><th class="num">Difference</th><th class="num">Visits</th></tr></thead><tbody>
      ${monthly.map(r => `<tr><td>${monthLabel(r.m)}</td><td class="num">${money(r.spent)}</td><td class="num">${money(r.income)}</td><td class="num">${plMoney(r.net)}</td><td class="num">${r.visits} / ${r.days}</td></tr>`).join('')}
    </tbody></table></div>
  </div>

  ${f.sales.length ? `<div class="card" style="margin-bottom:16px"><h2 style="margin-bottom:10px">Sales in this period</h2>
    <div class="table-wrap"><table><thead><tr><th>Date</th><th>Goat</th><th class="num">Sold for</th><th class="num">Total cost</th><th class="num">Profit / loss</th></tr></thead><tbody>
      ${f.sales.sort((a, b) => a.date.localeCompare(b.date)).map(s => { const c = cm[s.goatId]?.total || 0; return `<tr><td>${fmtDate(s.date)}</td><td>${esc(goatLabel(s.goatId))}</td><td class="num">${money(s.price)}</td><td class="num">${money(c)}</td><td class="num">${plMoney(s.price - c)}</td></tr>`; }).join('')}
    </tbody></table></div></div>` : ''}

  <div class="card"><h2>Every goat: cost and profit</h2><p class="card-sub" style="margin-bottom:10px">Full life of each goat up to today, not limited to the dates above.</p>
    ${db.goats.length ? `<div class="table-wrap"><table><thead><tr><th>Tag</th><th>Name</th><th>Status</th><th>Age</th><th class="num">Buying</th><th class="num">Own costs</th><th class="num">Common share</th><th class="num">Total cost</th><th class="num">Sold for</th><th class="num">Profit / loss</th></tr></thead><tbody>
      ${[...db.goats].sort((a, b) => a.tag.localeCompare(b.tag, undefined, { numeric: true })).map(g => { const c = cm[g.id], s = saleOf(g.id); return `<tr><td><button class="link-btn" data-action="viewGoat" data-id="${g.id}">${esc(g.tag)}</button></td><td>${esc(g.name)}</td><td>${statusPill(g.status)}</td><td>${ageText(g.dob, leaving(g))}</td>
        <td class="num">${money(c.purchase)}</td><td class="num">${money(c.direct)}</td><td class="num">${money(c.shared)}</td><td class="num"><b>${money(c.total)}</b></td><td class="num">${s ? money(s.price) : '—'}</td><td class="num">${s ? plMoney(s.price - c.total) : g.status === 'Dead' ? plMoney(-c.total) : '<span class="muted">Not sold</span>'}</td></tr>`; }).join('')}
    </tbody></table></div>` : '<p class="muted">No goats yet.</p>'}
  </div>`;
}
function afterReports() {
  const from = ui.rFrom, to = ui.rTo, months = [];
  for (let m = from.slice(0, 7); m <= to.slice(0, 7) && months.length < 60; m = shiftMonth(m, 1)) months.push(m);
  const fin = months.map(m => finance(m + '-01' < from ? from : m + '-01', monthEnd(m) > to ? to : monthEnd(m)));
  makeChart('chReport', {
    type: 'bar',
    data: { labels: months.map(m => `${MONTHS[parse(m + '-01').getMonth()]} ${m.slice(2, 4)}`), datasets: [
      { label: 'Sales', data: fin.map(f => f.income), backgroundColor: '#6E9F3B', borderRadius: 5 },
      { label: 'Spending', data: fin.map(f => f.spent), backgroundColor: '#F2C230', borderRadius: 5 }] },
    options: { maintainAspectRatio: false, scales: { y: { ticks: { callback: rupeeTick } } }, plugins: { tooltip: { callbacks: { label: c => `${c.dataset.label}: ${money(c.raw)}` } } } }
  });
}

/* ---------------- Excel export ---------------- */
function exportExcel(from, to) {
  if (!window.XLSX) { toast('Excel tool did not load. Check the internet connection and try again.', 'bad'); return; }
  const cm = costMap(), f = finance(from, to), wb = XLSX.utils.book_new();
  const addSheet = (name, rows) => {
    const data = rows.length ? rows : [{ Info: 'No records in this period' }];
    const ws = XLSX.utils.json_to_sheet(data);
    ws['!cols'] = Object.keys(data[0]).map(k => ({ wch: Math.min(45, Math.max(k.length + 2, ...data.slice(0, 300).map(r => String(r[k] ?? '').length + 2))) }));
    XLSX.utils.book_append_sheet(wb, ws, name);
  };
  const visitsIn = db.attendance.filter(a => inRange(a.date, from, to)).sort((a, b) => a.date.localeCompare(b.date));
  const visitEnd = to > today() ? today() : to;
  const possible = Math.max(0, daysBetween(from, visitEnd) + 1);
  const salesPL = sum(f.sales, s => s.price - (cm[s.goatId]?.total || 0));

  addSheet('Summary', [
    { Item: 'Farm', Value: db.settings.farmName },
    { Item: 'Period', Value: `${fmtDate(from)} to ${fmtDate(to)}` },
    { Item: 'Downloaded on', Value: `${fmtDate(today())} ${fmtTime(nowTime())}` },
    { Item: 'Goats on farm now', Value: db.goats.filter(g => g.status === 'Active').length },
    { Item: 'Total spending (₹)', Value: Math.round(f.spent) },
    ...Object.keys(f.byCat).map(k => ({ Item: `   ${k} (₹)`, Value: Math.round(f.byCat[k]) })),
    { Item: 'Total sales (₹)', Value: Math.round(f.income) },
    { Item: 'Sales minus spending (₹)', Value: Math.round(f.net) },
    { Item: 'Profit / loss on goats sold (₹)', Value: Math.round(salesPL) },
    { Item: 'Farm visits', Value: `${visitsIn.filter(a => a.date <= visitEnd).length} of ${possible} days` }
  ]);
  addSheet('Goats', [...db.goats].sort((a, b) => a.tag.localeCompare(b.tag, undefined, { numeric: true })).map(g => {
    const c = cm[g.id], s = saleOf(g.id);
    return {
      'Tag': g.tag, 'Name': g.name, 'Gender': g.gender, 'Breed': g.breed, 'Colour': g.color, 'Status': g.status,
      'Date of birth': g.dob, 'Age': ageText(g.dob, leaving(g)), 'Came by': g.source, 'Purchase date': g.purchaseDate, 'Bought from': g.seller,
      'Mother tag': goatById(g.motherId)?.tag || '', 'Weight (kg)': g.weight,
      'Buying cost (₹)': Math.round(c.purchase), 'Own costs (₹)': Math.round(c.direct), 'Common share (₹)': Math.round(c.shared), 'Total cost (₹)': Math.round(c.total),
      'Sale date': s?.date || '', 'Sold for (₹)': s ? s.price : '', 'Profit / loss (₹)': s ? Math.round(s.price - c.total) : (g.status === 'Dead' ? -Math.round(c.total) : ''),
      'Died on': g.deathDate || '', 'Notes': g.notes
    };
  }));
  addSheet('Spending', f.items.sort((a, b) => a.date.localeCompare(b.date)).map(i => ({ 'Date': i.date, 'Type': i.category, 'For': i.goatId ? goatLabel(i.goatId) : 'All goats', 'Details': i.note || '', 'Amount (₹)': i.amount })));
  addSheet('Sales', f.sales.sort((a, b) => a.date.localeCompare(b.date)).map(s => { const g = goatById(s.goatId), c = cm[s.goatId]?.total || 0; return { 'Date': s.date, 'Tag': g?.tag || '', 'Name': g?.name || '', 'Age at sale': g ? ageText(g.dob, s.date) : '', 'Buyer': s.buyer, 'Phone': s.phone, 'Weight (kg)': s.weight, 'Sold for (₹)': s.price, 'Total cost (₹)': Math.round(c), 'Profit / loss (₹)': Math.round(s.price - c), 'Result': s.price >= c ? 'Profit' : 'Loss' }; }));
  addSheet('Health', db.health.filter(h => inRange(h.date, from, to)).sort((a, b) => a.date.localeCompare(b.date)).map(h => ({ 'Date': h.date, 'Goat': h.goatId ? goatLabel(h.goatId) : 'All goats', 'Type': h.type, 'Details': h.detail, 'Cost (₹)': h.cost || 0, 'Next due': h.nextDue || '' })));
  addSheet('Farm visits', visitsIn.map(a => ({ 'Date': a.date, 'Day': DAYS[parse(a.date).getDay()], 'Time': fmtTime(a.time), 'Work done': (a.tasks || []).join(', '), 'Note': a.note || '' })));
  const months = [];
  for (let m = from.slice(0, 7); m <= to.slice(0, 7) && months.length < 120; m = shiftMonth(m, 1)) months.push(m);
  addSheet('Monthly', months.map(m => {
    const a = m + '-01' < from ? from : m + '-01', b = monthEnd(m) > to ? to : monthEnd(m), fx = finance(a, b), bEnd = b > today() ? today() : b;
    return { 'Month': monthLabel(m), 'Spending (₹)': Math.round(fx.spent), 'Sales (₹)': Math.round(fx.income), 'Difference (₹)': Math.round(fx.net), 'Visits': db.attendance.filter(x => inRange(x.date, a, bEnd)).length, 'Days': Math.max(0, daysBetween(a, bEnd) + 1) };
  }));
  const name = (db.settings.farmName || 'Goat Farm').replace(/[^\w]+/g, '-');
  XLSX.writeFile(wb, `${name}_${from}_to_${to}.xlsx`);
  toast('Excel file downloaded');
}

/* ---------------- Settings ---------------- */
function renderSettings() {
  const kb = Math.round(JSON.stringify(db).length / 1024);
  return `<div class="grid g2">
    <form class="card" id="farmForm"><h2 style="margin-bottom:14px">Farm details</h2>
      <div class="form-grid">${F('Farm name', `<input name="farmName" required value="${esc(db.settings.farmName)}">`)}${F('Owner name', `<input name="owner" value="${esc(db.settings.owner)}">`)}</div>
      <div class="form-actions"><button class="btn btn-primary">Save farm details</button></div></form>
    <form class="card" id="loginSet"><h2 style="margin-bottom:14px">Sign-in details</h2>
      <div class="form-grid">
        ${F('Username', `<input name="username" required autocapitalize="none" value="${esc(db.settings.username)}">`)}
        ${F('Current password', `<input type="password" name="current" required autocomplete="current-password">`)}
        ${F('New password', `<input type="password" name="pw1" minlength="4" autocomplete="new-password">`, 'Leave empty to keep the same')}
        ${F('Repeat new password', `<input type="password" name="pw2" autocomplete="new-password">`)}
      </div><p class="form-err" id="lsErr"></p>
      <div class="form-actions" style="margin-top:6px"><button class="btn btn-primary">Save sign-in details</button></div></form>
  </div>
  <div class="card" style="margin-bottom:16px"><h2>Your data</h2>
    <p class="card-sub" style="max-width:70ch">Everything is saved inside this browser on this device (about ${kb} KB used). Download a backup every week. If the phone is changed or the browser data is cleared, restore the backup to get everything back.</p>
    <div class="actions-row">
      <button class="btn btn-primary" data-action="exportAll">${icon('download', 18)} Download everything as Excel</button>
      <button class="btn btn-ghost" data-action="backup">${icon('download', 18)} Download backup file</button>
      <button class="btn btn-ghost" data-action="restore">${icon('upload', 18)} Restore from backup</button>
      <input type="file" id="restoreFile" accept=".json,application/json" hidden>
    </div>
  </div>
  <div class="card"><h2>Start over</h2><p class="card-sub">Try the app with sample goats, or remove all records.</p>
    <div class="actions-row"><button class="btn btn-ghost" data-action="sample">Load sample data</button><button class="btn btn-danger-ghost" data-action="wipe">${icon('trash', 18)} Erase all data</button></div>
  </div>`;
}
function afterSettings() {
  $('#farmForm').onsubmit = e => {
    e.preventDefault();
    db.settings.farmName = e.target.elements.farmName.value.trim() || 'Malar Goat Farm';
    db.settings.owner = e.target.elements.owner.value.trim();
    save(); applyBrand(); toast('Farm details saved');
  };
  $('#loginSet').onsubmit = e => {
    e.preventDefault();
    const f = e.target, err = m => { $('#lsErr').textContent = m; };
    if (f.elements.current.value !== db.settings.password) return err('Current password is wrong.');
    if (f.elements.pw1.value && f.elements.pw1.value.length < 4) return err('New password needs at least 4 characters.');
    if (f.elements.pw1.value !== f.elements.pw2.value) return err('The two new passwords do not match.');
    db.settings.username = f.elements.username.value.trim();
    if (f.elements.pw1.value) db.settings.password = f.elements.pw1.value;
    save(); f.reset(); f.elements.username.value = db.settings.username; err(''); toast('Sign-in details saved');
  };
  $('#restoreFile').onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = async () => {
      try {
        const d = JSON.parse(r.result);
        if (!Array.isArray(d.goats)) throw new Error('bad');
        if (!(await confirmBox(`Replace all current data with this backup? It has ${plural(d.goats.length, 'goat')}.`, 'Restore backup'))) return;
        const base = defaultDB();
        db = { ...base, ...d, settings: { ...base.settings, ...(d.settings || {}) } };
        save(); applyBrand(); render(); toast('Backup restored');
      } catch (_) { toast('This file is not a valid backup.', 'bad'); }
    };
    r.readAsText(file);
    e.target.value = '';
  };
}
PAGES.settings.after = afterSettings;

function downloadBackup() {
  const blob = new Blob([JSON.stringify(db, null, 1)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${(db.settings.farmName || 'goat-farm').replace(/[^\w]+/g, '-')}_backup_${today()}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  toast('Backup downloaded');
}

/* ---------------- Sample data ---------------- */
function loadSample() {
  const t = today(), rnd = (a, b) => Math.floor(a + Math.random() * (b - a + 1)), pick = a => a[rnd(0, a.length - 1)];
  const names = ['Lakshmi', 'Kaveri', 'Meena', 'Raja', 'Ponni', 'Selvi', 'Muthu', 'Thangam', 'Vellai', 'Karuppan', 'Malli', 'Rani'];
  const goats = [], expenses = [], sales = [], health = [], attendance = [];
  names.forEach((n, i) => {
    const male = ['Raja', 'Muthu', 'Karuppan', 'Vellai'].includes(n);
    const pd = addDays(t, -rnd(150, 200));
    goats.push({ id: uid(), tag: 'MG-' + String(i + 1).padStart(3, '0'), name: n, gender: male ? 'Male' : 'Female', breed: pick(['Tellicherry', 'Salem Black', 'Kanni Aadu', 'Boer', 'Kodi Aadu']), dob: addDays(pd, -rnd(150, 420)), color: pick(['Black', 'Brown', 'White', 'Black and white']), source: 'Purchased', purchaseDate: pd, purchaseCost: rnd(6, 14) * 1000, seller: pick(['Ettayapuram market', 'Local farmer', 'Kanniyakumari shandy']), motherId: '', weight: rnd(18, 32), notes: '', photo: '', status: 'Active', createdAt: Date.now() });
  });
  const moms = goats.filter(g => g.gender === 'Female');
  ['Kutty', 'Chinna', 'Pappu'].forEach((n, i) => {
    goats.push({ id: uid(), tag: 'MG-' + String(13 + i).padStart(3, '0'), name: n, gender: i === 1 ? 'Male' : 'Female', breed: moms[i].breed, dob: addDays(t, -rnd(25, 70)), color: 'Brown', source: 'Born on farm', purchaseDate: '', purchaseCost: 0, seller: '', motherId: moms[i].id, weight: rnd(3, 7), notes: '', photo: '', status: 'Active', createdAt: Date.now() });
  });
  for (let d = 145; d >= 0; d -= rnd(2, 4)) expenses.push({ id: uid(), date: addDays(t, -d), category: 'Feed & fodder', amount: rnd(4, 9) * 100, goatId: '', note: pick(['Green fodder', 'Concentrate feed bag', 'Dry fodder', 'Groundnut cake']) });
  for (let mth = 6; mth >= 0; mth--) {
    const ld = addDays(t, -(mth * 30 + 2)); expenses.push({ id: uid(), date: ld, category: 'Labour', amount: 3000, goatId: '', note: 'Monthly helper wage' });
    expenses.push({ id: uid(), date: addDays(ld, 5), category: 'Electricity & water', amount: rnd(3, 6) * 100, goatId: '', note: 'Shed light and motor' });
  }
  expenses.push({ id: uid(), date: addDays(t, -160), category: 'Shed & equipment', amount: 8500, goatId: '', note: 'Raised platform repair' });
  goats.slice(0, 6).forEach(g => expenses.push({ id: uid(), date: addDays(t, -rnd(10, 100)), category: 'Medicine', amount: rnd(2, 6) * 50, goatId: g.id, note: 'Wound spray and tonic' }));
  const vacc = addDays(t, -140);
  health.push({ id: uid(), goatId: '', date: vacc, type: 'Vaccination', detail: 'PPR vaccine', cost: 1200, nextDue: addDays(vacc, 365) });
  const dw = addDays(t, -85);
  health.push({ id: uid(), goatId: '', date: dw, type: 'Deworming', detail: 'Albendazole', cost: 600, nextDue: addDays(dw, 90) });
  health.push({ id: uid(), goatId: goats[1].id, date: addDays(t, -40), type: 'Treatment', detail: 'Fever, vet visit', cost: 450, nextDue: '' });
  health.push({ id: uid(), goatId: goats[4].id, date: addDays(t, -20), type: 'Pregnancy check', detail: 'Confirmed', cost: 200, nextDue: addDays(t, 10) });
  [[goats[3], 45, 21000], [goats[8], 18, 17500], [goats[11], 8, 9500]].forEach(([g, ago, price]) => {
    sales.push({ id: uid(), goatId: g.id, date: addDays(t, -ago), price, buyer: pick(['Murugan', 'Selvam traders', 'Ravi']), phone: '', weight: rnd(28, 38), note: '' });
    g.status = 'Sold';
  });
  for (let d = 120; d >= 1; d--) if (Math.random() < 0.86) attendance.push({ id: uid(), date: addDays(t, -d), time: `${pad(rnd(6, 8))}:${pad(rnd(0, 59))}`, tasks: TASKS.filter(() => Math.random() < 0.75), note: '' });
  db = { ...db, goats, expenses, sales, health, attendance };
  save(); render(); toast('Sample data loaded');
}

/* =========================================================
   Router, actions, boot
   ========================================================= */
const currentPage = () => { const p = location.hash.slice(1); return PAGES[p] ? p : 'dashboard'; };

function buildNav() {
  const p = currentPage();
  $('#nav').innerHTML = Object.entries(PAGES).map(([k, v]) => `<a class="nav-item ${k === p ? 'active' : ''}" href="#${k}" ${k === p ? 'aria-current="page"' : ''}>${icon(v.icon)}${v.title}</a>`).join('');
  $('#bottomNav').innerHTML = BOTTOM.map(k => `<a class="bn-item ${k === p ? 'active' : ''}" href="#${k}"><span class="bn-ic">${icon(PAGES[k].icon, 22)}</span>${k === 'attendance' ? 'Visits' : PAGES[k].title}</a>`).join('')
    + `<button class="bn-item ${BOTTOM.includes(p) ? '' : 'active'}" data-action="openNav"><span class="bn-ic">${icon('more', 22)}</span>More</button>`;
}
function render() {
  clearCharts();
  const p = currentPage(), page = PAGES[p];
  $('#pageTitle').textContent = page.title;
  document.title = `${page.title} – ${db.settings.farmName}`;
  buildNav();
  $('#view').innerHTML = page.render();
  if (page.after) page.after();
  $('#app').classList.remove('nav-open');
}
function applyBrand() {
  $('#brandName').textContent = db.settings.farmName;
  $('#loginFarm').textContent = db.settings.farmName;
}

const ACTIONS = {
  openNav: () => $('#app').classList.add('nav-open'),
  closeNav: () => $('#app').classList.remove('nav-open'),
  logout: async () => {
    if (!(await confirmBox('Sign out of the farm app?', 'Sign out', false))) return;
    try { sessionStorage.removeItem(SESSION_KEY); localStorage.removeItem(SESSION_KEY); } catch (_) { }
    boot();
  },
  checkIn: quickCheckIn,
  dayClick: d => visitForm(d.date),
  calPrev: () => { ui.calMonth = shiftMonth(ui.calMonth, -1); render(); },
  calNext: () => { if (ui.calMonth < thisMonth()) { ui.calMonth = shiftMonth(ui.calMonth, 1); render(); } },
  calToday: () => { ui.calMonth = thisMonth(); render(); },
  goatStatus: d => { ui.goatStatus = d.v; render(); },
  addGoat: () => goatForm(),
  editGoat: d => goatForm(d.id),
  viewGoat: d => viewGoat(d.id),
  sellGoat: d => saleForm(d.id),
  deadGoat: d => deadForm(d.id),
  reviveGoat: d => { const g = goatById(d.id); g.status = 'Active'; delete g.deathDate; save(); closeModal(); render(); toast(`${g.tag} is on the farm again`); },
  deleteGoat: async d => {
    const g = goatById(d.id);
    if (!(await confirmBox(`Delete ${esc(g.tag)} – ${esc(g.name)}? Its sale, health records and its own spending will also be deleted. This cannot be undone.`, 'Delete goat'))) return;
    db.goats = db.goats.filter(x => x.id !== g.id);
    db.sales = db.sales.filter(x => x.goatId !== g.id);
    db.health = db.health.filter(x => x.goatId !== g.id);
    db.expenses = db.expenses.filter(x => x.goatId !== g.id);
    db.goats.forEach(x => { if (x.motherId === g.id) x.motherId = ''; });
    save(); render(); toast(`${g.tag} deleted`);
  },
  addExpense: d => expenseForm(null, d.goat),
  editExpense: d => expenseForm(d.id),
  deleteExpense: async d => {
    if (!(await confirmBox('Delete this spending entry?', 'Delete'))) return;
    db.expenses = db.expenses.filter(x => x.id !== d.id); save(); render(); toast('Spending deleted');
  },
  expAll: () => { ui.expMonth = ui.expMonth === 'all' ? thisMonth() : 'all'; render(); },
  deleteSale: async d => {
    const s = db.sales.find(x => x.id === d.id), g = goatById(s.goatId);
    if (!(await confirmBox(`Undo the sale of ${g ? esc(g.tag) : 'this goat'}? The goat will be back on the farm.`, 'Undo sale'))) return;
    db.sales = db.sales.filter(x => x.id !== d.id);
    if (g) g.status = 'Active';
    save(); render(); toast('Sale removed');
  },
  addHealth: d => healthForm(null, d.goat),
  editHealth: d => healthForm(d.id),
  healthDone: d => { const h = db.health.find(x => x.id === d.id); healthForm(null, h.goatId, { type: h.type, detail: h.detail }); },
  deleteHealth: async d => {
    if (!(await confirmBox('Delete this health record?', 'Delete'))) return;
    db.health = db.health.filter(x => x.id !== d.id); save(); render(); toast('Health record deleted');
  },
  rPreset: d => { ui.rPreset = d.v; [ui.rFrom, ui.rTo] = presetRange(d.v); render(); },
  print: () => window.print(),
  exportRange: () => exportExcel(ui.rFrom, ui.rTo),
  exportAll: () => { const [f, t] = presetRange('all'); exportExcel(f, t); },
  backup: downloadBackup,
  restore: () => $('#restoreFile').click(),
  sample: async () => {
    if (db.goats.length && !(await confirmBox('Sample data will replace all your current records. Continue?', 'Load sample data'))) return;
    loadSample();
  },
  wipe: async () => {
    if (!(await confirmBox('Erase every goat, spending, sale, health record and visit? Download a backup first if you may need it.', 'Erase all data'))) return;
    db = { ...defaultDB(), settings: db.settings }; save(); render(); toast('All data erased');
  }
};
const CHANGES = {
  expMonth: v => { ui.expMonth = v || thisMonth(); render(); },
  expCat: v => { ui.expCat = v; render(); },
  rFrom: v => { if (!v) return; ui.rFrom = v; ui.rPreset = ''; if (ui.rTo < v) ui.rTo = v; render(); },
  rTo: v => { if (!v) return; ui.rTo = v; ui.rPreset = ''; if (ui.rFrom > v) ui.rFrom = v; render(); }
};

document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el || el.disabled) return;
  const fn = ACTIONS[el.dataset.action];
  if (!fn) return;
  e.preventDefault();
  if (el.closest('.modal') && ['viewGoat', 'editGoat', 'sellGoat', 'deadGoat', 'addHealth', 'addExpense'].includes(el.dataset.action)) closeModal();
  fn(el.dataset, el);
});
document.addEventListener('input', e => {
  if (e.target.dataset.input === 'goatQ') { ui.goatQ = e.target.value; $('#goatGrid').innerHTML = goatGrid(); }
});
document.addEventListener('change', e => {
  const k = e.target.dataset.change;
  if (k && CHANGES[k]) CHANGES[k](e.target.value, e.target);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { if ($('#modal').classList.contains('open')) closeModal(); else $('#app').classList.remove('nav-open'); }
});
window.addEventListener('hashchange', () => { closeModal(); render(); window.scrollTo(0, 0); });

/* ---------------- Login ---------------- */
function isLoggedIn() {
  try { return sessionStorage.getItem(SESSION_KEY) === '1' || localStorage.getItem(SESSION_KEY) === '1'; }
  catch (_) { return false; }
}
function boot() {
  applyBrand();
  if (isLoggedIn()) {
    $('#login').hidden = true; $('#app').hidden = false;
    render();
  } else {
    $('#app').hidden = true; $('#login').hidden = false;
    $('#loginHint').hidden = !(db.settings.username === 'malar' && db.settings.password === 'malar123');
    $('#loginForm').reset(); $('#loginErr').textContent = '';
  }
}
$('#loginForm').onsubmit = e => {
  e.preventDefault();
  const f = e.target;
  if (f.elements.u.value.trim().toLowerCase() === db.settings.username.toLowerCase() && f.elements.p.value === db.settings.password) {
    try { sessionStorage.setItem(SESSION_KEY, '1'); if (f.elements.keep.checked) localStorage.setItem(SESSION_KEY, '1'); } catch (_) { }
    boot();
  } else {
    $('#loginErr').textContent = 'Username or password is wrong. Please try again.';
    f.elements.p.value = ''; f.elements.p.focus();
  }
};
$('#pwToggle').onclick = () => { const p = $('#loginForm').p; const show = p.type === 'password'; p.type = show ? 'text' : 'password'; $('#pwToggle').textContent = show ? 'Hide' : 'Show'; };
$('#menuBtn').innerHTML = icon('menu');
$('#logoutBtn').innerHTML = icon('logout') + 'Sign out';
$('#topExcel').innerHTML = icon('download', 16) + 'Excel';

boot();
