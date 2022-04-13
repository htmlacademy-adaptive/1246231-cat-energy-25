const slider = document.querySelector('.slider__images');
const before = document.querySelector('.slider__image-before');
const beforeImage = before.querySelector('img');

document.addEventListener('DOMContentLoaded', () => {
  let width = slider.offsetWidth;
  beforeImage.style.width = `${width}px`;
});
