import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__button');
    this._submitButtonText = this._submitButton.textContent;
    this._submitForm = this._submitForm.bind(this);
  }

  open(cardId) {
    this._id = cardId;
    super.open();
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._id);
  }

  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._submitForm);
  }
  
  renderLoading(request, loadingText='Сохранение...') {
    if (request) {
    this._submitButton.textContent = loadingText;
    } else {
    this._submitButton.textContent = this._submitButtonText;
    }
  }
}