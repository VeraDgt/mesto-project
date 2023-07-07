import './index.css';

import { FormValidator, config } from '../components/FormValidator';
import Card from '../components/Card.js';
import { profileEditButton, avatarEditButton, nameInput, jobInput, profileAvatar, formEditAvatar, cardAddForm, cardAddButton, formEditProfile } from '../utils/constants.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25', 
  headers: {
    authorization: '93cf6edd-b0e6-426e-82f8-64302cc26990',
    'Content-Type': 'application/json'
  }
})

let userId = "";

Promise.all([api.getUserData(), api.getInitialCards()])
.then(([userData, initialCards]) => {
  userId = userData._id;
  dataUserInfo.setUserInfo(userData);
  cards.renderItems(initialCards);
})
.catch(err => console.log(`Ошибка: ${err}`));

const createCard = (data) => {
  const card = new Card({
    data: data,
    selector: '#card',
    userId: userId,
    handleCardClick: (name, link) => {
      popupWithImageItem.open(name, link);
    },
    confirmCardDelete: (cardId) => {
      popupConfirmDelete.open();
      popupConfirmDelete.submitCallback(() => {
        api.deleteCard(cardId)
        .then(() => {
          popupConfirmDelete.close();
          card.deleteCard();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
      })
    },

    setHeart: (cardId) => {
      api.setHeart(cardId)
      .then((data) => {
        card.toggleHeart(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
    },
    removeHeart: (cardId) => {
      api.removeHeart(cardId)
      .then((data) => {
        card.toggleHeart(data);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
    }
  })

  const cardElement = card.generate();
  return cardElement;
}

const cards = new Section({
  renderer: (card) => {
    cards.addItem(createCard(card));
  }
}, '.cards__container');

const popupWithImageItem = new PopupWithImage('#popup_image');
popupWithImageItem._setEventListeners();

// formEditAvatar.addEventListener('submit', handleEditAvatarFormSubmit);

const dataUserInfo = new UserInfo({
  profileAvatar: '.profile__avatar',
  profileName: '.profile__name',
  profileDescription: '.profile__description'
});

const popupEditProfile = new PopupWithForm({
  popupSelector: '#popup_edit-profile',
  handleFormSubmit: (userData) => {
    popupEditProfile.renderLoading(true);
    api.updateUserData(userData)
    .then((userData) => {
      dataUserInfo.setUserInfo(userData);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false);
    })
  }
});
popupEditProfile._setEventListeners();

function setEditProfileData({ name, description }) {
  nameInput.value = name;
  jobInput.value = description;
}

profileEditButton.addEventListener('click', () => {
  const userData = dataUserInfo.getUserInfo();
  setEditProfileData({
    name: userData.profileNameInput,
    description: userData.profileDescriptionInput
  });
  popupEditProfile.open();
});

const popupEditAvatar = new PopupWithForm({
  popupSelector: '#popup_edit-avatar',
  handleFormSubmit: (data) => {
    popupEditAvatar.renderLoading(true);
    api.updateAvatar(data)
    .then((data) => {
      profileAvatar.src = data.avatar;
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      profileAvatar.renderLoading(false);
    })
  }
});
popupEditAvatar._setEventListeners();

avatarEditButton.addEventListener('click', () => {
  popupEditAvatar.open();
});

const popupAddCard = new PopupWithForm({
  popupSelector: '#popup_add-card',
  handleFormSubmit: (data) => {
    popupAddCard.renderLoading(true);
    api.updateCard(data)
    .then((data) => {
      cards.addItem(createCard(data));
      popupAddCard.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupAddCard.renderLoading(false);
    })
  }
});
popupAddCard._setEventListeners();

cardAddButton.addEventListener('click', () => {
  popupAddCard.open();
})

function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(true, submitButton, initialText, loadingText);
  request()
  .then(() => {
  closePopup(evt.target.closest('.popup'));
  evt.target.reset();
  })
  .catch((err) => {
    console.error(`Ошибка: ${err}`);
  })
  .finally(() => {
    renderLoading(false, submitButton, initialText);
  });
};

// function handleEditAvatarFormSubmit(evt) {
//   function makeRequest() {
//     return updateAvatar(newAvatar.value)
//     .then((res) => {
//     const newAvatarLink = res.avatar;
//     profileAvatar.style.backgroundImage = `url(${newAvatarLink})`;
//     });
//   };
//   handleSubmit(makeRequest, evt);
// };

// cardAddForm.addEventListener('submit', handleAddCardFormSubmit);

// cardAddButton.addEventListener('click', function() {
//   openPopup(popupAddCard);
// });

// function handleAddCardFormSubmit(evt) {
//   function makeRequest() {
//     return api.updateCard(newPlaceTitle.value, newPlaceImage.value)
//     .then((newCard) => {
//       renderCards([newCard]);
//     });
//   };
//   handleSubmit(makeRequest, evt);
// };

// formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);

// function handleEditProfileFormSubmit(evt) {
//   function makeRequest() {
//     return updateUserData(nameInput.value, jobInput.value)
//     .then((newData) => {
//       profileName.textContent = newData.name;
//       profileDescription.textContent = newData.about;
//     });
//   };
//   handleSubmit(makeRequest, evt);
// };


// const editFormValidator = new FormValidator(config, formEditProfile);
// editFormValidator.enableValidation();

// const addFormValidator = new FormValidator(config, cardAddForm);
// addFormValidator.enableValidation();

