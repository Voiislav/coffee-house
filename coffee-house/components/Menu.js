export default class Menu {
  constructor(data, templateSelector) {
    this._data = data;
    this._name = data.name;
    this._description = data.description;
    this._price = data.price;
    this._image = data.image;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const menuItem = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.menu__item')
      .cloneNode(true);
    return menuItem;
  }

  _createItem() {
    this._item = this._getTemplate();
    this._item.querySelector('.menu__name').textContent = this._name;
    this._item.querySelector('.menu__description').textContent = this._description;
    this._item.querySelector('.menu__price').textContent = `$${this._price}`;
    this._item.querySelector('.menu__image').src = this._image;
    this._item.querySelector('.menu__image').alt = `Image of ${this._name}`;

    return this._item;
  }

  static createMenuItem(data, templateSelector) { 
    const menu = new Menu(data, templateSelector); 
    const menuItem = menu._createItem(); 
    return menuItem;
  }
}

