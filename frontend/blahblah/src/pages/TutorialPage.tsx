import { useRef, useState } from "react";
import EmotionExpression from "../components/emotion/EmotionExpression";

function TutorialPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMediaDeviceLoaded, setIsMediaDeviceLoaded] = useState<boolean>(false);
  const [currentPose, setCurrentPose] = useState<string>("");
  const [currentState, setCurrentState] = useState<string>("");

  const constraints = {
    video: {
      width: 1920,
      height: 1080,
    },
    audio: false,
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => ((videoRef.current as any).srcObject = stream))
      .then(() => setIsMediaDeviceLoaded(true))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1>튜토리얼페이지</h1>
      <div>기분은 {currentState}</div>
      <div>자세는 {currentPose}</div>
      <video ref={videoRef} autoPlay width={1280} height={720} />
      <button onClick={startVideo}>start video</button>
      {isMediaDeviceLoaded && <EmotionExpression videoRef={videoRef} user={undefined} isTutorial={true} onStateChange={setCurrentState} onPoseChange={setCurrentPose} />}
    </div>
  );
}
export default TutorialPage;
