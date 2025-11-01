const langFolder = 'lang/'; // folder where JSON translation files are stored
let currentLang = localStorage.getItem('lang') || 'en';

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

document.addEventListener('DOMContentLoaded', () => {
  // Initial translation
  translatePage(currentLang);

  // Set up language dropdown
  const dropdownLinks = document.querySelectorAll('.lang-menu a');
  dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedLang = link.getAttribute('data-lang');
      localStorage.setItem('lang', selectedLang);
      currentLang = selectedLang;
      translatePage(currentLang);
    });
  });
});

