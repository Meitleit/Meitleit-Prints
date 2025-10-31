// translate.js
const langFolder = 'lang/'; // folder where your JSON files are stored
const dropdownLinks = document.querySelectorAll('.lang-menu a');
const langBtnText = document.querySelector('.lang-btn span[data-i18n="language"]');

let currentLang = localStorage.getItem('lang') || 'en';
applyLanguage(currentLang);

// Function to load JSON and apply translations
function applyLanguage(lang) {
  fetch(`${langFolder}${lang}.json`)
    .then(response => response.json())
    .then(translations => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) el.innerHTML = translations[key];
      });
      // Update the button text (Language ▾) separately if needed
      if (langBtnText && translations['language']) {
        langBtnText.innerHTML = translations['language'];
      }
    })
    .catch(err => console.error('Translation file not found:', err));
  localStorage.setItem('lang', lang);
  currentLang = lang;
}

// Event listeners for dropdown links
dropdownLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedLang = link.getAttribute('data-lang');
    applyLanguage(selectedLang);
  });
});
