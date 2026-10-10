document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.querySelector(".theme-icon");
  const backToTop = document.getElementById("backToTop");

  // Navbar and back-to-top
  function updateScrollUI() {
    navbar?.classList.toggle("scrolled", window.scrollY > 30);
    backToTop?.classList.toggle("show", window.scrollY > 600);
  }

  window.addEventListener("scroll", updateScrollUI, {
    passive: true,
  });

  updateScrollUI();

  // Theme toggle
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
  } catch (error) {
    // Continue with the default theme if storage is unavailable.
  }

  applyTheme(savedTheme === "dark" ? "dark" : "light");

  themeToggle?.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark")
      ? "light"
      : "dark";

    applyTheme(nextTheme);

    try {
      localStorage.setItem("prajwal-theme", nextTheme);
    } catch (error) {
      // Theme still works for the current page.
    }
  });

  // Smooth navigation for same-page links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;

      const target = document.querySelector(href);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // Active navigation link
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("section[id]");

  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`,
            );
          });
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      },
    );

    sections.forEach((section) => navObserver.observe(section));
  }

  // Scroll reveal
  const revealElements = document.querySelectorAll(
    [
      ".section-header",
      ".about-content",
      ".timeline-item",
      ".education-card",
      ".clinical-card",
      ".interest-item",
      ".volunteer-content",
      ".contact-content",
    ].join(","),
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.08,
      },
    );

    revealElements.forEach((element) => {
      element.classList.add("reveal");
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // Back to top
  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ECG animation
  const ecgCard = document.querySelector(".ecg-card");
  const ecgLine = document.querySelector(".ecg-card polyline");

  if (ecgLine) {
    ecgLine.style.animation = "none";

    requestAnimationFrame(() => {
      ecgLine.style.animation = "";
      ecgLine.style.animationPlayState = "running";
    });
  }

  if (ecgCard && ecgLine && "IntersectionObserver" in window) {
    const ecgObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        ecgLine.style.animationPlayState = entry.isIntersecting
          ? "running"
          : "paused";
      });
    });

    ecgObserver.observe(ecgCard);
  }

  // Mark page as loaded
  document.body.classList.add("page-loaded");
});
