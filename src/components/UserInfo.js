export class UserInfo {
  constructor(profileAvatar, profileName, profileDescription) {
    this._profileAvatar = profileAvatar,
    this._profileName = profileName,
    this._profileDescription = profileDescription;
  }
  getUserInfo() {
    const dataUserInfo = {
        profileNameInput: this._profileName.value,
        profileDescriptionInput: this._profileDescription.value
    }
    return dataUserInfo;
  }
  setUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileDescription.textContent = userData.about;
    personId = userData._id;
  }
  editAvatar(userData) {
    this._profileAvatar.scr = userData.avatar
  }
}