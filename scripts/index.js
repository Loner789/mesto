const formElement = document.querySelector(".popup");
const nameInput = formElement.querySelector(".popup__container-name");
const jobInput = formElement.querySelector(".popup__container-job");
const editButton = document.querySelector(".profile__edit-button");
const discardButton = document.querySelector('.popup__container-discard');
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__subtitle");

function popupOpen() {
  formElement.classList.add("popup_opened");
  nameInput.value = "Жак-Ив Кусто";
  jobInput.value = "Исследователь океана";
}

function popupClose() {
    formElement.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
  evt.preventDefault(); // Отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;// Вставляем новые значения
  profileJob.textContent = jobInput.value;// Вставляем новые значения
  popupClose();
}

editButton.addEventListener("click", popupOpen);
discardButton.addEventListener("click", popupClose);
formElement.addEventListener("submit", formSubmitHandler);
