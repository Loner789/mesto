//Импортированный модуль с массивом карточек
import {initialCards} from './cards.js';
// ПЕРЕМЕННЫЕ:
// Profile-popup
const profileFormElement = document.querySelector('#edit_profile_popup'); // Модальное окно Profile-popup
const profileButton = document.querySelector('.profile__edit-button'); // Кнопка открытия Profile-popup
const profileFormDiscardButton = document.querySelector('#profile-form-reset-button'); // Кнопка закрытия Profile-popup
const nameInput = profileFormElement.querySelector('#profile-name'); // Поле ввода имени
const jobInput = profileFormElement.querySelector('#profile-job'); // Поле ввода профессии
const profileName = document.querySelector('.profile__title'); // Имя профиля
const profileJob = document.querySelector('.profile__subtitle'); // Профессия в профиле
// Card-popup
const cardFormElement = document.querySelector('#add_card_popup'); // Модальное окно Card-popup
const cardButton = document.querySelector('.profile__add-button'); // Кнопка открытия Card-popup
const cardFormDiscardButton = document.querySelector('#card-form-reset-button'); // Кнопка закрытия Card-popup
const cardTemplate = document.querySelector('#card-template').content; // Шаблон карточки
const cardName = cardFormElement.querySelector('#card-name'); // Заголовок карточки
const cardLink = cardFormElement.querySelector('#card-link'); // Ссылка на картинку карточки
const cardData = {};// Объект, передаваемый в качестве аргумента функции "createCard"
const cardsContainer = document.querySelector('.places'); // Контейнер с карточками
// Image-popup
const imagePopup = document.querySelector('#image_popup'); // Модальное окно Image-popup
const imagePopupDiscardButton = document.querySelector('#image-popup-discard-button'); // Кнопка закрытия Image-popup
const popupImage = document.querySelector('.popup__image'); // Картинка Image-popup
const popupCaption = document.querySelector('.popup__image-caption'); // Подпись Image-popup
// ФУНКЦИИ:
// Открытие popup
function openPopup(item) {
  item.classList.add('popup_opened');
}
// Закрытие popup
function closePopup(item) {
  item.classList.remove('popup_opened');
}
// Переключатель "Like"
function switchLike(item) {
  item.classList.toggle('place__like-button_active');
}
// Удаление карточки
function deleteCard(item) {
  item.closest('.place').remove();
}
// Создание новой карточки
function createCard(cardData) {
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true); // Карточка
  const cardImage = cardElement.querySelector('.place__image');
  cardImage.src = cardData.link; // Адрес картинки
  cardImage.alt = 'Фото ' + cardData.name + '.'; // Описание картинки
  cardElement.querySelector('.place__caption-title').textContent = cardData.name; // Подпись картинки
  cardElement.querySelector('.place__like-button').addEventListener('click', (evt) => 
  switchLike(evt.target)); // Активация-деактивация лайка
  cardElement.querySelector('.place__delete-button').addEventListener('click', (evt) =>
  deleteCard(evt.target)); // Удаление карточки
  cardImage.addEventListener('click', (evt) => {
    popupImage.src = cardData.link; // Картинка Image-popup
    popupImage.alt = cardImage.alt; // Описание картинки Image-popup
    popupCaption.textContent = cardData.name; // Подпись Image-popup
    openPopup(imagePopup);
  });
  return cardElement;
}
// Размещение новой карточки
function renderCard(item) {
  cardsContainer.prepend(item);
}
// Поведение кнопки подтверждения Profile-popup
function profileFormSubmitHandler(evt) {
  evt.preventDefault(); // Отменяет стандартную отправку формы
  profileName.textContent = nameInput.value;// Вставляем новое значение имени
  profileJob.textContent = jobInput.value;// Вставляем новое значение профессии
  closePopup(profileFormElement);
}
// Поведение кнопки подтверждения Card-popup
function cardFormSubmitHandler(evt) {
  evt.preventDefault(); // Отменяет стандартную отправку формы
  cardData.name = cardName.value;
  cardData.link = cardLink.value;
  renderCard(createCard(cardData));
  closePopup(cardFormElement);
  evt.target.reset(); // Очистка полей формы после добавления картинки
  }
// Добавляем карточки «из коробки» при загрузке страницы
initialCards.forEach((item) => renderCard(createCard(item)));
// СЛУШАТЕЛИ СОБЫТИЙ:
// Кнопка открытия Profile-popup 
  profileButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profileFormElement);
});
// Кнопка открытия Card-popup
cardButton.addEventListener('click', () => openPopup(cardFormElement));
// Кнопка подтверждения Profile-popup
profileFormElement.addEventListener('submit', profileFormSubmitHandler);
// Кнопка подтверждения Card-popup
cardFormElement.addEventListener('submit', cardFormSubmitHandler);
// Кнопка закрытия Profile-popup
profileFormDiscardButton.addEventListener('click', () => closePopup(profileFormElement));
// Кнопка закрытия Card-popup
cardFormDiscardButton.addEventListener('click', () => closePopup(cardFormElement));
// Кнопка закрытия Image-popup
imagePopupDiscardButton.addEventListener('click', () => closePopup(imagePopup));