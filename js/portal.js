/* ======================================================================
   PORTAL.JS — Member Portal Logic
   Zero emojis, pure SVG icons, localStorage persistence
   ====================================================================== */

// ======================== STORAGE ========================
const STORE_KEY = 'rfw_portal';

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY) || localStorage.getItem('axion_portal');
    if (raw) return JSON.parse(raw);
  } catch (e) { /* ignore */ }
  return getDefaultState();
}

function saveState(state) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
}

function getDefaultState() {
  return {
    profile: { name: 'Athlete', age: '', height: '' },
    weights: [],
    startWeight: null,
    goalWeight: null,
    hydration: 0,
    mode: 'daily',
    xp: 0,
    streak: 0,
    lastVisit: null,
    workouts: getDefaultWorkouts(),
    currentDay: new Date().getDay() || 7, // 1=Mon..7=Sun
  };
}

function getDefaultWorkouts() {
  return {
    1: { split: 'Push', name: 'Chest / Shoulders / Triceps', exercises: [
      { id: 'bp', name: 'Barbell Bench Press', sets: '4x8', done: false },
      { id: 'ohp', name: 'Overhead Press', sets: '3x10', done: false },
      { id: 'df', name: 'Dumbbell Flyes', sets: '3x12', done: false },
      { id: 'lt', name: 'Lateral Raises', sets: '4x15', done: false },
      { id: 'td', name: 'Tricep Dips', sets: '3x12', done: false },
    ]},
    2: { split: 'Pull', name: 'Back / Biceps / Rear Delts', exercises: [
      { id: 'dl', name: 'Deadlift', sets: '4x5', done: false },
      { id: 'pu', name: 'Pull-Ups', sets: '4x8', done: false },
      { id: 'br', name: 'Barbell Row', sets: '3x10', done: false },
      { id: 'fc', name: 'Face Pulls', sets: '4x15', done: false },
      { id: 'bc', name: 'Barbell Curl', sets: '3x12', done: false },
    ]},
    3: { split: 'Legs', name: 'Quads / Hams / Glutes / Calves', exercises: [
      { id: 'sq', name: 'Barbell Squat', sets: '4x6', done: false },
      { id: 'lp', name: 'Leg Press', sets: '3x12', done: false },
      { id: 'le', name: 'Leg Extensions', sets: '3x15', done: false },
      { id: 'rc', name: 'Romanian Deadlift', sets: '3x10', done: false },
      { id: 'cr', name: 'Calf Raises', sets: '4x20', done: false },
    ]},
    4: { split: 'Upper', name: 'Compound Upper Body', exercises: [
      { id: 'ibp', name: 'Incline Bench Press', sets: '4x8', done: false },
      { id: 'wr', name: 'Weighted Pull-Ups', sets: '4x6', done: false },
      { id: 'dp', name: 'Dumbbell Press', sets: '3x10', done: false },
      { id: 'cr2', name: 'Cable Rows', sets: '3x12', done: false },
    ]},
    5: { split: 'Lower', name: 'Legs & Core', exercises: [
      { id: 'fs', name: 'Front Squat', sets: '4x6', done: false },
      { id: 'bg', name: 'Bulgarian Split Squat', sets: '3x10', done: false },
      { id: 'ht', name: 'Hip Thrust', sets: '3x12', done: false },
      { id: 'pl', name: 'Plank', sets: '3x60s', done: false },
    ]},
    6: { split: 'Active Recovery', name: 'Light Cardio & Mobility', exercises: [
      { id: 'jog', name: 'Light Jog', sets: '20 min', done: false },
      { id: 'str', name: 'Full Body Stretch', sets: '15 min', done: false },
      { id: 'foam', name: 'Foam Rolling', sets: '10 min', done: false },
    ]},
    7: { split: 'Rest', name: '', exercises: [] },
  };
}

const ALL_EXERCISES = [
  'Barbell Bench Press', 'Overhead Press', 'Dumbbell Flyes', 'Lateral Raises', 'Tricep Dips',
  'Deadlift', 'Pull-Ups', 'Barbell Row', 'Face Pulls', 'Barbell Curl',
  'Barbell Squat', 'Leg Press', 'Leg Extensions', 'Romanian Deadlift', 'Calf Raises',
  'Incline Bench Press', 'Weighted Pull-Ups', 'Dumbbell Press', 'Cable Rows',
  'Front Squat', 'Bulgarian Split Squat', 'Hip Thrust', 'Plank',
  'Light Jog', 'Full Body Stretch', 'Foam Rolling',
  'Chest Press Machine', 'Lat Pulldown', 'Seated Cable Row', 'Hack Squat',
  'Leg Curl', 'Dumbbell Curl', 'Skull Crushers', 'Cable Crossover',
  'Ab Crunch Machine', 'Hanging Leg Raise', 'Russian Twist', 'Farmer Walk',
];

let state = loadState();
if (typeof state.xp !== 'number') state.xp = 0;
if (typeof state.streak !== 'number') state.streak = 0;

// ======================== PLAYFUL HELPERS ========================
function toast(html) {
  let root = document.getElementById('toastRoot');
  if (!root) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = html;
  root.appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 320); }, 2600);
  while (root.children.length > 3) root.firstChild.remove();
}
function buzz(pattern = 12) { try { navigator.vibrate && navigator.vibrate(pattern); } catch (e) {} }
function confettiBurst(n = 90) {
  const cv = document.getElementById('confettiCanvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const dpr = Math.min(devicePixelRatio || 1, 2);
  cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const colors = ['#ffffff', '#c9c9c9', '#f5f1e6', '#22c55e', '#9aa6b2'];
  const parts = Array.from({ length: n }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 160,
    y: innerHeight * 0.4,
    vx: (Math.random() - 0.5) * 10, vy: -Math.random() * 8 - 2,
    s: Math.random() * 7 + 4, r: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
    c: colors[Math.floor(Math.random() * colors.length)], life: 1
  }));
  let f = 0;
  (function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.32; p.r += p.vr; p.life -= 0.009;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.globalAlpha = Math.max(p.life, 0); ctx.fillStyle = p.c;
      ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.62); ctx.restore();
    });
    if (++f < 120) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, innerWidth, innerHeight);
  })();
}
function levelFor(xp) { return Math.floor(xp / 200) + 1; }
const LEVEL_NAMES = ['Rookie', 'Bronze', 'Iron', 'Silver', 'Gold', 'Royal', 'Legend'];
function updateGamification() {
  const lvl = levelFor(state.xp);
  const name = LEVEL_NAMES[Math.min(lvl - 1, LEVEL_NAMES.length - 1)];
  const label = document.getElementById('levelLabel');
  if (label) label.textContent = `Level ${lvl} • ${name}`;
  const fill = document.getElementById('xpFill');
  const txt = document.getElementById('xpText');
  const inLevel = state.xp % 200;
  if (fill) fill.style.width = Math.max((inLevel / 200) * 100, 6) + '%';
  if (txt) txt.textContent = `${200 - inLevel} XP to Level ${lvl + 1}`;
  const streakEl = document.getElementById('streakCount');
  if (streakEl) streakEl.textContent = state.streak;
  const pill = document.getElementById('streakPill');
  if (pill) pill.classList.toggle('hot', state.streak >= 3);
}
function addXP(amount, reason) {
  const before = levelFor(state.xp);
  state.xp += amount;
  const after = levelFor(state.xp);
  saveState(state);
  updateGamification();
  if (after > before) {
    confettiBurst(130);
    buzz([30, 40, 30]);
    toast(`Level up — <b>Level ${after} ${LEVEL_NAMES[Math.min(after - 1, 6)]}</b> unlocked`);
  } else if (reason) {
    toast(`<b>+${amount} XP</b> — ${reason}`);
  }
}
function bumpStreak() {
  const today = new Date().toDateString();
  if (state.lastVisit === today) return;
  const yesterday = new Date(Date.now() - 864e5).toDateString();
  state.streak = (state.lastVisit === yesterday) ? state.streak + 1 : 1;
  state.lastVisit = today;
  saveState(state);
  updateGamification();
  if (state.streak >= 2) toast(`Streak <b>${state.streak} days</b> — the crown stays on`);
}

// ======================== SCREEN NAVIGATION ========================
const screens = document.querySelectorAll('.app-screen');
const dockBtns = document.querySelectorAll('.dock-btn[data-screen]');
const quickBtns = document.querySelectorAll('.quick-btn[data-screen]');
const backBtns = document.querySelectorAll('[data-back]');

function switchScreen(id) {
  screens.forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
  dockBtns.forEach(b => b.classList.toggle('on', b.dataset.screen === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

dockBtns.forEach(b => b.addEventListener('click', () => switchScreen(b.dataset.screen)));
quickBtns.forEach(b => b.addEventListener('click', () => switchScreen(b.dataset.screen)));
backBtns.forEach(b => b.addEventListener('click', () => switchScreen(b.dataset.back)));

// Run card goes to session
const runCard = document.getElementById('runCardBtn');
if (runCard) runCard.addEventListener('click', () => switchScreen('screenSession'));

// ======================== PROFILE ========================
function initProfile() {
  const nameEl = document.getElementById('userName');
  const profileNameEl = document.getElementById('profileName');
  const profName = document.getElementById('profName');
  const profAge = document.getElementById('profAge');
  const profHeight = document.getElementById('profHeight');
  const saveBtn = document.getElementById('saveProfileBtn');

  if (profName) profName.value = state.profile.name || '';
  if (profAge) profAge.value = state.profile.age || '';
  if (profHeight) profHeight.value = state.profile.height || '';
  if (nameEl) nameEl.textContent = state.profile.name || 'Athlete';
  if (profileNameEl) profileNameEl.textContent = state.profile.name || 'Athlete';

  if (saveBtn) saveBtn.addEventListener('click', () => {
    state.profile.name = profName.value.trim() || 'Athlete';
    state.profile.age = profAge.value;
    state.profile.height = profHeight.value;
    saveState(state);
    if (nameEl) nameEl.textContent = state.profile.name;
    if (profileNameEl) profileNameEl.textContent = state.profile.name;
    renderQR();
    buzz(15);
    toast(`Profile saved — <b>looking royal, ${state.profile.name.split(' ')[0]}</b>`);
  });
}

// ======================== QR CODE (simple pattern) ========================
function renderQR() {
  const svg = document.getElementById('qrCode');
  if (!svg) return;
  const size = 120; const cells = 15; const cellSize = size / cells;
  let rects = '';
  // generate deterministic pattern from name
  const seed = (state.profile.name || 'Athlete').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  for (let y = 0; y < cells; y++) {
    for (let x = 0; x < cells; x++) {
      // corner markers
      const isCorner = (x < 4 && y < 4) || (x > cells - 5 && y < 4) || (x < 4 && y > cells - 5);
      const isBorder = isCorner && (x === 0 || y === 0 || x === 3 || y === 3 || x === cells - 1 || x === cells - 4 || y === cells - 1 || y === cells - 4);
      const isInner = isCorner && x >= 1 && x <= 2 && y >= 1 && y <= 2;
      const hash = (x * 31 + y * 17 + seed) % 7;
      if (isCorner ? (isBorder || isInner) : (hash < 3)) {
        rects += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${cellSize}" height="${cellSize}" fill="#1c2b3a" rx="1"/>`;
      }
    }
  }
  svg.innerHTML = rects;
}

// ======================== WORKOUT PLANNER ========================
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function initWorkout() {
  renderDayScroll();
  renderExercises();
  populateExerciseSelect();
  initModeTabs();
  initAddExercise();
  initRestTimer();
}

function renderDayScroll() {
  const el = document.getElementById('dayScroll');
  if (!el) return;
  el.innerHTML = DAYS.map((d, i) => {
    const dayNum = i + 1;
    const active = dayNum === state.currentDay ? ' active' : '';
    return `<button class="day-btn${active}" data-day="${dayNum}">${d}</button>`;
  }).join('');
  el.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.currentDay = parseInt(btn.dataset.day);
      renderDayScroll();
      renderExercises();
    });
  });
  const label = document.getElementById('plannerWeekLabel');
  if (label) {
    const now = new Date();
    label.textContent = `Week of ${now.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  }
}

function renderExercises() {
  const listEl = document.getElementById('exerciseList');
  const emptyEl = document.getElementById('emptyDay');
  const splitLabel = document.getElementById('splitLabel');
  const splitName = document.getElementById('splitName');
  if (!listEl) return;

  const day = state.workouts[state.currentDay];
  if (!day || day.exercises.length === 0) {
    listEl.innerHTML = '';
    emptyEl.style.display = 'block';
    splitLabel.textContent = day?.split || 'Rest';
    splitName.textContent = 'Rest Day';
    return;
  }

  emptyEl.style.display = 'none';
  splitLabel.textContent = day.split;
  splitName.textContent = day.name;

  listEl.innerHTML = day.exercises.map((ex, idx) => `
    <div class="ex-item${ex.done ? ' done' : ''}" data-idx="${idx}">
      <div class="ex-left">
        <button class="ex-check" data-toggle="${idx}">
          <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
        <div>
          <div class="ex-name">${ex.name}</div>
          <div class="ex-meta">${ex.sets}</div>
        </div>
      </div>
      <button class="ex-rm" data-rm="${idx}" aria-label="Remove">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `).join('');

  listEl.querySelectorAll('.ex-check').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.toggle);
      const ex = state.workouts[state.currentDay].exercises[idx];
      ex.done = !ex.done;
      saveState(state);
      renderExercises();
      if (ex.done) {
        buzz(15);
        addXP(10, `${ex.name} smashed`);
        const remaining = state.workouts[state.currentDay].exercises.filter(e => !e.done).length;
        if (remaining === 0) {
          confettiBurst(140);
          buzz([25, 50, 25]);
          toast(`Day cleared — <b>full split done</b>. Royal work.`);
        }
      }
    });
  });

  listEl.querySelectorAll('.ex-rm').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.rm);
      state.workouts[state.currentDay].exercises.splice(idx, 1);
      saveState(state);
      renderExercises();
    });
  });
}

function populateExerciseSelect() {
  const sel = document.getElementById('addExSelect');
  if (!sel) return;
  sel.innerHTML = '<option value="">Select exercise...</option>' +
    ALL_EXERCISES.map(e => `<option value="${e}">${e}</option>`).join('');
}

function initAddExercise() {
  const btn = document.getElementById('addExBtn');
  const sel = document.getElementById('addExSelect');
  if (!btn || !sel) return;
  btn.addEventListener('click', () => {
    const name = sel.value;
    if (!name) return;
    if (!state.workouts[state.currentDay]) {
      state.workouts[state.currentDay] = { split: DAYS[state.currentDay - 1], name: 'Custom', exercises: [] };
    }
    state.workouts[state.currentDay].exercises.push({
      id: 'custom_' + Date.now(),
      name: name,
      sets: '3x10',
      done: false,
    });
    saveState(state);
    renderExercises();
    sel.value = '';
  });
}

function initModeTabs() {
  const tabs = document.getElementById('modeTabs');
  if (!tabs) return;
  tabs.querySelectorAll('.mode-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.mode = tab.dataset.mode;
      saveState(state);
    });
  });
  // Set initial active
  tabs.querySelectorAll('.mode-tab').forEach(t => t.classList.toggle('active', t.dataset.mode === state.mode));
}

// ======================== REST TIMER ========================
let restInterval = null;
let restSeconds = 90;
let restRunning = false;

function initRestTimer() {
  const display = document.getElementById('restDisplay');
  const startBtn = document.getElementById('restStartBtn');
  const resetBtn = document.getElementById('restResetBtn');
  if (!startBtn) return;

  function updateDisplay() {
    const m = Math.floor(restSeconds / 60).toString().padStart(2, '0');
    const s = (restSeconds % 60).toString().padStart(2, '0');
    display.textContent = `${m}:${s}`;
  }

  startBtn.addEventListener('click', () => {
    if (restRunning) {
      clearInterval(restInterval);
      restRunning = false;
      startBtn.textContent = 'Start';
    } else {
      if (restSeconds <= 0) restSeconds = 90;
      restRunning = true;
      startBtn.textContent = 'Pause';
      restInterval = setInterval(() => {
        restSeconds--;
        updateDisplay();
        if (restSeconds <= 0) {
          clearInterval(restInterval);
          restRunning = false;
          startBtn.textContent = 'Start';
          display.textContent = 'DONE';
        }
      }, 1000);
    }
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(restInterval);
    restRunning = false;
    restSeconds = 90;
    startBtn.textContent = 'Start';
    updateDisplay();
  });
}

// ======================== BODY METRICS ========================
function initWeight() {
  renderWeightTiles();
  renderWeightChart();
  initHydration();
  initGoals();
  initWeightLog();
}

function renderWeightTiles() {
  const curr = document.getElementById('currentWeight');
  const start = document.getElementById('startWeight');
  const goal = document.getElementById('goalWeight');
  const prog = document.getElementById('progressWeight');
  const dir = document.getElementById('progressDir');

  const latest = state.weights.length ? state.weights[state.weights.length - 1].value : null;
  curr.innerHTML = latest !== null ? `${latest} <small>kg</small>` : '-- <small>kg</small>';
  start.innerHTML = state.startWeight !== null ? `${state.startWeight} <small>kg</small>` : '-- <small>kg</small>';
  goal.innerHTML = state.goalWeight !== null ? `${state.goalWeight} <small>kg</small>` : '-- <small>kg</small>';

  if (latest !== null && state.startWeight !== null) {
    const diff = (latest - state.startWeight).toFixed(1);
    const sign = diff >= 0 ? '+' : '';
    prog.innerHTML = `${sign}${diff} <small>kg</small>`;
    dir.textContent = diff <= 0 ? 'On track' : 'Gaining';
    dir.className = 'wt-change ' + (diff <= 0 ? 'down' : 'up');
  } else {
    prog.innerHTML = '-- <small>kg</small>';
    dir.textContent = '';
  }
}

function renderWeightChart() {
  const svg = document.getElementById('weightChart');
  const rangeEl = document.getElementById('chartRange');
  if (!svg) return;

  // Keep gradient def
  const defs = svg.querySelector('defs');

  if (state.weights.length < 2) {
    svg.innerHTML = '';
    svg.appendChild(defs);
    const t = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    t.setAttribute('x', '210'); t.setAttribute('y', '100');
    t.setAttribute('text-anchor', 'middle'); t.setAttribute('fill', '#a9bccd');
    t.setAttribute('font-size', '14'); t.setAttribute('font-family', 'Manrope, sans-serif');
    t.textContent = 'Log at least 2 weights to see chart';
    svg.appendChild(t);
    return;
  }

  const data = state.weights.slice(-14); // Last 14 entries
  const vals = data.map(d => d.value);
  const minV = Math.min(...vals) - 2;
  const maxV = Math.max(...vals) + 2;
  const range = maxV - minV || 1;
  const w = 420; const h = 160; const padY = 10;

  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = padY + (1 - (d.value - minV) / range) * (h - padY * 2);
    return { x, y };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ');
  const areaD = pathD + ` L${points[points.length - 1].x},${h} L${points[0].x},${h} Z`;

  svg.innerHTML = '';
  svg.appendChild(defs);

  // Grid lines
  for (let i = 0; i <= 4; i++) {
    const y = padY + (i / 4) * (h - padY * 2);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', '0'); line.setAttribute('x2', w.toString());
    line.setAttribute('y1', y.toString()); line.setAttribute('y2', y.toString());
    line.setAttribute('stroke', 'rgba(255,255,255,.06)'); line.setAttribute('stroke-width', '1');
    svg.appendChild(line);
  }

  const area = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  area.setAttribute('d', areaD); area.classList.add('chart-area');
  svg.appendChild(area);

  const line = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  line.setAttribute('d', pathD); line.classList.add('chart-line');
  svg.appendChild(line);

  points.forEach((p) => {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', p.x.toString()); circle.setAttribute('cy', p.y.toString());
    circle.setAttribute('r', '4.5'); circle.classList.add('chart-dot');
    svg.appendChild(circle);
  });

  if (rangeEl && data.length) {
    const first = new Date(data[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const last = new Date(data[data.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    rangeEl.textContent = `${first} - ${last}`;
  }
}

function initWeightLog() {
  const input = document.getElementById('weightInput');
  const btn = document.getElementById('logWeightBtn');
  if (!btn || !input) return;
  btn.addEventListener('click', () => {
    const val = parseFloat(input.value);
    if (isNaN(val) || val <= 0) { toast(`Enter a real weight first`); return; }
    state.weights.push({ value: val, date: new Date().toISOString() });
    saveState(state);
    renderWeightTiles();
    renderWeightChart();
    input.value = '';
    buzz(15);
    addXP(15, `weight logged`);
  });
}

function initGoals() {
  const startInput = document.getElementById('startWtInput');
  const goalInput = document.getElementById('goalWtInput');
  const saveBtn = document.getElementById('saveGoalsBtn');
  if (!saveBtn) return;

  if (state.startWeight !== null) startInput.value = state.startWeight;
  if (state.goalWeight !== null) goalInput.value = state.goalWeight;

  saveBtn.addEventListener('click', () => {
    const s = parseFloat(startInput.value);
    const g = parseFloat(goalInput.value);
    if (!isNaN(s)) state.startWeight = s;
    if (!isNaN(g)) state.goalWeight = g;
    saveState(state);
    renderWeightTiles();
  });
}

function initHydration() {
  const valEl = document.getElementById('hydrationVal');
  const plus = document.getElementById('hydrationPlus');
  const minus = document.getElementById('hydrationMinus');
  if (!plus || !minus) return;

  function updateDisplay() {
    valEl.textContent = `${state.hydration} / 8 glasses`;
  }
  updateDisplay();

  plus.addEventListener('click', () => {
    if (state.hydration < 20) state.hydration++;
    saveState(state);
    updateDisplay();
    buzz(8);
    if (state.hydration === 8) { addXP(10, `hydration goal hit`); confettiBurst(60); }
  });
  minus.addEventListener('click', () => {
    if (state.hydration > 0) state.hydration--;
    saveState(state);
    updateDisplay();
  });
}

// ======================== LIVE SESSION ========================
let sessionInterval = null;
let sessionSeconds = 0;
let sessionRunning = false;

function initSession() {
  const timerEl = document.getElementById('sessionTimer');
  const playBtn = document.getElementById('sessionPlayBtn');
  const resetBtn = document.getElementById('sessionResetBtn');
  const playIcon = document.getElementById('playIcon');
  const calEl = document.getElementById('sessionCal');
  const bpmEl = document.getElementById('sessionBpm');
  const distEl = document.getElementById('sessionDist');
  if (!playBtn) return;

  function updateTimer() {
    const m = Math.floor(sessionSeconds / 60).toString().padStart(2, '0');
    const s = (sessionSeconds % 60).toString().padStart(2, '0');
    timerEl.textContent = `${m}:${s}`;
    // Simulated metrics
    calEl.textContent = Math.floor(sessionSeconds * 0.23);
    bpmEl.textContent = sessionRunning ? (120 + Math.floor(Math.random() * 20)) : '--';
    distEl.textContent = (sessionSeconds * 0.0028).toFixed(2);
  }

  playBtn.addEventListener('click', () => {
    if (sessionRunning) {
      clearInterval(sessionInterval);
      sessionRunning = false;
      playIcon.innerHTML = '<path d="M8 5l11 7-11 7z"/>';
    } else {
      sessionRunning = true;
      playIcon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
      sessionInterval = setInterval(() => {
        sessionSeconds++;
        updateTimer();
      }, 1000);
    }
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(sessionInterval);
    const earned = Math.floor(sessionSeconds / 60) * 5;
    if (earned > 0) addXP(earned, `session banked (${Math.floor(sessionSeconds / 60)} min)`);
    if (sessionSeconds >= 60) { confettiBurst(80); buzz([20, 40, 20]); }
    sessionRunning = false;
    sessionSeconds = 0;
    playIcon.innerHTML = '<path d="M8 5l11 7-11 7z"/>';
    updateTimer();
  });
}

// ======================== DATA EXPORT / CLEAR ========================
function initDataActions() {
  const exportBtn = document.getElementById('exportDataBtn');
  const clearBtn = document.getElementById('clearDataBtn');

  if (exportBtn) exportBtn.addEventListener('click', () => {
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'royal_fitness_world_data.json'; a.click();
    URL.revokeObjectURL(url);
  });

  if (clearBtn) clearBtn.addEventListener('click', () => {
    if (confirm('This will permanently delete all your data. Continue?')) {
      localStorage.removeItem(STORE_KEY);
      state = getDefaultState();
      location.reload();
    }
  });
}

// ======================== INIT ========================
document.addEventListener('DOMContentLoaded', () => {
  bumpStreak();
  updateGamification();
  initProfile();
  renderQR();
  initWorkout();
  initWeight();
  initSession();
  initDataActions();
  const notif = document.getElementById('notifBtn');
  if (notif) notif.addEventListener('click', () => {
    buzz(10);
    const pending = Object.values(state.workouts).flatMap(d => d.exercises).filter(e => !e.done).length;
    toast(pending ? `<b>${pending} moves</b> left today — pick one` : `All clear — <b>rest like royalty</b>`);
    document.getElementById('notifDot')?.remove();
  });
  // playful screen transitions
  document.querySelectorAll('.app-screen').forEach(s => s.classList.add('rise-once'));
});
