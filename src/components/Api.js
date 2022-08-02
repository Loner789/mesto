export default class Api {
  constructor(host, token) {
    this._host = host;
    this._token = token;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._host}/cards`, {
      method: "GET",
      headers: {
        authorization: `${this._token}`,
      },
    }).then(this._checkResult);
  }

  getUserInfo() {
    return fetch(`${this._host}/users/me`, {
      method: "GET",
      headers: {
        authorization: `${this._token}`,
      },
    }).then(this._checkResult);
  }

  setUserInfo(data) {
    return fetch(`${this._host}/users/me`, {
      method: "PATCH",
      headers: this._token,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResult);
  }

  addNewCard(data) {
    return fetch(`${this._host}/cards`, {
      method: "POST",
      headers: this._token,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResult);
  }

  deleteCard(cardId) {
    return fetch(`${this._host}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._token,
    }).then(this._checkResult);
  }

  addLike(cardId) {
    return fetch(`${this._host}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._token,
    }).then(this._checkResult);
  }

  deleteLike(cardId) {
    return fetch(`${this._host}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._token,
    }).then(this._checkResult);
  }

  setUserAvatar(data) {
    return fetch(`${this._host}/users/me/avatar`, {
      method: "PATCH",
      headers: this._token,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResult);
  }
}
