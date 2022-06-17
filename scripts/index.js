//ИМПОРТИРОВАННЫЕ МОДУЛИ:
// Валидация
import { enableValidation } from "./validate.js"; // Подключение валидации
import { enableButton } from "./validate.js"; // Активация кнопки
import { disableButton } from "./validate.js"; // Деактивация кнопки
import { clearErrors } from "./validate.js"; // Очистка ошибок

// Карточки
import { initialCards } from "./cards.js"; // Массив карточек

// ПЕРЕМЕННЫЕ:
// Общие
const popupsList = document.querySelectorAll(".popup"); // Массив с модальными окнами
const mesto = {
  formSelector: ".popup__container",
  inputSelector: ".popup__container-input",
  submitButtonSelector: ".popup__container-submit",
  inactiveButtonClass: "popup__container-submit_disabled",
  inputErrorClass: "popup__container-input_invalid",
  errorClass: "popup__container-input-error_visible"
} // Объект с настройками для валидации

// Profile-popup
const profilePopup = document.querySelector("#edit_profile_popup"); // Модальное окно Profile-popup
const profileButton = document.querySelector(".profile__edit-button"); // Кнопка открытия Profile-popup
const profileFormDiscardButton = document.querySelector("#profile-form-reset-button"); // Кнопка закрытия Profile-popup
const nameInput = profilePopup.querySelector("#profile-name"); // Поле ввода имени
const jobInput = profilePopup.querySelector("#profile-job"); // Поле ввода профессии
const profileName = document.querySelector(".profile__title"); // Имя профиля
const profileJob = document.querySelector(".profile__subtitle"); // Профессия в профиле
const profileSubmitButton = document.querySelector("#profile-submit-button"); // Кнопка подтверждения профиля

// Card-popup
const cardPopup = document.querySelector("#add_card_popup"); // Модальное окно Card-popup
const cardButton = document.querySelector(".profile__add-button"); // Кнопка открытия Card-popup
const cardFormDiscardButton = document.querySelector("#card-form-reset-button"); // Кнопка закрытия Card-popup
const cardTemplate = document.querySelector("#card-template").content; // Шаблон карточки
const cardName = cardPopup.querySelector("#card-name"); // Заголовок карточки
const cardLink = cardPopup.querySelector("#card-link"); // Ссылка на картинку карточки
const cardData = {}; // Объект, передаваемый в качестве аргумента функции "createCard"
const cardsContainer = document.querySelector(".places"); // Контейнер с карточками
const cardSubmitButton = document.querySelector("#card-submit-button"); // Кнопка создания карточки

// Image-popup
const imagePopup = document.querySelector("#image_popup"); // Модальное окно Image-popup
const imagePopupDiscardButton = document.querySelector("#image-popup-discard-button"); // Кнопка закрытия Image-popup
const popupImage = document.querySelector(".popup__image"); // Картинка Image-popup
const popupCaption = document.querySelector(".popup__image-caption"); // Подпись Image-popup

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

// Переключатель "Like"
function switchLike(item) {
  item.classList.toggle("place__like-button_active");
}

// Удаление карточки
function deleteCard(item) {
  item.remove();
}

// Присвоение значений Image-popup
function handleImageClick(item) {
  popupImage.src = item.link; // Картинка Image-popup
  popupImage.alt = "Фото " + item.name + "."; // Alt картинки Image-popup
  popupCaption.textContent = item.name; // Подпись Image-popup
  openPopup(imagePopup);
}

// Создание новой карточки
function createCard(cardData) {
  const cardElement = cardTemplate.querySelector(".place").cloneNode(true); // Карточка
  const cardImage = cardElement.querySelector(".place__image"); // Картинка карточки
  const likeButton = cardElement.querySelector(".place__like-button"); // Кнопка "Like"
  const deleteCardButton = cardElement.querySelector(".place__delete-button"); // Кнопка удаления карточки
  const cardTitle = cardElement.querySelector(".place__caption-title"); // Заголовок карточки

  cardImage.src = cardData.link; // Адрес картинки
  cardImage.alt = "Фото " + cardData.name + "."; // Alt картинки
  cardTitle.textContent = cardData.name; // Значение заголовка карточки

  likeButton.addEventListener("click", () => switchLike(likeButton)); // Активация-деактивация лайка

  deleteCardButton.addEventListener("click", () => deleteCard(cardElement)); // Удаление карточки

  cardImage.addEventListener("click", () => handleImageClick(cardData)); // Заполнение Image-popup

  return cardElement;
}

// Размещение новой карточки
function renderCard(item) {
  cardsContainer.prepend(item);
}

// Сброс формы
function resetForm(formElement) {
  formElement.querySelector(".popup__container").reset();
}

// Поведение кнопки подтверждения Profile-popup
function submitProfileForm(evt) {
  evt.preventDefault(); // Отменяет стандартную отправку формы
  profileName.textContent = nameInput.value; // Вставляем новое значение имени
  profileJob.textContent = jobInput.value; // Вставляем новое значение профессии
  closePopup(profilePopup);
}

// Поведение кнопки подтверждения Card-popup
function submitCardForm(evt) {
  evt.preventDefault(); // Отменяет стандартную отправку формы
  cardData.name = cardName.value;
  cardData.link = cardLink.value;
  renderCard(createCard(cardData));
  closePopup(cardPopup);
}

// Добавляем карточки «из коробки» при загрузке страницы
initialCards.forEach((item) => renderCard(createCard(item)));

// Подключение валидации
enableValidation(mesto);

// СЛУШАТЕЛИ СОБЫТИЙ:
// Кнопка открытия Profile-popup
profileButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profilePopup);
  clearErrors(profilePopup, mesto);
  enableButton(profileSubmitButton, mesto)
});

// Кнопка открытия Card-popup
cardButton.addEventListener("click", () => {
  openPopup(cardPopup);
  disableButton(cardSubmitButton, mesto);
  clearErrors(cardPopup, mesto);
  resetForm(cardPopup);
  });

// Кнопка подтверждения Profile-popup
profilePopup.addEventListener("submit", submitProfileForm);

// Кнопка подтверждения Card-popup
cardPopup.addEventListener("submit", submitCardForm);

// Кнопка закрытия Profile-popup
profileFormDiscardButton.addEventListener("click", () => closePopup(profilePopup));

// Кнопка закрытия Card-popup
cardFormDiscardButton.addEventListener("click", () => closePopup(cardPopup));

// Кнопка закрытия Image-popup
imagePopupDiscardButton.addEventListener("click", () => closePopup(imagePopup));