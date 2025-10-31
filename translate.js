const languageSwitcher = document.getElementById('languageSwitcher');
const langFolder = 'lang/'; // folder where your JSON files are stored

// Set initial language from localStorage
let currentLang = localStorage.getItem('lang') || 'en';
languageSwitcher.value = currentLang;
translatePage(currentLang);

// When user selects a language
languageSwitcher.addEventListener('change', (e) => {
  const selectedLang = e.target.value;
  localStorage.setItem('lang', selectedLang);
  translatePage(selectedLang);
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

