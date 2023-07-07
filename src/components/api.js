export default class Api {
  constructor(config) {
    this._baseUrl = config.baseUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } 
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  getUserData () {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers
    });
  }

  getInitialCards () {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers
    });
  }

  updateUserData (userData) {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    });
  }

  updateCard (data) {
    return this._request(`${this._baseUrl}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  setHeart = (cardId) => {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "PUT",
    });
  }

  removeHeart = (cardId) => {
    return this._request(`${this._baseUrl}/cards/likes/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  deleteCard = (cardId) => {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      headers: this._headers,
      method: "DELETE",
    });
  }

  updateAvatar = (newAvatar) => {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({
        avatar: newAvatar
      })
    });
  }
}