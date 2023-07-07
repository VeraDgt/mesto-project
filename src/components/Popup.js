export default class Popup{
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__toggle');
    this._closeByEsc = this._handleEscClose.bind(this);
    this._clickOnOverlayHandler = this._clickOnOverlayHandler.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this._removeEventListeners();
  }

    _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _clickOnOverlayHandler(evt) {
    evt.stopImmediatePropagation();
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__toggle')) {
    this.close();
    }
  }

  _clickOnCloseButtonHandler() { 
      this.close();
  }

  _setEventListeners() {
    document.addEventListener('keydown', this._closeByEsc);
    document.addEventListener('click', this._clickOnOverlayHandler);
  }

  _removeEventListeners() {
    document.removeEventListener('keydown', this._closeByEsc);
    document.removeEventListener('click', this._clickOnOverlayHandler);
  }
}
