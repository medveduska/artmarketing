/* =========================================
   parallax.js — Scroll-based parallax effects
   ========================================= */

(function () {
  'use strict';

  /* Parallax is disabled on reduced-motion preference */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  /* Elements that need parallax:
     - data-parallax="bg"    → background layer (translate slower than scroll)
     - data-parallax="slow"  → moves at 30% scroll speed upward
     - data-parallax="fast"  → moves at 50% scroll speed upward
  */

  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));

  let ticking = false;
  let lastScrollY = 0;

  function applyParallax() {
    parallaxEls.forEach(function (el) {
      const type  = el.dataset.parallax;
      const rect  = el.closest('section')
          ? el.closest('section').getBoundingClientRect()
          : el.getBoundingClientRect();

      /* Only apply to elements in or near the viewport */
      const inView = rect.bottom > -window.innerHeight && rect.top < window.innerHeight * 2;
      if (!inView) return;

      /* How far the section's top is from viewport center */
      const sectionMidOffset = rect.top + rect.height / 2 - window.innerHeight / 2;

      let speed = 0;
      if (type === 'bg')   speed = 0.35;
      if (type === 'slow') speed = 0.20;
      if (type === 'fast') speed = 0.50;

      const translateY = sectionMidOffset * speed;
      el.style.transform = `translateY(${translateY}px)`;
    });

    ticking = false;
  }

  function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(applyParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* Run once on load */
  applyParallax();
})();
