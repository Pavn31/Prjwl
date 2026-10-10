document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.querySelector(".theme-icon");

  // Theme
  function applyTheme(theme) {
    const isDark = theme === "dark";

    document.body.classList.toggle("dark", isDark);

    if (themeIcon) {
      themeIcon.textContent = isDark ? "☀" : "☾";
    }

    themeToggle?.setAttribute(
      "aria-label",
      isDark ? "Switch to light theme" : "Switch to dark theme",
    );
  }

  let savedTheme = "light";

  try {
    savedTheme = localStorage.getItem("prajwal-theme") || "light";
  } catch {
    // Use light theme if storage is unavailable.
  }

  applyTheme(savedTheme);

  themeToggle?.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark")
      ? "light"
      : "dark";

    applyTheme(nextTheme);

    try {
      localStorage.setItem("prajwal-theme", nextTheme);
    } catch {
      // Theme still works for the current page.
    }
  });

  // Subject resource navigation
  document.querySelectorAll(".resource-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      const destination = card.getAttribute("href");

      if (!destination) {
        event.preventDefault();
        return;
      }

      // Allow normal navigation to the linked page.
    });
  });
});
