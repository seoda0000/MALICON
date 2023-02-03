import React, { Component } from "react";
import "./ToolbarComponent.css";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Mic from "@material-ui/icons/Mic";
import MicOff from "@material-ui/icons/MicOff";
import Videocam from "@material-ui/icons/Videocam";
import VideocamOff from "@material-ui/icons/VideocamOff";
import Fullscreen from "@material-ui/icons/Fullscreen";
import FullscreenExit from "@material-ui/icons/FullscreenExit";
import SwitchVideoIcon from "@material-ui/icons/SwitchVideo";
import PictureInPicture from "@material-ui/icons/PictureInPicture";
import ScreenShare from "@material-ui/icons/ScreenShare";
import StopScreenShare from "@material-ui/icons/StopScreenShare";
import Tooltip from "@material-ui/core/Tooltip";
import PowerSettingsNew from "@material-ui/icons/PowerSettingsNew";
import QuestionAnswer from "@material-ui/icons/QuestionAnswer";

import IconButton from "@material-ui/core/IconButton";

const logo = require("../../assets/images/openvidu_logo.png");

// 타입 생성

interface ToolbarProps {
  micStatusChanged: any;
  camStatusChanged: any;
  screenShare: any;
  stopScreenShare: any;
  toggleFullscreen: any;
  switchCamera: any;
  exitButton: any;
  toggleChat: any;
  sessionId: any;
  user: any;
  isPublisher: any;
  showNotification: any;
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
    this.screenShare = this.screenShare.bind(this);
    this.stopScreenShare = this.stopScreenShare.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.exitButton = this.exitButton.bind(this);
    this.toggleChat = this.toggleChat.bind(this);
  }

  micStatusChanged() {
    this.props.micStatusChanged();
  }

  camStatusChanged() {
    this.props.camStatusChanged();
  }

  screenShare() {
    this.props.screenShare();
  }

  stopScreenShare() {
    this.props.stopScreenShare();
  }

  toggleFullscreen() {
    this.setState({ fullscreen: !this.state.fullscreen });
    this.props.toggleFullscreen();
  }

  switchCamera() {
    this.props.switchCamera();
  }

  exitButton() {
    this.props.exitButton();
  }

  toggleChat() {
    this.props.toggleChat();
  }

  render() {
    const mySessionId = this.props.sessionId;
    const localUser = this.props.user;
    return (
      <AppBar className="toolbar" id="header">
        <Toolbar className="toolbar">
          <div id="navSessionInfo">
            <img id="header_img" alt="OpenVidu Logo" src={logo} />

            {this.props.sessionId && (
              <div id="titleContent">
                <span id="session-title">{mySessionId}</span>
              </div>
            )}
          </div>

          <div className="buttonsContent">
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
                  <MicOff color="secondary" />
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
                  <VideocamOff color="secondary" />
                )}
              </IconButton>
            }

            {/* 화면 공유 버튼 */}
            {this.props.isPublisher && (
              <IconButton
                color="inherit"
                className="navButton"
                onClick={this.screenShare}
              >
                {localUser !== undefined && localUser.isScreenShareActive() ? (
                  <PictureInPicture />
                ) : (
                  <ScreenShare />
                )}
              </IconButton>
            )}

            {this.props.isPublisher &&
              localUser !== undefined &&
              localUser.isScreenShareActive() && (
                <IconButton onClick={this.stopScreenShare} id="navScreenButton">
                  <StopScreenShare color="secondary" />
                </IconButton>
              )}

            {/* 카메라 변경 버튼 */}

            <IconButton
              color="inherit"
              className="navButton"
              onClick={this.switchCamera}
            >
              <SwitchVideoIcon />
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
              color="secondary"
              className="navButton"
              onClick={this.exitButton}
              id="navLeaveButton"
            >
              <PowerSettingsNew />
            </IconButton>
          </div>
          <IconButton
            color="inherit"
            onClick={this.toggleChat}
            id="navChatButton"
          >
            {this.props.showNotification && <div id="point" className="" />}
            <Tooltip title="Chat">
              <QuestionAnswer />
            </Tooltip>
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}
