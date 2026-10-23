const viewer = document.querySelector('.show-viewer');
const photos = [...document.querySelectorAll('.show-photo')];
const fullImage = viewer.querySelector('figure img');
const caption = viewer.querySelector('figcaption');
let currentPhoto = 0;
let opener;
function showPhoto(index) {
  currentPhoto = (index + photos.length) % photos.length;
  fullImage.src = photos[currentPhoto].dataset.full;
  fullImage.alt = photos[currentPhoto].querySelector('img').alt;
  caption.textContent = `${document.querySelector(".show-gallery").dataset.galleryCaption || "Alabama 3 · The 1865 · 22 October 2026"} · ${currentPhoto + 1} / ${photos.length}`;
}
photos.forEach((photo, index) => photo.addEventListener('click', () => {
  opener = photo;
  showPhoto(index);
  viewer.showModal();
}));
viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
viewer.querySelector('.viewer-prev').addEventListener('click', () => showPhoto(currentPhoto - 1));
viewer.querySelector('.viewer-next').addEventListener('click', () => showPhoto(currentPhoto + 1));
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(currentPhoto - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(currentPhoto + 1); }
});
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
viewer.addEventListener('close', () => opener?.focus());
