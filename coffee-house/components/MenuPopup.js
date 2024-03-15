export default class MenuPopup {
  constructor(popup) {
    this._popup = popup;
    this._closeButton = this._popup.querySelector('.popup__close');
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._popupTitle = this._popup.querySelector('.popup__title');
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupDescription = this._popup.querySelector('.popup__description');
    this._popupPrice = this._popup.querySelector('.popup__price');
    this._smallSizeButton = this._popup.querySelector('#small-size');
    this._mediumSizeButton = this._popup.querySelector('#medium-size');
    this._largeSizeButton = this._popup.querySelector('#large-size');
    this._smallSizeButtonText = this._popup.querySelector('#small-size-text');
    this._mediumSizeButtonText = this._popup.querySelector('#medium-size-text');
    this._largeSizeButtonText = this._popup.querySelector('#large-size-text');
    this._additiveOneButton = this._popup.querySelector('#additive-1');
    this._additiveTwoButton = this._popup.querySelector('#additive-2');
    this._additiveThreeButton = this._popup.querySelector('#additive-3');
    this._additiveOneButtonText = this._popup.querySelector('#additive-1-text');
    this._additiveTwoButtonText = this._popup.querySelector('#additive-2-text');
    this._additiveThreeButtonText = this._popup.querySelector('#additive-3-text');
    this._selectedSize = null;
    this._sizes = null;
    this._basePrice = null;
    this._selectedAdditives = [];
    this._additivePrice = 0.50;
  }

  open(name, image, description, price, sizes, additives) {
    this._sizes = sizes;
    this._selectedSize = 's';
    this._basePrice = parseFloat(price);
    this._updatePrice();
    this._popup.classList.add('popup_opened');
    this._popupTitle.textContent = name;
    this._popupImage.src = image;
    this._popupImage.alt = `Image of ${name}`;
    this._popupDescription.textContent = description;
    this._popupPrice.textContent = `$${price}`;
    this._smallSizeButtonText.textContent = sizes['s']['size'];
    this._mediumSizeButtonText.textContent = sizes['m']['size'];
    this._largeSizeButtonText.textContent = sizes['l']['size'];
    this._additiveOneButtonText.textContent = additives[0].name;
    this._additiveTwoButtonText.textContent = additives[1].name;
    this._additiveThreeButtonText.textContent = additives[2].name;
    document.querySelector('.page').classList.add('page_type_scroll-off');
    this._smallSizeButton.classList.add('popup__set-option_type_active');
    this._mediumSizeButton.classList.remove('popup__set-option_type_active');
    this._largeSizeButton.classList.remove('popup__set-option_type_active');
    this._additiveOneButton.classList.remove('popup__set-option_type_active');
    this._additiveTwoButton.classList.remove('popup__set-option_type_active');
    this._additiveThreeButton.classList.remove('popup__set-option_type_active');
  }

  _close() {
    this._removeEventListeners();
    this._selectedAdditives = [];
    this._popup.classList.remove('popup_opened');
    document.querySelector('.page').classList.remove('page_type_scroll-off');
  }

  _removeEventListeners() {
    this._smallSizeButton.removeEventListener('click', this._handleSizeClick);
    this._mediumSizeButton.removeEventListener('click', this._handleSizeClick);
    this._largeSizeButton.removeEventListener('click', this._handleSizeClick);
    this._closeButton.removeEventListener('click', this._close);
  }

  _handleSizeClick(size) {
    this._selectedSize = size;
    this._updatePrice();
    this._updateSizeButtons();
  }

  _handleAdditiveClick(additiveId) {
    const index = this._selectedAdditives.indexOf(additiveId);
    if (index === -1) {
      this._selectedAdditives.push(additiveId);
    } else {
      this._selectedAdditives.splice(index, 1);
    }
    this._updateAdditives();
  }

  _updateSizeButtons() {
    if (this._selectedSize === 's') {
      this._smallSizeButton.classList.add('popup__set-option_type_active');
      this._mediumSizeButton.classList.remove('popup__set-option_type_active');
      this._largeSizeButton.classList.remove('popup__set-option_type_active');
    } else if (this._selectedSize === 'm') {
      this._mediumSizeButton.classList.add('popup__set-option_type_active');
      this._smallSizeButton.classList.remove('popup__set-option_type_active');
      this._largeSizeButton.classList.remove('popup__set-option_type_active');
    } else if (this._selectedSize === 'l') {
      this._largeSizeButton.classList.add('popup__set-option_type_active');
      this._smallSizeButton.classList.remove('popup__set-option_type_active');
      this._mediumSizeButton.classList.remove('popup__set-option_type_active');
    }
  }

  _updateAdditiveButtons(additives) {
    additives.forEach((additive, index) => {
      const addButton = this._popup.querySelector(`#additive-${index + 1}`);
      const addButtonText = this._popup.querySelector(`#additive-${index + 1}-text`);
      addButtonText.textContent = additive.name;
      addButton.addEventListener('click', () => this._handleAdditiveClick(index));
    });
  }

  _updateAdditiveButtonsStyles() {
    this._additiveOneButton.classList.remove('popup__set-option_type_active');
    this._additiveTwoButton.classList.remove('popup__set-option_type_active');
    this._additiveThreeButton.classList.remove('popup__set-option_type_active');

    this._selectedAdditives.forEach(index => {
      const addButton = this._popup.querySelector(`#additive-${index + 1}`);
      addButton.classList.add('popup__set-option_type_active');
    });
  }

  _updatePrice() {
    const additiveCount = this._selectedAdditives.length;
    const additivePrice = additiveCount * this._additivePrice;
    let sizeAddPrice = 0;
    if (this._selectedSize) {
      sizeAddPrice = parseFloat(this._sizes[this._selectedSize]['add-price']) || 0;
    }
    const totalFinalPrice = this._basePrice + sizeAddPrice + additivePrice;
    this._updateTotalPrice(totalFinalPrice);
    this._updateAdditiveButtonsStyles();
  }

  _updateAdditives() {
    this._updatePrice();
  }

  _updateTotalPrice(finalPrice) {
    this._popupPrice.textContent = `$${Number(finalPrice).toFixed(2)}`;
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) {
      this._close();
    }
  }

  setEventListeners() {
    this._smallSizeButton.addEventListener('click', () => this._handleSizeClick('s'));
    this._mediumSizeButton.addEventListener('click', () => this._handleSizeClick('m'));
    this._largeSizeButton.addEventListener('click', () => this._handleSizeClick('l'));
    this._additiveOneButton.addEventListener('click', () => this._handleAdditiveClick(0));
    this._additiveTwoButton.addEventListener('click', () => this._handleAdditiveClick(1));
    this._additiveThreeButton.addEventListener('click', () => this._handleAdditiveClick(2));
    this._closeButton.addEventListener('click', () => this._close());
    this._popup.addEventListener('click', this._handleOverlayClose);
  }
}








