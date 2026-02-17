/* =========================
   MOBILE MENU
========================= */

const burger = document.getElementById("burger");
const nav = document.getElementById("nav");
const navOverlay = document.getElementById("navOverlay");

function openMenu() {
  if (!burger || !nav || !navOverlay) return;
  burger.classList.add("active");
  burger.setAttribute("aria-expanded", "true");
  nav.classList.add("show");
  navOverlay.classList.add("show");
  document.body.classList.add("menu-open");
}

function closeMenu() {
  if (!burger || !nav || !navOverlay) return;
  burger.classList.remove("active");
  burger.setAttribute("aria-expanded", "false");
  nav.classList.remove("show");
  navOverlay.classList.remove("show");
  document.body.classList.remove("menu-open");
}

if (burger && nav && navOverlay) {
  burger.addEventListener("click", () => {
    if (nav.classList.contains("show")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  navOverlay.addEventListener("click", closeMenu);
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 768) closeMenu();
});

/* =========================
   HEADER SHADOW ON SCROLL
========================= */

const header = document.querySelector(".header");

if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

/* =========================
   REVEAL ON SCROLL
========================= */

const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach(element => {
    const top = element.getBoundingClientRect().top;
    if (top < windowHeight - 80) {
      element.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* =========================
   GROOM CARD TOGGLE
========================= */

const groomGrid = document.querySelector(".grooming-grid");

if (groomGrid) {
  const cards = Array.from(groomGrid.querySelectorAll(".groom-card"));

  function setCardState(card, expanded) {
    const button = card.querySelector(".groom-more-btn");
    const text = card.querySelector(".groom-more-text");
    if (!button || !text) return;

    card.classList.toggle("expanded", expanded);
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
    button.textContent = expanded ? "Weniger anzeigen" : "Mehr erfahren";
    text.hidden = !expanded;
  }

  cards.forEach((card, index) => {
    const button = card.querySelector(".groom-more-btn");
    const text = card.querySelector(".groom-more-text");
    if (!button || !text) return;
    if (!text.id) text.id = `groom-more-${index + 1}`;
    button.setAttribute("aria-controls", text.id);
    setCardState(card, false);
  });

  groomGrid.addEventListener("click", event => {
    const button = event.target.closest(".groom-more-btn");
    if (!button) return;

    const card = button.closest(".groom-card");
    const text = card ? card.querySelector(".groom-more-text") : null;
    if (!card || !text) return;

    const willExpand = text.hidden;
    cards.forEach(otherCard => setCardState(otherCard, false));
    if (willExpand) setCardState(card, true);
  });
}
