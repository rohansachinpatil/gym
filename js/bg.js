/* ==========================================================================
   BG.JS — Interactive Dotted Glow Background
   Stable dot grid that randomly glows and dims (Aceternity "dotted-glow"
   effect, implemented in vanilla JS). Dots near the cursor brighten and
   are gently pushed away with a spring-back for an interactive feel.
   Silver-chrome palette for the Royal Fitness World theme.
   Respects prefers-reduced-motion and pauses when the tab is hidden.
   ========================================================================== */

const CONFIG = {
  gap: 28,
  radius: 1.6,
  color: '255, 255, 255',
  glowColor: '225, 225, 225',
  opacity: 0.5,
  speedMin: 0.2,
  speedMax: 0.9,
  speedScale: 1,
  reach: 160,     // cursor influence radius
  pull: 3.2,      // force at cursor center (positive = follow, negative = repel)
  stiffness: 0.06, // spring strength
  damping: 0.82,  // velocity damping
  glowBoost: 0.9, // extra alpha for dots under the cursor
  mode: 'follow', // 'follow' (attract to mouse) or 'repel' (push away)
};

const canvas = document.createElement('canvas');
canvas.id = 'bg-canvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

let W = 0, H = 0, DPR = 1;
let dots = [];
let raf = 0;
let running = true;

const pointer = { x: -99999, y: -99999 };
let pointerActive = false;

function resize() {
  DPR = Math.min(devicePixelRatio || 1, 2);
  W = innerWidth;
  H = innerHeight;
  canvas.width = Math.max(1, Math.round(W * DPR));
  canvas.height = Math.max(1, Math.round(H * DPR));
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  seedDots();
}

function seedDots() {
  dots = [];
  const cols = Math.ceil(W / CONFIG.gap) + 2;
  const rows = Math.ceil(H / CONFIG.gap) + 2;
  const min = Math.min(CONFIG.speedMin, CONFIG.speedMax);
  const max = Math.max(CONFIG.speedMin, CONFIG.speedMax);
  const span = Math.max(max - min, 0);
  for (let i = -1; i < cols; i++) {
    for (let j = -1; j < rows; j++) {
      dots.push({
        x: i * CONFIG.gap + (j % 2 === 0 ? 0 : CONFIG.gap * 0.5),
        y: j * CONFIG.gap,
        phase: Math.random() * Math.PI * 2,
        speed: min + Math.random() * span,
        ox: 0, oy: 0, vx: 0, vy: 0,
      });
    }
  }
}

function updateDots(time) {
  const timeS = time * Math.max(CONFIG.speedScale, 0);
  const reach = CONFIG.reach;
  const reachSq = reach * reach;

  for (let i = 0; i < dots.length; i++) {
    const d = dots[i];
    let influence = 0;

    if (pointerActive) {
      const dx = d.x + d.ox - pointer.x;
      const dy = d.y + d.oy - pointer.y;
      const distSq = dx * dx + dy * dy;
      if (distSq < reachSq && distSq > 0.001) {
        const dist = Math.sqrt(distSq);
        const pullDir = CONFIG.mode === 'repel' ? -1 : 1;
        const f = (1 - dist / reach) * CONFIG.pull * pullDir;
        influence = (1 - dist / reach) * CONFIG.glowBoost;
        d.vx += (dx / dist) * f;
        d.vy += (dy / dist) * f;
      }

      d.vx *= CONFIG.damping;
      d.vy *= CONFIG.damping;
      d.vx += -d.ox * CONFIG.stiffness;
      d.vy += -d.oy * CONFIG.stiffness;
      d.ox += d.vx;
      d.oy += d.vy;
    } else {
      d.ox *= 0.88;
      d.oy *= 0.88;
    }

    const mod = (timeS * d.speed + d.phase) % 2;
    const lin = mod < 1 ? mod : 2 - mod;
    const a = Math.min(0.25 + 0.55 * lin + influence, 1);
    const glow = influence + Math.max(0, (a - 0.6) / 0.4);

    if (glow > 0.01) {
      ctx.shadowColor = 'rgba(' + CONFIG.glowColor + ', 0.95)';
      ctx.shadowBlur = 6 + 10 * Math.min(glow, 1);
    } else {
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
    }

    ctx.globalAlpha = a * CONFIG.opacity;
    ctx.fillStyle = 'rgba(' + CONFIG.color + ', 1)';
    ctx.beginPath();
    ctx.arc(d.x + d.ox, d.y + d.oy, CONFIG.radius, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.shadowBlur = 0;
}

function frame(t) {
  if (!running) return;
  const time = t / 1000;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.globalAlpha = 1;
  updateDots(time);
  raf = requestAnimationFrame(frame);
}

function start() {
  cancelAnimationFrame(raf);
  if (reduced) {
    pointerActive = false;
    updateDots(1600);
    return;
  }
  raf = requestAnimationFrame(frame);
}

addEventListener('resize', resize, { passive: true });
addEventListener('pointermove', (e) => {
  pointer.x = e.clientX;
  pointer.y = e.clientY;
  pointerActive = true;
}, { passive: true });
addEventListener('pointerleave', () => {
  pointerActive = false;
  pointer.x = -99999;
  pointer.y = -99999;
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    running = false;
    cancelAnimationFrame(raf);
  } else {
    running = true;
    start();
  }
});

resize();
start();