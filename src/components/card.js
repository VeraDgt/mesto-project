import { openPopup } from './modal.js';
import { popupImage, cardsContainer, cardTemplate, popupImageImg, popupImageCaption, popupDeleteCard, formDeleteCard } from '../utils/constants.js';
import { setHeart, removeHeart, deleteCard } from './api.js';
import { personId, handleSubmit } from '../pages/index.js';

//---ООП--->
export default class Card {
  constructor(data, selector) {
    this._userId = data.userId;
    this._link = data.link;
    this._name = data.name;
    this._cardId = data.cardId;
    this._ownerId = data.ownerId; 
    this._isLiked = false,
    this._selector = selector;
    this._like = function () {
      likes.forEach((like) => {
        if (like._id === ownerId) {
          heartIcon.classList.add('card__heart-icon_checked');
        }
      });
    }
    this._likes = ({likes} ) => likes.length;
  }

    _handleClick() {
      this._element.querySelector('.card__heart-icon').classList.toggle('card__heart-icon_checked');
  }

  _handleOpenPopup() {
    popupImage.src = this._link;
    popupElement.classList.add('popup_opened');
  } 

  _handleClosePopup() {
    popupImage.src = '';
    popupElement.classList.remove('popup_opened');
  } 

    _setEventListeners() {
      this._element.querySelector('.card__heart-icon').addEventListener('clisk', () => {
        this._handleClick();
      });
      this._element.addEventListener('click', () => {
        this._handleOpenPopup()
      });
      popupCloseButton.addEventListener('click', () => {
        this._handleClosePopup()
      });
    }
  
  _getElement() {
    const cardElement = document
    .querySelector(this._selector)
    .querySelector('#card')
    .content
    .querySelector('.card').cloneNode(true);

    return cardElement;
  }

    _countLikes() {
    const heartIcon = newCard.querySelector('.card__heart-icon');
    _likes.forEach((_like) => {
      if (_like._id === _ownerId) {
        heartIcon.classList.add('card__heart-icon_checked');
      }
    })
  }

  generate() {
    this._element = this._getElement();
    this._setEventListeners();

    this._element.querySelector('.card__image').style.src = this._link;
    this._element.querySelector('.card__title').textContent = this._name;
    // this._element.querySelector('.card__heart-icon') = this._likes;
    // this._element.querySelector('.card__hearts-number') = this._countLikes();
    // this._element.querySelector('.card__delete-button') = '';

    return this._element;
  }

}

// items.reverse().forEach((item) => {
//   const card = new Card(item, '.card');
//   const cardElement = card.generate();
//   document.querySelector('.cards__container').append(cardElement);
// }); 

//<---ООП---

// function removeCard(card, cardId) {
//   deleteCard(cardId)
//   .then(() => {
//     card.remove();
//   })
//   .catch(err => console.log(err));
// };

function confirmCardDelete (card, cardId) {
  const cardToDelete = document.querySelector('.card[data-del="true"]');
  if (cardToDelete) {
    cardToDelete.removeAttribute('data-del');
  }
  card.dataset.del = 'true';
  card.dataset.id = cardId;
  openPopup(popupDeleteCard);
};

function handleCardDeleteSubmit(evt) {
  const cardToDelete = document.querySelector('.card[data-del="true"]');
  function makeRequest() {
    if (cardToDelete) {
      const cardToDeleteId = cardToDelete.dataset.id;
      return deleteCard(cardToDeleteId)
      .then(() => {
        cardToDelete.remove();
      })
      .catch(err => console.log(err));
    };
  };
  handleSubmit(makeRequest, evt);
};

formDeleteCard.addEventListener('submit', 
  handleCardDeleteSubmit);

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