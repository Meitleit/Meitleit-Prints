// translate.js
const langFolder = 'lang/'; // folder with your JSON files

// Check and set current language from localStorage or default to English
let currentLang = localStorage.getItem('lang') || 'en';

// Function to translate the page
function translatePage(lang) {
  fetch(`${langFolder}${lang}.json`)
    .then(response => response.json())
    .then(translations => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
          if(el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea'){
            el.placeholder = translations[key];
          } else {
            el.innerHTML = translations[key];
          }
        }
      });
    })
    .catch(err => console.error('Translation file not found:', err));
}

// Apply language to elements
translatePage(currentLang);

// Language dropdown click events
document.querySelectorAll('.lang-menu a').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();
    const selectedLang = el.getAttribute('data-lang');
    localStorage.setItem('lang', selectedLang);
    currentLang = selectedLang;
    translatePage(selectedLang);
  });
});
