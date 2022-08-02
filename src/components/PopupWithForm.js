import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__container");
    this._formInputs = this._form.querySelectorAll(".popup__container-input");
    this._submitButton = this._form.querySelector(".popup__container-submit");
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    this._inputsValues = {};

    this._formInputs.forEach((inputElement) => {
      this._inputsValues[inputElement.name] = inputElement.value;
    });

    return this._inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues());
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Сохранение...";
    } else {
      this.close();
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  close() {
    super.close();
    this._form.reset();
  }
}
