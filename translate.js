document.addEventListener("DOMContentLoaded", () => {
  const languageSwitcher = document.getElementById("languageSwitcher");
  const defaultLang = localStorage.getItem("lang") || "en";
  loadLanguage(defaultLang);
  languageSwitcher.value = defaultLang;

  languageSwitcher.addEventListener("change", () => {
    const selected = languageSwitcher.value;
    localStorage.setItem("lang", selected);
    loadLanguage(selected);
  });
});

function loadLanguage(lang) {
  fetch(`${lang}.json`)
    .then(response => response.json())
    .then(translation => {
      document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translation[key]) {
          el.textContent = translation[key];
        }
      });
    })
    .catch(err => console.error("Language load error:", err));
}
