import React, { Component } from "react";
import "./StreamComponent.css";
import OvVideoComponent from "./OvVideo";

import MicOff from "@mui/icons-material/MicOff";
import VideocamOff from "@mui/icons-material/VideocamOff";
import VolumeUp from "@mui/icons-material/VolumeUp";
import VolumeOff from "@mui/icons-material/VolumeOff";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import HighlightOff from "@mui/icons-material/HighlightOff";
import FormHelperText from "@mui/material/FormHelperText";

// 타입 생성
interface StreamProps {
  user: any;
  isPublisher: boolean | null;
  isStreamer?: boolean;
  //handleNickname?: any;
  streamId?: any;
  mutedSound?: boolean;
  toggleSound?: any;
}
// StreamComponent

export default class StreamComponent extends Component<StreamProps, {}> {
  state: any;
  constructor(props: StreamProps) {
    super(props);
    this.state = {
      nickname: this.props.user.getNickname(),
      showForm: false,
      // mutedSound: false,
      isFormValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    //this.handlePressKey = this.handlePressKey.bind(this);
    //this.toggleNicknameForm = this.toggleNicknameForm.bind(this);
    // this.toggleSound = this.toggleSound.bind(this);
  }

  handleChange(event: any) {
    this.setState({ nickname: event.target.value });
    event.preventDefault();
  }

  // toggleNicknameForm() {
  //   if (this.props.user.isLocal()) {
  //     this.setState({ showForm: !this.state.showForm });
  //   }
  // }

  // toggleSound() {
  //   this.setState({ mutedSound: !this.state.mutedSound });
  // }

  // handlePressKey(event: any) {
  //   if (event.key === "Enter") {
  //     console.log(this.state.nickname);
  //     if (this.state.nickname.length >= 3 && this.state.nickname.length <= 20) {
  //       //this.props.handleNickname(this.state.nickname);
  //       //this.toggleNicknameForm();
  //       this.setState({ isFormValid: true });
  //     } else {
  //       this.setState({ isFormValid: false });
  //     }
  //   }
  // }

  render() {
    return (
      <div
        className={
          "OT_widget-container" +
          (!this.props.isPublisher && !this.props.isStreamer ? " viewer" : "")
        }
      >
        {/* <div className="pointer nickname">
          {this.state.showForm ? (
            <FormControl id="nicknameForm">
              <IconButton
                color="inherit"
                id="closeButton"
                onClick={this.toggleNicknameForm}
              >
                <HighlightOff />
              </IconButton>
              <InputLabel htmlFor="name-simple" id="label">
                Nickname
              </InputLabel>
              <Input
                // color="inherit"
                id="input"
                value={this.state.nickname}
                onChange={this.handleChange}
                onKeyPress={this.handlePressKey}
                required
              />
              {!this.state.isFormValid && this.state.nickname.length <= 3 && (
                <FormHelperText id="name-error-text">
                  Nickname is too short!
                </FormHelperText>
              )}
              {!this.state.isFormValid && this.state.nickname.length >= 20 && (
                <FormHelperText id="name-error-text">
                  Nickname is too long!
                </FormHelperText>
              )}
            </FormControl>
          ) : (
            <div onClick={this.toggleNicknameForm}>
              <span id="nickname">{this.props.user.getNickname()}</span>
              {this.props.user.isLocal() && <span id=""> (edit)</span>}
            </div>
          )}
        </div> */}

        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.props.mutedSound}
              isPublisher={this.props.isPublisher}
            />
            <div id="statusIcons">
              {!this.props.user.isVideoActive() ? (
                <div id="camIcon">
                  <VideocamOff id="statusCam" />
                </div>
              ) : null}

              {/* {!this.props.user.isAudioActive() ? (
                <div id="micIcon">
                  <MicOff id="statusMic" />
                </div>
              ) : null} */}
            </div>
            {/* <div>
              {!this.props.user.isLocal() && (
                <IconButton id="volumeButton" onClick={this.props.toggleSound}>
                  {this.props.mutedSound ? (
                    <VolumeOff style={{ color: "#54d7c7" }} />
                  ) : (
                    <VolumeUp />
                  )}
                </IconButton>
              )}
            </div> */}
          </div>
        ) : null}
      </div>
    );
  }
}

