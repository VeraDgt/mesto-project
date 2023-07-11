const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const button = formElement.querySelector(config.submitButtonSelector);
      const item = formElement.querySelector(config.inputSelector);
      if (item) {
        setSubmitButtonState(false, button, config);
      }
    });
    setEventListeners(formElement, config);
  });
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const isValid = (formElement, inputElement, config) => {
  if (inputElement.validity.patternMismatch) {
inputElement.setCustomValidity(inputElement.dataset.errorMessage);
} else {
inputElement.setCustomValidity("");
} if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  };
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}; 

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
        buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  };
}; 

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = ''; 
  errorElement.classList.remove(config.errorClass);
  inputElement.classList.remove(config.inputErrorClass);
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
  inputElement.classList.add(config.inputErrorClass);
};

function setSubmitButtonState(isValid, submitButton, config) {
  if (isValid) {
    submitButton.disabled = false;
    submitButton.classList.remove(config.inactiveButtonClass); 
    } else {
    submitButton.disabled = true;
    submitButton.classList.add(config.inactiveButtonClass); 
  };
};

export { enableValidation };