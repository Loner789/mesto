// Класс карточки
export class Card {
  // Начальная инициализация
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this.isLiked = false;
  }

  // Создание разметки карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".place")
      .cloneNode(true);

    return cardElement;
  }

  // Переключатель кнопки "Like"
  _switchLike() {
    this.isLiked = !this.isLiked;
    this._element
      .querySelector(".place__like-button")
      .classList.toggle("place__like-button_active");
  }

  // Удаление карточки
  _deleteCard() {
    this._element.remove();
  }

  // Установка слушателей
  _setEventListeners() {
    this._element
      .querySelector(".place__like-button")
      .addEventListener("click", () => {
        this._switchLike();
      });

    this._element
      .querySelector(".place__delete-button")
      .addEventListener("click", () => {
        this._deleteCard();
      });

    this._element
      .querySelector(".place__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._name, this._link);
      });
  }

  // Создание новой карточки
  createCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".place__caption-title").textContent =
      this._name;
    this._element.querySelector(".place__image").alt = `Фото ${this._name}.`;
    this._element.querySelector(".place__image").src = this._link;

    this._setEventListeners();

    return this._element;
  }
}
