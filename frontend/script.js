/* =========================================================
   PRAJWAL BADIGER — PORTFOLIO SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".navbar");
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.querySelector(".theme-icon");
  const backToTop = document.getElementById("backToTop");

  /* NAVBAR */

  function updateNavbar() {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 30);
    }

    if (backToTop) {
      backToTop.classList.toggle("show", window.scrollY > 600);
    }
  }

  window.addEventListener("scroll", updateNavbar, { passive: true });
  updateNavbar();

  /* THEME TOGGLE */

  function applyTheme(theme) {
    const dark = theme === "dark";

    document.body.classList.toggle("dark", dark);

    if (themeIcon) {
      themeIcon.textContent = dark ? "☀" : "☾";
    }

    if (themeToggle) {
      themeToggle.setAttribute(
        "aria-label",
        dark ? "Switch to light theme" : "Switch to dark theme",
      );
    }
  }

  const savedTheme = localStorage.getItem("prajwal-theme");
  applyTheme(savedTheme === "dark" ? "dark" : "light");

  themeToggle?.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("dark")
      ? "light"
      : "dark";

    applyTheme(nextTheme);
    localStorage.setItem("prajwal-theme", nextTheme);
  });

  /* SMOOTH NAVIGATION */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const id = link.getAttribute("href");

      if (!id || id === "#") return;

      const target = document.querySelector(id);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* ACTIVE NAVIGATION */

  const navLinks = document.querySelectorAll(".nav-links a");
  const navigationSections = document.querySelectorAll("section[id]");

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

    navigationSections.forEach((section) => navObserver.observe(section));
  }

  /* SCROLL REVEAL */

  const revealElements = document.querySelectorAll(`
    .section-header,
    .about-content,
    .timeline-item,
    .education-card,
    .clinical-card,
    .interest-item,
    .volunteer-content,
    .contact-content
  `);

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08 },
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

  /* BACK TO TOP */

  backToTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  /* ECG ANIMATION */

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

  /* =========================================================
     CLINICAL SUBJECT DETAILS
  ========================================================= */

  const subjectData = {
    Medicine: {
      theory: {
        title: "Medicine — Theory",
        description:
          "Study of adult diseases, their diagnosis, treatment and prevention.",
        topics: [
          "Cardiovascular System",
          "Respiratory System",
          "Gastrointestinal System",
          "Renal System",
          "Endocrinology",
          "Neurology",
          "Infectious Diseases",
          "Hematology",
        ],
      },
      clinic: {
        title: "Medicine — Clinical",
        description:
          "Clinical learning focused on history-taking, examination and patient evaluation.",
        topics: [
          "Patient History",
          "General Physical Examination",
          "Systemic Examination",
          "Differential Diagnosis",
          "Clinical Case Presentation",
          "Investigation Interpretation",
        ],
      },
    },

    Surgery: {
      theory: {
        title: "Surgery — Theory",
        description:
          "Study of surgical conditions, operative principles and perioperative care.",
        topics: [
          "Wound Healing",
          "Surgical Infections",
          "Shock",
          "Abdominal Conditions",
          "Hernias",
          "Trauma",
          "Preoperative Assessment",
          "Postoperative Complications",
        ],
      },
      clinic: {
        title: "Surgery — Clinical",
        description:
          "Clinical learning in surgical assessment and supervised hospital practice.",
        topics: [
          "Surgical History",
          "Abdominal Examination",
          "Wound Assessment",
          "Case Presentation",
          "Surgical Instruments",
          "Preoperative and Postoperative Care",
        ],
      },
    },

    Pediatrics: {
      theory: {
        title: "Pediatrics — Theory",
        description:
          "Study of child health, growth, development and childhood diseases.",
        topics: [
          "Growth and Development",
          "Neonatology",
          "Childhood Nutrition",
          "Immunization",
          "Pediatric Infections",
          "Respiratory Disorders",
          "Common Childhood Diseases",
        ],
      },
      clinic: {
        title: "Pediatrics — Clinical",
        description:
          "Clinical learning focused on the assessment and care of infants and children.",
        topics: [
          "Growth Assessment",
          "Developmental Assessment",
          "Pediatric History",
          "Newborn Examination",
          "Nutritional Assessment",
          "Pediatric Case Presentation",
        ],
      },
    },

    OBGYN: {
      theory: {
        title: "OBGYN — Theory",
        description:
          "Study of pregnancy, childbirth, reproductive health and gynecological conditions.",
        topics: [
          "Antenatal Care",
          "Normal Labour",
          "High-Risk Pregnancy",
          "Postnatal Care",
          "Menstrual Disorders",
          "Contraception",
          "Gynecological Conditions",
        ],
      },
      clinic: {
        title: "OBGYN — Clinical",
        description:
          "Clinical learning in obstetric and gynecological assessment under supervision.",
        topics: [
          "Obstetric History",
          "Antenatal Assessment",
          "Labour Monitoring",
          "Postnatal Assessment",
          "Gynecological History",
          "Clinical Case Presentation",
        ],
      },
    },

    Orthopedics: {
      theory: {
        title: "Orthopedics — Theory",
        description:
          "Study of bones, joints, musculoskeletal injuries and related disorders.",
        topics: [
          "Fractures",
          "Dislocations",
          "Bone and Joint Infections",
          "Arthritis",
          "Spinal Disorders",
          "Congenital Conditions",
          "Musculoskeletal Trauma",
        ],
      },
      clinic: {
        title: "Orthopedics — Clinical",
        description:
          "Clinical learning in musculoskeletal examination and orthopedic assessment.",
        topics: [
          "Musculoskeletal History",
          "Joint Examination",
          "Fracture Assessment",
          "Limb Examination",
          "Gait Assessment",
          "Orthopedic Case Presentation",
        ],
      },
    },

    Psychiatry: {
      theory: {
        title: "Psychiatry — Theory",
        description:
          "Study of mental health conditions, their assessment and management.",
        topics: [
          "Mental Status Examination",
          "Mood Disorders",
          "Anxiety Disorders",
          "Psychotic Disorders",
          "Substance Use Disorders",
          "Neurodevelopmental Disorders",
          "Psychopharmacology",
        ],
      },
      clinic: {
        title: "Psychiatry — Clinical",
        description:
          "Clinical learning focused on psychiatric history and mental status assessment.",
        topics: [
          "Psychiatric History",
          "Mental Status Examination",
          "Clinical Interviewing",
          "Risk Assessment",
          "Case Formulation",
          "Psychiatric Case Presentation",
        ],
      },
    },

    Ophthalmology: {
      theory: {
        title: "Ophthalmology — Theory",
        description:
          "Study of eye anatomy, vision and diseases affecting the eye.",
        topics: [
          "Eye Anatomy",
          "Visual Acuity",
          "Refractive Errors",
          "Cataract",
          "Glaucoma",
          "Retinal Disorders",
          "Ocular Infections",
        ],
      },
      clinic: {
        title: "Ophthalmology — Clinical",
        description:
          "Clinical learning in eye examination and assessment of visual complaints.",
        topics: [
          "Visual Acuity Testing",
          "External Eye Examination",
          "Pupillary Examination",
          "Ocular Movements",
          "Ophthalmoscopy",
          "Clinical Case Presentation",
        ],
      },
    },

    ENT: {
      theory: {
        title: "ENT — Theory",
        description:
          "Study of ear, nose, throat and related head and neck conditions.",
        topics: [
          "Ear Anatomy",
          "Hearing Disorders",
          "Otitis Media",
          "Nasal and Sinus Disorders",
          "Epistaxis",
          "Throat Disorders",
          "Laryngeal Conditions",
        ],
      },
      clinic: {
        title: "ENT — Clinical",
        description:
          "Clinical learning in ear, nose and throat examination under supervision.",
        topics: [
          "Ear Examination",
          "Nasal Examination",
          "Throat Examination",
          "Hearing Assessment",
          "Clinical Case Presentation",
          "Head and Neck Examination",
        ],
      },
    },

    Anesthesia: {
      theory: {
        title: "Anesthesia — Theory",
        description:
          "Study of anesthesia, pain management, patient monitoring and perioperative care.",
        topics: [
          "Pre-anesthetic Assessment",
          "General Anesthesia",
          "Regional Anesthesia",
          "Local Anesthesia",
          "Airway Management",
          "Anesthetic Drugs",
          "Patient Monitoring",
          "Pain Management",
        ],
      },
      clinic: {
        title: "Anesthesia — Clinical",
        description:
          "Clinical learning in preoperative assessment and supervised perioperative care.",
        topics: [
          "Pre-anesthetic Evaluation",
          "Airway Assessment",
          "Monitoring Equipment",
          "Anesthesia Workstation",
          "Recovery Room Observation",
          "Postoperative Pain Assessment",
        ],
      },
    },
  };

  /* CREATE DETAILS SECTION */

  const clinicalSection = document.querySelector("#clinical");
  const clinicalGrid = document.querySelector(".clinical-grid");

  if (clinicalSection && clinicalGrid) {
    const detailSection = document.createElement("section");

    detailSection.id = "subject-details";
    detailSection.className = "section subject-details";
    detailSection.hidden = true;

    detailSection.innerHTML = `
      <div class="container">

        <button type="button" class="subject-back">
          ← Back to Clinical Training
        </button>

        <div class="section-header subject-heading">
          <span class="section-eyebrow">CLINICAL SUBJECT</span>
          <h2 class="section-title subject-title">Medicine</h2>
          <p class="section-description subject-description"></p>
        </div>

        <div class="subject-tabs" role="tablist" aria-label="Subject sections">
          <button
            type="button"
            class="subject-tab active"
            data-tab="theory"
            role="tab"
            aria-selected="true"
          >
            Theory
          </button>

          <button
            type="button"
            class="subject-tab"
            data-tab="clinic"
            role="tab"
            aria-selected="false"
          >
            Clinic
          </button>
        </div>

        <div class="subject-content" role="tabpanel">
          <h3 class="subject-content-title"></h3>
          <p class="subject-content-description"></p>
          <div class="subject-topic-grid"></div>
        </div>

      </div>
    `;

    clinicalSection.insertAdjacentElement("afterend", detailSection);

    /* STYLE THE DETAILS SECTION */

    const detailStyles = document.createElement("style");

    detailStyles.textContent = `
      .clinical-card {
        cursor: pointer;
      }

      .clinical-card:focus-visible {
        outline: 2px solid var(--teal, #2b817c);
        outline-offset: 4px;
      }

      .subject-details {
        border-top: 1px solid var(--border, #d5cbbb);
        padding-top: 48px;
        min-height: 65vh;
      }

      .subject-details[hidden] {
        display: none !important;
      }

      .subject-back {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 36px;
        padding: 12px 16px;
        border: 1px solid var(--border, #d5cbbb);
        background: transparent;
        color: var(--text, #18242a);
        font: inherit;
        cursor: pointer;
        transition: background 0.2s ease, color 0.2s ease;
      }

      .subject-back:hover {
        background: var(--ink, #16364a);
        color: #fff;
      }

      .subject-tabs {
        display: flex;
        gap: 0;
        margin: 30px 0;
        border-bottom: 1px solid var(--border, #d5cbbb);
      }

      .subject-tab {
        padding: 14px 28px;
        border: 0;
        border-bottom: 3px solid transparent;
        margin-bottom: -1px;
        background: transparent;
        color: var(--muted, #68747a);
        font: inherit;
        font-weight: 700;
        cursor: pointer;
        transition: color 0.2s ease, border-color 0.2s ease;
      }

      .subject-tab:hover,
      .subject-tab.active {
        color: var(--teal, #2b817c);
        border-bottom-color: var(--teal, #2b817c);
      }

      .subject-content {
        padding: 28px 0 12px;
      }

      .subject-content-title {
        margin: 0 0 12px;
        color: var(--text, #18242a);
        font-family: "Playfair Display", Georgia, serif;
        font-size: clamp(1.6rem, 3vw, 2.2rem);
      }

      .subject-content-description {
        max-width: 700px;
        margin: 0 0 28px;
        color: var(--muted, #68747a);
        line-height: 1.8;
      }

      .subject-topic-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        border-top: 1px solid var(--border, #d5cbbb);
        border-left: 1px solid var(--border, #d5cbbb);
      }

      .subject-topic {
        display: flex;
        align-items: flex-start;
        gap: 14px;
        min-height: 90px;
        padding: 22px;
        border-right: 1px solid var(--border, #d5cbbb);
        border-bottom: 1px solid var(--border, #d5cbbb);
      }

      .subject-topic-number {
        flex-shrink: 0;
        color: var(--teal, #2b817c);
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.12em;
      }

      .subject-topic-name {
        color: var(--text, #18242a);
        font-weight: 600;
        line-height: 1.5;
      }

      .subject-topic:hover {
        background: var(--surface-2, #e9e1d2);
      }

      @media (max-width: 800px) {
        .subject-topic-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      @media (max-width: 520px) {
        .subject-topic-grid {
          grid-template-columns: 1fr;
        }

        .subject-topic {
          min-height: auto;
          padding: 18px;
        }

        .subject-tab {
          flex: 1;
          padding: 13px 16px;
        }

        .subject-details {
          padding-top: 32px;
        }
      }
    `;

    document.head.appendChild(detailStyles);

    const subjectTitle = detailSection.querySelector(".subject-title");
    const subjectDescription = detailSection.querySelector(
      ".subject-description",
    );
    const contentTitle = detailSection.querySelector(".subject-content-title");
    const contentDescription = detailSection.querySelector(
      ".subject-content-description",
    );
    const topicGrid = detailSection.querySelector(".subject-topic-grid");
    const tabs = detailSection.querySelectorAll(".subject-tab");
    const backButton = detailSection.querySelector(".subject-back");

    let currentSubject = "Medicine";
    let currentTab = "theory";

    /* RENDER THEORY OR CLINIC */

    function renderSubjectTab(tabName) {
      const subject = subjectData[currentSubject];

      if (!subject || !subject[tabName]) return;

      currentTab = tabName;

      tabs.forEach((tab) => {
        const selected = tab.dataset.tab === tabName;

        tab.classList.toggle("active", selected);
        tab.setAttribute("aria-selected", String(selected));
      });

      const content = subject[tabName];

      contentTitle.textContent = content.title;
      contentDescription.textContent = content.description;

      topicGrid.replaceChildren();

      content.topics.forEach((topic, index) => {
        const card = document.createElement("article");
        card.className = "subject-topic";

        const number = document.createElement("span");
        number.className = "subject-topic-number";
        number.textContent = String(index + 1).padStart(2, "0");

        const name = document.createElement("span");
        name.className = "subject-topic-name";
        name.textContent = topic;

        card.append(number, name);
        topicGrid.appendChild(card);
      });
    }

    /* OPEN SUBJECT */

    function openSubject(subjectName) {
      if (!subjectData[subjectName]) return;

      currentSubject = subjectName;
      currentTab = "theory";

      subjectTitle.textContent = subjectName;
      subjectDescription.textContent = `Explore theory topics and clinical learning in ${subjectName}.`;

      renderSubjectTab("theory");

      detailSection.hidden = false;

      requestAnimationFrame(() => {
        detailSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }

    /* MAKE ALL SUBJECT CARDS CLICKABLE */

    clinicalGrid.querySelectorAll(".clinical-card").forEach((card) => {
      const heading = card.querySelector("h3");

      if (!heading) return;

      const subjectName = heading.textContent.trim();

      if (!subjectData[subjectName]) return;

      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute(
        "aria-label",
        `Open ${subjectName} theory and clinical sections`,
      );

      card.addEventListener("click", () => {
        openSubject(subjectName);
      });

      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openSubject(subjectName);
        }
      });
    });

    /* SWITCH BETWEEN THEORY AND CLINIC */

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        renderSubjectTab(tab.dataset.tab);
      });
    });

    /* RETURN TO CLINICAL SUBJECTS */

    backButton.addEventListener("click", () => {
      detailSection.hidden = true;

      clinicalSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  /* PAGE LOADED */

  document.body.classList.add("page-loaded");
});
