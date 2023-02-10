import React, { useState, useEffect } from "react";
import FaceExpressionRecognition from "./faceapi/FaceExpressionRecognition";
import PoseRecognition from "./PoseRecognition/PoseRecognition";
import { openviduInitializer } from "../../redux/utils/axiosInitializer";
import user from "../../redux/modules/user";
import { getAccessToken } from "../../redux/modules/user/token";
import { useAppSelector } from "../../redux/configStore.hooks";

interface iEmotionExpressionProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  user: any;
}

export default function EmotionExpression(props: iEmotionExpressionProps) {
  const [currentPose, setCurrentPose] = useState<string>("");
  const [currentState, setCurrentState] = useState<string>("");
  const avatar = useAppSelector((state) => state.user.userData.avatar!)

  const saveCurrentPose = (pose: string) => {
    setCurrentPose(pose);
  };

  const saveCurrentState = (state: string) => {
    setCurrentState(state);
  };

  async function signalEmotion(type: string) {
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

    const axios = openviduInitializer();
    await axios.post("/api/emotion/" + props.user.getStreamManager().stream.session.sessionId, {
      avatar,
      type,
      timestamp: Date.now()
    }, {

      headers: {
        "Content-Type": "application/json",
        Authorization: "Baerer " + getAccessToken(),
      },
    });
  }

  useEffect(() => {
    signalEmotion(currentPose);
  }, [currentPose]);

  useEffect(() => {
    signalEmotion(currentState);
  }, [currentState]);

  return (
    <div>
      <PoseRecognition onPoseChange={saveCurrentPose} videoRef={props.videoRef} />
      <FaceExpressionRecognition onStateChange={saveCurrentState} videoRef={props.videoRef} />
    </div>
  );
}
