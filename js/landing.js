/* ======================================================================
   LANDING.JS — Dynamic content + modal logic
   Zero emojis, pure SVG icons, reference-matching patterns
   ====================================================================== */

const GymData = {
  programs: [
    {
      title: 'Iron Forged Strength',
      desc: 'Calibrated powerlifting platforms, Olympic barbells, and progressive overload protocols for maximal hypertrophy and raw strength gains.',
      badge: '3-Phase',
      vibe: 'strength',
      icon: '<svg viewBox="0 0 24 24"><path d="M6 10v4M18 10v4M3 11v2M21 11v2M6 12h12"/></svg>',
      sessions: '5x / week',
      duration: '12 weeks'
    },
    {
      title: 'MetCon Engine',
      desc: 'High-intensity interval conditioning using assault bikes, rowers, and plyometric circuits engineered for anaerobic threshold expansion.',
      badge: 'HIIT',
      vibe: 'sweat',
      icon: '<svg viewBox="0 0 24 24"><path d="M13 3L6 13h5l-1 8 7-10h-5z"/></svg>',
      sessions: '4x / week',
      duration: '8 weeks'
    },
    {
      title: 'Calisthenics Lab',
      desc: 'Bodyweight mastery through progressive ring work, handstand training, and muscle-up development for bulletproof relative strength.',
      badge: 'Rings',
      vibe: 'skill',
      icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M11 8L7 16M13 8l4 8"/></svg>',
      sessions: '4x / week',
      duration: '10 weeks'
    },
    {
      title: 'Contrast Hydro Recovery',
      desc: 'Cold plunge pools, infrared sauna bays, and contrast therapy for accelerated muscle recovery and CNS deload between heavy training blocks.',
      badge: 'Recovery',
      vibe: 'recover',
      icon: '<svg viewBox="0 0 24 24"><path d="M12 2s-5 8-5 12a5 5 0 0010 0c0-4-5-12-5-12z"/></svg>',
      sessions: '2-3x / week',
      duration: 'Ongoing'
    },
    {
      title: 'Athletic Boxing Club',
      desc: 'Pad-work rounds, heavy bag drills, and footwork conditioning sessions guided by former competitive boxers for fight-ready cardio.',
      badge: 'Club',
      vibe: 'sweat',
      icon: '<svg viewBox="0 0 24 24"><path d="M12 3s5 4 5 9a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3 1-5 1-8z"/></svg>',
      sessions: '3x / week',
      duration: '6 weeks'
    },
    {
      title: 'Functional Mobility',
      desc: 'Joint-specific mobility work, loaded stretching protocols, and neural activation drills to maximize range of motion and injury prevention.',
      badge: 'Foundation',
      vibe: 'recover',
      icon: '<svg viewBox="0 0 24 24"><circle cx="15" cy="5" r="2"/><path d="M8 21l3-6 3 2v4M11 15l-1-5 5-1 3 3M9 10l-4 2"/></svg>',
      sessions: '3x / week',
      duration: '8 weeks'
    }
  ],

  facilities: [
    {
      tag: 'Iron Zone',
      title: 'Olympic Lifting Platforms',
      detail: 'Six dedicated platforms with calibrated Eleiko plates, competition bars, and embedded force-plate sensors for velocity-based training.'
    },
    {
      tag: 'Cardio Deck',
      title: 'High-Output Conditioning',
      detail: 'Assault Air Bikes, Concept2 rowers, and SkiErg units positioned along floor-to-ceiling windows with a city panorama.'
    },
    {
      tag: 'Recovery Bay',
      title: 'Contrast Hydrotherapy',
      detail: 'Ice plunge pools at 3-5 degrees C, infrared sauna cabins, and heated contrast baths for systemic recovery acceleration.'
    },
    {
      tag: 'Fight Room',
      title: 'Boxing & MMA Cage',
      detail: 'Full-size boxing ring, Fairtex heavy bags, speed bags, and a regulation MMA training octagon with padded flooring.'
    },
    {
      tag: 'Flex Studio',
      title: 'Functional Training Arena',
      detail: 'Open turf space with sled tracks, battle ropes, TRX suspension rigs, and gymnastics rings for movement-based workouts.'
    },
    {
      tag: 'Wellness Lounge',
      title: 'Nutrition & Recovery Bar',
      detail: 'Post-workout protein blends, adaptogen-infused cold press juices, and private consultation rooms with certified dietitians.'
    }
  ],

  plans: [
    {
      name: 'Foundation',
      sub: 'Essential gym floor access',
      monthly: 999,
      annual: 799,
      features: ['Unrestricted gym floor access', 'Locker room & showers', 'Body composition scan / month', 'Member portal full access', 'Morning run group access'],
      popular: false
    },
    {
      name: 'Apex',
      sub: 'Everything plus specialty clubs',
      monthly: 1499,
      annual: 1199,
      features: ['All Foundation perks', 'All specialty clubs & programs', 'Contrast hydrotherapy access', 'Priority class booking', 'Nutrition bar 2 drinks/day', '1-on-1 program review/quarter'],
      popular: true
    },
    {
      name: 'Pinnacle',
      sub: 'Total athletic package',
      monthly: 2499,
      annual: 1999,
      features: ['All Apex perks', 'Unlimited personal training', 'Private recovery suite', 'Custom meal plan by dietitian', 'Guest pass 4x/month', 'VIP locker & towel service'],
      popular: false
    }
  ],

  reviews: [
    {
      name: 'Vikram Mehta',
      role: 'Member since 2023',
      text: 'The iron quality is legitimate competition-grade. Within 12 weeks on the Strength programme, my deadlift moved from 160 to 215 kg. The coaching staff understand periodisation deeply.',
      stars: 5,
      achievement: 'Deadlift +55 kg'
    },
    {
      name: 'Sarah Kimura',
      role: 'Member since 2024',
      text: 'MetCon Engine sessions are relentless. I cut 14% body fat in 8 weeks and my Concept2 2k dropped by 22 seconds. The contrast pool recovery afterwards is absolutely essential.',
      stars: 5,
      achievement: 'Body fat -14%'
    },
    {
      name: 'Arjun Patel',
      role: 'Member since 2022',
      text: 'Best city-view gym I have trained in. The calisthenics lab gave me my first muscle-up at 34. Staff attention and facility hygiene are genuinely top-tier.',
      stars: 5,
      achievement: 'First muscle-up'
    }
  ]
};

// ======================== RENDERERS ========================
let activeFilter = 'all';
function renderPrograms() {
  const g = document.getElementById('programsGrid');
  if (!g) return;
  const list = GymData.programs.filter(p => activeFilter === 'all' || p.vibe === activeFilter);
  g.innerHTML = list.map(p => `
    <div class="program-card tilt" data-tilt>
      <div class="program-top">
        <span class="program-icon">${p.icon}</span>
        <span class="program-badge">${p.badge}</span>
      </div>
      <h3 class="program-title">${p.title}</h3>
      <p class="program-desc">${p.desc}</p>
      <div class="program-meta">
        <span>${p.sessions}</span>
        <span>${p.duration}</span>
      </div>
    </div>
  `).join('');
  g.querySelectorAll('.program-card').forEach((c, i) => {
    c.classList.add('pop');
    c.style.animationDelay = (i * 40) + 'ms';
    setTimeout(() => c.classList.remove('pop'), 500);
  });
  initTilt();
  // Fresh nodes join the IO reveal system so filtering re-animates cleanly.
  assignDynamicGrid(g, 3);
  observeNewReveals(g);
  // Cards already in view reveal on next frame via IO; nudge in case IO missed.
  requestAnimationFrame(() => observeNewReveals(g));
  refreshScrollTriggers();
}

function initProgramFilters() {
  const wrap = document.getElementById('programFilters');
  if (!wrap) return;
  wrap.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      wrap.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderPrograms();
      toast(`Vibe set: <b>${btn.textContent}</b> — ${GymData.programs.filter(p => activeFilter === 'all' || p.vibe === activeFilter).length} programs`);
    });
  });
}

function renderFacilities() {
  const g = document.getElementById('facilitiesGrid');
  if (!g) return;
  g.innerHTML = GymData.facilities.map(f => `
    <div class="facility-card">
      <span class="facility-tag">${f.tag}</span>
      <h3 class="facility-title">${f.title}</h3>
      <p class="facility-detail">${f.detail}</p>
      <span class="facility-arrow">
        Explore
        <svg viewBox="0 0 24 24"><path d="M7 17L17 7M8 7h9v9"/></svg>
      </span>
    </div>
  `).join('');
}

function renderPricing(annual = false) {
  const g = document.getElementById('pricingGrid');
  if (!g) return;
  const fmt = n => '₹' + n.toLocaleString('en-IN');
  g.innerHTML = GymData.plans.map(p => `
    <div class="price-row${p.popular ? ' popular' : ''}">
      <div class="price-row-main">
        <div>
          <h3 class="price-name">${p.name}</h3>
          <p class="price-sub">${p.sub}</p>
        </div>
        <div class="price-amount">
          <span class="num">${fmt(annual ? p.annual : p.monthly)}</span>
          <span class="per">/ ${annual ? 'mo · billed yearly' : 'month'}</span>
        </div>
      </div>
      <ul class="price-features">
        ${p.features.map(f => `
          <li class="price-feat">
            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            ${f}
          </li>
        `).join('')}
      </ul>
      <div class="price-row-cta">
        ${p.popular ? '<span class="popular-badge">Most Popular</span>' : ''}
        <button class="btn-orange" style="width:100%" data-trial-open data-plan="${p.name}">Join ${p.name}</button>
      </div>
    </div>
  `).join('');
  g.querySelectorAll('[data-trial-open]').forEach(b => b.addEventListener('click', () => {
    document.getElementById('trialModal')?.classList.add('open');
    const goal = document.getElementById('tGoal');
    if (goal && b.dataset.plan === 'Pinnacle') goal.selectedIndex = 0;
  }));
  initTilt();
  assignDynamicGrid(g, 3);
  observeNewReveals(g);
  requestAnimationFrame(() => observeNewReveals(g));
  refreshScrollTriggers();
}

function renderReviews() {
  const track = document.getElementById('reviewsTrack');
  const dots = document.getElementById('reviewsDots');
  if (!track) return;
  const starSvg = '<svg viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  track.innerHTML = GymData.reviews.map(r => `
    <div class="review-card">
      <div class="review-stars">${starSvg.repeat(r.stars)}</div>
      <span class="review-achievement">${r.achievement}</span>
      <p class="review-quote">"${r.text}"</p>
      <div>
        <div class="review-author">${r.name}</div>
        <div class="review-role">${r.role}</div>
      </div>
    </div>
  `).join('');
  if (dots) {
    dots.innerHTML = GymData.reviews.map((_, i) => `<button aria-label="Go to review ${i + 1}" data-i="${i}" class="${i === 0 ? 'on' : ''}"></button>`).join('');
    dots.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      track.scrollTo({ left: track.children[+b.dataset.i].offsetLeft - 4, behavior: 'smooth' });
    }));
  }
  const prev = document.getElementById('revPrev');
  const next = document.getElementById('revNext');
  const step = () => (track.children[0]?.offsetWidth || 320) + 14;
  if (prev) prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
  if (next) next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
  track.addEventListener('scroll', () => {
    if (!dots) return;
    const idx = Math.round(track.scrollLeft / step());
    dots.querySelectorAll('button').forEach((d, i) => d.classList.toggle('on', i === Math.min(idx, GymData.reviews.length - 1)));
  }, { passive: true });
  // autoplay, pause on touch
  let auto = setInterval(() => {
    if (document.hidden) return;
    const max = track.scrollWidth - track.clientWidth - 10;
    if (track.scrollLeft >= max) track.scrollTo({ left: 0, behavior: 'smooth' });
    else track.scrollBy({ left: step(), behavior: 'smooth' });
  }, 4200);
  track.addEventListener('pointerdown', () => { clearInterval(auto); }, { once: true });
  assignDynamicGrid(track, 3);
  // Review cards live in a horizontal scroller — reveal them immediately
  // once scrolled into view (IO handles it) rather than hiding them.
  observeNewReveals(track);
  requestAnimationFrame(() => observeNewReveals(track));
  refreshScrollTriggers();
}

// ======================== PRICING TOGGLE ========================
function initPricingToggle() {
  const mBtn = document.getElementById('pMonthly');
  const aBtn = document.getElementById('pAnnual');
  if (!mBtn || !aBtn) return;
  mBtn.addEventListener('click', () => { mBtn.classList.add('active'); aBtn.classList.remove('active'); renderPricing(false); });
  aBtn.addEventListener('click', () => { aBtn.classList.add('active'); mBtn.classList.remove('active'); renderPricing(true); });
}

// ======================== TRIAL MODAL ========================
function toast(html) {
  const root = document.getElementById('toastRoot');
  if (!root) return;
  const el = document.createElement('div');
  el.className = 'toast';
  el.innerHTML = html;
  root.appendChild(el);
  setTimeout(() => { el.classList.add('out'); setTimeout(() => el.remove(), 320); }, 2800);
  while (root.children.length > 3) root.firstChild.remove();
}

function confettiBurst(n = 120) {
  const cv = document.getElementById('confettiCanvas');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const dpr = Math.min(devicePixelRatio || 1, 2);
  cv.width = innerWidth * dpr; cv.height = innerHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const colors = ['#ffffff', '#c9c9c9', '#f5f1e6', '#22c55e', '#9aa6b2'];
  const parts = Array.from({ length: n }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 220,
    y: innerHeight * 0.35,
    vx: (Math.random() - 0.5) * 11,
    vy: -Math.random() * 9 - 3,
    s: Math.random() * 7 + 4,
    r: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    c: colors[Math.floor(Math.random() * colors.length)],
    life: 1
  }));
  let frames = 0;
  (function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    parts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.vy += 0.32; p.vx *= 0.99; p.r += p.vr; p.life -= 0.008;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      ctx.globalAlpha = Math.max(p.life, 0); ctx.fillStyle = p.c;
      ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.62);
      ctx.restore();
    });
    if (++frames < 130) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, innerWidth, innerHeight);
  })();
}

function initTrialModal() {
  const overlay = document.getElementById('trialModal');
  const closeBtn = document.getElementById('closeTrialBtn');
  const form = document.getElementById('trialForm');
  const successEl = document.getElementById('trialSuccess');
  if (!overlay) return;

  function openModal() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    const first = overlay.querySelector('input');
    if (first) setTimeout(() => first.focus(), 60);
  }
  function closeModal() { overlay.classList.remove('open'); document.body.style.overflow = ''; }

  const openers = ['openTrialBtn', 'openTrialBtn2', 'openTrialBtn3', 'heroClaimBtn'];
  openers.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('click', openModal);
  });
  document.querySelectorAll('[data-trial-open]').forEach(el => el.addEventListener('click', openModal));

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal(); });

  if (form) form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('tName')?.value.trim() || 'Champion';
    form.style.display = 'none';
    successEl.style.display = 'block';
    successEl.innerHTML = `
      <div style="text-align:center;padding:28px 0">
        <div style="width:64px;height:64px;border-radius:50%;background:rgba(34,197,94,.12);border:2px solid var(--success);display:grid;place-items:center;margin:0 auto 16px">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#22c55e" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 style="font-size:24px;font-weight:800;margin-bottom:6px">Boom, ${name.split(' ')[0]} — pass locked!</h3>
        <p style="color:var(--mist);font-size:15px;line-height:1.55">Show this screen at reception. We saved your slot and fired confetti in your honour.</p>
        <button type="button" class="btn-ghost" style="margin-top:16px;width:100%" id="trialDoneBtn">Keep exploring</button>
      </div>
    `;
    confettiBurst(140);
    toast(`Welcome in, <b>${name.split(' ')[0]}</b> — free pass confirmed`);
    document.getElementById('trialDoneBtn')?.addEventListener('click', closeModal);
  });
}

// ======================== HERO PROMPT ========================
function initHeroPrompt() {
  const input = document.getElementById('heroInput');
  const sendBtn = document.getElementById('heroSendBtn');
  const response = document.getElementById('heroResponse');
  if (!input || !sendBtn || !response) return;

  const answers = {
    'hours': 'Royal Fitness World is open 5:00 AM to 11:00 PM, seven days a week. Peak hours run from 6-8 PM.',
    'price': 'Foundation starts at ₹999/month, Apex at ₹1,499/month with all clubs, and Pinnacle at ₹2,499/month with unlimited personal training. Annual billing saves 20%.',
    'trainer': 'All coaches hold NSCA-CSCS certification. Pinnacle members receive unlimited 1-on-1 sessions.',
    'trial': 'We offer a complimentary 1-day pass with full facility access. Use the "Claim 1-Day Free Pass" button above.',
    'parking': 'Complimentary underground parking is available for all active members.',
  };

  function handleSend() {
    const q = input.value.trim().toLowerCase();
    if (!q) return;
    let answer = 'For detailed information, please contact our front desk team or use the WhatsApp button at the bottom of this page.';
    for (const [key, val] of Object.entries(answers)) {
      if (q.includes(key)) { answer = val; break; }
    }
    response.style.display = 'block';
    response.textContent = answer;
    input.value = '';
  }

  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') handleSend() });
}

// ======================== NAV HIGHLIGHT ========================
function initNavHighlight() {
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  if (!links.length || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const match = [...links].find(l => l.getAttribute('href') === '#' + entry.target.id);
        if (match) match.classList.add('active');
      }
    });
  }, { rootMargin: '-30% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));
}

// ======================== SMOOTH SCROLL ========================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ======================== MOBILE NAV ========================
function initMobileNav() {
  const header = document.querySelector('.site-header');
  const button = document.getElementById('mobileMenuBtn');
  const links = document.querySelectorAll('.nav-links a');
  if (!header || !button) return;

  const close = () => {
    header.classList.remove('menu-open');
    button.setAttribute('aria-expanded', 'false');
  };

  button.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    button.setAttribute('aria-expanded', String(open));
  });
  links.forEach(link => link.addEventListener('click', close));
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) close();
  });
}

// ======================== WHATSAPP FLOAT ========================
function initWhatsAppFloat() {
  const wa = document.getElementById('waFloat');
  if (!wa) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      wa.classList.add('visible');
    } else {
      wa.classList.remove('visible');
    }
  }, { passive: true });
}

// ======================== FOCUS WIDGET INTERACTION ========================
function initFocusWidget() {
  const widget = document.getElementById('focusWidget');
  if (!widget) return;
  const tasks = widget.querySelectorAll('.focus-exercise');
  const fill = document.getElementById('focusProgressFill');
  const counter = document.getElementById('focusProgressCounter');
  const total = 5;

  function updateWidget() {
    const doneCount = widget.querySelectorAll('.focus-exercise.done').length;
    const totalDone = Math.min(total, 2 + doneCount);
    const pct = Math.round((totalDone / total) * 100);
    if (fill) fill.style.width = pct + '%';
    if (counter) counter.textContent = `${totalDone}/${total}`;
  }

  tasks.forEach(task => {
    function toggleTask() {
      task.classList.toggle('done');
      const isDone = task.classList.contains('done');
      task.setAttribute('aria-checked', String(isDone));
      const name = task.querySelector('.exercise-name').textContent;
      const sets = task.querySelector('.exercise-sets').textContent;
      if (isDone) {
        task.innerHTML = `
          <div class="exercise-check-circle" aria-hidden="true">
            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <span class="exercise-name">${name}</span>
          <span class="exercise-sets">${sets}</span>
        `;
      } else {
        task.innerHTML = `
          <div class="exercise-check-box" aria-hidden="true"></div>
          <span class="exercise-name">${name}</span>
          <span class="exercise-sets">${sets}</span>
        `;
      }
      updateWidget();
    }
    task.addEventListener('click', toggleTask);
    task.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTask(); }
    });
  });
}

// ======================== SCROLL REVEAL (responsive, IO-first) ========================
// IO owns all entrance reveals so content never gets stuck hidden if the
// GSAP CDN is blocked. GSAP (below) only adds scrub/parallax seasoning.
let revealObserver = null;
const prefersReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isNarrowScreen = () => Math.min(innerWidth, screen.width || innerWidth) <= 680;

function assignStaticRoles() {
  // Section headers — uniform rise
  document.querySelectorAll('.section-hdr').forEach(h => {
    h.classList.add('reveal');
    if (!h.dataset.reveal) h.dataset.reveal = 'up';
  });
  // Facility overview bar — uniform rise as a single unit
  document.querySelectorAll('.facility-overview-bar').forEach(el => {
    el.classList.add('reveal');
    if (!el.dataset.reveal) el.dataset.reveal = 'up';
  });

  // Playground — opposite sides only on true 2-col desktop (>=1100px);
  // everywhere else stacked rise so cards never drift into each other.
  const plays = document.querySelectorAll('.play-card');
  const twoCol = innerWidth > 1100;
  plays.forEach((el, i) => {
    el.classList.add('reveal');
    if (!el.dataset.reveal) el.dataset.reveal = twoCol ? (i % 2 === 0 ? 'left' : 'right') : 'up';
    el.style.setProperty('--reveal-delay', (i * 110) + 'ms');
  });
  // Misc blocks
  document.querySelectorAll('.program-filters, .pricing-toggle, .reviews-shell, .contact-strip').forEach(el => {
    el.classList.add('reveal');
    if (!el.dataset.reveal) el.dataset.reveal = 'up';
  });
  assignGalleryRoles();
}

function assignGalleryRoles() {
  // Photo gallery — vertical-only rise + stagger at every breakpoint.
  // (Horizontal drift made grid neighbours overlap mid-entrance.)
  // Caption chips get 01..08 numbering.
  document.querySelectorAll('.gallery-item').forEach((el, i) => {
    el.classList.add('reveal');
    if (!el.hasAttribute('data-reveal-lock')) el.dataset.reveal = 'up';
    el.style.setProperty('--reveal-delay', ((i % 4) * 90) + 'ms');
    const cap = el.querySelector('figcaption');
    if (cap && !cap.hasAttribute('data-index')) cap.setAttribute('data-index', String(i + 1).padStart(2, '0'));
  });
}

function assignDynamicGrid(gridEl, perRow) {
  // Dense grids (programs / pricing / reviews) always rise vertically —
  // horizontal entrances collide box-into-box here.
  if (!gridEl) return;
  [...gridEl.children].forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.reveal = 'up';
    el.style.setProperty('--reveal-delay', ((i % (perRow || 3)) * 90) + 'ms');
    el.classList.remove('in');
    delete el.dataset.observed;
  });
}

function initReveal() {
  assignStaticRoles();
  if (prefersReduced || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.reveal').forEach(e => e.classList.add('in'));
    return;
  }
  const margin = isNarrowScreen() ? '0px 0px -6% 0px' : '0px 0px -10% 0px';
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        revealObserver.unobserve(en.target);
        // Clear stagger delay after entrance so hover lifts feel instant.
        const el = en.target;
        setTimeout(() => { el.style.setProperty('--reveal-delay', '0ms'); }, 950);
        // Gallery parallax depends on final layout — refresh once settled.
        if (el.classList.contains('gallery-item')) setTimeout(updateGalleryParallax, 120);
      }
    });
  }, { threshold: 0.1, rootMargin: margin });
  observeNewReveals(document);
}

function observeNewReveals(root) {
  const scope = root || document;
  if (prefersReduced) {
    scope.querySelectorAll?.('.reveal:not(.in)').forEach(e => e.classList.add('in'));
    return;
  }
  // Observer not ready yet (renders run before initReveal) — leave hidden;
  // initReveal() will pick every .reveal up afterwards.
  if (!revealObserver) return;
  if (!('IntersectionObserver' in window)) {
    scope.querySelectorAll?.('.reveal:not(.in)').forEach(e => e.classList.add('in'));
    return;
  }
  scope.querySelectorAll('.reveal:not(.in)').forEach(el => {
    if (el.dataset.observed) return;
    el.dataset.observed = '1';
    revealObserver.observe(el);
  });
}

// ======================== GALLERY SCROLL PARALLAX (vanilla, always on) ========================
// Gives the photo gallery its "alive" feel even when the GSAP CDN is blocked:
// each image drifts a few px opposite the scroll direction based on where its
// card sits in the viewport. Transform-only, rAF-throttled, disabled for
// reduced-motion.
let parallaxTicking = false;
function updateGalleryParallax() {
  parallaxTicking = false;
  if (prefersReduced) return;
  const vh = innerHeight || 800;
  const amp = isNarrowScreen() ? 7 : 14;
  document.querySelectorAll('.gallery-item').forEach(item => {
    const r = item.getBoundingClientRect();
    if (r.bottom < -100 || r.top > vh + 100) return; // off-screen, skip
    const progress = (r.top + r.height / 2 - vh / 2) / (vh / 2); // -1..1
    const px = Math.max(-1, Math.min(1, progress)) * -amp;
    item.style.setProperty('--px', px.toFixed(1) + 'px');
  });
}
function initGalleryParallax() {
  if (prefersReduced) return;
  const kick = () => {
    if (!parallaxTicking) { parallaxTicking = true; requestAnimationFrame(updateGalleryParallax); }
  };
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', kick, { passive: true });
  updateGalleryParallax();
  // Parallax needs a refresh right after reveals settle
  setTimeout(updateGalleryParallax, 600);
}

function initCounters() {
  const vals = document.querySelectorAll('.stat-val');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      io.unobserve(el);
      const raw = el.textContent.trim();
      const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
      if (isNaN(num)) return;
      const suffix = raw.replace(/[0-9.+]/g, '');
      const t0 = performance.now(), dur = 1100;
      (function step(t) {
        const k = Math.min((t - t0) / dur, 1);
        const eased = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(num * eased) + suffix;
        if (k < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, { threshold: 0.5 });
  vals.forEach(v => io.observe(v));
}

function initScrollChrome() {
  const bar = document.getElementById('scrollProgress');
  const header = document.getElementById('siteHeader');
  const cta = document.getElementById('stickyCta');
  function onScroll() {
    const h = document.documentElement;
    const pct = h.scrollTop / Math.max(h.scrollHeight - h.clientHeight, 1);
    // When GSAP ScrollTrigger drives the progress bar (scaleX scrub),
    // skip width updates so the two systems don't fight.
    if (bar && !window.__gsapProgress) bar.style.width = (pct * 100) + '%';
    if (header) header.classList.toggle('scrolled', h.scrollTop > 24);
    if (cta) cta.style.transform = h.scrollTop > 520 ? 'translateY(0)' : 'translateY(110%)';
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (cta) { cta.style.transition = 'transform 300ms cubic-bezier(.22,1,.36,1)'; cta.style.transform = 'translateY(110%)'; }
}

function initTilt() {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('[data-tilt]').forEach(card => {
    if (card.dataset.tiltBound) return;
    card.dataset.tiltBound = '1';
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

function initBMI() {
  const h = document.getElementById('bmiHeight');
  const w = document.getElementById('bmiWeight');
  const fill = document.getElementById('bmiFill');
  const text = document.getElementById('bmiText');
  if (!h || !w) return;
  function calc() {
    const hv = parseFloat(h.value), wv = parseFloat(w.value);
    if (!hv || !wv || hv < 50 || wv < 20) {
      if (fill) fill.style.width = '0%';
      if (text) text.textContent = 'Enter height + weight to light up your meter.';
      return;
    }
    const bmi = wv / Math.pow(hv / 100, 2);
    const pct = Math.min(Math.max((bmi - 14) / (36 - 14) * 100, 4), 100);
    if (fill) fill.style.width = pct + '%';
    let label = 'Fit zone — maintain and build.';
    let plan = 'Iron Forged Strength';
    if (bmi < 18.5) { label = 'Lightweight engine — time to build.'; plan = 'Iron Forged Strength + nutrition bar'; }
    else if (bmi < 25) { label = 'Sweet spot — chase performance.'; plan = 'MetCon Engine + Boxing Club'; }
    else if (bmi < 30) { label = 'Power mode — lean + condition.'; plan = 'MetCon Engine + Contrast Recovery'; }
    else { label = 'Heavyweight start — low-impact first.'; plan = 'Functional Mobility + coaching'; }
    if (text) text.innerHTML = `BMI <b style="color:var(--gold-bright)">${bmi.toFixed(1)}</b> — ${label} Try <b>${plan}</b>.`;
  }
  h.addEventListener('input', calc); w.addEventListener('input', calc);
  document.getElementById('goalChips')?.querySelectorAll('button').forEach(b => {
    b.addEventListener('click', () => {
      document.querySelectorAll('#goalChips button').forEach(x => x.classList.remove('on'));
      b.classList.add('on');
      document.getElementById('bmiPick').textContent = `${b.dataset.goal}? Noted — we will match your trial to that goal.`;
      toast(`Goal locked: <b>${b.dataset.goal}</b>`);
    });
  });
}

function initSpin() {
  const btn = document.getElementById('spinBtn');
  const wheel = document.getElementById('spinWheel');
  const out = document.getElementById('spinOut');
  if (!btn || !wheel) return;
  const options = ['Push Day', 'Pull Day', 'Leg Day', 'HIIT Blast', 'Boxing Rounds', 'Mobility Flow'];
  btn.addEventListener('click', () => {
    wheel.classList.add('spinning');
    btn.disabled = true;
    let ticks = 0;
    const iv = setInterval(() => {
      wheel.querySelectorAll('span').forEach(s => s.classList.remove('win'));
      wheel.children[ticks % wheel.children.length].classList.add('win');
      if (++ticks > 14) {
        clearInterval(iv);
        wheel.classList.remove('spinning');
        const pick = options[Math.floor(Math.random() * options.length)];
        const idx = options.indexOf(pick) % wheel.children.length;
        wheel.querySelectorAll('span').forEach(s => s.classList.remove('win'));
        wheel.children[idx].classList.add('win');
        if (out) out.textContent = `Today: ${pick}. No rerolls.`;
        toast(`Wheel says: <b>${pick}</b>`);
        confettiBurst(70);
        btn.disabled = false;
      }
    }, 110);
  });
}

// ======================== GSAP SCROLL (progressive enhancement) ========================
// IO owns ALL entrance reveals (never hide content behind a CDN). GSAP only
// adds scrub-linked seasoning: hero drift, gallery linger, progress bar.
// Polls briefly because defer CDN scripts can land after this module runs.
function refreshScrollTriggers() {
  try {
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();
  } catch (e) { /* ignore */ }
}

function initGSAPScroll(attempt) {
  if (prefersReduced) return;
  attempt = attempt || 0;
  if (!window.gsap || !window.ScrollTrigger) {
    if (attempt < 30) setTimeout(() => initGSAPScroll(attempt + 1), 100); // ~3s max
    return;
  }
  gsap.registerPlugin(ScrollTrigger); // MUST precede any ScrollTrigger use
  const mm = gsap.matchMedia();

  // 1. Hero background drift — subtle and safe (never moves DOM boxes into each other)
  mm.add('(min-width: 900px) and (prefers-reduced-motion: no-preference)', () => {
    gsap.to('.hero', {
      backgroundPosition: '68% 32%',
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  });

  // 3. Scroll progress bar. initScrollChrome yields width control via flag.
  const bar = document.getElementById('scrollProgress');
  if (bar) {
    window.__gsapProgress = true;
    gsap.set(bar, { width: '100%', scaleX: 0, transformOrigin: 'left center' });
    gsap.to(bar, {
      scaleX: 1, ease: 'none',
      scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.3 },
    });
  }

  refreshScrollTriggers();
}

// ======================== INIT ========================
document.addEventListener('DOMContentLoaded', () => {
  // Reveal system first so dynamic grids can register with the observer.
  initReveal();
  renderPrograms();
  initProgramFilters();
  renderFacilities();
  renderPricing(false);
  renderReviews();
  // Static roles cover gallery; dynamic grids registered in their renderers.
  // One more sweep in case any node was missed.
  observeNewReveals(document);
  initPricingToggle();
  initTrialModal();
  initHeroPrompt();
  initNavHighlight();
  initSmoothScroll();
  initMobileNav();
  initWhatsAppFloat();
  initFocusWidget();
  initCounters();
  initScrollChrome();
  initTilt();
  initBMI();
  initSpin();
  initGalleryParallax();
  initGSAPScroll();
  // Images shifting layout late (lazy gallery) — recalc parallax + triggers.
  addEventListener('load', () => { updateGalleryParallax(); refreshScrollTriggers(); }, { once: true });
});
