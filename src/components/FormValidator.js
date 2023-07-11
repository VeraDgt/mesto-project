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
    const inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
    const buttonElement = this.formElement.querySelector(this.config.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  
  isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }
  
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this.config.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this.config.inactiveButtonClass);
    }
  }
  
 
  _setSubmitButtonState(isValid, submitButton) {
    if (isValid) {
      submitButton.disabled = false;
      submitButton.classList.remove(this.config.inactiveButtonClass);
    } else {
      submitButton.disabled = true;
      submitButton.classList.add(this.config.inactiveButtonClass);
    }
  }
  
  enableValidation() {
    this.formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  };
}