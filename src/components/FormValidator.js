export class FormValidator {
  constructor(config) {
    this.config = config;
    this.formList = Array.from(document.querySelectorAll(config.formSelector));
  }
  
  enableValidation() {
    this.formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const button = formElement.querySelector(this.config.submitButtonSelector);
        const item = formElement.querySelector(this.config.inputSelector);
        if (item) {
          this.setSubmitButtonState(false, button);
        }
      });
      this._setEventListeners(formElement);
    });
  }
  
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this.config.inputSelector));
    const buttonElement = formElement.querySelector(this.config.submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }
  
  isValid(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
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
  
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(this.config.errorClass);
    inputElement.classList.remove(this.config.inputErrorClass);
  }
  
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.config.errorClass);
    inputElement.classList.add(this.config.inputErrorClass);
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
}