// translate.js

const langFolder = 'lang/'; // folder where JSON translation files are stored
const dropdownLinks = document.querySelectorAll('.lang-menu a');

// Load saved language from localStorage or default to English
let currentLang = localStorage.getItem('lang') || 'en';

// Function to apply translations
function translatePage(lang) {
  fetch(`${langFolder}${lang}.json`)
    .then(response => response.json())
    .then(translations => {
      // Translate all elements with data-i18n
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) el.innerHTML = translations[key];
      });
    })
    .catch(err => console.error('Translation file not found:', err));
}

// Initial translation on page load
document.addEventListener('DOMContentLoaded', () => {
  translatePage(currentLang);
});

// Update language when user clicks a language in dropdown
dropdownLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedLang = link.getAttribute('data-lang');
    localStorage.setItem('lang', selectedLang);
    currentLang = selectedLang;
    translatePage(currentLang);
  });
});
