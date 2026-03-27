// ===== THEME — LIGHT MODE ONLY =====
(function () {
  const root = document.documentElement;
  root.setAttribute('data-theme', 'light');
  // Hide toggle button since we're light-only
  const toggle = document.querySelector('[data-theme-toggle]');
  if (toggle) toggle.style.display = 'none';
})();


// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });
}

function closeMobile() {
  if (hamburger) hamburger.classList.remove('active');
  if (mobileMenu) mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
}


// ===== STICKY NAV SHADOW =====
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 10);
  }, { passive: true });
}


// ===== TYPEWRITER EFFECT =====
class Typewriter {
  constructor(element, words, opts = {}) {
    this.el = element;
    this.words = words;
    this.typeSpeed = opts.typeSpeed || 100;
    this.deleteSpeed = opts.deleteSpeed || 60;
    this.pauseTime = opts.pauseTime || 2000;
    this.wordIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    if (this.el) this.tick();
  }

  tick() {
    const currentWord = this.words[this.wordIndex];

    if (this.isDeleting) {
      this.charIndex--;
    } else {
      this.charIndex++;
    }

    this.el.textContent = currentWord.substring(0, this.charIndex);

    let delay = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

    if (!this.isDeleting && this.charIndex === currentWord.length) {
      delay = this.pauseTime;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.wordIndex = (this.wordIndex + 1) % this.words.length;
      delay = 400;
    }

    setTimeout(() => this.tick(), delay);
  }
}

// Hero typewriter
const heroWords = ['Automation?', 'AI Workflows?', 'Data Systems?', 'Operations?', 'Integrations?'];
new Typewriter(document.getElementById('typedWord'), heroWords);

// CTA typewriter
const ctaWords = ['workflows', 'operations', 'systems', 'efficiency', 'output'];
new Typewriter(document.getElementById('ctaTypedWord'), ctaWords, { typeSpeed: 80, deleteSpeed: 50 });


// ===== COUNTER ANIMATION =====
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(counter => {
    if (counter.dataset.animated) return;

    const rect = counter.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;

    counter.dataset.animated = 'true';
    const target = parseInt(counter.dataset.count, 10);
    const suffix = counter.dataset.suffix !== undefined ? counter.dataset.suffix : '+';
    const duration = 800;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      counter.textContent = current + (progress >= 1 ? suffix : '');
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  });
}

window.addEventListener('scroll', animateCounters, { passive: true });
animateCounters();


// ===== INTERSECTION OBSERVER FALLBACK FOR FADE-IN =====
if (!CSS.supports || !CSS.supports('animation-timeline', 'scroll()')) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transition = 'opacity 0.6s ease-out';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}


// ===== CONTACT FORM =====
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('.form-submit');
  const originalText = btn.textContent;
  btn.textContent = 'Message sent!';
  btn.style.background = '#16a34a';
  setTimeout(() => {
    btn.textContent = originalText;
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}
