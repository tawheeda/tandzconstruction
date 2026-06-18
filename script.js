// Lucide icons
function initIcons(){ if (window.lucide) lucide.createIcons(); }
if (document.readyState !== "loading") initIcons();
else document.addEventListener("DOMContentLoaded", initIcons);

// Mobile nav
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');
if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.toggle('hidden');
    iconOpen?.classList.toggle('hidden', !isHidden);
    iconClose?.classList.toggle('hidden', isHidden);
  });
  document.querySelectorAll('#mobile-menu a').forEach(a => a.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    iconOpen?.classList.remove('hidden');
    iconClose?.classList.add('hidden');
  }));
}

// Scrolled header
const header = document.getElementById('site-header');
if (header) {
  const onScroll = () => {
    if (window.scrollY > 24) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal-scroll');
if (revealEls.length) {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        const delay = e.target.dataset.delay || 0;
        e.target.style.transitionDelay = delay + 'ms';
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.15 });
  revealEls.forEach(el => io.observe(el));
}

// Counters
function animateCounter(el) {
  const to = parseInt(el.dataset.to, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  const tick = (t) => {
    const p = Math.min(1, (t - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(to * eased) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const counters = document.querySelectorAll('[data-counter]');
if (counters.length) {
  const counterIo = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) { animateCounter(e.target); counterIo.unobserve(e.target); }
    }
  }, { threshold: 0.4 });
  counters.forEach(el => counterIo.observe(el));
}

// Contact form
const form = document.getElementById('contact-form');
const success = document.getElementById('contact-success');
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  form.classList.add('hidden');
  success?.classList.remove('hidden');
  if (window.lucide) lucide.createIcons();
});

// Footer year
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());
