// Показ ошибки ввода
function showInputError(formElement, inputElement, errorMessage, arr) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(arr["inputErrorClass"]);
  errorElement.classList.add(arr["errorClass"]);
  errorElement.textContent = errorMessage;
}

// Скрытие ошибки ввода
function hideInputError(formElement, inputElement, arr) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.remove(arr["inputErrorClass"]);
  errorElement.classList.remove(arr["errorClass"]);
  errorElement.textContent = "";
}

// Активация кнопки
export function enableButton(buttonElement, arr) {
  buttonElement.classList.remove(arr["inactiveButtonClass"]);
  buttonElement.disabled = false;
}

// Деактивация кнопки
export function disableButton(buttonElement, arr) {
  buttonElement.classList.add(arr["inactiveButtonClass"]);
  buttonElement.disabled = true;
}

// Очистка ошибок
 export function clearErrors(formElement, arr) {
   const inputsList = Array.from(formElement.querySelectorAll(arr["inputSelector"]));

   inputsList.forEach((inputElement) => hideInputError(formElement, inputElement, arr));
 }

// Добавление обработчиков всем формам
export function enableValidation(arr) {
  const formsList = Array.from(document.querySelectorAll(arr["formSelector"]));

  formsList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });

  // Проверка валидности введённых данных
  function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, arr);
    } else {
      hideInputError(formElement, inputElement, arr);
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
      disableButton(buttonElement, arr);
    } else {
      enableButton(buttonElement, arr);
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

    inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputsList, buttonElement);
      });
    });
  }
}