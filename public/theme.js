try {
  document.documentElement.dataset.theme =
    localStorage.getItem("profectus360-theme") === "dark" ? "dark" : "light";
} catch {
  document.documentElement.dataset.theme = "light";
}
