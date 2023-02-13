export type UserModelType = {
  connectionId: string;
  audioActive: boolean;
  videoActive: boolean;
  screenShareActive: boolean;
  nickname: string;
  streamManager: any;
  avatar: string;
  type: string;

  isAudioActive: () => boolean;
  isVideoActive: () => boolean;
  isScreenShareActive: () => boolean;
  getConnectionId: () => string;
  getNickname: () => string;
  getAvatar: () => string;
  getStreamManager: () => any;
  isLocal: () => boolean;
  isRemote: () => boolean;
  setAudioActive: (isAudioActive: boolean) => void;
  setVideoActive: (isVideoActive: boolean) => void;
  setScreenShareActive: (isScreenShareActive: boolean) => void;
  setStreamManager: (streamManager: any) => void;
  setConnectionId: (connectionId: string) => void;
  setNickname: (nickname: string) => void;
  setAvatar: (avatar: string) => void;

  setType: (type: string) => void;
};

class UserModel {
  connectionId: string;
  audioActive: boolean;
  videoActive: boolean;
  screenShareActive: boolean;
  nickname: string;
  streamManager: any;
  avatar: string;
  type: string; // 'remote' | 'local'

  constructor() {
    this.connectionId = "";
    this.audioActive = true;
    this.videoActive = true;
    this.screenShareActive = false;
    this.nickname = "";
    this.streamManager = null;
    this.type = "local";
    this.avatar = "";
  }

  isAudioActive() {
    return this.audioActive;
  }

  isVideoActive() {
    return this.videoActive;
  }

  isScreenShareActive() {
    return this.screenShareActive;
  }

  getConnectionId() {
    return this.connectionId;
  }

  getNickname() {
    return this.nickname;
  }

  getStreamManager() {
    return this.streamManager;
  }
  getAvatar() {
    return this.avatar;
  }

  isLocal() {
    return this.type === "local";
  }
  isRemote() {
    return !this.isLocal();
  }
  setAudioActive(isAudioActive: boolean) {
    this.audioActive = isAudioActive;
  }
  setVideoActive(isVideoActive: boolean) {
    this.videoActive = isVideoActive;
  }
  setScreenShareActive(isScreenShareActive: boolean) {
    this.screenShareActive = isScreenShareActive;
  }
  setStreamManager(streamManager: any) {
    this.streamManager = streamManager;
  }

  setConnectionId(connectionId: string) {
    this.connectionId = connectionId;
  }
  setNickname(nickname: string) {
    this.nickname = nickname;
  }
  setAvatar(avatar: string) {
    this.avatar = avatar;
  }

  setType(type: string) {
    if (type === "local" || type === "remote") {
      this.type = type;
    }
  }
}

export default UserModel;

