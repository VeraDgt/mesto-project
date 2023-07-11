import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupCardName = this._popup.querySelector('.popup__image-caption');
  }

  open (name, link) {
    this._popupImage.src = link;
    this._popupCardName.textContent = name;
    this._popupImage.alt = `Вид на ${this._name}.`;
    super.open();
  }
}