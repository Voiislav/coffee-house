import Menu from "../components/Menu.js";
import MenuPopup from "../components/MenuPopup.js";
import MobileMenu from "../components/MobileMenu.js";
import { products } from "../utils/products.js";

// mobile menu
const mobileMenu = new MobileMenu('.mobile-menu', '#open-menu', '#close-menu', '.mobile-menu__link');


// categories filter
const renderCategory = (category) => {
  const categoryProducts = products.filter(product => product.category === category);
  categoryProducts.forEach(product => addMenuItem(product));
};


// modal windows
const menuPopup = new MenuPopup(document.querySelector('.popup'));
menuPopup.setEventListeners();

const openMenuPopup = (product) => {
  menuPopup.open(
    product.name,
    product.image,
    product.description,
    product.price,
    product.sizes,
    product.additives
  );
};

// section cleaning before new rendering
const cleanSection = () => {
  const menuCards = document.querySelectorAll('.menu__item');
  menuCards.forEach(menuCard => {
    menuCard.remove();
  })
};


// menu rendering
const addMenuItem = (product) => {
  const menuItem = Menu.createMenuItem(product, '.menu-template');
  document.querySelector('.menu__items').append(menuItem);

  const menuSelectButton = menuItem.querySelector('.menu__select');
  const menuImageButton = menuItem.querySelector('.menu__image-container');

  menuSelectButton.addEventListener('click', () => openMenuPopup(product));
  menuImageButton.addEventListener('click', () => openMenuPopup(product));
};


// adding tabs listeners
const coffeeTab = document.querySelector('#coffee');
const teaTab = document.querySelector('#tea');
const dessertsTab = document.querySelector('#desserts');

const handleCoffeeTabClick = () => {
  cleanSection();
  coffeeTab.classList.add('menu__tab-button_type_active');
  teaTab.classList.remove('menu__tab-button_type_active');
  dessertsTab.classList.remove('menu__tab-button_type_active');
  coffeeTab.setAttribute('disabled', true);
  teaTab.removeAttribute('disabled', false);
  dessertsTab.removeAttribute('disabled', false);
  renderCategory('coffee');
  loadMoreProducts();
};


const handleTeaTabClick = () => {
  cleanSection();
  teaTab.classList.add('menu__tab-button_type_active');
  coffeeTab.classList.remove('menu__tab-button_type_active');
  dessertsTab.classList.remove('menu__tab-button_type_active');
  teaTab.setAttribute('disabled', true);
  coffeeTab.removeAttribute('disabled', false);
  dessertsTab.removeAttribute('disabled', false);
  renderCategory('tea');
};

const handleDessertsTabClick = () => {
  cleanSection();
  dessertsTab.classList.add('menu__tab-button_type_active');
  coffeeTab.classList.remove('menu__tab-button_type_active');
  teaTab.classList.remove('menu__tab-button_type_active');
  dessertsTab.setAttribute('disabled', true);
  coffeeTab.removeAttribute('disabled', false);
  teaTab.removeAttribute('disabled', false);
  renderCategory('dessert');
  loadMoreProducts();
};

coffeeTab.addEventListener('click', handleCoffeeTabClick);
teaTab.addEventListener('click', handleTeaTabClick);
dessertsTab.addEventListener('click', handleDessertsTabClick);

renderCategory('coffee');

// load more button
const loadMoreButton = document.querySelector('.menu__button-refresh');
const menuItems = document.querySelectorAll('.menu__item');

const loadMoreProducts = () => {
  if (coffeeTab.classList.contains('menu__tab-button_type_active') || dessertsTab.classList.contains('menu__tab-button_type_active')) {
    menuItems.forEach((item, index) => {
      if (index >= menuItems.length - 4) {
        item.style.display = 'none';
      }
      item.style.display = 'block';
    });
  }
  loadMoreButton.classList.remove('menu__button-refresh_visible');
};
loadMoreButton.addEventListener('click', loadMoreProducts);

const updateLoadMoreButtonVisibility = () => {
  const loadMoreButton = document.querySelector('.menu__button-refresh');
  const screenWidth = window.innerWidth;
  if (screenWidth <= 768 && (coffeeTab.classList.contains('menu__tab-button_type_active') || dessertsTab.classList.contains('menu__tab-button_type_active'))) {
    loadMoreButton.classList.add('menu__button-refresh_visible');
  } else {
    loadMoreButton.classList.remove('menu__button-refresh_visible');
  }
};

window.addEventListener('resize', updateLoadMoreButtonVisibility);



