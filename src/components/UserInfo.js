export default class UserInfo {
  constructor({ profileAvatar, profileName, profileDescription }) {
    this._profileAvatar = document.querySelector(profileAvatar),
    this._profileName = document.querySelector(profileName),
    this._profileDescription = document.querySelector(profileDescription);
  }
  getUserInfo() {
    const dataUserInfo = {
        profileNameInput: this._profileName.textContent,
        profileDescriptionInput: this._profileDescription.textContent
    }
    return dataUserInfo;
  }
  setUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileDescription.textContent = userData.about;
  }
  editAvatar(userData) {
    this._profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
  }
}