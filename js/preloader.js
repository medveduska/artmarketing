/* =========================================
   preloader.js - hold initial paint for slow connections
   ========================================= */

(function () {
  'use strict';

  var MIN_VISIBLE_MS = 2000;
  var body = document.body;
  var preloader = document.getElementById('site-preloader');
  var startTime = (window.__preloaderStart || performance.now());

  function releasePreloader() {
    if (!body || !preloader) return;

    var elapsed = Math.max(0, performance.now() - startTime);
    var remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);

    window.setTimeout(function () {
      preloader.classList.add('is-hidden');
      body.classList.remove('preload-active');

      window.setTimeout(function () {
        preloader.setAttribute('aria-hidden', 'true');
        preloader.style.display = 'none';
      }, 550);
    }, remaining);
  }

  if (!body || !preloader) return;

  if (document.readyState === 'complete') {
    releasePreloader();
  } else {
    window.addEventListener('load', releasePreloader, { once: true });
  }
})();
