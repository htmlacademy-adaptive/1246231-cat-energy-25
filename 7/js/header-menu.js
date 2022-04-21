const hamburger = document.querySelector('.header__hamburger')

const toggle = document.querySelector('.header__hamburger-inner')

const mobileMenu = document.querySelector('.site-navigation')

const bodyOverflow = document.querySelector('body')

hamburger.addEventListener('click', () => {
  toggle.classList.toggle('header__hamburger-inner--open');
  mobileMenu.classList.toggle('site-navigation--open');
  bodyOverflow.classList.toggle('show-main-nav');
});
