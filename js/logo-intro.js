/* =========================================
   logo-intro.js — Scroll morph: viewport centre → navbar logo
   ========================================= */

(function () {
  'use strict';

  var intro   = document.getElementById('logo-intro');
  var lockup  = intro && intro.querySelector('.logo-intro-lockup');
  var navLogo = document.querySelector('#navbar .nav-logo');

  function abort() {
    if (intro) intro.classList.remove('is-active');
    document.body.classList.remove('intro-active');
    document.documentElement.style.setProperty('--hero-intro-progress', '1');
  }

  if (!intro || !lockup || !navLogo) { abort(); return; }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { abort(); return; }

  var rafId = null;

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, t)    { return a + (b - a) * t; }

  function parseCssVar(prop, fallback) {
    var n = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(prop));
    return isFinite(n) ? n : fallback;
  }

  function update() {
    rafId = null;

    var scrollY    = window.scrollY || window.pageYOffset || 0;
    var range      = parseCssVar('--logo-intro-range',        560);
    var startScale = parseCssVar('--logo-intro-scale-start',   5.0);
    var fadeStart  = parseCssVar('--logo-intro-fade-start',    0.88);
    var progress   = clamp(scrollY / range, 0, 1);

    /* Start position: horizontal centre, vertical centre of viewport */
    var startX = window.innerWidth  / 2;
    var startY = window.innerHeight / 2;

    /* End position: centre of the real navbar logo (always viewport-relative) */
    var nr   = navLogo.getBoundingClientRect();
    var endX = nr.left + nr.width  / 2;
    var endY = nr.top  + nr.height / 2;

    /* Interpolate position and scale */
    var cx    = lerp(startX, endX, progress);
    var cy    = lerp(startY, endY, progress);
    var scale = lerp(startScale, 1, progress);

    var fadeT   = clamp((progress - fadeStart) / (1 - fadeStart), 0, 1);
    var opacity = 1 - fadeT;

    /*
     * Position the lockup so its visual centre is exactly at (cx, cy).
     * The lockup has `position: fixed` and we use transform: translate(-50%, -50%)
     * to offset by its own half-size at scale=1. The scale is applied separately.
     * Setting left/top to the target centre pixel and using translate(-50%) keeps
     * the transform-origin consistent regardless of scale.
     */
    lockup.style.left      = cx.toFixed(1) + 'px';
    lockup.style.top       = cy.toFixed(1) + 'px';
    lockup.style.transform = 'translate(-50%, -50%) scale(' + scale.toFixed(4) + ')';
    lockup.style.opacity   = opacity.toFixed(3);

    document.documentElement.style.setProperty('--hero-intro-progress', progress.toFixed(3));

    var active = progress < 0.999;
    intro.classList.toggle('is-active', active);
    document.body.classList.toggle('intro-active', active);
  }

  function requestUpdate() {
    if (rafId !== null) return;
    rafId = window.requestAnimationFrame(update);
  }

  window.addEventListener('scroll',            requestUpdate, { passive: true });
  window.addEventListener('resize',            requestUpdate);
  window.addEventListener('orientationchange', requestUpdate);

  /* Scripts are at bottom of body — DOM is ready; run immediately */
  update();

})();
