// IMPORTED MODULES:
import "./index.css";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationConfig,
  selectors,
  profileFormElement,
  profileButton,
  nameInput,
  jobInput,
  cardFormElement,
  cardButton,
} from "../utils/constants.js";

// CLASSES:
// Information about user
const userInfo = new UserInfo({
  userName: selectors.userNameSelector,
  userInfo: selectors.userInfoSelector,
});

// Profile-form popup
const profilePopup = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      userInfo.setUserInfo(data);
      profilePopup.close();
    },
  },
  selectors.profilePopupSelector
);
profilePopup.setEventListeners();

// Card-form popup
const cardPopup = new PopupWithForm(
  {
    handleFormSubmit: (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: (data) => {
            imagePopup.open(data);
          },
        },
        selectors.cardSelector
      );
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
      cardPopup.close();
    },
  },
  selectors.cardPopupSelector
);
cardPopup.setEventListeners();

// Popup with picture
const imagePopup = new PopupWithImage(selectors.imagePopupSelector);
imagePopup.setEventListeners();

// Initial cards activation
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        {
          data: item,
          handleCardClick: (data) => {
            imagePopup.open(data);
          },
        },
        selectors.cardSelector
      );
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    },
  },
  selectors.cardsContainerSelector
);
cardList.renderItems();

// FORMS VALIDATORS ACTIVATION:
// Profile-form validator activation
const profileFormValidator = new FormValidator(
  validationConfig,
  profileFormElement
);
profileFormValidator.enableValidation();

// Card-form validator activation
const cardFormValidator = new FormValidator(validationConfig, cardFormElement);
cardFormValidator.enableValidation();

// EVENT LISTENERS:
// Profile-popup button click handler
profileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  jobInput.value = userData.info;

  profileFormValidator.clearErrors();
  profileFormValidator.enableButton();
  profilePopup.open();
});

// Card-popup button click handler
cardButton.addEventListener("click", () => {
  cardFormValidator.disableButton();
  cardFormValidator.clearErrors();
  cardFormElement.reset();
  cardPopup.open();
});
