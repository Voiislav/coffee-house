export default class MobileMenu {
  constructor(mobileMenuSelector, openMenuButton, closeMenuButton, navLinks) {
    this._mobileMenuSelector = document.querySelector(mobileMenuSelector);
    this._openMenuButton = document.querySelector(openMenuButton);
    this._closeMenuButton = document.querySelector(closeMenuButton);
    this._closeIcon = this._closeMenuButton.querySelector('.header__close-icon');
    this._burgerIcon = this._openMenuButton.querySelector('.header__burger');
    this._navLinks = document.querySelectorAll(navLinks);
    this._open = this._open.bind(this);
    this._close = this._close.bind(this);
    this._returnToDefault = this._returnToDefault.bind(this);
    this._setEventListeners();
  }

  _open() {
    this._mobileMenuSelector.classList.add('mobile-menu-appear', 'mobile-menu_opened');
    this._closeIcon.classList.add('close-btn-appear');
    this._closeMenuButton.classList.add('header__button_type_close_active');
    this._burgerIcon.classList.add('burger-appear');
    this._openMenuButton.classList.add('header__button_inactive');
    document.querySelector('.page').classList.add('page_type_scroll-off');
  }

  _close() {
    this._closeMenuButton.classList.remove('header__button_type_close_active');
    this._closeIcon.classList.add('close-btn-hide');
    this._burgerIcon.classList.remove('burger-hide');
    this._openMenuButton.classList.remove('header__button_inactive');
    this._burgerIcon.classList.add('burger-appear');
    this._mobileMenuSelector.classList.add('mobile-menu-hide');
    this._mobileMenuSelector.addEventListener('animationend', this._returnToDefault, { once: true });
    document.querySelector('.page').classList.remove('page_type_scroll-off');
  }

  _returnToDefault() {
    this._mobileMenuSelector.classList.remove('mobile-menu-appear', 'mobile-menu-hide', 'mobile-menu_opened');
    this._closeIcon.classList.remove('close-btn-hide');
    this._burgerIcon.classList.remove('burger-appear');
  }

  _setEventListeners() {
    this._openMenuButton.addEventListener('click', this._open);
    this._closeMenuButton.addEventListener('click', this._close);
    this._navLinks.forEach(navLink => {
      navLink.addEventListener('click', this._close);
    });
  }
}





