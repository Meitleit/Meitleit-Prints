// translate.js

const langFolder = 'lang/'; // folder where your JSON files are stored
const languageDropdownLinks = document.querySelectorAll('.lang-menu [data-lang]');
const LANG_STORAGE_KEY = 'lang';

// Get current language from localStorage or default to 'en'
let currentLang = localStorage.getItem(LANG_STORAGE_KEY) || 'en';

// Function to load and apply translations
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

// Initialize page translations
translatePage(currentLang);

// Update dropdown active label (optional)
const langBtnLabel = document.querySelector('.lang-btn span');
if (langBtnLabel) {
  const langNames = { en: 'Language ▾', ms: 'Bahasa ▾', zh: '简体中文 ▾', ta: 'தமிழ் ▾' };
  langBtnLabel.innerHTML = langNames[currentLang] || 'Language ▾';
}

// Handle language switch clicks
languageDropdownLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const selectedLang = link.getAttribute('data-lang');
    localStorage.setItem(LANG_STORAGE_KEY, selectedLang);
    currentLang = selectedLang;
    translatePage(selectedLang);

    // Update dropdown button text
    if (langBtnLabel) {
      const langNames = { en: 'Language ▾', ms: 'Bahasa ▾', zh: '简体中文 ▾', ta: 'தமிழ் ▾' };
      langBtnLabel.innerHTML = langNames[selectedLang] || 'Language ▾';
    }

    // Close dropdown after selection
    const dropdown = document.querySelector('.language-dropdown');
    if (dropdown) dropdown.classList.remove('open');
  });
});
