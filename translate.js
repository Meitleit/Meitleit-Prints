// translate.js
(function(){
  const LANG_KEY = 'meitleit_lang';
  const switcherId = 'languageSwitcher';
  const langPath = 'lang/'; // put en.json, ms.json, zh.json, ta.json here

  // Load saved lang or default
  const saved = localStorage.getItem(LANG_KEY) || 'en';

  document.addEventListener('DOMContentLoaded', () => {
    // set select value if present
    const sel = document.getElementById(switcherId);
    if (sel) sel.value = saved;

    loadAndApply(saved);

    // change handler
    if (sel) {
      sel.addEventListener('change', (e) => {
        const v = e.target.value;
        localStorage.setItem(LANG_KEY, v);
        loadAndApply(v);
      });
    }
  });

  function loadAndApply(lang) {
    fetch(`${langPath}${lang}.json`).then(r=>{
      if (!r.ok) throw new Error('lang file not found: ' + lang);
      return r.json();
    }).then(dict => {
      applyTranslations(dict);
    }).catch(err=>{
      console.error('Translation load error', err);
    });
  }

  // Map keys to selectors for your existing pages (no HTML attribute changes)
  function applyTranslations(t) {
    // NAV (assumes nav .nav-links has links in order About, Products, Services, Contact)
    const navLinks = document.querySelectorAll('.nav-links > a');
    if (navLinks && navLinks.length >= 4) {
      if (t['nav_about']) navLinks[0].innerHTML = t['nav_about'];
      if (t['nav_products']) navLinks[1].innerHTML = t['nav_products'];
      if (t['nav_services']) navLinks[2].innerHTML = t['nav_services'];
      if (t['nav_contact']) navLinks[3].innerHTML = t['nav_contact'];
    }

    // INDEX page: detect by .about-section + .info-container presence
    if (document.querySelector('.about-section')) {
      const h1 = document.querySelector('.about-text h1');
      if (h1 && t['home_title']) h1.innerHTML = t['home_title'];

      const p = document.querySelector('.about-text p');
      if (p && t['home_intro']) p.innerHTML = t['home_intro'];

      // info cards (two main .info-card blocks)
      const cards = document.querySelectorAll('.info-card');
      if (cards.length >= 2) {
        if (t['index_card1_h2']) {
          const el = cards[0].querySelector('.info-content h2');
          if (el) el.innerHTML = t['index_card1_h2'];
        }
        if (t['index_card1_p']) {
          const el = cards[0].querySelector('.info-content p');
          if (el) el.innerHTML = t['index_card1_p'];
        }
        if (t['index_card1_link']) {
          const el = cards[0].querySelector('.info-content a');
          if (el) el.innerHTML = t['index_card1_link'];
        }

        if (t['index_card2_h2']) {
          const el = cards[1].querySelector('.info-content h2');
          if (el) el.innerHTML = t['index_card2_h2'];
        }
        if (t['index_card2_p']) {
          const el = cards[1].querySelector('.info-content p');
          if (el) el.innerHTML = t['index_card2_p'];
        }
        if (t['index_card2_link']) {
          const el = cards[1].querySelector('.info-content a');
          if (el) el.innerHTML = t['index_card2_link'];
        }
      }

      // buttons in button-row (3 buttons)
      const btns = document.querySelectorAll('.button-row .btn-primary');
      if (btns.length >= 3) {
        if (t['index_btn_contact']) btns[0].innerHTML = t['index_btn_contact'];
        if (t['index_btn_products']) btns[1].innerHTML = t['index_btn_products'];
        if (t['index_btn_services']) btns[2].innerHTML = t['index_btn_services'];
      }
    }

    // PRODUCTS page: detect by presence of #products or .grid
    if (document.querySelector('#products') || document.querySelector('.grid')) {
      const h2 = document.querySelector('#products h2') || document.querySelector('h2');
      if (h2 && t['products_h2']) h2.innerHTML = t['products_h2'];

      // product cards: map certain spec and buttons
      document.querySelectorAll('.card').forEach(card=>{
        const modelEl = card.querySelector('.model');
        if (!modelEl) return;
        const modelText = modelEl.textContent || '';
        // keep model names as-is (no change) unless a mapping exists
        // button texts
        const interested = card.querySelector('.btn-primary');
        const learn = card.querySelector('.btn-accent');
        if (interested && t['btn_interested']) interested.innerHTML = t['btn_interested'];
        if (learn && t['btn_learn']) learn.innerHTML = t['btn_learn'];
        // specs (replace known spec spans if present)
        const specs = card.querySelectorAll('.specs span');
        specs.forEach(sp=>{
          const s = sp.textContent.trim();
          if (t['spec_30ppm'] && s.includes('30 ppm')) sp.innerHTML = t['spec_30ppm'];
          if (t['spec_35ppm'] && s.includes('35 ppm')) sp.innerHTML = t['spec_35ppm'];
          if (t['spec_fullcolor'] && s.toLowerCase().includes('full colour')) sp.innerHTML = t['spec_fullcolor'];
        });
      });
    }

    // SERVICES page: detect by presence of .service-container
    if (document.querySelector('.service-container')) {
      const title = document.querySelector('main h1') || document.querySelector('h1');
      if (title && t['services_title']) title.innerHTML = t['services_title'];

      document.querySelectorAll('.service-card').forEach((card, i) => {
        const h2 = card.querySelector('h2');
        const p  = card.querySelector('p');
        if (i === 0) { if (h2 && t['service_rep_title']) h2.innerHTML = t['service_rep_title']; if (p && t['service_rep_p']) p.innerHTML = t['service_rep_p']; }
        if (i === 1) { if (h2 && t['service_rental_title']) h2.innerHTML = t['service_rental_title']; if (p && t['service_rental_p']) p.innerHTML = t['service_rental_p']; }
        if (i === 2) { if (h2 && t['service_delivery_title']) h2.innerHTML = t['service_delivery_title']; if (p && t['service_delivery_p']) p.innerHTML = t['service_delivery_p']; }
        if (i === 3) { if (h2 && t['service_it_title']) h2.innerHTML = t['service_it_title']; if (p && t['service_it_p']) p.innerHTML = t['service_it_p']; }
      });
    }

    // CONTACT page: detect by presence of .form-section and iframe
    if (document.querySelector('.form-section')) {
      const h1 = document.querySelector('.form-section h1');
      if (h1 && t['contact_h1']) h1.innerHTML = t['contact_h1'];

      const p = document.querySelector('.form-section p');
      if (p && t['contact_p']) p.innerHTML = t['contact_p'];

      const note = document.querySelector('.note');
      if (note && t['contact_note']) note.innerHTML = t['contact_note'];

      // info-panel labels
      const officeTitle = document.querySelector('.info-panel h2');
      if (officeTitle && t['contact_office']) officeTitle.innerHTML = t['contact_office'];

      const infoPs = document.querySelectorAll('.info-panel p');
      // keep telephone/email lines unchanged, only change strong labels if mapping exists
      infoPs.forEach(pel=>{
        if (pel.innerHTML.includes('Address') && t['contact_address']) {
          // replace only label text "Address:" (best-effort)
          pel.innerHTML = pel.innerHTML.replace(/Address:|地址:|Alamat:|முகவரி:/g, t['contact_address']);
        }
      });
    }

    // Footer if inline (some pages have footer inline)
    const footerFun = document.querySelector('footer p') || document.querySelector('#footer-container p');
    if (footerFun && t['footer_fun']) footerFun.innerHTML = t['footer_fun'];

    // set document lang attribute
    document.documentElement.lang = (localStorage.getItem(LANG_KEY) === 'zh') ? 'zh-Hans' : (localStorage.getItem(LANG_KEY) === 'ms' ? 'ms' : (localStorage.getItem(LANG_KEY) === 'ta' ? 'ta' : 'en'));
  }
})();
