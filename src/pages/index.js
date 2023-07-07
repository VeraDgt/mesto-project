import './index.css';

import { FormValidator, config } from '../components/FormValidator';
// import { openPopup, closePopup,clickOnOverlayHandler } from '../components/modal.js';
import Card from '../components/Card.js';
<<<<<<< Updated upstream
import { profileEditButton, profileName, profileDescription, popupEditProfile, nameInput, jobInput, popupAddCard, avatarEditButton, popupEditAvatar, newAvatar, profileAvatar, newPlaceTitle, newPlaceImage, formEditAvatar, cardAddForm, cardAddButton, formEditProfile, popupList } from '../utils/constants.js';
=======
import { profileEditButton, avatarEditButton, nameInput, jobInput, profileAvatar, formEditAvatar, cardAddForm, cardAddButton, formEditProfile, newPlaceTitle, newPlaceImage } from '../utils/constants.js';
>>>>>>> Stashed changes
import Api from '../components/Api.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';

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
  profileAvatar.src = userData.avatar;
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  userId = userData._id;
  cards.renderItems(initialCards);
})
.catch(err => console.log(err));

// popupList.forEach ((item) => {
//   item.addEventListener('click', clickOnOverlayHandler);
// });

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
popupWithImageItem.setEventListeners();

formEditAvatar.addEventListener('submit', handleEditAvatarFormSubmit);

// avatarEditButton.addEventListener('click', function() {
//   openPopup(popupEditAvatar);
// });

// profileEditButton.addEventListener('click', function() {
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileDescription.textContent;
//   openPopup(popupEditProfile);
// });

// function handleSubmit(request, evt, loadingText = "Сохранение...") {
//   evt.preventDefault();
//   const submitButton = evt.submitter;
//   const initialText = submitButton.textContent;
//   renderLoading(true, submitButton, initialText, loadingText);
//   request()
//   .then(() => {
//   closePopup(evt.target.closest('.popup'));
//   evt.target.reset();
//   })
//   .catch((err) => {
//     console.error(`Ошибка: ${err}`);
//   })
//   .finally(() => {
//     renderLoading(false, submitButton, initialText);
//   });
// };

function handleEditAvatarFormSubmit(evt) {
  function makeRequest() {
    return updateAvatar(newAvatar.value)
    .then((res) => {
    const newAvatarLink = res.avatar;
    profileAvatar.style.backgroundImage = `url(${newAvatarLink})`;
    });
  };
  handleSubmit(makeRequest, evt);
};

cardAddForm.addEventListener('submit', handleAddCardFormSubmit);

// cardAddButton.addEventListener('click', function() {
//   openPopup(popupAddCard);
// });

function handleAddCardFormSubmit(evt) {
  function makeRequest() {
    return api.updateCard(newPlaceTitle.value, newPlaceImage.value)
    .then((newCard) => {
      renderCards([newCard]);
    });
  };
  handleSubmit(makeRequest, evt);
};

formEditProfile.addEventListener('submit', handleEditProfileFormSubmit);

function handleEditProfileFormSubmit(evt) {
  function makeRequest() {
    return updateUserData(nameInput.value, jobInput.value)
    .then((newData) => {
      profileName.textContent = newData.name;
      profileDescription.textContent = newData.about;
    });
  };
  handleSubmit(makeRequest, evt);
};





export { userId
  // , handleSubmit
}

const editFormValidator = new FormValidator(config, formEditProfile);
editFormValidator.enableValidation();

<<<<<<< Updated upstream
const addFormValidator = new FormValidator(config, cardAddForm);
addFormValidator.enableValidation();
=======
const popupEditAvatar = new PopupWithForm({
  popupSelector: '#popup_edit-avatar',
  handleFormSubmit: (userData) => {
    popupEditAvatar.renderLoading(true);
    api.updateAvatar(userData.avatar)
    .then((userData) => {
      dataUserInfo.editAvatar(userData);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false);
    })
  }
});
popupEditAvatar._setEventListeners();

avatarEditButton.addEventListener('click', () => {
  popupEditAvatar.open();
});

const popupAddCard = new PopupWithForm({
  popupSelector: '#popup_add-card',
  handleFormSubmit: () => {
    popupAddCard.renderLoading(true);
    api.updateCard({ 
      name: newPlaceTitle.value,
      link: newPlaceImage.value
    })
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
});

const popupConfirmDelete = new PopupWithConfirmation({
  popupSelector: '#popup_delete-card'
});
popupConfirmDelete._setEventListeners();

const editFormValidaton = new FormValidator(config, formEditProfile);
editFormValidaton.enableValidation();

const addFormValidaton = new FormValidator(config, cardAddForm);
addFormValidaton.enableValidation();

const changeAvatarValidation = new FormValidator(config, formEditAvatar);
changeAvatarValidation.enableValidation();
>>>>>>> Stashed changes
