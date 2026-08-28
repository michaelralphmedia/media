
document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dropdown");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#site-nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(open));
    });
  }

  const heroSlide = document.querySelector(".hero-slide");
  if (heroSlide) {
    const desktopSlides = [
      { src: "assets/images/a4704877.webp", alt: "Live band performance photographed by Michael Ralph Media" },
      { src: "assets/images/a4706498.webp", alt: "Landscape photography by Michael Ralph Media" },
      { src: "assets/images/a4705105.webp", alt: "Live event photography by Michael Ralph Media" },
      { src: "assets/images/a4702938.webp", alt: "Urban photography by Michael Ralph Media" },
      { src: "assets/images/a4700719.webp", alt: "Architecture photography by Michael Ralph Media" }
    ];
    const mobileSlides = [
      { src: "assets/images/a4702938.webp", alt: "Urban photography by Michael Ralph Media" },
      { src: "assets/images/a4700719.webp", alt: "Architecture photography by Michael Ralph Media" },
      { src: "assets/images/a4701210.webp", alt: "Urban photography by Michael Ralph Media" },
      { src: "assets/images/img-0140.webp", alt: "Portrait photography by Michael Ralph Media" },
      { src: "assets/images/3.webp", alt: "Analogue photography by Michael Ralph Media" }
    ];
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let heroSlides = mobileQuery.matches ? mobileSlides : desktopSlides;
    let heroIndex = 0;

    [...desktopSlides, ...mobileSlides].forEach((slide) => {
      const image = new Image();
      image.src = slide.src;
    });

    function switchHeroSlides(slides) {
      heroSlides = slides;
      heroIndex = 0;
      heroSlide.classList.add("is-fading");
      window.setTimeout(() => {
        heroSlide.src = heroSlides[heroIndex].src;
        heroSlide.alt = heroSlides[heroIndex].alt;
        heroSlide.classList.remove("is-fading");
      }, 2400);
    }

    heroSlide.src = heroSlides[0].src;
    heroSlide.alt = heroSlides[0].alt;
    mobileQuery.addEventListener("change", (event) => {
      switchHeroSlides(event.matches ? mobileSlides : desktopSlides);
    });

    if (!reducedMotion) {
      window.setInterval(() => {
        heroSlide.classList.add("is-fading");
        window.setTimeout(() => {
          heroIndex = (heroIndex + 1) % heroSlides.length;
          heroSlide.src = heroSlides[heroIndex].src;
          heroSlide.alt = heroSlides[heroIndex].alt;
          heroSlide.classList.remove("is-fading");
        }, 2400);
      }, 20000);
    }
  }

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

  // Lightbox
  const lightbox = document.querySelector("#lightbox");
  const lbImage = lightbox?.querySelector("figure img");
  const lbCaption = lightbox?.querySelector("figcaption");
  const lbClose = lightbox?.querySelector(".lightbox-close");
  const lbPrev = lightbox?.querySelector(".lightbox-prev");
  const lbNext = lightbox?.querySelector(".lightbox-next");
  const galleryItems = Array.from(document.querySelectorAll("[data-lightbox]"));
  let current = -1;

  function show(index) {
    if (!lightbox || !galleryItems.length) return;
    current = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[current];
    lbImage.src = item.dataset.lightbox;
    lbImage.alt = item.querySelector("img")?.alt || "";
    lbCaption.textContent = item.dataset.caption || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lbClose?.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
  }

  galleryItems.forEach((item, index) => item.addEventListener("click", () => show(index)));
  lbClose?.addEventListener("click", closeLightbox);
  lbPrev?.addEventListener("click", () => show(current - 1));
  lbNext?.addEventListener("click", () => show(current + 1));

  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeLightbox();
      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove("open");
        const toggle = dropdown.querySelector(".drop-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    }
    if (lightbox?.classList.contains("open")) {
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    }
  });
});
