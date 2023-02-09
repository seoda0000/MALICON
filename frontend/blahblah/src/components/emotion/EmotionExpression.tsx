import React, { useState, useEffect } from 'react'
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
  }

  const saveCurrentState = (state: string) => {
    setCurrentState(state);
  }

  useEffect(() => {
    // todo: signal here
  }, [currentPose]);

  useEffect(() => {
    // todo: signal here
  }, [currentState]);

  return (
    <div>
      <div>
        Your Current State is {currentState} <br />
        현재 자세는 {currentPose}
      </div>
      <PoseRecognition onPoseChange={saveCurrentPose} videoRef={props.videoRef} />
      <FaceExpressionRecognition onStateChange={saveCurrentState} videoRef={props.videoRef} />
    </div>
  )
}
