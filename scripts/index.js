//ИМПОРТИРОВАННЫЕ МОДУЛИ:
// Класс валидатора
import { FormValidator } from "./FormValidator.js";
// Класс карточек
import { Card } from "./Card.js";
// Массив карточек "из коробки"
import { initialCards } from "./cards.js";

// ПЕРЕМЕННЫЕ:
// Общие
const popupsList = document.querySelectorAll(".popup"); // Псевдомассив с модальными окнами
const validationConfig = {
  formSelector: ".popup__container",
  inputSelector: ".popup__container-input",
  submitButtonSelector: ".popup__container-submit",
  inactiveButtonClass: "popup__container-submit_disabled",
  inputErrorClass: "popup__container-input_invalid",
  errorClass: "popup__container-input-error_visible",
}; // Объект с настройками для валидации

// Profile-popup
const profilePopup = document.querySelector("#edit_profile_popup"); // Модальное окно Profile-popup
const profileFormElement = document.querySelector("#edit_profile_form"); // Форма добавления данных профиля
const profileButton = document.querySelector(".profile__edit-button"); // Кнопка открытия Profile-popup
const profileFormDiscardButton = document.querySelector("#profile-form-reset-button"); // Кнопка закрытия Profile-popup
const nameInput = profilePopup.querySelector("#profile-name"); // Поле ввода имени
const jobInput = profilePopup.querySelector("#profile-job"); // Поле ввода профессии
const profileName = document.querySelector(".profile__title"); // Имя профиля
const profileJob = document.querySelector(".profile__subtitle"); // Профессия в профиле

// Card-popup
const cardPopup = document.querySelector("#add_card_popup"); // Модальное окно Card-popup
const cardFormElement = document.querySelector("#add_card_form"); // Форма добавления карточки
const cardButton = document.querySelector(".profile__add-button"); // Кнопка открытия Card-popup
const cardFormDiscardButton = document.querySelector("#card-form-reset-button"); // Кнопка закрытия Card-popup
const cardName = cardPopup.querySelector("#card-name"); // Заголовок карточки
const cardLink = cardPopup.querySelector("#card-link"); // Ссылка на картинку карточки
const cardsContainer = document.querySelector(".places"); // Контейнер с карточками

// Image-popup
const imagePopup = document.querySelector("#image_popup"); // Модальное окно Image-popup
const imagePopupDiscardButton = document.querySelector("#image-popup-discard-button"); // Кнопка закрытия Image-popup

// Подключение валидации форм
const profileFormValidator = new FormValidator(validationConfig, profileFormElement); // Валидация формы профиля
profileFormValidator.enableValidation();
const cardFormValidator = new FormValidator(validationConfig, cardFormElement); // Валидация формы создания карточки
cardFormValidator.enableValidation();

// ФУНКЦИИ:
// Открытие popup
function openPopup(item) {
  item.classList.add("popup_opened");

  document.addEventListener("keydown", closePopupByEsc); // Cлушатель нажатия на "Esc"
  document.addEventListener("click", closePopupByClickOnOverlay); // Слушатель клика на оверлей
}

// Закрытие popup
function closePopup(item) {
  item.classList.remove("popup_opened");

  document.removeEventListener("keydown", closePopupByEsc); // Снятие слушателя нажатия на "Esc"
  document.removeEventListener("click", closePopupByClickOnOverlay); // Снятие слушателя клика на оверлей
}

// Закрытие попапа кликом на оверлей
function closePopupByClickOnOverlay(evt) {
  if (evt.target.classList.contains("popup_opened")) {
    closePopup(evt.target);
  }
}

// Закрытие попапа нажатием на "Esc"
function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    popupsList.forEach(function (popupElement) {
      if (popupElement.classList.contains("popup_opened")) {
        closePopup(popupElement);
      }
    });
  }
}

// Размещение новой карточки
function renderCard(item) {
  cardsContainer.prepend(item);
}

// Сброс формы
function resetForm(formElement) {
  formElement.querySelector(".popup__container").reset();
}

// Параметры попапа картинки
function handleImageClick(name, link) {
  const popupImage = document.querySelector(".popup__image"); // Картинка Image-popup
  const popupCaption = document.querySelector(".popup__image-caption"); // Подпись Image-popup

  popupImage.src = link;
  popupImage.alt = `Фото ${name}.`;
  popupCaption.textContent = name;

  openPopup(imagePopup);
}

// Добавление карточек "из коробки" в DOM
initialCards.forEach((data) => {
  const card = new Card(data, ".card-template", handleImageClick);
  const cardElement = card.createCard();

  renderCard(cardElement);
});

// Поведение кнопки подтверждения Profile-popup
function submitProfileForm(evt) {
  evt.preventDefault(); // Отменяет стандартную отправку формы

  profileName.textContent = nameInput.value; // Вставляем новое значение имени
  profileJob.textContent = jobInput.value; // Вставляем новое значение профессии

  closePopup(profilePopup);
}

// Поведение кнопки подтверждения Card-popup
function submitCardForm(evt) {
  evt.preventDefault();

  const data = {};
  data.name = cardName.value;
  data.link = cardLink.value;

  const card = new Card(data, ".card-template", handleImageClick);
  const cardElement = card.createCard();

  renderCard(cardElement);
  closePopup(cardPopup);
}

// СЛУШАТЕЛИ СОБЫТИЙ:
// Кнопка открытия Profile-popup
profileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  profileFormValidator.clearErrors();
  profileFormValidator.enableButton();
  openPopup(profilePopup);
});

// Кнопка открытия Card-popup
cardButton.addEventListener("click", () => {
  cardFormValidator.disableButton();
  cardFormValidator.clearErrors();
  resetForm(cardPopup);
  openPopup(cardPopup);
});

// Кнопка подтверждения Profile-popup
profilePopup.addEventListener("submit", submitProfileForm);

// Кнопка подтверждения Card-popup
cardPopup.addEventListener("submit", submitCardForm);

// Кнопка закрытия Profile-popup
profileFormDiscardButton.addEventListener("click", () =>
  closePopup(profilePopup)
);

// Кнопка закрытия Card-popup
cardFormDiscardButton.addEventListener("click", () => closePopup(cardPopup));

// Кнопка закрытия Image-popup
imagePopupDiscardButton.addEventListener("click", () => closePopup(imagePopup));