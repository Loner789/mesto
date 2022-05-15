let formElement = document.querySelector(".popup");
let nameInput = formElement.querySelector(".popup__container-name");
let jobInput = formElement.querySelector(".popup__container-job");
let editButton = document.querySelector(".profile__edit-button");
let discardButton = document.querySelector('.popup__container-discard');

function popupOpen() {
  formElement.classList.add("popup_opened");
}

editButton.addEventListener("click", popupOpen);

function popupClose() {
    formElement.classList.remove("popup_opened");
}

discardButton.addEventListener("click", popupClose);

function formSubmitHandler(evt) {
  evt.preventDefault(); // Отменяет стандартную отправку формы.
  let profileName = document.querySelector(".profile__title");//Можно было записать в одну строку
  let profileJob = document.querySelector(".profile__subtitle");
  profileName.textContent = `${nameInput.value}`;// Вставляем новые значения
  profileJob.textContent = `${jobInput.value}`;// Вставляем новые значения
  popupClose();
}

formElement.addEventListener("submit", formSubmitHandler);
