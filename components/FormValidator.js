export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._inputsList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  // Показ ошибки ввода
  _showInputError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.classList.add(this._errorClass);
    this._errorElement.textContent = inputElement.validationMessage;
  }

  // Скрытие ошибки ввода
  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = "";
  }

  // Очистка ошибок
  clearErrors() {
    this._inputsList.forEach((inputElement) => {
      this._errorElement = this._formElement.querySelector(
        `.${inputElement.id}-error`
      );
      this._hideInputError(inputElement);
    });
  }

  // Проверка валидности введённых данных
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Проверка валидности всех полей формы
  _checkInvalidInputs() {
    return this._inputsList.some(
      (inputElement) => !inputElement.validity.valid
    );
  }

  // Активация кнопки
  enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }

  // Деактивация кнопки
  disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }

  // Переключатель состояния кнопки отправки формы
  _toggleButtonState() {
    if (this._checkInvalidInputs()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  // Добавление обработчиков
  _setEventListeners() {
    this._toggleButtonState();

    this._inputsList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._errorElement = this._formElement.querySelector(
          `.${inputElement.id}-error`
        );
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  // Подключение валидации
  enableValidation() {
    this._setEventListeners();
  }
}
