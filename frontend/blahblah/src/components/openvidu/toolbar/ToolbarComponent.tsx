import React, { Component } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Mic from "@mui/icons-material/Mic";
import MicOff from "@mui/icons-material/MicOff";
import Videocam from "@mui/icons-material/Videocam";
import VideocamOff from "@mui/icons-material/VideocamOff";
import Fullscreen from "@mui/icons-material/Fullscreen";
import FullscreenExit from "@mui/icons-material/FullscreenExit";
import SwitchVideoIcon from "@mui/icons-material/SwitchVideo";
import PictureInPicture from "@mui/icons-material/PictureInPicture";
import ScreenShare from "@mui/icons-material/ScreenShare";
import StopScreenShare from "@mui/icons-material/StopScreenShare";
import Tooltip from "@mui/material/Tooltip";
import PowerSettingsNew from "@mui/icons-material/PowerSettingsNew";
import QuestionAnswer from "@mui/icons-material/QuestionAnswer";

import IconButton from "@mui/material/IconButton";
import { SessionType } from "../../../model/broadcast/sessionType";
import { ToolbarComponentContainer } from "./ToolbarComponentStyle";
import ProfileImage from "../../common/ProfileImage";
import { VolumeOff, VolumeUp } from "@mui/icons-material";

const logo = require("../../../assets/img/ticket_icon.png");

// 타입 생성

interface ToolbarProps {
  micStatusChanged: any;
  camStatusChanged: any;
  // screenShare: any;
  // stopScreenShare: any;
  toggleFullscreen: any;
  // switchCamera: any;
  exitButton: any;
  toggleChat: any;
  //sessionId: any;
  user: any;
  isPublisher: any;
  showNotification: any;
  streamInfo: SessionType;
  mutedSound: boolean;
  toggleSound: any;
}

interface StateType {
  fullscreen: boolean;
}

export default class ToolbarComponent extends Component<ToolbarProps, {}> {
  // ToolbarComponent class 타입 정의
  // =======================================================

  state: StateType;

  // =======================================================

  constructor(props: ToolbarProps) {
    super(props);
    this.state = { fullscreen: false };
    this.camStatusChanged = this.camStatusChanged.bind(this);
    this.micStatusChanged = this.micStatusChanged.bind(this);
    //this.screenShare = this.screenShare.bind(this);
    //this.stopScreenShare = this.stopScreenShare.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    //this.switchCamera = this.switchCamera.bind(this);
    this.exitButton = this.exitButton.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  // screenShare() {
  //   this.props.screenShare();
  // }

  // stopScreenShare() {
  //   this.props.stopScreenShare();
  // }

  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
    this.props.toggleFullscreen();
  }

  // switchCamera() {
  //   this.props.switchCamera();
  // }

  exitButton() {
    this.props.exitButton();
  }

  toggleChat() {
    this.props.toggleChat();
  }

  render() {
    const streamInfo = this.props.streamInfo;
    const localUser = this.props.user;
    return (
      <ToolbarComponentContainer className="toolbar" id="header">
        <Toolbar className="toolbar">
          <div className="header-wrapper">
            {/* 헤더 왼쪽 */}
            {this.props.streamInfo && (
              <div className="broadcast-info">
                <span className="title">{streamInfo.title}</span>
                <div className="streamer">
                  <ProfileImage userAvatar={streamInfo.streamer.avatar} />
                  <span>{streamInfo.streamer.nickName}</span>
                </div>
              </div>
            )}
            {/* 헤더 오른쪽 */}
            <div className="button-wrapper">
              <div className="buttons">
                {/* 마이크 버튼 */}
                {this.props.isPublisher && (
                  <IconButton
                    color="inherit"
                    className="navButton"
                    id="navMicButton"
                    onClick={this.micStatusChanged}
                  >
                    {localUser !== undefined && localUser.isAudioActive() ? (
                      <Mic />
                    ) : (
                      <MicOff style={{ color: "#54d7c7" }} />
                    )}
                  </IconButton>
                )}

                {/* 캠 버튼 */}
                {
                  //this.props.isPublisher &&
                  <IconButton
                    color="inherit"
                    className={
                      "navButton:" + (this.props.isPublisher ? "" : " mycam")
                    }
                    id="navCamButton"
                    onClick={this.camStatusChanged}
                  >
                    {localUser !== undefined && localUser.isVideoActive() ? (
                      <Videocam />
                    ) : (
                      <VideocamOff style={{ color: "#54d7c7" }} />
                    )}
                  </IconButton>
                }

                <IconButton
                  color="inherit"
                  onClick={this.toggleChat}
                  id="navChatButton"
                >
                  {this.props.showNotification && (
                    <div id="point" className="" />
                  )}
                  <Tooltip title="Chat">
                    <QuestionAnswer
                      style={{
                        color: this.props.toggleChat ? "#54d7c7" : "#ffffff",
                      }}
                    />
                  </Tooltip>
                </IconButton>
                {/* 스트리머 조용히해 버튼 */}
                <IconButton id="volumeButton" onClick={this.props.toggleSound}>
                  {this.props.mutedSound ? (
                    <VolumeOff style={{ color: "#54d7c7" }} />
                  ) : (
                    <VolumeUp style={{ color: "#ffffff" }} />
                  )}
                </IconButton>
                {/* 풀스크린 버튼 */}
                <IconButton
                  color="inherit"
                  className="navButton"
                  onClick={this.toggleFullscreen}
                >
                  {localUser !== undefined && this.state.fullscreen ? (
                    <FullscreenExit />
                  ) : (
                    <Fullscreen />
                  )}
                </IconButton>

                {/* 퇴장 버튼 */}
                <IconButton
                  style={{ color: "#54d7c7" }}
                  className="navButton"
                  onClick={this.exitButton}
                  id="navLeaveButton"
                >
                  <PowerSettingsNew />
                </IconButton>
              </div>
              <img className="logo" alt="OpenVidu Logo" src={logo} />
            </div>
          </div>
        </Toolbar>
      </ToolbarComponentContainer>
    );
  }
}

