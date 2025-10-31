// === Translation Loader ===
document.addEventListener("DOMContentLoaded", () => {
  const languageSwitcher = document.getElementById("languageSwitcher");
  const userLang = localStorage.getItem("lang") || "en";

  // Set the dropdown to saved language
  if (languageSwitcher) languageSwitcher.value = userLang;

  // Load the initial language
  loadLanguage(userLang);

  // Change language when user selects one
  if (languageSwitcher) {
    languageSwitcher.addEventListener("change", (e) => {
      const selectedLang = e.target.value;
      localStorage.setItem("lang", selectedLang);
      loadLanguage(selectedLang);
    });
  }
});

function loadLanguage(lang) {
  fetch(`${lang}.json`)
    .then((res) => {
      if (!res.ok) throw new Error("Language file not found");
      return res.json();
    })
    .then((translations) => applyTranslations(translations))
    .catch((err) => console.error("Error loading language:", err));
}

function applyTranslations(translations) {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) el.textContent = translations[key];
  });
}
