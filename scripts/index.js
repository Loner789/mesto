// ПЕРЕМЕННЫЕ:
const profileFormElement = document.querySelector('#edit_profile_popup'); // Profile-popup
const cardFormElement = document.querySelector('#add_card_popup'); // Card-popup
const imagePopup = document.querySelector('#image_popup'); // Image-popup
const nameInput = profileFormElement.querySelector('#profile-name'); // Поле ввода имени
const jobInput = profileFormElement.querySelector('#profile-job'); // Поле ввода профессии
const popupImage = document.querySelector('.popup__image'); // Картинка Image-popup
const popupCaption = document.querySelector('.popup__image-caption'); // Подпись Image-popup
const editButton = document.querySelector('.profile__edit-button'); // Кнопка открытия Profile-popup
const addButton = document.querySelector('.profile__add-button'); // Кнопка открытия Card-popup
const profileFormDiscardButton = document.querySelector('#profile-form-reset-button'); // Кнопка закрытия Profile-popup
const cardFormDiscardButton = document.querySelector('#card-form-reset-button'); // Кнопка закрытия Card-popup
const imagePopupDiscardButton = document.querySelector('#image-popup-discard-button'); // Кнопка закрытия Image-popup
const profileName = document.querySelector('.profile__title'); // Имя профиля
const profileJob = document.querySelector('.profile__subtitle'); // Профессия в профиле
const cardsContainer = document.querySelector('.places'); // Контейнер с карточками
const cardLink = cardFormElement.querySelector('#card-link'); // Ссылка на картинку
const cardTitle = cardFormElement.querySelector('#card-name'); // Заголовок карточки
// Шесть карточек «из коробки»
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// ФУНКЦИИ:
// Открытие popup
function popupOpen(item) {
     item.classList.add('popup_opened');
   }
// Закрытие popup
function popupClose(item) {
    item.classList.remove('popup_opened');
    }
// Поведение кнопки подтверждения Profile-popup
function profileFormSubmitHandler(evt) {
  evt.preventDefault(); // Отменяет стандартную отправку формы
  profileName.textContent = nameInput.value;// Вставляем новое значение имени
  profileJob.textContent = jobInput.value;// Вставляем новое значение профессии
  popupClose(profileFormElement);
}
// Поведение кнопки подтверждения Card-popup
function cardFormSubmitHandler(evt) {
  evt.preventDefault(); // Отменяет стандартную отправку формы
  addCard(cardTitle.value, cardLink.value);
  popupClose(cardFormElement);
  }
// Добавление новой карточки
function addCard(title, link) {
  const cardTemplate = document.querySelector('#card-template').content; // Шаблон карточки
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true); // Карточка
  cardElement.querySelector('.place__image').src = link; // Адрес картинки
  cardElement.querySelector('.place__image').alt = title; // Описание картинки
  cardElement.querySelector('.place__caption-title').textContent = title; // Подпись картинки
  cardElement.querySelector('.place__like-button').addEventListener('click', (evt) => 
  evt.target.classList.toggle('place__like-button_active')); // Активация-деактивация лайка
  cardElement.querySelector('.place__delete-button').addEventListener('click', (evt) =>
  evt.target.parentElement.remove()); // Удаление карточки
  cardElement.querySelector('.place__image').addEventListener('click', (evt) => {
    popupImage.src = evt.target.src; // Картинка Image-popup
    popupCaption.textContent = evt.target.alt; // Подпись Image-popup
    popupOpen(imagePopup);
  });
  cardsContainer.prepend(cardElement); // Добавление карточки в начало секции "places"
}
// Добавляем карточки «из коробки» при загрузке страницы
initialCards.forEach((item) => addCard(item.name, item.link));
// СЛУШАТЕЛИ СОБЫТИЙ:
// Кнопка открытия Profile-popup 
editButton.addEventListener('click', () => {
popupOpen(profileFormElement);
nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;
});
// Кнопка открытия Card-popup
addButton.addEventListener('click', () => popupOpen(cardFormElement));
// Кнопка подтверждения Profile-popup
profileFormElement.addEventListener('submit', profileFormSubmitHandler);
// Кнопка подтверждения Card-popup
cardFormElement.addEventListener('submit', cardFormSubmitHandler);
// Кнопка закрытия Profile-popup
profileFormDiscardButton.addEventListener('click', () => popupClose(profileFormElement));
// Кнопка закрытия Card-popup
cardFormDiscardButton.addEventListener('click', () => popupClose(cardFormElement));
// Кнопка закрытия Image-popup
imagePopupDiscardButton.addEventListener('click', () => popupClose(imagePopup));