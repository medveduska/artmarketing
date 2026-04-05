/* =========================================
   gallery.js — Tab filter + Lightbox
   ========================================= */

(function () {
  'use strict';

  /* ============================================================
     TAB FILTER
  ============================================================ */
  const filterBtns  = document.querySelectorAll('[data-filter]');
  const galleryItems = document.querySelectorAll('.gallery-item[data-category]');

  if (filterBtns.length && galleryItems.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.dataset.filter;

        /* Update active button */
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        /* Show / hide items */
        galleryItems.forEach(function (item) {
          const match = filter === 'all' || item.dataset.category === filter;
          if (match) {
            item.classList.remove('hidden');
            /* Small delay so CSS transition plays after display change */
            requestAnimationFrame(function () {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            });
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.94)';
            /* Use transitionend to set display:none cleanly */
            item.addEventListener('transitionend', function handler() {
              if (item.style.opacity === '0') {
                item.classList.add('hidden');
              }
              item.removeEventListener('transitionend', handler);
            });
          }
        });
      });
    });
  }

  /* ============================================================
     LIGHTBOX
  ============================================================ */
  const lightbox      = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImg         = lightbox.querySelector('.lb-img');
  const lbCaption     = lightbox.querySelector('.lb-caption');
  const lbClose       = lightbox.querySelector('.lb-close');
  const lbPrev        = lightbox.querySelector('.lb-prev');
  const lbNext        = lightbox.querySelector('.lb-next');

  /* Build array from photo gallery items only */
  const photoItems = Array.from(
    document.querySelectorAll('.gallery-item[data-category="photo"]')
  );

  let currentIndex = 0;

  function getPhotoData(item) {
    const img = item.querySelector('img');
    return {
      src:     img ? img.src : '',
      caption: item.dataset.caption || (img ? img.alt : '')
    };
  }

  function openLightbox(index) {
    currentIndex = index;
    const data = getPhotoData(photoItems[index]);

    lbImg.src = data.src;
    lbImg.alt = data.caption;
    lbCaption.textContent = data.caption;

    lightbox.classList.add('open');
    document.body.classList.add('lb-open');
    lbClose.focus();
    updateNavButtons();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.classList.remove('lb-open');
    lbImg.src = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + photoItems.length) % photoItems.length;
    const data = getPhotoData(photoItems[currentIndex]);
    lbImg.style.opacity = '0';
    setTimeout(function () {
      lbImg.src = data.src;
      lbImg.alt = data.caption;
      lbCaption.textContent = data.caption;
      lbImg.style.opacity = '1';
      updateNavButtons();
    }, 150);
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % photoItems.length;
    const data = getPhotoData(photoItems[currentIndex]);
    lbImg.style.opacity = '0';
    setTimeout(function () {
      lbImg.src = data.src;
      lbImg.alt = data.caption;
      lbCaption.textContent = data.caption;
      lbImg.style.opacity = '1';
      updateNavButtons();
    }, 150);
  }

  function updateNavButtons() {
    lbPrev.style.visibility = photoItems.length <= 1 ? 'hidden' : 'visible';
    lbNext.style.visibility = photoItems.length <= 1 ? 'hidden' : 'visible';
  }

  /* Attach click to photo gallery items */
  photoItems.forEach(function (item, idx) {
    item.addEventListener('click', function () {
      openLightbox(idx);
    });
  });

  /* Controls */
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', showPrev);
  lbNext.addEventListener('click', showNext);

  /* Click outside image to close */
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  /* Keyboard navigation */
  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLightbox();
    if (e.key === 'ArrowLeft')   showPrev();
    if (e.key === 'ArrowRight')  showNext();
  });
})();
