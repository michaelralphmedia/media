(() => {
  const carousel = document.querySelector('.feature-carousel');
  if (!carousel) return;
  const slides = [...carousel.querySelectorAll('.feature-slide')];
  const status = carousel.querySelector('.feature-carousel-status');
  let current = 0;
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    status.textContent = `${current + 1} / ${slides.length}`;
  }
  carousel.querySelector('.feature-previous').addEventListener('click', () => show(current - 1));
  carousel.querySelector('.feature-next').addEventListener('click', () => show(current + 1));
  carousel.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
})();
