export default class Api {
  constructor(mainUrl, headers) {
    this._mainUrl = mainUrl;
    this._headers = headers;
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._mainUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: `${this._headers.authorization}`,
      },
    }).then(this._checkResult);
  }

  getUserInfo() {
    return fetch(`${this._mainUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `${this._headers.authorization}`,
      },
    }).then(this._checkResult);
  }

  setUserInfo(data) {
    return fetch(`${this._mainUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResult);
  }

  addNewCard(data) {
    return fetch(`${this._mainUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResult);
  }

  deleteCard(cardId) {
    return fetch(`${this._mainUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResult);
  }

  addLike(cardId) {
    return fetch(`${this._mainUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResult);
  }

  deleteLike(cardId) {
    return fetch(`${this._mainUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResult);
  }

  setUserAvatar(data) {
    return fetch(`${this._mainUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._checkResult);
  }
}
