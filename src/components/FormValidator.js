export const config = {
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_error',
  errorClass: 'form__error_active'
};

export class FormValidator {
  constructor(config, formElement) {
    this.config = config;
    this.formElement = formElement;
    this.inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
    this.buttonElement = this.formElement.querySelector(this.config.submitButtonSelector);
  }
  _showInputError(inputElement, errorMessage) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.errorClass);
    inputElement.classList.add(this.config.inputErrorClass);
  }
  _hideInputError(inputElement) {
    const errorElement = this.formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this.config.errorClass);
    inputElement.classList.remove(this.config.inputErrorClass);
  }
  
  _setEventListeners() {
    this._toggleButtonState(this.inputList, this.buttonElement);
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.isValid(inputElement);
        this._toggleButtonState(this.inputList, this.buttonElement);
      });
    });
  }
  
  _isValid(inputElement) {
    inputElement.validity.patternMismatch ? (inputElement.setCustomValidity(inputElement.dataset.errorMessage)) : ( inputElement.setCustomValidity(""));
    !inputElement.validity.valid ? (this._showInputError(inputElement, inputElement.validationMessage)) : (this._hideInputError(inputElement))
  }
  
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  _enableSubmitButton() {
    this.buttonElement.classList.remove(this.config.inactiveButtonClass),
    this.buttonElement.removeAttribute('disabled', true);
  }
  _disableSubmitButton() {
    this.buttonElement.classList.add(this.config.inactiveButtonClass);
    this.buttonElement.setAttribute('disabled', true);
  }
  _toggleButtonState(inputList, buttonElement) {
    this._hasInvalidInput(inputList) ? (this._disableSubmitButton(buttonElement)) : (this._enableSubmitButton(buttonElement))
  }
  enableValidation() {
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
  resetValidation(buttonElement) {
    this._inputList.forEach((inputElement) => {
        this._toggleButtonState(this._inputList, buttonElement);
        this._hideInputError(inputElement);
    });
  };
}
