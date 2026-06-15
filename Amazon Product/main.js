/* ============================================================
   AMAZON ECHO LANDING — main.js
   ============================================================ */

/* ── 1. Navbar Scroll Behaviour ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});


/* ── 2. Hamburger Mobile Menu ── */
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});


/* ── 3. Scroll Reveal (IntersectionObserver) ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


/* ── 4. Stats Count-Up Animation ── */
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();

  function step(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // ease-out cubic
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.round(eased * target);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target.querySelector('.stat-number');
      if (el && !el.dataset.counted) {
        el.dataset.counted = 'true';
        animateCount(el);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => statsObserver.observe(card));


/* ── 5. Color Switcher ── */
const dots      = document.querySelectorAll('.color-dot');
const colorName = document.getElementById('colorName');

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    // Update active state
    dots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');

    // Apply new accent color to CSS variable
    const newColor = dot.dataset.color;
    const newName  = dot.dataset.name;
    document.documentElement.style.setProperty('--accent-glow', newColor);

    // Update border-glow to match (with transparency)
    const hex = newColor.replace('#', '');
    const r   = parseInt(hex.slice(0, 2), 16);
    const g   = parseInt(hex.slice(2, 4), 16);
    const b   = parseInt(hex.slice(4, 6), 16);
    document.documentElement.style.setProperty('--border-glow', `rgba(${r},${g},${b},0.25)`);

    // Update display name
    if (colorName) colorName.textContent = newName;
  });
});
