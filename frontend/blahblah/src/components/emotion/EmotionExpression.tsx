import React, { useState, useEffect } from "react";
import FaceExpressionRecognition from "./faceapi/FaceExpressionRecognition";
import PoseRecognition from "./PoseRecognition/PoseRecognition";

interface iEmotionExpressionProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  user: any;
}

export default function EmotionExpression(props: iEmotionExpressionProps) {
  const [currentPose, setCurrentPose] = useState<string>("");
  const [currentState, setCurrentState] = useState<string>("");

  const saveCurrentPose = (pose: string) => {
    setCurrentPose(pose);
  };

  const saveCurrentState = (state: string) => {
    setCurrentState(state);
  };

  async function sendEmotion(type: string) {
    if (props.user) {
      const data = {
        message: type,
        nickname: props.user.getNickname(),
        streamId: props.user.getStreamManager().stream.streamId,
        isPublisher: false,
      };
      props.user.getStreamManager().stream.session.signal({
        data: JSON.stringify(data),
        type: "emotion",
      });
    }
  }

  useEffect(() => {
    sendEmotion(currentPose);
  }, [currentPose]);

  useEffect(() => {
    sendEmotion(currentState);
  }, [currentState]);

  return (
    <div>
      <PoseRecognition
        onPoseChange={saveCurrentPose}
        videoRef={props.videoRef}
      />
      <FaceExpressionRecognition
        onStateChange={saveCurrentState}
        videoRef={props.videoRef}
      />
    </div>
  );
}
