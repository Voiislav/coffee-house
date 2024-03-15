import Carousel from "../components/Carousel.js";
import MobileMenu from "../components/MobileMenu.js";


//carousel
const carousel = new Carousel('.favorite-coffee__carousel', '#button-right', '#button-left', '#active-slide', '#center-slide', '#right-slide', '#first-control', '#second-control', '#third-control');


//mobile menu
const mobileMenu = new MobileMenu('.mobile-menu', '#open-menu', '#close-menu', '.mobile-menu__link');


//redirecting to menu from the home page
const toMenuButton = document.querySelector('.enjoy__menu-link');

const redirectToMenu = () => {
  window.location.href = 'menu.html';
};

toMenuButton.addEventListener('click', redirectToMenu);

