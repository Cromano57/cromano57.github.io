/* ── Hero particle canvas ────────────────────────────────── */
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const COLORS = [
    'rgba(167,139,250,',  // violet
    'rgba(34,211,238,',   // cyan
  ];

  let particles = [];
  let W, H;

  function resize() {
    const hero = document.getElementById('hero');
    W = canvas.width  = hero ? hero.offsetWidth  : window.innerWidth;
    H = canvas.height = hero ? hero.offsetHeight : window.innerHeight;
  }

  function randomParticle() {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.5 + 0.15,
      color,
    };
  }

  function init() {
    resize();
    const count = Math.floor((W * H) / 14000);
    particles = Array.from({ length: count }, randomParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();

      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -2) p.x = W + 2;
      if (p.x > W + 2) p.x = -2;
      if (p.y < -2) p.y = H + 2;
      if (p.y > H + 2) p.y = -2;
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); }, { passive: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { init(); draw(); });
  } else {
    init(); draw();
  }
})();

/* ── Scroll reveal ───────────────────────────────────────── */
const revealObs = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); }
  }),
  { threshold: 0.1 }
);
document.querySelectorAll('.reveal').forEach((el) => revealObs.observe(el));

/* ── Nav compact on scroll ───────────────────────────────── */
const siteHeader = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  siteHeader.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

const hidePageLoader = () => {
  document.body.classList.remove('page-loading');
  const loader = document.getElementById('page-loader');
  if (loader) loader.style.display = 'none';
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', hidePageLoader);
} else {
  hidePageLoader();
}
