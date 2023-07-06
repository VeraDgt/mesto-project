import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__item');
    this._submitButton = this._form.querySelector('.form__button');
    this._submitButtonText = this._submitButton.textContent;
  }

  _getValues()  {
    this._values = {};
    this._inputList.forEach((item) => {
      this._values[item.name] = item.value;
    });
    return this._values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getValues());
    });
  }

close() {
  super.close();
  this._form.reset();
}

renderLoading(request, loadingText='Сохранение...') {
    if (request) {
    this._submitButton.textContent = loadingText;
    } else {
    this._submitButton.textContent = this._submitButtonText;
    }
  }
}