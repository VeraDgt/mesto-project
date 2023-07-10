<<<<<<< HEAD
const checkInputValidity = (formElement, inputElement, settings) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};

const toggleButtonState = (inputList, buttonElement, settings) => {
      if (hasInvalidInput(inputList)) {
          buttonElement.disabled = true;
        buttonElement.classList.add(settings.inactiveButtonClass);
      } else {
          buttonElement.disabled = false;
        buttonElement.classList.remove(settings.inactiveButtonClass);
      }
}; 

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

export const enableValidation = (settings) => {
const formList = Array.from(document.querySelectorAll(settings.formSelector));
formList.forEach((formElement) => {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
setEventListeners(formElement, settings);
  });
};

=======
const checkInputValidity = (formElement, inputElement, settings) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity("");
  }
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}

const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = '';
};

const toggleButtonState = (inputList, buttonElement, settings) => {
      if (hasInvalidInput(inputList)) {
          buttonElement.disabled = true;
        buttonElement.classList.add(settings.inactiveButtonClass);
      } else {
          buttonElement.disabled = false;
        buttonElement.classList.remove(settings.inactiveButtonClass);
      }
}; 

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

export const enableValidation = (settings) => {
const formList = Array.from(document.querySelectorAll(settings.formSelector));
formList.forEach((formElement) => {
  formElement.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
setEventListeners(formElement, settings);
  });
};

>>>>>>> ec96ab76313548ecd343d19aad1c8351db6239c7
