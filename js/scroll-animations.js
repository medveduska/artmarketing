/* =========================================
   scroll-animations.js — IntersectionObserver reveals
   ========================================= */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* If reduced motion, just make everything visible immediately */
  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px', /* trigger 60px before element enters bottom */
    threshold: 0.12
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        /* Unobserve after reveal so it doesn't revert */
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  /* Observe all .reveal elements */
  function observeAll() {
    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  }

  /* Also observe stagger containers — each child in .reveal-stagger becomes a reveal target */
  function prepareStaggerChildren() {
    document.querySelectorAll('.reveal-stagger').forEach(function (container) {
      Array.from(container.children).forEach(function (child) {
        if (!child.classList.contains('reveal')) {
          child.classList.add('reveal');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      prepareStaggerChildren();
      observeAll();
    });
  } else {
    prepareStaggerChildren();
    observeAll();
  }
})();
