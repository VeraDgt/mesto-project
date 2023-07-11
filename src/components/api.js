import { request } from './utils.js'

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25', 
  headers: {
    authorization: '93cf6edd-b0e6-426e-82f8-64302cc26990',
    'Content-Type': 'application/json'
  }
}

const getUserData = () => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers
  });
};

const getInitialCards = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers
  });
};

const updateUserData = (uName, description) => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      name: uName,
      about: description
    })
  });
};

const updateCard = (cardName, cardlink) => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
    body: JSON.stringify({
      name: cardName,
      link: cardlink
    })
  });
};

const setHeart = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "PUT",
  });
};

const removeHeart = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  });
};

const deleteCard = (cardId) => {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: "DELETE",
  });
};

const updateAvatar = (newAvatar) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: "PATCH",
    body: JSON.stringify({
      avatar: newAvatar
    })
  });
};


export { getUserData, getInitialCards, updateUserData, updateCard, setHeart, removeHeart, deleteCard, updateAvatar }