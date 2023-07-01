import './index.css';
import { enableValidation } from '../components/validate.js';
import { openPopup, closePopup,clickOnOverlayHandler } from '../components/modal.js';
import { renderCards } from '../components/card.js';
import { profileEditButton, profileName, profileDescription, popupEditProfile, nameInput, jobInput, popupAddCard, avatarEditButton, popupEditAvatar, newAvatar, profileAvatar, newPlaceTitle, newPlaceImage, formEditAvatar, cardAddForm, cardAddButton, formEditProfile, popupList } from '../utils/constants.js';
import Api from '../components/api.js';
import { renderLoading } from '../utils/utils.js';
import FormPopup from '../components/Form.js';

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25', 
  headers: {
    authorization: '93cf6edd-b0e6-426e-82f8-64302cc26990',
    'Content-Type': 'application/json'
  }
})

let personId = "";

Promise.all([api.getUserData(), api.getInitialCards()])
.then(([userData, initialCards]) => {
  profileAvatar.src = userData.avatar;
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  personId = userData._id;
  renderCards(initialCards);
})
.catch(err => console.log(err));

popupList.forEach ((item) => {
  item.addEventListener('click', clickOnOverlayHandler);
});

formEditAvatar.addEventListener('submit', handleEditAvatarFormSubmit);

avatarEditButton.addEventListener('click', function() {
  openPopup(popupEditAvatar);
});

profileEditButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

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

cardAddButton.addEventListener('click', function() {
  openPopup(popupAddCard);
});

function handleAddCardFormSubmit(evt) {
  function makeRequest() {
    return updateCard(newPlaceTitle.value, newPlaceImage.value)
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



enableValidation({
  formSelector: '.form',
  inputSelector: '.form__item',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__button_disabled',
  inputErrorClass: 'form__item_error',
  errorClass: 'form__error_active'
});

export { personId, handleSubmit }