// IMPORTED MODULES:
import "./index.css";
import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
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
} from "../utils/constants.js";

// FUNCTIONS:
// Card creation
function createCard(item) {
  const card = new Card(
    {
      data: item,
      handleCardClick: () => {
        imagePopup.open(item);
      },
      handleDeletion: () => {
        cardDeletionPopup.open();
        cardDeletionPopup.setSubmitAction(() => {
          cardDeletionPopup.renderLoadingDelete(true);
          api
            .deleteCard(item._id)
            .then(() => {
              card.deleteCard();
              cardDeletionPopup.close();
            })
            .catch((err) => console.log(err))
            .finally(() => {
              cardDeletionPopup.renderLoadingDelete(false);
            });
        });
      },
      setLike: () => {
        api
          .addLike(item._id)
          .then((item) => {
            card.switchLike();
            card.setLikesCount(item.likes.length);
          })
          .catch((err) => console.log(err));
      },
      removeLike: () => {
        api
          .deleteLike(item._id)
          .then((item) => {
            card.switchLike();
            card.setLikesCount(item.likes.length);
          })
          .catch((err) => console.log(err));
      },
      userId: userId,
    },
    selectors.cardSelector
  );

  return card;
}

// CLASSES:
// Api initialization
const api = new Api(apiConfig);

// Information about user
const userInfo = new UserInfo({
  userName: selectors.userNameSelector,
  userInfo: selectors.userInfoSelector,
  userAvatar: selectors.userAvatarSelector,
});

// Profile-form popup
const profilePopup = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      profilePopup.renderLoading(true);
      api
        .setUserInfo(data)
        .then((item) => {
          userInfo.setUserInfo(item);
          profilePopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          profilePopup.renderLoading(false);
        });
    },
  },
  selectors.profilePopupSelector
);
profilePopup.setEventListeners();

// Card-form popup
const cardPopup = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      cardPopup.renderLoading(true);
      api
        .addNewCard(data)
        .then((card) => {
          const cardElement = createCard(card).generateCard();
          cardList.addItem(cardElement);
          cardPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          cardPopup.renderLoading(false);
        });
    },
  },
  selectors.cardPopupSelector
);
cardPopup.setEventListeners();

// Avatar-form popup
const avatarPopup = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      avatarPopup.renderLoading(true);
      api
        .setUserAvatar(data)
        .then((item) => {
          userInfo.setUserAvatar(item);
          avatarPopup.close();
        })
        .catch((err) => console.log(err))
        .finally(() => {
          avatarPopup.renderLoading(false);
        });
    },
  },
  selectors.avatarPopupSelector
);
avatarPopup.setEventListeners();

// Popup with picture
const imagePopup = new PopupWithImage(selectors.imagePopupSelector);
imagePopup.setEventListeners();

// Popup with confirmation of card deletion
const cardDeletionPopup = new PopupWithConfirmation(
  selectors.cardDeletionPopupSelector
);
cardDeletionPopup.setEventListeners();

// Rendering of cards array
const cardList = new Section(
  {
    renderer: (data) => {
      const card = createCard(data).generateCard();
      cardList.addItem(card);
    },
  },
  selectors.cardsContainerSelector
);

// ID variable
let userId;

// Getting data from server and adding it to DOM
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user);
    userId = user._id;

    return cardList.renderItems(cards);
  })
  .catch((err) => console.log(err));

// FORMS VALIDATORS ACTIVATION:
// Profile-form validator activation
const profileFormValidator = new FormValidator(
  validationConfig,
  profileFormElement
);
profileFormValidator.enableValidation();

// Avatar-form validator activation
const avatarFormValidator = new FormValidator(
  validationConfig,
  avatarFormElement
);
avatarFormValidator.enableValidation();

// Card-form validator activation
const cardFormValidator = new FormValidator(validationConfig, cardFormElement);
cardFormValidator.enableValidation();

// EVENT LISTENERS:
// Profile-popup button click handler
profileButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  nameInput.value = userData.name;
  jobInput.value = userData.about;

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

// Avatar-popup button click handler
avatarButton.addEventListener("click", () => {
  avatarFormValidator.disableButton();
  avatarFormValidator.clearErrors();
  avatarFormElement.reset();
  avatarPopup.open();
});
