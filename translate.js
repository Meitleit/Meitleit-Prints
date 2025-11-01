// translate.js
const langFolder = 'lang/'; // Folder containing JSON translation files
const dropdownLinks = document.querySelectorAll('.lang-menu a');

// Load saved language from localStorage or default to English
let currentLang = localStorage.getItem('lang') || 'en';

// Function to apply translations
function translatePage(lang) {
  fetch(`${langFolder}${lang}.json`)
    .then(response => {
      if (!response.ok) throw new Error(`Cannot load ${lang}.json`);
      return response.json();
    })
    .then(translations => {
      // Translate all elements with data-i18n attributes
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) el.innerHTML = translations[key];
      });
    })
    .catch(err => console.error('Translation error:', err));
}

// Run translation once the page is fully loaded
window.addEventListener('DOMContentLoaded', () => {
  translatePage(currentLang);
});

// Change language when user clicks in dropdown
dropdownLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedLang = link.getAttribute('data-lang');
    if (selectedLang !== currentLang) {
      localStorage.setItem('lang', selectedLang);
      currentLang = selectedLang;
      translatePage(currentLang);
    }
  });
});

// Ensure translation persists across pages
window.addEventListener('pageshow', () => {
  const savedLang = localStorage.getItem('lang') || 'en';
  if (savedLang !== currentLang) {
    currentLang = savedLang;
    translatePage(currentLang);
  }
});
