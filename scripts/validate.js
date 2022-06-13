// Показ ошибки ввода
function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__container-input_invalid');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__container-input-error_visible');
}

// Скрытие ошибки ввода
function hideInputError (formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__container-input_invalid');
  errorElement.classList.remove('popup__container-input-error_visible');
  errorElement.textContent = '';
}

// Проверка валидности введённых данных
function checkInputValidity (formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// Проверка валидности всех полей формы
function checkInvalidInputs (inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Переключатель состояния кнопки отправки формы
function toggleButtonState (inputList, buttonElement) {
  if (checkInvalidInputs(inputList)) {
    buttonElement.classList.add('popup__container-submit_disabled');
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove('popup__container-submit_disabled');
    buttonElement.disabled = false;
  }
}

// Добавление обработчиков всем полям формы
function setEventListeners (formElement) {
  const inputList = Array.from(formElement.querySelectorAll('.popup__container-input'));
  const buttonElement = formElement.querySelector('.popup__container-submit');

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

// Добавление обработчиков всем формам
export function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    
    setEventListeners(formElement);
  });
}