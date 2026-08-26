document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".drop-toggle");
    if (!toggle) return;

    toggle.setAttribute("aria-expanded", "false");

    toggle.addEventListener("click", (event) => {
      event.preventDefault();

      dropdowns.forEach((other) => {
        if (other !== dropdown) {
          other.classList.remove("open");
          const otherToggle = other.querySelector(".drop-toggle");
          if (otherToggle) otherToggle.setAttribute("aria-expanded", "false");
        }
      });

      const isOpen = dropdown.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".dropdown")) {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const toggle = dropdown.querySelector(".drop-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const toggle = dropdown.querySelector(".drop-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    }
  });
});
