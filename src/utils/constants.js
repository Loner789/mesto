// Array with cards "from box" data
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
// Array with data for forms validation
const validationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__container-input",
  submitButtonSelector: ".popup__container-submit",
  inactiveButtonClass: "popup__container-submit_disabled",
  inputErrorClass: "popup__container-input_invalid",
  errorClass: "popup__container-input-error_visible",
};
// Selectors
const selectors = {
  imagePopupSelector: "#image_popup",
  cardPopupSelector: "#add_card_popup",
  profilePopupSelector: "#edit_profile_popup",
  avatarPopupSelector: "#edit_avatar_popup",
  cardDeletionPopupSelector: "#card_deletion_popup",
  userNameSelector: ".profile__title",
  userInfoSelector: ".profile__subtitle",
  userAvatarSelector: ".profile__avatar",
  cardsContainerSelector: ".places",
  cardSelector: ".card-template",
};

// Profile-popup
const profilePopup = document.querySelector("#edit_profile_popup");
const profileFormElement = document.querySelector("#edit_profile_form");
const profileButton = document.querySelector(".profile__edit-button");
const nameInput = profilePopup.querySelector("#profile-name");
const jobInput = profilePopup.querySelector("#profile-job");

// Card-popup
const cardFormElement = document.querySelector("#add_card_form");
const cardButton = document.querySelector(".profile__add-button");

//Avatar-popup
const avatarFormElement = document.querySelector("#edit_avatar_form");
const avatarButton = document.querySelector(".profile__img-wrapper");

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
  avatarFormElement,
  avatarButton,
};
