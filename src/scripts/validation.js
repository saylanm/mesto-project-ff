function showInputError (config, formElement, inputElement, errorMessage) { // появляение ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = errorMessage;
}

function hideInputError (config, formElement, inputElement) { // убираем ошибку делаем поле пустым
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = ""; 
}

function isValid (config, formElement, inputElement) { // проверяем на валидность
  if(inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }
  if(!inputElement.validity.valid) {
    showInputError(config, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(config, formElement, inputElement);
  }
}

function setEventListeners (config, formElement) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((item) => { // добавляем оработчик 
    item.addEventListener('input', () => {
      isValid(config, formElement, item);
      toggleButtonState(config, inputList, buttonElement);
    })
  })
}

function hasInvalidInput (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState (config, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

function enableValidation (config, forms) {
  forms.forEach((item) => {
    setEventListeners(config, item);
  })
}

function clearValidation (config, inputList, buttonElement, form) {
  inputList.forEach((item) => {
    hideInputError(config, form, item);
    item.value = "";
  });
  toggleButtonState(config, inputList, buttonElement);
}

export {enableValidation, clearValidation}