//ИМПОРТИРОВАННЫЕ МОДУЛИ:
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

import {
  selectors,
  initialCards,
  validationConfig,
  profileFormElement,
  profileButton,
  nameInput,
  jobInput,
  cardFormElement,
  cardButton,
} from "../utils/constants.js";

// Подключение валидации форм
const profileFormValidator = new FormValidator(
  validationConfig,
  profileFormElement
); // Валидация формы профиля
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, cardFormElement); // Валидация формы создания карточки
cardFormValidator.enableValidation();

const imagePopup = new PopupWithImage(selectors.imagePopupSelector);
imagePopup.setEventListeners();

const userInfo = new UserInfo({
  userName: selectors.userNameSelector,
  userInfo: selectors.userInfoSelector,
});

const profilePopup = new PopupWithForm(selectors.profilePopupSelector, {
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
    profilePopup.close();
  },
});
profilePopup.setEventListeners();

const cardPopup = new PopupWithForm(selectors.cardPopupSelector, {
  handleFormSubmit: (data) => {
    const card = new Card(data, ".card-template", handleCardClick);
    const cardElement = card.createCard();
    cardList.addItem(cardElement);
    cardPopup.close();
  },
});
cardPopup.setEventListeners();

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".card-template", handleCardClick);
      const cardElement = card.createCard();
      cardList.addItem(cardElement);
    },
  },
  selectors.cardsContainerSelector
);
cardList.renderItems();

// ФУНКЦИИ:
// Параметры попапа картинки
function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

// СЛУШАТЕЛИ СОБЫТИЙ:
// Кнопка открытия Profile-popup
profileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  jobInput.value = userData.info;

  profileFormValidator.clearErrors();
  profileFormValidator.enableButton();
  profilePopup.open();
});

// Кнопка открытия Card-popup
cardButton.addEventListener("click", () => {
  cardFormValidator.disableButton();
  cardFormValidator.clearErrors();
  cardFormElement.reset();
  cardPopup.open();
});
