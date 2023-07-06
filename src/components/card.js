export default class Card {
  constructor({ data, selector, userId, setHeart, removeHeart, confirmCardDelete, handleCardClick }) {
    this._userId = userId;
    this._link = data.link;
    this._name = data.name;
    this._cardId = data._id;
    this._ownerId = data.owner._id; 
    this._selector = selector;
    this._likes = data.likes;
    this._setHeart = setHeart;
    this._removeHeart = removeHeart;
    this._confirmCardDelete = confirmCardDelete;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    this._card = document
    .querySelector(this._selector)
    .content
    .querySelector('.card').cloneNode(true);

    return this._card;
  }

  _handleClick() {
    this._element.querySelector('.card__heart-icon').classList.toggle('card__heart-icon_checked');
  }

  _setEventListeners() {
    this._heartIcon.addEventListener('click', () => {
      if (this._heartIcon.classList.contains('card__heart-icon_checked')) {
        this._removeHeart(this._cardId);
        } else {
        this._setHeart(this._cardId);
      }
    })

    this._image.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })

    this._trashIcon.addEventListener('click', () => {
      this._confirmCardDelete(this._cardId);
    })
  }

  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  generate() {
    this._element = this._getElement();
    this._image = this._element.querySelector('.card__image');
    this._image.src = this._link;
    this._image.alt = `Вид на ${this._name}.`;
    this._element.querySelector('.card__title').textContent = this._name;
    this._heartIcon = this._element.querySelector('.card__heart-icon');
    this._heartsCount = this._element.querySelector('.card__hearts-number');
    this._heartsCount.textContent = this._likes.length;
    this._trashIcon = this._element.querySelector('.card__delete-button');
    this._hasTrashIcon();
    this._hasHeartChecked();
    this._setEventListeners();

    return this._element;
  }

  _hasHeartChecked() {
    if (
      this._likes.some((data) => {
      return this._userId === data._id;
    })) {
      this._heartIcon.classList.add('card__heart-icon_checked');
    }
  }

  _hasTrashIcon() {
    if (this._userId !== this._ownerId) {
      this._trashIcon.classList.add('card__delete-button_hidden');
    }
  }

  toggleHeart(data) {
    this._likes = data.likes;
    this._heartsCount.textContent = this._likes.length;
    this._heartIcon.classList.toggle('card__heart-icon_checked');
  }
}

// function removeCard(card, cardId) {
//   deleteCard(cardId)
//   .then(() => {
//     card.remove();
//   })
//   .catch(err => console.log(err));
// };

// function confirmCardDelete (card, cardId) {
//   const cardToDelete = document.querySelector('.card[data-del="true"]');
//   if (cardToDelete) {
//     cardToDelete.removeAttribute('data-del');
//   }
//   card.dataset.del = 'true';
//   card.dataset.id = cardId;
//   openPopup(popupDeleteCard);
// };

// function handleCardDeleteSubmit(evt) {
//   const cardToDelete = document.querySelector('.card[data-del="true"]');
//   function makeRequest() {
//     if (cardToDelete) {
//       const cardToDeleteId = cardToDelete.dataset.id;
//       return deleteCard(cardToDeleteId)
//       .then(() => {
//         cardToDelete.remove();
//       })
//       .catch(err => console.log(err));
//     };
//   };
//   handleSubmit(makeRequest, evt);
// };

// formDeleteCard.addEventListener('submit', 
//   handleCardDeleteSubmit);

// function toggleHeart(heartIcon, heartsCount, cardId) {
//   if (heartIcon.classList.contains('card__heart-icon_checked')) {
//     removeHeart(cardId)
//     .then(data => {
//       heartIcon.classList.remove('card__heart-icon_checked');
//       heartsCount.textContent = `${data.likes.length}`;
//     })
//     .catch(err => console.log(err));
//   } else {
//     setHeart(cardId)
//     .then(data => {
//       heartIcon.classList.add('card__heart-icon_checked');
//       heartsCount.textContent = `${data.likes.length}`;
//     })
//     .catch(err => console.log(err));
//   }
// }


// function createCard(link, name, cardId, ownerId, likes) {
//   const newCard = cardTemplate.querySelector('.card').cloneNode(true);
//   const cardImage = newCard.querySelector('.card__image');
//   const cardTitle = newCard.querySelector('.card__title');
//   const heartIcon = newCard.querySelector('.card__heart-icon');
//   const heartsCount = newCard.querySelector('.card__hearts-number');
//   const trashIcon = newCard.querySelector('.card__delete-button');

//   newCard.id = cardId;
//   cardImage.src = link;
//   cardImage.alt = `Вид на ${name}.`
//   cardTitle.textContent = name;

//   likes.forEach((like) => {
//     if (like._id === personId) {
//       heartIcon.classList.add('card__heart-icon_checked');
//     }
//   })

//   heartsCount.textContent = `${likes.length}`;

//   heartIcon.addEventListener('click', () => toggleHeart(heartIcon, heartsCount, cardId));

// if (ownerId !== personId) {
//   trashIcon.classList.add('card__delete-button_hidden');
// }

//   trashIcon.addEventListener('click', () => {
//     confirmCardDelete(newCard, cardId);
//   });
//   cardImage.addEventListener('click', function() {
//   popupImageImg.src = link;
//   popupImageImg.alt = `Вид на ${name}.`;
//   popupImageCaption.textContent = name;
//   openPopup(popupImage);
// });
//   return newCard;
// };

// function addCard(newCard) {
//   cardsContainer.prepend(newCard);
// };

// function renderCards(cards) {
//   cards.reverse().forEach(function (el) {
//   el.newCard = createCard(el.link, el.name, el._id, el.owner._id, el.likes);
//   addCard(el.newCard);
// });
// }

// export { addCard, renderCards };