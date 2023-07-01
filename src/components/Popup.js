export default class Popup{
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__toggle');
    this._closeByEsc = this._escHandler.bind(this);
    this._clickOnOverlayHandler = this._clickOnOverlayHandler.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', _closeByEsc);
    document.addEventListener('click', _clickOnOverlayHandler);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', _closeByEsc);
    document.removeEventListener('click', _clickOnOverlayHandler);
  }

  _closeByEsc(evt) {
    if (evt.key == 'Escape') {
      this.close();
    }
  }

  _clickOnOverlayHandler(evt) {
    evt.stopImmediatePropagation();
    if (evt.target.classList.contains('popup_opened')) {
    this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => {
      this.close();
    });
  }
}