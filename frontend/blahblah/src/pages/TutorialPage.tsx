import { useRef, useState } from "react";
import FaceExpressionRecognition from "../components/faceapi/FaceExpressionRecognition";
import PoseRecognition from "../components/PoseRecognition/PoseRecognition";

function TutorialPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMediaDeviceLoaded, setIsMediaDeviceLoaded] = useState<boolean>(false);

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
      <video ref={videoRef} autoPlay width={1280} height={720} />
      <button onClick={startVideo}>start video</button>
      {isMediaDeviceLoaded && <FaceExpressionRecognition videoRef={videoRef}/> }
      {isMediaDeviceLoaded && <PoseRecognition videoRef={videoRef}/> }
    </div>
  );
}
export default TutorialPage;
