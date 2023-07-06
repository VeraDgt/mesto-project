import arhizImage from '../images/elbrus.jpg';
import karachImage from '../images/karachaevsk.jpg';
import chelImage from '../images/karachaevsk.jpg';
import kamchImage from '../images/elbrus.jpg';
import dombayImage from '../images/dombay.jpg';
import baikalImage from '../images/dombay.jpg';

const initialCards = [
  {
    name: 'Архыз',
    link: arhizImage
  },
  {
    name: 'Челябинская область',
    link: karachImage
  },
  {
    name: 'Карачаевск',
    link: chelImage
  },
  {
    name: 'Эльбрус',
    link: kamchImage
  },
  {
    name: 'Домбай',
    link: dombayImage
  },
  {
    name: 'Байкал',
    link: baikalImage
  }
]; 

const popupImage = document.querySelector('#popup_image');
const cardsContainer = document.querySelector('.cards__container');
const cardTemplate = cardsContainer.querySelector('#card').content;
const popupImageImg = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__image-caption');
const profile = document.querySelector('.profile');
const profileEditButton = profile.querySelector('.profile__edit-button');
const profileName = profile.querySelector('.profile__name');
const profileDescription = profile.querySelector('.profile__description');
const popupEditProfile = document.querySelector('#popup_edit-profile');
const formEditProfile = document.forms.profile;
const nameInput = formEditProfile.name;
const jobInput = formEditProfile.description;
const buttonsClosePopups = document.querySelectorAll('.popup__toggle');
const popupAddCard = document.querySelector('#popup_add-card');
const avatarEditButton = profile.querySelector('.profile__avatar-edit-button');
const popupEditAvatar = document.querySelector('#popup_edit-avatar');
const formEditAvatar = document.forms.avatar;
const newAvatar = formEditAvatar.avatar;
const profileAvatar = profile.querySelector('.profile__avatar');
const cardAddForm = document.forms.place;
const newPlaceTitle = cardAddForm.title;
const newPlaceImage = cardAddForm.link;
const cardAddButton = profile.querySelector('.profile__add-button');
const popupList = Array.from(document.querySelectorAll('.popup'));
const popupDeleteCard = document.querySelector('#popup_delete-card');
const formDeleteCard = document.forms.delete;

export { initialCards, popupImage, cardsContainer, cardTemplate, popupImageImg, popupImageCaption, profileEditButton, profileName, profileDescription, popupEditProfile, nameInput, jobInput, buttonsClosePopups, popupAddCard, avatarEditButton, popupEditAvatar, newAvatar, profileAvatar, newPlaceTitle, newPlaceImage, formEditAvatar, cardAddForm, cardAddButton, formEditProfile, popupList, popupDeleteCard, formDeleteCard };

