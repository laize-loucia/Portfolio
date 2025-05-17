document.addEventListener("DOMContentLoaded", () => {
  // Initialisation de AOS
  AOS.init({ duration: 1000 });

  // Initialisation de tous les carousels sur la page
  document.querySelectorAll('.project-carousel').forEach(initCarousel);
});

function initCarousel(carousel) {
  let currentSlide = 0;
  const slides = carousel.querySelectorAll('.carousel-slide');
  const container = carousel.querySelector('.carousel-container');
  let autoSlideInterval;

  if (!slides.length || !container) return;

  function updateCarousel() {
    container.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  function changeSlide(n) {
    clearInterval(autoSlideInterval);
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    updateCarousel();
    startAutoSlide();
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      changeSlide(1);
    }, 5000);
  }

  const prevBtn = carousel.querySelector('.carousel-button.prev');
  const nextBtn = carousel.querySelector('.carousel-button.next');

  if (prevBtn) prevBtn.addEventListener('click', () => changeSlide(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => changeSlide(1));

  updateCarousel();
  startAutoSlide();
}
