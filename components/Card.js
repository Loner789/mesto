export default class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this.isLiked = false;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".place")
      .cloneNode(true);

    return cardElement;
  }

  _switchLike() {
    this.isLiked = !this.isLiked;
    this._likeButton.classList.toggle("place__like-button_active");
  }

  _deleteCard() {
    this._element.remove();
  }

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
      this._handleCardClick(this._data);
    });
  }

  createCard() {
    this._element = this._getTemplate();
    this._cardCaption = this._element.querySelector(".place__caption-title");
    this._cardImage = this._element.querySelector(".place__image");

    this._cardCaption.textContent = this._data.name;
    this._cardImage.alt = `Фото ${this._data.name}.`;
    this._cardImage.src = this._data.link;

    this._setEventListeners();

    return this._element;
  }
}
