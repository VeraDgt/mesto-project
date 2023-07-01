import { buttonsClosePopups } from '../utils/constants.js'

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
};
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
};

function closeByEsc(evt) {
  if (evt.key == 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  };
};

function clickOnOverlayHandler(evt) {
  evt.stopImmediatePropagation();
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(evt.target);
  };
};

buttonsClosePopups.forEach((item) => {
  item.addEventListener('click', function(evt) { 
    const popup = evt.target.closest('.popup');
    closePopup(popup);
  });
});

export { clickOnOverlayHandler, openPopup, closePopup }; 
