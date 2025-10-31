const langFolder = 'lang/'; // folder containing JSON files

// Get saved language or default to 'en'
let currentLang = localStorage.getItem('lang') || 'en';

// Set language button active text
document.addEventListener('DOMContentLoaded', () => {
  translatePage(currentLang);
  document.querySelectorAll('.lang-menu a').forEach(el=>{
    el.addEventListener('click', e=>{
      e.preventDefault();
      const selectedLang = el.getAttribute('data-lang');
      localStorage.setItem('lang', selectedLang);
      currentLang = selectedLang;
      translatePage(currentLang);
    });
  });
});

function translatePage(lang){
  fetch(`${langFolder}${lang}.json`)
  .then(res => res.json())
  .then(translations => {
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      if(translations[key]) el.innerHTML = translations[key];
    });
  })
  .catch(err => console.error('Translation file not found:', err));
}
