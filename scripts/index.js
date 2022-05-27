const profileFormElement = document.querySelector('#edit_profile_popup'); // Profile-popup
const cardFormElement = document.querySelector('#add_card_popup'); // Card-popup

const nameInput = profileFormElement.querySelector('#profile-name'); // Поле ввода имени
const jobInput = profileFormElement.querySelector('#profile-job'); // Поле ввода профессии

const editButton = document.querySelector('.profile__edit-button'); // Кнопка открытия Profile-button
const addButton = document.querySelector('.profile__add-button'); // Кнопка открытия Card-button

const profileFormDiscardButton = document.querySelector('#profile-form-reset-button'); // Кнопка закрытия Profile-popup
const cardFormDiscardButton = document.querySelector('#card-form-reset-button'); // Кнопка закрытия Card-popup

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

// Открытие Profile-popup
function profilePopupOpen() {
  profileFormElement.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
// Открытие Card-popup
function cardPopupOpen() {
  cardFormElement.classList.add('popup_opened');
}

// Закрытие Profile-popup
function profilePopupClose() {
   profileFormElement.classList.remove('popup_opened');
 }
// Закрытие Card-popup
 function cardPopupClose() {
   cardFormElement.classList.remove('popup_opened');
 }
// Поведение кнопки Profile-popup
function profileFormSubmitHandler(evt) {
  evt.preventDefault(); // Отменяет стандартную отправку формы
  profileName.textContent = nameInput.value;// Вставляем новое значение имени
  profileJob.textContent = jobInput.value;// Вставляем новое значение профессии
  profilePopupClose();
}
// Повведение кнопки Card-popup
function cardFormSubmitHandler(evt) {
  evt.preventDefault(); // Отменяет стандартную отправку формы
  addCard(cardTitle.value, cardLink.value);
  cardPopupClose();
  }

// Слушатели событий
editButton.addEventListener('click', profilePopupOpen); // Кнопка открытия Profile-popup 
addButton.addEventListener('click', cardPopupOpen); // Кнопка открытия Card-popup

profileFormDiscardButton.addEventListener('click', profilePopupClose); // Кнопка закрытия Profile-popup
cardFormDiscardButton.addEventListener('click', cardPopupClose); // Кнопка закрытия Card-popup

profileFormElement.addEventListener('submit', profileFormSubmitHandler); // Кнопка подтверждения Profile-popup
cardFormElement.addEventListener('submit', cardFormSubmitHandler); // Кнопка подтверждения Card-popup

// Добавление новой карточки
function addCard(title, link) {
  const cardTemplate = document.querySelector('#card-template').content; // Шаблон карточки
  const cardElement = cardTemplate.querySelector('.place').cloneNode(true); // Карточка
  cardElement.querySelector('.place__image').src = link; // Адрес картинки
  cardElement.querySelector('.place__image').alt = 'фото_' + title.toLowerCase().split(' ').join('_'); // Описание картинки
  cardElement.querySelector('.place__caption-title').textContent = title; // Подпись картинки
  cardElement.querySelector('.place__like-button').addEventListener('click', function (evt) {
  evt.target.classList.toggle('place__like-button_active'); // Активация-деактивация лайка
  });
  cardElement.querySelector('.place__delete-button').addEventListener('click', function (evt) {
  evt.target.parentElement.remove();
  });
  cardsContainer.prepend(cardElement); // Добавление карточки в начало секции "places"
}

// Добавляем карточки «из коробки» при загрузке страницы
initialCards.forEach(function (item) {
  addCard(item.name, item.link);
});