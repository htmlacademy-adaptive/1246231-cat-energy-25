const slider = document.querySelector('.slider');
const sliderRange = document.querySelector('.slider__range-buton');

function changeSliderValue() {
  slider.style.setProperty("--slider-width", sliderRange.value + "%");
}
