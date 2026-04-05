/* =========================================
   contact-form.js — Client-side form validation
   ========================================= */

(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  if (!form) return;

  const successMsg = document.getElementById('form-success');

  /* ---------- Validation helpers ---------- */

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val.trim());
  }

  function setError(field, message) {
    const wrapper = field.closest('.form-group');
    if (!wrapper) return;
    wrapper.classList.add('has-error');
    wrapper.classList.remove('has-success');
    let errEl = wrapper.querySelector('.field-error');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'field-error';
      errEl.setAttribute('role', 'alert');
      wrapper.appendChild(errEl);
    }
    errEl.textContent = message;
    field.setAttribute('aria-invalid', 'true');
  }

  function clearError(field) {
    const wrapper = field.closest('.form-group');
    if (!wrapper) return;
    wrapper.classList.remove('has-error');
    wrapper.classList.add('has-success');
    const errEl = wrapper.querySelector('.field-error');
    if (errEl) errEl.textContent = '';
    field.removeAttribute('aria-invalid');
  }

  function validateField(field) {
    const val = field.value.trim();
    const name = field.name;

    if (field.required && !val) {
      setError(field, 'This field is required.');
      return false;
    }

    if (name === 'email' && val && !isValidEmail(val)) {
      setError(field, 'Please enter a valid email address.');
      return false;
    }

    if (name === 'message' && val.length < 10) {
      setError(field, 'Message must be at least 10 characters.');
      return false;
    }

    clearError(field);
    return true;
  }

  /* Live validation on blur */
  form.querySelectorAll('input, select, textarea').forEach(function (field) {
    field.addEventListener('blur', function () {
      validateField(field);
    });

    /* Clear error once user starts typing again */
    field.addEventListener('input', function () {
      const wrapper = field.closest('.form-group');
      if (wrapper && wrapper.classList.contains('has-error')) {
        wrapper.classList.remove('has-error');
        const errEl = wrapper.querySelector('.field-error');
        if (errEl) errEl.textContent = '';
        field.removeAttribute('aria-invalid');
      }
    });
  });

  /* ---------- Submit ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let valid = true;

    fields.forEach(function (field) {
      if (!validateField(field)) valid = false;
    });

    if (!valid) {
      /* Focus first errored field */
      const firstError = form.querySelector('.has-error input, .has-error select, .has-error textarea');
      if (firstError) firstError.focus();
      return;
    }

    /* Success state — in production replace with your API call / mailto / AWS SES */
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    /* Simulate async submit — replace with fetch() in production */
    setTimeout(function () {
      form.reset();
      form.querySelectorAll('.form-group').forEach(function (g) {
        g.classList.remove('has-success', 'has-error');
      });
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';

      if (successMsg) {
        successMsg.classList.add('visible');
        setTimeout(function () {
          successMsg.classList.remove('visible');
        }, 6000);
      }
    }, 1000);
  });
})();
