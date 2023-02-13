import React, { Component, useState } from "react";
import user from "../../../redux/modules/user";
import EmotionExpression from "../../emotion/EmotionExpression";
import "./StreamComponent.css";

// 타입 생성
interface OvVideoProps {
  user: any;
  mutedSound: any;
  isPublisher: boolean | null;
}

// OvVideoComponent
export default class OvVideoComponent extends Component<OvVideoProps, {}> {
  // OvVideoComponent class 타입 정의
  // =======================================================

  videoRef: any;
  canPlay: boolean;

  // =======================================================

  constructor(props: OvVideoProps) {
    super(props);
    this.videoRef = React.createRef();
    this.canPlay = false;
  }

  componentDidMount() {
    if (this.props && this.props.user.streamManager && !!this.videoRef) {
      console.log("PROPS: ", this.props);
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }

    if (
      this.props &&
      this.props.user.streamManager.session &&
      this.props.user &&
      !!this.videoRef
    ) {
      this.props.user.streamManager.session.on(
        "signal:userChanged",
        (event: any) => {
          const data = JSON.parse(event.data);
          if (data.isScreenShareActive !== undefined) {
            this.props.user
              .getStreamManager()
              .addVideoElement(this.videoRef.current);
          }
        }
      );
    }
  }

  componentDidUpdate(props: any) {
    if (props && !!this.videoRef) {
      this.props.user.getStreamManager().addVideoElement(this.videoRef.current);
    }
  }

  render() {
    return (
      <div>
        <video
          autoPlay={true}
          id={"video-" + this.props.user.getStreamManager().stream.streamId}
          ref={this.videoRef}
          muted={this.props.mutedSound}

          width={320}
          height={240}
        />

        {(!this.props.isPublisher && this.videoRef.current) && <EmotionExpression user={this.props.user} videoRef={this.videoRef} isTutorial={false} />}
      </div>
    );
  }
}
