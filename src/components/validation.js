//Добавляем класс с ошибкой


function showInputError(
  formElement,
  inputElement,
  errorMessage,
  validationSettings
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.classList.add(validationSettings.errorClass);
  errorElement.textContent = errorMessage;
}
console.log(showInputError);
//удаляем класс с ошибкой
function hideInputError(formElement, inputElement, validationSettings) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorClass);
}

//Проверка валидности
function checkInputValidity(formElement, inputElement, validationSettings) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationSettings
    );
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
}

function setEventListeners(formElement, validationSettings) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationSettings.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement, validationSettings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationSettings);
      toggleButtonState(inputList, buttonElement, validationSettings);
    });
  });
}
// Включаем валидацию
function enableValidation(validationSettings) {
  const formList = Array.from(
    document.querySelectorAll(validationSettings.formSelector)
  );
  formList.forEach(function (formElement) {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationSettings);
  });
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Проверка состояния кнопки
function toggleButtonState(inputList, buttonElement, validationSettings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  }
}
//очистка ошибок

function clearValidation(formElement, validationSettings) {
  const inputListError = Array.from(
    formElement.querySelectorAll(validationSettings.inputSelector)
  );
  inputListError.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationSettings);
  });
  const buttonSubmit = formElement.querySelector(
    validationSettings.submitButtonSelector
  );
  toggleButtonState(inputListError, buttonSubmit, validationSettings);
}

export { enableValidation, clearValidation };
