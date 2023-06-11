import { closePopup, openPopup } from './modal.js';
import { popupImage, cardsContainer, cardTemplate, popupImageImg, popupImageCaption, popupDeleteCard, formDeleteCard } from './constants.js';
import { setHeart, removeHeart, deleteCard } from './api.js';
import { personId, handleSubmit } from '../index.js';

// function removeCard(card, cardId) {
//   deleteCard(cardId)
//   .then(() => {
//     card.remove();
//   })
//   .catch(err => console.log(err));
// };



function confirmCardDelete (card, cardId) {
  openPopup(popupDeleteCard);
  popupDeleteCard.querySelector('.form__button').addEventListener('click', () => {
    processCardDelete(card, cardId)
  });
  // formDeleteCard.addEventListener('submit', 
  // handleCardDeleteSubmit);
};

function handleCardDeleteSubmit(evt) {
  function makeRequest() {
    return processCardDelete
  };
  handleSubmit(makeRequest, evt);
};

function processCardDelete(card, cardId) {
  // return handleCardDeleteSubmit()
  // .then (
    deleteCard(cardId)
    // )
    .then(() => {
      card.remove();
      handleCardDeleteSubmit
      // closePopup(popupDeleteCard);
    })
    .catch(err => console.log(err));
  };

function toggleHeart(heartIcon, heartsCount, cardId) {
  if (heartIcon.classList.contains('card__heart-icon_checked')) {
    removeHeart(cardId)
    .then(data => {
      heartIcon.classList.remove('card__heart-icon_checked');
      heartsCount.textContent = `${data.likes.length}`;
    })
    .catch(err => console.log(err));
  } else {
    setHeart(cardId)
    .then(data => {
      heartIcon.classList.add('card__heart-icon_checked');
      heartsCount.textContent = `${data.likes.length}`;
    })
    .catch(err => console.log(err));
  }
}

function createCard(link, name, cardId, ownerId, likes) {
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = newCard.querySelector('.card__image');
  const cardTitle = newCard.querySelector('.card__title');
  const heartIcon = newCard.querySelector('.card__heart-icon');
  const heartsCount = newCard.querySelector('.card__hearts-number');
  const trashIcon = newCard.querySelector('.card__delete-button');

  newCard.id = cardId;
  cardImage.src = link;
  cardImage.alt = `Вид на ${name}.`
  cardTitle.textContent = name;

  likes.forEach((like) => {
    if (like._id === personId) {
      heartIcon.classList.add('card__heart-icon_checked');
    }
  })

  heartsCount.textContent = `${likes.length}`;

  heartIcon.addEventListener('click', () => toggleHeart(heartIcon, heartsCount, cardId));

if (ownerId !== personId) {
  trashIcon.classList.add('card__delete-button_hidden');
}

  trashIcon.addEventListener('click', () => {
    confirmCardDelete(newCard, cardId);
  });
  cardImage.addEventListener('click', function() {
  popupImageImg.src = link;
  popupImageImg.alt = `Вид на ${name}.`;
  popupImageCaption.textContent = name;
  openPopup(popupImage);
});
  return newCard;
};

function addCard(newCard) {
  cardsContainer.prepend(newCard);
};

function renderCards(cards) {
  cards.reverse().forEach(function (el) {
  el.newCard = createCard(el.link, el.name, el._id, el.owner._id, el.likes);
  addCard(el.newCard);
});
}

export { addCard, renderCards };