// Добавление обработчиков всем формам
export function enableValidation(arr) {
  const formsList = Array.from(document.querySelectorAll(arr["formSelector"]));

  formsList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });

  // Показ ошибки ввода
  function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(arr["inputErrorClass"]);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(arr["errorClass"]);
  }

  // Скрытие ошибки ввода
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(arr["inputErrorClass"]);
    errorElement.classList.remove(arr["errorClass"]);
    errorElement.textContent = "";
  }

  // Проверка валидности введённых данных
  function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }

  // Проверка валидности всех полей формы
  function checkInvalidInputs(inputsList) {
    return inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  // Переключатель состояния кнопки отправки формы
  function toggleButtonState(inputsList, buttonElement) {
    if (checkInvalidInputs(inputsList)) {
      buttonElement.classList.add(arr["inactiveButtonClass"]);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(arr["inactiveButtonClass"]);
      buttonElement.disabled = false;
    }
  }

  // Добавление обработчиков всем полям формы
  function setEventListeners(formElement) {
    const inputsList = Array.from(
      formElement.querySelectorAll(arr["inputSelector"])
    );
    const buttonElement = formElement.querySelector(
      arr["submitButtonSelector"]
    );

    toggleButtonState(inputsList, buttonElement);

    inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputsList, buttonElement);
      });
    });
  }
}