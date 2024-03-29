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

// Api configuration
const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-47",
  headers: {
    authorization: "b01e7d69-f440-4376-9f8a-91f4cbf1fc4f",
    "Content-Type": "application/json",
  },
};

// Profile-popup variables
const profilePopup = document.querySelector("#edit_profile_popup");
const profileFormElement = document.querySelector("#edit_profile_form");
const profileButton = document.querySelector(".profile__edit-button");
const nameInput = profilePopup.querySelector("#profile-name");
const jobInput = profilePopup.querySelector("#profile-job");

// Card-popup variables
const cardFormElement = document.querySelector("#add_card_form");
const cardButton = document.querySelector(".profile__add-button");

// Avatar-popup variables
const avatarFormElement = document.querySelector("#edit_avatar_form");
const avatarButton = document.querySelector(".profile__img-wrapper");

export {
  apiConfig,
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
