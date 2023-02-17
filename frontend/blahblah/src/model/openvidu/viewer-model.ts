export type ViewerModelType = {
  nickname: string;
  avatar: string;

  getNickname: () => string;
  getAvatar: () => string;
  setNickname: (nickname: string) => void;
  setAvatar: (avatar: string) => void;
};

class ViewerModel {
  nickname: string;
  avatar: string;

  constructor() {
    this.nickname = "";
    this.avatar = "";
  }

  getNickname() {
    return this.nickname;
  }

  getAvatar() {
    return this.avatar;
  }

  setNickname(nickname: string) {
    this.nickname = nickname;
  }

  setAvatar(avatar: string) {
    this.avatar = avatar;
  }
}

export default ViewerModel;

