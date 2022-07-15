// ПЕРЕМЕННЫЕ:
// Шесть карточек «из коробки»
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
// Объект с настройками для валидации
const validationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__container-input",
  submitButtonSelector: ".popup__container-submit",
  inactiveButtonClass: "popup__container-submit_disabled",
  inputErrorClass: "popup__container-input_invalid",
  errorClass: "popup__container-input-error_visible",
};

const selectors = {
  imagePopupSelector: "#image_popup",
  cardPopupSelector: "#add_card_popup",
  profilePopupSelector: "#edit_profile_popup",
  cardsContainerSelector: ".places",
  userNameSelector: ".profile__title",
  userInfoSelector: ".profile__subtitle",
};

// Profile-popup
const profilePopup = document.querySelector("#edit_profile_popup"); // Модальное окно Profile-popup
const profileFormElement = document.querySelector("#edit_profile_form"); // Форма добавления данных профиля
const profileButton = document.querySelector(".profile__edit-button"); // Кнопка открытия Profile-popup
const nameInput = profilePopup.querySelector("#profile-name"); // Поле ввода имени
const jobInput = profilePopup.querySelector("#profile-job"); // Поле ввода профессии

// Card-popup
const cardFormElement = document.querySelector("#add_card_form"); // Форма добавления карточки
const cardButton = document.querySelector(".profile__add-button"); // Кнопка открытия Card-popup

export {
  initialCards,
  validationConfig,
  selectors,
  profileFormElement,
  profileButton,
  nameInput,
  jobInput,
  cardFormElement,
  cardButton,
};
