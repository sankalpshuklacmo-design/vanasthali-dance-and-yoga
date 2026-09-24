const ACADEMY = {
  whatsapp: "919000000000",
  phoneDisplay: "+91 90000 00000"
};

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
}

function setupWhatsApp() {
  const base = "https://wa.me/" + ACADEMY.whatsapp + "?text=";
  document.querySelectorAll("[data-wa]").forEach((el) => {
    const msg = el.getAttribute("data-wa") || "Namaste, Vanasthali trial class ke baare mein poochna tha.";
    el.setAttribute("href", base + encodeURIComponent(msg));
  });
  document.querySelectorAll("[data-phone]").forEach((el) => {
    el.textContent = ACADEMY.phoneDisplay;
    el.setAttribute("href", "tel:+" + ACADEMY.whatsapp);
  });
}

function setupFilters() {
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-category]");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const value = btn.dataset.filter;
      cards.forEach((card) => {
        const show = value === "all" || card.dataset.category === value;
        card.classList.toggle("hidden", !show);
      });
      window.scrollTo({ top: document.querySelector(".filter-bar").offsetTop - 80, behavior: "smooth" });
    });
  });
}

function setupForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const text = [
      "Namaste, Vanasthali enquiry:",
      "Naam: " + (data.get("name") || ""),
      "Phone: " + (data.get("phone") || ""),
      "Interest: " + (data.get("interest") || ""),
      data.get("message") || ""
    ].join("\n");
    const notice = document.getElementById("form-notice");
    if (notice) notice.style.display = "block";
    window.open("https://wa.me/" + ACADEMY.whatsapp + "?text=" + encodeURIComponent(text), "_blank");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupNav();
  setupWhatsApp();
  setupFilters();
  setupForm();
});
