const langFolder = 'lang/'; // folder where JSON files are
const langLinks = document.querySelectorAll('.lang-menu a');

let currentLang = localStorage.getItem('lang') || 'en';
loadLanguage(currentLang);

// Bind click events
langLinks.forEach(link => {
  link.addEventListener('click', e=>{
    e.preventDefault();
    const selectedLang = link.dataset.lang;
    localStorage.setItem('lang', selectedLang);
    loadLanguage(selectedLang);
  });
});

function loadLanguage(lang){
  fetch(`${langFolder}${lang}.json`)
    .then(res=>res.json())
    .then(translations=>{
      document
