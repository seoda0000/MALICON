import axios from "axios";
import { OpenVidu } from "openvidu-browser";
import React, { Component } from "react";
import ChatComponent from "./chat/ChatComponent";
import DialogExtensionComponent from "./dialog-extension/DialogExtension";
import StreamComponent from "./stream/StreamComponent";
import "./VideoRoomComponent.css";

import OpenViduLayout from "../layout/openvidu-layout";
import UserModel, { UserModelType } from "../../model/openvidu/user-model";
import {SessionType} from "../../model/broadcast/sessionType";
import ToolbarComponent from "./toolbar/ToolbarComponent";
import { getAccessToken } from "../../redux/modules/user/token";
import html2canvas from "html2canvas";
import AvatarSection from "./avatar/AvatarSection";
import { axiosInitializer } from "../../redux/utils/axiosInitializer";
import { UserType } from "../../model/user/userType";

import ViewerModel, {
  ViewerModelType,
} from "../../model/openvidu/viewer-model";

var localViewer: ViewerModelType = new ViewerModel();
var localUser: UserModelType = new UserModel();

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://blahblah.movebxeax.me/stream-service"
    : "https://blahblah.movebxeax.me/stream-service";

const APPLICATION_CONTEXT_PATH = window.location.origin;

// 타입 생성
interface VideoRoomProps {
  user: UserType;
  currentSession: SessionType;
}

interface StateType {
  localUser: any;
  localViewer: ViewerModelType;
  session: any;
  myUserName: any;
  mySessionId: any;
  myUserAvatar: any;
  subscribers: UserModelType[];
  viewers: ViewerModelType[];
  chatDisplay: any;
  currentVideoDevice: any;
  showExtensionDialog?: any;
  messageReceived?: any;
  streamInfo: SessionType;
}

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
  }

  interface HTMLElement {
    msRequestFullscreen?: () => Promise<void>;
    mozRequestFullscreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
    mozRequestFullScreen?: () => Promise<void>;
    videoWidth?: any;
    videoHeight?: any;
  }
}

// VideoRoomComponent
class VideoRoomComponent extends Component<VideoRoomProps, {}> {
  hasBeenUpdated: any;
  layout: any;
  localUserAccessAllowed: any;
  isPublisher: boolean;
  state: StateType;
  remotes: UserModelType[];
  OV: any;
  mySessionId: any;

  constructor(props: VideoRoomProps) {
    super(props);
    this.hasBeenUpdated = false;
    this.layout = new OpenViduLayout();
    let userName = this.props.user.nickName;
    let userAvatar = this.props.user.avatar;
    let currentSession = this.props.currentSession;

    console.log("session 이름그 : ", currentSession.sessionId);
    this.remotes = [];
    this.localUserAccessAllowed = false;
    this.isPublisher = false;
    this.state = {
      mySessionId: currentSession.sessionId,
      myUserName: userName,
      myUserAvatar: userAvatar,
      streamInfo: currentSession,
      session: undefined,
      localUser: undefined,
      localViewer: new ViewerModel(),
      subscribers: [],
      viewers: [],
      chatDisplay: "none",
      currentVideoDevice: undefined,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.updateLayout = this.updateLayout.bind(this);
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    //this.nicknameChanged = this.nicknameChanged.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    // this.switchCamera = this.switchCamera.bind(this);
    this.closeDialogExtension = this.closeDialogExtension.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
    this.checkNotification = this.checkNotification.bind(this);
    this.checkSize = this.checkSize.bind(this);
    this.captureThumbnail = this.captureThumbnail.bind(this);
    this.sendThumbnail = this.sendThumbnail.bind(this);
    // 여기부터
    this.subscriberCreated = this.subscriberCreated.bind(this);
    this.sendSignalSubcriberCreated =
      this.sendSignalSubcriberCreated.bind(this);
    this.deleteViewer = this.deleteViewer.bind(this);
    this.subscriberDeleted = this.subscriberDeleted.bind(this);
    this.sendSignalSubcriberDeleted =
      this.sendSignalSubcriberDeleted.bind(this);
    this.sendSignalViewersBroadCast =
      this.sendSignalViewersBroadCast.bind(this);
    this.viewerBroadCastListener = this.viewerBroadCastListener.bind(this);
    this.thumbnailReapeat = this.thumbnailReapeat.bind(this);
  }

  componentDidMount() {
    const openViduLayoutOptions = {
      maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
      minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
      fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
      bigClass: "OV_big", // The class to add to elements that should be sized bigger
      bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
      bigFixedRatio: false, // fixedRatio for the big ones
      bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
      bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
      bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
      animate: true, // Whether you want to animate the transitions
    };

    this.layout.initLayoutContainer(
      document.getElementById("layout"),
      openViduLayoutOptions
    );
    window.addEventListener("beforeunload", this.onbeforeunload);
    window.addEventListener("resize", this.updateLayout);
    window.addEventListener("resize", this.checkSize);
    this.joinSession();
  }

  componentWillUnmount() {
    window.removeEventListener("beforeunload", this.onbeforeunload);
    window.removeEventListener("resize", this.updateLayout);
    window.removeEventListener("resize", this.checkSize);
    this.leaveSession();
  }

  onbeforeunload(event: any) {
    this.leaveSession();
  }

  joinSession() {
    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      async () => {
        this.subscribeToStreamCreated();

        await this.connectToSession().then(() => {
          if (this.isPublisher) {
            this.subscriberDeleted();
            this.subscriberCreated();
          } else {
            this.viewerBroadCastListener();
          }
        });
      }
    );
  }

  async connectToSession() {
    try {
      var token = await this.getToken();
      console.log(token);
      this.connect(token);
    } catch (error: any) {
      alert("방송 중이 아닙니다.");
      console.error(
        "There was an error getting the token:",
        error.code,
        error.message
      );
      window.location.replace(APPLICATION_CONTEXT_PATH + "/main");
    }
  }

  connect(token: any) {
    this.state.session
      .connect(token, { clientData: this.state.myUserName })
      .then(() => {
        this.connectWebCam().then(() => {
          if (this.isPublisher) {
            /* 팔로워 알림 전송 */
            const axios = axiosInitializer();
            axios.post(
              "/api/notifications/send",
              {
                msg: `${this.state.myUserName} 님이 콘서트를 연대요! 빨리 가서 확인해볼까요?`,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Baerer " + getAccessToken(),
                },
              }
            );

            setTimeout(() => {
              console.log("썸네일 보내냐?");
              this.sendThumbnail();
              this.startRecording(this.state.mySessionId)
                .then((data) => console.log(data))
                .catch((e) => console.error(e));
            }, 1000);
            this.thumbnailReapeat();
          }
        });
      })
      .catch((error: any) => {
        alert("방송 중이 아닙니다.");
        console.log(
          "There was an error connecting to the session:",
          error.code,
          error.message
        );
        window.location.replace(APPLICATION_CONTEXT_PATH + "/main");
      });
  }

  async connectWebCam() {
    await this.OV.getUserMedia({
      audioSource: undefined,
      videoSource: undefined,
    });
    var devices = await this.OV.getDevices();
    var videoDevices = devices.filter(
      (device: any) => device.kind === "videoinput"
    );

    let publisher = this.OV.initPublisher(undefined, {
      audioSource: undefined,
      videoSource: videoDevices[0].deviceId,
      publishAudio: localUser.isAudioActive(),
      publishVideo: localUser.isVideoActive(),
      resolution: "1280x960",
      frameRate: 30,
      insertMode: "APPEND",
    });
    if (this.state.session.capabilities.publish && this.isPublisher) {
      this.state.session.publish(publisher).then(() => {
        this.updateSubscribers();
        this.localUserAccessAllowed = true;
      });
    } else {
      //내가 시청자라면 방송송출 안하고 다른 사람꺼 받아오기만한다.
      this.updateSubscribers();
    }
    localUser.setNickname(this.state.myUserName);
    localUser.setConnectionId(this.state.session.connection.connectionId);
    localUser.setScreenShareActive(false);
    localUser.setStreamManager(publisher);
    localUser.setAvatar(this.state.myUserAvatar);

    localViewer.setNickname(this.state.myUserName);
    localViewer.setAvatar(this.state.myUserAvatar);

    this.subscribeToUserChanged();
    this.subscribeToStreamDestroyed();
    console.log("센도 시그널 유저 첸지");
    this.sendSignalUserChanged({
      isScreenShareActive: localUser.isScreenShareActive(),
      avatar: localUser.getAvatar(),
    });
    if (!this.isPublisher) {
      this.sendSignalSubcriberCreated(localViewer);
    }

    this.setState(
      { currentVideoDevice: videoDevices[0], localUser: localUser },
      () => {
        this.state.localUser
          .getStreamManager()
          .on("streamPlaying", (e: any) => {
            this.updateLayout();
            publisher.videos[0].video.parentElement.classList.remove(
              "custom-class"
            );
          });
      }
    );
  }

  updateSubscribers() {
    var subscribers = this.remotes;
    this.setState(
      {
        subscribers: subscribers,
      },
      () => {
        if (this.state.localUser) {
          this.sendSignalUserChanged({
            isAudioActive: this.state.localUser.isAudioActive(),
            isVideoActive: this.state.localUser.isVideoActive(),
            nickname: this.state.localUser.getNickname(),
            isScreenShareActive: this.state.localUser.isScreenShareActive(),
            avatar: this.state.localUser.getAvatar(),
          });
        }
        this.updateLayout();
      }
    );
  }

  leaveSession() {
    console.log("Leave!!!!!!!!!!!!!!!!!!!!!!");
    const mySession = this.state.session;

    if (mySession) {
      if (this.isPublisher) {
        console.log("세션 지우기");
        this.deleteSession(this.state.mySessionId)
          .then(() => {
            mySession.disconnect();
            window.location.replace(APPLICATION_CONTEXT_PATH + "/main");
          })
          .catch((e) => {
            console.error(e);
          });
      } else {
        this.sendSignalSubcriberDeleted(localViewer);
        mySession.disconnect();
        window.location.replace(APPLICATION_CONTEXT_PATH + "/main");
      }
    }
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: this.state.mySessionId,
      myUserName: this.state.myUserName,
      localUser: undefined,
    });
  }
  camStatusChanged() {
    localUser.setVideoActive(!localUser.isVideoActive());
    localUser.getStreamManager().publishVideo(localUser.isVideoActive());
    this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
    this.setState({ localUser: localUser });
  }

  micStatusChanged() {
    localUser.setAudioActive(!localUser.isAudioActive());
    localUser.getStreamManager().publishAudio(localUser.isAudioActive());
    this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
    this.setState({ localUser: localUser });
  }

  // nicknameChanged(nickname: any) {
  //   let localUser = this.state.localUser;
  //   localUser.setNickname(nickname);
  //   this.setState({ localUser: localUser });
  //   this.sendSignalUserChanged({
  //     nickname: this.state.localUser.getNickname(),
  //   });
  // }

  deleteSubscriber(stream: any) {
    const remoteUsers = this.state.subscribers;
    const userStream = remoteUsers.filter(
      (user: any) => user.getStreamManager().stream === stream
    )[0];
    let index = remoteUsers.indexOf(userStream, 0);

    if (index > -1) {
      remoteUsers.splice(index, 1);
      this.setState({
        subscribers: remoteUsers,
      });
    }
  }

  // 스트리머 방송 입장시
  // 스트리머를 모든 시청자에게 추가하는 이벤트 핸들러
  subscribeToStreamCreated() {
    this.state.session.on("streamCreated", (event: any) => {
      const subscriber = this.state.session.subscribe(event.stream, undefined);
      console.log("subscribeToStreamCreated 376 + 누군가가 생성됐다!");
      subscriber.on("streamPlaying", (e: any) => {
        subscriber.videos[0].video.parentElement.classList.remove(
          "custom-class"
        );
      });
      const newUser = new UserModel();
      newUser.setStreamManager(subscriber);
      newUser.setConnectionId(event.stream.connection.connectionId);
      newUser.setType("remote");
      const nickname = event.stream.connection.data.split("%")[0];
      newUser.setNickname(JSON.parse(nickname).clientData);
      console.log("그 누군가는", newUser);
      this.remotes.push(newUser);
      if (this.localUserAccessAllowed) {
        this.updateSubscribers();
      }
    });
  }

  subscriberCreated() {
    this.state.session.on("signal:subscribe", (event: any) => {
      console.log("구독자가 들어왔삼용! ㅋ");
      const viewer = JSON.parse(event.data);
      let viewers = [...this.state.viewers, viewer];
      this.setState({
        viewers: viewers,
      });
      this.sendSignalViewersBroadCast(viewers);
    });
  }

  subscriberDeleted() {
    this.state.session.on("signal:unSubscribe", (event: any) => {
      const viewer = JSON.parse(event.data);
      console.log("구독자가 나갔슴용! ㅜ");
      this.deleteViewer(viewer).then(() => {
        this.sendSignalViewersBroadCast(this.state.viewers);
      });
    });
  }

  async viewerBroadCastListener() {
    this.state.session.on("signal:viewerBroadCast", (event: any) => {
      const viewers = JSON.parse(event.data);
      console.log("브로드캐스트 당해버려!!", viewers);
      this.setState({
        viewers: viewers,
      });
    });
  }

  async deleteViewer(deletedViewer: ViewerModel) {
    console.log("뷰어를 지워버려");
    const viewers = this.state.viewers;
    console.log("뷰어 지우기 직전 찍기", viewers);
    const viewer = viewers.filter(
      (v: ViewerModel) => v.nickname === deletedViewer.nickname
    )[0];
    let index = viewers.indexOf(viewer, 0);
    console.log("뷰어지우는 인덱스", index);
    if (index > -1) {
      viewers.splice(index, 1);
      this.setState({
        viewers: viewers,
      });
    }
  }

  sendSignalSubcriberCreated(data: any) {
    console.log("구독자 생성됐음을 알려버려");
    const signalOptions = {
      data: JSON.stringify(data),
      type: "subscribe",
    };
    this.state.session.signal(signalOptions);
  }

  sendSignalSubcriberDeleted(data: any) {
    console.log("구독자 삭제됐음을 알려버려");
    const signalOptions = {
      data: JSON.stringify(data),
      type: "unSubscribe",
    };
    this.state.session.signal(signalOptions);
  }

  sendSignalViewersBroadCast(viewers: ViewerModel[]) {
    console.log("브로드 캐스트 한다고 알려버려");
    const signalOptions = {
      data: JSON.stringify(viewers),
      type: "viewerBroadCast",
    };
    this.state.session.signal(signalOptions);
  }

  // 스트리머가 방송을 종료하면 streamDestroyed 이벤트 발생
  // 모든 시청자는 방송을 떠나게 된다.
  // leaveSession 함수 앞에 원하는 작업 추가 가능
  subscribeToStreamDestroyed() {
    this.state.session.on("streamDestroyed", (event: any) => {
      console.log("subscribeToStreamCreated 401 + 누군가가 떠났다!");
      console.log("stream : ", event.stream);
      alert("방송이 종료되었습니다.");
      this.leaveSession();
    });
  }

  subscribeToUserChanged() {
    this.state.session.on("signal:userChanged", (event: any) => {
      let remoteUsers = this.state.subscribers;

      remoteUsers.forEach((user: any) => {
        if (user.getConnectionId() === event.from.connectionId) {
          const data = JSON.parse(event.data);
          console.log("EVENTO REMOTE: ", event.data);
          if (data.isAudioActive !== undefined) {
            user.setAudioActive(data.isAudioActive);
          }
          if (data.isVideoActive !== undefined) {
            user.setVideoActive(data.isVideoActive);
          }
          if (data.nickname !== undefined) {
            user.setNickname(data.nickname);
          }
          if (data.avatar !== undefined) {
            user.setAvatar(data.avatar);
          }
        }
      });
      this.setState({
        subscribers: remoteUsers,
      });
    });
  }

  updateLayout() {
    setTimeout(() => {
      this.layout.updateLayout();
    }, 20);
  }

  sendSignalUserChanged(data: any) {
    const signalOptions = {
      data: JSON.stringify(data),
      type: "userChanged",
    };
    this.state.session.signal(signalOptions);
  }

  toggleFullscreen() {
    const document = window.document;
    const fs = document.getElementById("container");
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (fs?.requestFullscreen) {
        fs.requestFullscreen();
      } else if (fs?.msRequestFullscreen) {
        fs.msRequestFullscreen();
      } else if (fs?.mozRequestFullScreen) {
        fs.mozRequestFullScreen();
      } else if (fs?.webkitRequestFullscreen) {
        fs.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  // async switchCamera() {
  //   try {
  //     const devices = await this.OV.getDevices();
  //     var videoDevices = devices.filter(
  //       (device: any) => device.kind === "videoinput"
  //     );

  //     if (videoDevices && videoDevices.length > 1) {
  //       var newVideoDevice = videoDevices.filter(
  //         (device: any) =>
  //           device.deviceId !== this.state.currentVideoDevice.deviceId
  //       );

  //       if (newVideoDevice.length > 0) {
  //         var newPublisher = this.OV.initPublisher(undefined, {
  //           audioSource: undefined,
  //           videoSource: newVideoDevice[0].deviceId,
  //           publishAudio: localUser.isAudioActive(),
  //           publishVideo: localUser.isVideoActive(),
  //           mirror: true,
  //         });
  //         await this.state.session.unpublish(
  //           this.state.localUser.getStreamManager()
  //         );
  //         await this.state.session.publish(newPublisher);
  //         this.state.localUser.setStreamManager(newPublisher);
  //         this.setState({
  //           currentVideoDevice: newVideoDevice,
  //           localUser: localUser,
  //         });
  //       }
  //     }
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  closeDialogExtension() {
    this.setState({ showExtensionDialog: false });
  }

  toggleChat(property: any) {
    let display = property;

    if (display === undefined) {
      display = this.state.chatDisplay === "none" ? "block" : "none";
    }
    if (display === "block") {
      this.setState({ chatDisplay: display, messageReceived: false });
    } else {
      console.log("chat", display);
      this.setState({ chatDisplay: display });
    }
    this.updateLayout();
  }

  checkNotification(event: any) {
    this.setState({
      messageReceived: this.state.chatDisplay === "none",
    });
  }
  checkSize() {
    if (
      // 단언으로 에러 해결
      document.getElementById("layout")!.offsetWidth <= 700 &&
      !this.hasBeenUpdated
    ) {
      this.toggleChat("none");
      this.hasBeenUpdated = true;
    }
    if (
      // 단언으로 에러 해결
      document.getElementById("layout")!.offsetWidth > 700 &&
      this.hasBeenUpdated
    ) {
      this.hasBeenUpdated = false;
    }
  }

  async captureThumbnail() {
    let id = "video-" + localUser.getStreamManager().stream.streamId;
    console.log("아이디는 이거에옹 ", id);
    return await html2canvas(document.getElementById(id) as HTMLElement)
      .then((canvas) => {
        return encodeURIComponent(
          canvas.toDataURL("image/jpeg", 0.3).split(",")[1]
        );
      })
      .catch((e) => {
        console.error(e);
      });
  }

  async sendThumbnail() {
    let encodedImage = await this.captureThumbnail();
    console.log("썸네일", encodedImage);
    this.createThumbnail(this.state.mySessionId, encodedImage)
      .then((data) => console.log(data))
      .catch((e) => console.error(e));
    // 아래 함수는 이미지화 하는 법
    // const decodedImage = decodeURIComponent(encodedImage);
    // const imageElement = document.createElement('img');
    // imageElement.src = `data:image/jpeg;base64,${decodedImage}`
  }

  thumbnailReapeat() {
    setInterval(() => {
      this.sendThumbnail();
    }, 60000);
  }

  render() {
    const mySessionId = this.state.mySessionId;
    const localUser = this.state.localUser;
    var chatDisplay = { display: this.state.chatDisplay };

    return (
      <div className="container" id="container">
        <ToolbarComponent
          user={localUser}
          showNotification={this.state.messageReceived}
          camStatusChanged={this.camStatusChanged}
          micStatusChanged={this.micStatusChanged}
          toggleFullscreen={this.toggleFullscreen}
          exitButton={this.leaveSession}
          toggleChat={this.toggleChat}
          isPublisher={this.isPublisher}
          streamInfo={this.state.streamInfo}
        />

        {/* <DialogExtensionComponent
          showDialog={this.state.showExtensionDialog}
          cancelClicked={this.closeDialogExtension}
        /> */}

        <div id="layout" className="bounds">
          {/* 스트리머 화면 */}
          {!this.isPublisher &&
            this.state.subscribers.map((sub: any, i: any) => (
              <div
                key={i}
                className="OT_root OT_publisher custom-class"
                id="remoteUsers"
              >
                <StreamComponent
                  user={sub}
                  streamId={sub.streamManager.stream.streamId}
                  isStreamer={true}
                  isPublisher={true}
                />
              </div>
            ))}

          {/* 내화면 */}
          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined &&
            localUser.isVideoActive() && (
              <div
                className={
                  "OT_root custom-class" +
                  (this.isPublisher ? "" : " viewer-cam")
                }
                id="localUser"
              >
                <StreamComponent
                  user={localUser}
                  //handleNickname={this.nicknameChanged}
                  isPublisher={this.isPublisher}
                />
              </div>
            )}

          {localUser !== undefined &&
            localUser.getStreamManager() !== undefined && (
              <div
                className={
                  "OT_root OT_publisher custom-class chatviewer" +
                  (this.isPublisher ? " streamer-chatviewer" : "")
                }
                style={chatDisplay}
              >
                <ChatComponent
                  user={localUser}
                  chatDisplay={this.state.chatDisplay}
                  viewer={localViewer}
                  close={this.toggleChat}
                  messageReceived={this.checkNotification}
                  isPublisher={this.isPublisher}
                />
              </div>
            )}
        </div>
        {localUser !== undefined &&
          localUser.getStreamManager() !== undefined && (
            <AvatarSection user={localUser} viewers={this.state.viewers} />
          )}
      </div>
    );
  }
  async getToken() {
    return await this.createToken(this.state.mySessionId);
  }
  async createToken(sessionId: any) {
    const { data } = await axios.post(
      APPLICATION_SERVER_URL + "/api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Baerer " + getAccessToken(),
        },
      }
    );
    this.isPublisher = data.role === "PUBLISHER";
    console.log("커넥션 : ", data, " isPulisher : ", this.isPublisher);
    return data.token; // The token
  }

  async deleteSession(sessionId: any) {
    console.log("delete 요청 보내");
    const { data } = await axios.delete(
      APPLICATION_SERVER_URL + "/api/sessions/" + sessionId,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Baerer " + getAccessToken(),
        },
      }
    );
    return data;
  }

  async createThumbnail(sessionId: any, thumbnailImage: any) {
    const { data } = await axios.put(
      APPLICATION_SERVER_URL + "/api/sessions/" + sessionId,
      {
        thumbnail: thumbnailImage,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Baerer " + getAccessToken(),
        },
      }
    );
    return data;
  }

  async startRecording(sessionId: any) {
    const { data } = await axios.get(
      APPLICATION_SERVER_URL + "/api/recording/" + sessionId,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Baerer " + getAccessToken(),
        },
      }
    );
    return data;
  }
}
export default VideoRoomComponent;
