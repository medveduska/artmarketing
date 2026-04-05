/* =========================================
   video-modal.js — Video overlay dialog
   ========================================= */

(function () {
  'use strict';

  const modal        = document.getElementById('video-modal');
  if (!modal) return;

  const modalInner   = modal.querySelector('.vm-inner');
  const videoWrapper = modal.querySelector('.vm-video-wrapper');
  const modalClose   = modal.querySelector('.vm-close');
  const modalTitle   = modal.querySelector('.vm-title');
  const modalDesc    = modal.querySelector('.vm-desc');

  let currentFrame   = null;

  function openVideoModal(videoId, title, desc) {
    /* Clear previous iframe */
    if (currentFrame) {
      currentFrame.remove();
      currentFrame = null;
    }

    /* Build YouTube embed iframe */
    const iframe = document.createElement('iframe');
    iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('title', title || 'Video');
    /* autoplay=1 so video starts immediately when modal opens */
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    videoWrapper.appendChild(iframe);
    currentFrame = iframe;

    if (modalTitle) modalTitle.textContent = title || '';
    if (modalDesc)  modalDesc.textContent  = desc  || '';

    modal.showModal();
    document.body.classList.add('modal-open');
    modalClose.focus();
  }

  function closeVideoModal() {
    if (currentFrame) {
      /* Remove iframe to stop video playback */
      currentFrame.remove();
      currentFrame = null;
    }
    modal.close();
    document.body.classList.remove('modal-open');
  }

  /* Attach to all video-trigger elements */
  document.querySelectorAll('[data-video-id]').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      const videoId = trigger.dataset.videoId;
      const title   = trigger.dataset.videoTitle || '';
      const desc    = trigger.dataset.videoDesc  || '';
      if (!videoId) return;
      openVideoModal(videoId, title, desc);
    });
  });

  /* Close button */
  if (modalClose) {
    modalClose.addEventListener('click', closeVideoModal);
  }

  /* Click outside modal content (on backdrop/dialog backdrop) */
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeVideoModal();
  });

  /* Keyboard: Escape is handled natively by <dialog> but we still need to reset state */
  modal.addEventListener('cancel', function (e) {
    /* Prevent default so we control cleanup */
    e.preventDefault();
    closeVideoModal();
  });

  /* Keyboard Escape fallback */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.open) {
      closeVideoModal();
    }
  });
})();
