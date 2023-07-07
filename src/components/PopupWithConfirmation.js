import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.form');
  }

  submitCallback(deleteCard) {
    this._handleSubmit = deleteCard;
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._handleSubmit();
    })
  }
  
  renderLoading(request, loadingText='Сохранение...') {
    if (request) {
    this._submitButton.textContent = loadingText;
    } else {
    this._submitButton.textContent = this._submitButtonText;
    }
  }
}