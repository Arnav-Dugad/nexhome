try {
  document.documentElement.dataset.theme =
    localStorage.getItem("nexhome-theme") === "dark" ? "dark" : "light";
} catch {
  document.documentElement.dataset.theme = "light";
}
