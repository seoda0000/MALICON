import React, { Component } from "react";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";

import Send from "@mui/icons-material/Send";

import "./ChatComponent.css";
import { ViewerModelType } from "../../../model/openvidu/viewer-model";
import ProfileImage from "../../common/ProfileImage";
import { SendRounded } from "@mui/icons-material";

// 타입 생성
interface MessageType {
  message: string;
  viewer: ViewerModelType;
  isPublisher: boolean;
}

interface StateType {
  messageList: MessageType[];
  message: string;
}

interface ChatProps {
  user: any;
  chatDisplay: any;
  close: any;
  messageReceived: any;
  isPublisher: boolean;
  localUser?: any;
  handleNickname?: any;
  viewer?: ViewerModelType;
}
// ChatComponent

export default class ChatComponent extends Component<ChatProps, {}> {
  // ChatComponent class 타입 정의
  // =======================================================

  chatScroll: any;
  state: StateType;

  // =======================================================

  constructor(props: ChatProps) {
    super(props);
    this.state = {
      messageList: [],
      message: "",
    };
    this.chatScroll = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handlePressKey = this.handlePressKey.bind(this);
    this.close = this.close.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.props.user
      .getStreamManager()
      .stream.session.on("signal:chat", (event: any) => {
        const data = JSON.parse(event.data);
        let messageList = this.state.messageList;
        // console.log("data.publish", data.isPublisher);
        messageList.push({
          message: data.message,
          viewer: data.viewer,
          isPublisher: data.isPublisher,
        });
        setTimeout(() => {
          this.props.messageReceived();
        }, 50);
        this.setState({ messageList: messageList });
        this.scrollToBottom();
      });
  }

  handleChange(event: any) {
    this.setState({ message: event.target.value });
  }

  handlePressKey(event: any) {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  }

  sendMessage() {
    // console.log(this.state.message);
    if (this.props.user && this.state.message) {
      let message = this.state.message.replace(/ +(?= )/g, "");
      if (message !== "" && message !== " ") {
        const data = {
          message: message,
          viewer: this.props.viewer,
          isPublisher: this.props.isPublisher,
        };
        // console.log("메세지 보낼 때", data);
        this.props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: "chat",
        });
      }
    }
    this.setState({ message: "" });
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.chatScroll.current.scrollTop =
          this.chatScroll.current.scrollHeight;
      } catch (err) {}
    }, 20);
  }

  close() {
    this.props.close(undefined);
  }

  render() {
    const styleChat = { display: this.props.chatDisplay };

    // console.log("chatComponent : ", this.props.localUser);
    // console.log("handleNickname : ", this.props.handleNickname);

    return (
      <div id="chatContainer">
        <div id="chatComponent" style={styleChat}>
          {/* <div id="chatToolbar">
            <span>
              CHAT
            </span>
          </div> */}

          <div className="message-wrap" ref={this.chatScroll}>
            {this.state.messageList.map((data, i) => (
              <div
                key={i}
                id="remoteUsers_chat"
                className={"message" + (!data.isPublisher ? " left" : " right")}
              >
                <div className="msg-avatar">
                  <ProfileImage userAvatar={data.viewer.avatar} />
                </div>
                <div className="msg-detail">
                  <div className="msg-info">
                    <p> {data.viewer.nickname}</p>
                  </div>
                  <div className="msg-content">
                    <span className="triangle" />
                    <p className="text">{data.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div id="messageInput">
            <input
              placeholder="Send a messge"
              id="chatInput"
              value={this.state.message}
              onChange={this.handleChange}
              onKeyPress={this.handlePressKey}
            />
            <Tooltip title="Send message">
              <Fab size="small" id="sendButton" onClick={this.sendMessage}>
                <SendRounded />
              </Fab>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}
