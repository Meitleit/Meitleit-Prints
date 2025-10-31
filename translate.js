const langFolder = 'lang/'; // folder where your JSON files are stored

// Detect all language dropdown buttons
const langBtns = document.querySelectorAll('[data-lang]');
let currentLang = localStorage.getItem('lang') || 'en';

// Apply saved language on page load
translatePage(currentLang);

// Update language on click
langBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const selectedLang = btn.getAttribute('data-lang');
    localStorage.setItem('lang', selectedLang);
    translatePage(selectedLang);
  });
});

function translatePage(lang) {
  fetch(`${langFolder}${lang}.json`)
    .then(res => res.json())
    .then(translations => {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(translations[key]) el.innerHTML = translations[key];
      });
    })
    .catch(err => console.error('Translation file not found:', err));
}
