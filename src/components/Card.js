export default class Card {
  constructor(
    { data, handleCardClick, handleDeletion, setLike, removeLike, userId },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._likes = data.likes;

    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeletion = handleDeletion;
    this._addLike = setLike;
    this._removeLike = removeLike;
    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".place")
      .cloneNode(true);

    return cardElement;
  }

  switchLike() {
    this._likeButton.classList.toggle("place__like-button_active");
  }

  deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".place__like-button");
    this._deleteButton = this._element.querySelector(".place__delete-button");

    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeletion();
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });
  }

  _hideDeleteButton() {
    if (!(this._ownerId === this._userId)) {
      this._deleteButton.style.display = "none";
    }
  }

  _handleLikeButton() {
    if (!this._likeButton.classList.contains("place__like-button_active")) {
      this._addLike();
    } else {
      this._removeLike();
    }
  }

  setLikesCount(item) {
    this._element.querySelector(".place__likes-counter").textContent =
      item;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardCaption = this._element.querySelector(".place__caption-title");
    this._cardImage = this._element.querySelector(".place__image");

    this._cardCaption.textContent = this._name;
    this._cardImage.alt = `Фото ${this._name}.`;
    this._cardImage.src = this._link;

    this._setEventListeners();

    if (
      this._likes.find((item) => {
        return this._userId === item._id;
      })
    ) {
      this.switchLike();
    }
    this.setLikesCount(this._likes.length);
    this._hideDeleteButton();

    return this._element;
  }
}
