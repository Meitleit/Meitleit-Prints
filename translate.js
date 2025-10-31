const langFolder = 'lang/'; // folder where your JSON files are stored
const dropdownLinks = document.querySelectorAll('.lang-menu [data-lang]');

// Load saved language from localStorage or default to English
let currentLang = localStorage.getItem('lang') || 'en';
translatePage(currentLang);

// Highlight current language in menu (optional)
function highlightCurrentLang(lang) {
  dropdownLinks.forEach(link => {
    link.style.fontWeight = link.getAttribute('data-lang') === lang ? '700' : '400';
  });
}
highlightCurrentLang(currentLang);

// Add click events to each dropdown link
dropdownLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedLang = link.getAttribute('data-lang');
    localStorage.setItem('lang', selectedLang);
    translatePage(selectedLang);
    highlightCurrentLang(selectedLang);
  });
});

function translatePage(lang) {
  fetch(`${langFolder}${lang}.json`)
    .then(response => response.json())
    .then(translations => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) el.innerHTML = translations[key];
      });
    })
    .catch(err => console.error('Translation file not found:', err));
}
