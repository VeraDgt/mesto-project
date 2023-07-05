export class UserInfo {
  constructor(profileAvatar, profileName, profileDescription) {
    this._profileAvatar = profileAvatar,
    this._profileName = profileName,
    this._profileDescription = profileDescription;
  }
  getUserInfo() {
    const dataUserInfo = {
        profileNameInput: this._profileName.textcontent,
        profileDescriptionInput: this._profileDescription.textcontent
    }
    return dataUserInfo;
  }
  setUserInfo(userData) {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    personId = userData._id;
  }
  editAvatar(userData) {
    this._profileAvatar.scr = userData.avatar
  }
}