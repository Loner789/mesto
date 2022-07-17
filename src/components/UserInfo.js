export default class UserInfo {
  constructor({ userName, userInfo }) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
  }

  getUserInfo() {
    this._userData = {
      name: this._userName.textContent,
      info: this._userInfo.textContent,
    };

    return this._userData;
  }

  setUserInfo(item) {
    this._userName.textContent = item.name;
    this._userInfo.textContent = item.info;
  }
}
