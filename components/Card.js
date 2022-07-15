// Класс карточки
export default class Card {
  // Начальная инициализация
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._likeButton.classList.toggle("place__like-button_active");
  }

  // Удаление карточки
  _deleteCard() {
    this._element.remove();
  }

  // Установка слушателей
  _setEventListeners() {
    this._likeButton = this._element.querySelector(".place__like-button");
    this._deleteButton = this._element.querySelector(".place__delete-button");

    this._likeButton.addEventListener("click", () => {
      this._switchLike();
    });

    this._deleteButton.addEventListener("click", () => {
      this._deleteCard();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // Создание новой карточки
  createCard() {
    this._element = this._getTemplate();
    this._cardCaption = this._element.querySelector(".place__caption-title");
    this._cardImage = this._element.querySelector(".place__image");

    this._cardCaption.textContent = this._name;
    this._cardImage.alt = `Фото ${this._name}.`;
    this._cardImage.src = this._link;

    this._setEventListeners();

    return this._element;
  }
}
