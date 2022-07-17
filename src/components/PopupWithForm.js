import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ handleFormSubmit }, popupSelector) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".popup__container");
    this._formInputs = this._form.querySelectorAll(".popup__container-input");
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

  close() {
    super.close();
    this._form.reset();
  }
}
