/* ============================================================
   SKYKNOX — behaviour
   · scroll-triggered motion (rise / sweep / resolve)
   · pinned four-modes sequence (desktop, motion-permitting)
   · application form → endpoint + conversion event
   ============================================================ */
(function () {
  'use strict';

  /* Point this at your form backend (e.g. Formspree: https://formspree.io/f/XXXXXXXX
     or a serverless function). While empty, submissions are accepted locally so the
     page remains demonstrable — see README. */
  var FORM_ENDPOINT = '';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ----------------------------------------------------------
     Scroll-triggered entrances
     ---------------------------------------------------------- */
  var revealables = document.querySelectorAll('.fx, .step');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -9% 0px' });

    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ----------------------------------------------------------
     Nav — gains a surface once the hero is left behind
     ---------------------------------------------------------- */
  var nav = document.getElementById('nav');
  var navTicking = false;

  function updateNav() {
    nav.classList.toggle('is-scrolled', window.scrollY > 40);
    navTicking = false;
  }
  window.addEventListener('scroll', function () {
    if (!navTicking) {
      navTicking = true;
      window.requestAnimationFrame(updateNav);
    }
  }, { passive: true });
  updateNav();

  /* ----------------------------------------------------------
     The four modes — pinned scroll sequence on capable desktops;
     everywhere else the panels remain cinematic stacked cards.
     ---------------------------------------------------------- */
  var modes = document.getElementById('modes');
  var panels = Array.prototype.slice.call(modes.querySelectorAll('.mode-panel'));
  var railItems = Array.prototype.slice.call(modes.querySelectorAll('[data-mode-link]'));
  var wideViewport = window.matchMedia('(min-width: 960px)');

  var pinned = false;
  var activePanel = -1;
  var modesTicking = false;

  function setActivePanel(index) {
    if (index === activePanel) return;
    activePanel = index;
    panels.forEach(function (panel, i) {
      panel.classList.toggle('is-active', i === index);
    });
    railItems.forEach(function (item, i) {
      item.classList.toggle('is-active', i === index);
    });
  }

  function scrollableRange() {
    return modes.offsetHeight - window.innerHeight;
  }

  function updateModes() {
    modesTicking = false;
    if (!pinned) return;
    var top = modes.getBoundingClientRect().top;
    var range = scrollableRange();
    if (range <= 0) return;
    var progress = Math.min(1, Math.max(0, -top / range));
    var index = Math.min(panels.length - 1, Math.floor(progress * panels.length));
    setActivePanel(index);
  }

  function evaluatePinning() {
    var shouldPin = wideViewport.matches && !reduceMotion.matches;
    if (shouldPin === pinned) return;
    pinned = shouldPin;
    modes.classList.toggle('modes--pinned', pinned);
    if (pinned) {
      activePanel = -1;
      updateModes();
      if (activePanel === -1) setActivePanel(0);
    } else {
      activePanel = -1;
      panels.forEach(function (panel) { panel.classList.remove('is-active'); });
      railItems.forEach(function (item) { item.classList.remove('is-active'); });
    }
  }

  window.addEventListener('scroll', function () {
    if (pinned && !modesTicking) {
      modesTicking = true;
      window.requestAnimationFrame(updateModes);
    }
  }, { passive: true });

  window.addEventListener('resize', function () {
    evaluatePinning();
    updateModes();
  });

  if (typeof wideViewport.addEventListener === 'function') {
    wideViewport.addEventListener('change', evaluatePinning);
    reduceMotion.addEventListener('change', evaluatePinning);
  }

  railItems.forEach(function (item, i) {
    item.addEventListener('click', function () {
      if (!pinned) return;
      var modesTop = modes.getBoundingClientRect().top + window.scrollY;
      var target = modesTop + ((i + 0.5) / panels.length) * scrollableRange();
      window.scrollTo({ top: target, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    });
  });

  evaluatePinning();

  /* ----------------------------------------------------------
     Application form
     ---------------------------------------------------------- */
  var form = document.getElementById('briefing-form');
  var success = document.getElementById('apply-success');
  var status = form.querySelector('.form-status');
  var submitButton = form.querySelector('.btn--submit');

  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setFieldValidity(input, valid) {
    var err = document.getElementById(input.id + '-err');
    input.setAttribute('aria-invalid', valid ? 'false' : 'true');
    if (err) err.hidden = valid;
    return valid;
  }

  function isFieldValid(input) {
    var value = input.value.trim();
    return input.id === 'f-email' ? EMAIL_PATTERN.test(value) : value.length > 0;
  }

  function validate() {
    var firstInvalid = null;
    /* DOM order: name, email, phone, location */
    ['f-name', 'f-email', 'f-phone', 'f-location'].forEach(function (id) {
      var input = document.getElementById(id);
      var valid = setFieldValidity(input, isFieldValid(input));
      if (!valid && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  function fireConversion() {
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'skyknox_briefing_request' });
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { event_category: 'briefing_request' });
      }
      document.dispatchEvent(new CustomEvent('skyknox:conversion'));
    } catch (e) { /* analytics must never break the flow */ }
  }

  function showSuccess() {
    fireConversion();
    form.hidden = true;
    success.hidden = false;
    success.focus();
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    status.textContent = '';
    if (!validate()) return;

    if (!FORM_ENDPOINT) {
      /* No backend configured yet — accept locally so the flow is demonstrable. */
      console.info('[SkyKnox] FORM_ENDPOINT is not set; submission accepted locally.');
      showSuccess();
      return;
    }

    submitButton.disabled = true;
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    }).then(function (response) {
      if (!response.ok) throw new Error('Request failed: ' + response.status);
      showSuccess();
    }).catch(function () {
      status.textContent = 'Something went wrong. Please try again, or write to briefings@skyknox.com.';
    }).finally(function () {
      submitButton.disabled = false;
    });
  });

  /* live re-validation once a field has been marked invalid */
  form.addEventListener('input', function (event) {
    var input = event.target;
    if (input.getAttribute && input.getAttribute('aria-invalid') === 'true') {
      setFieldValidity(input, isFieldValid(input));
    }
  });

  /* ----------------------------------------------------------
     Footer year
     ---------------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
