import * as tf from '@tensorflow/tfjs';
import * as tmPose from '@teachablemachine/pose';
import Recat, { useEffect, useRef, useState } from 'react';

// video size
const constraints = {
  video: {
    width: 1920,
    height: 1080,
  },
  audio: false,
};

export default function PoseRecognition(this: any) {

  const videoRef = useRef<HTMLVideoElement>(null);

  const [currentState, setCurrentState] = useState<string>("");
  const [currentScore, setCurrentScore] = useState<number>(0);

  const URL = process.env.PUBLIC_URL + "/models/tm/";
  let model: tmPose.CustomPoseNet, webcam: tmPose.Webcam, ctx: CanvasRenderingContext2D | null, labelContainer: HTMLElement | null, maxPredictions: number;

  async function init() {
    const poseDetecting = async () => {
      // Prediction #1: run input through posenet
      // estimatePose can take in an image, video or canvas html element

      const { pose, posenetOutput } = await model.estimatePose(videoRef.current!);
      // Prediction 2: run input through teachable machine classification model
      const prediction = await (await model.predict(posenetOutput)).sort((a, b) => -(a.probability - b.probability));
      setCurrentState(prediction[0].className);
      setCurrentScore(prediction[0].probability * 100)
    };

    const loop = () => {
      poseDetecting();
      setTimeout(loop, 500);
    }

    setTimeout(loop, 500);
  }

  const startPredicting = async () => {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    Promise.all([
      model = await tmPose.load(modelURL, metadataURL),
      maxPredictions = model.getTotalClasses()
    ]).then(() => {
      startVideo();
    }).catch((err) => console.error(err));
  }

  // Request Video Privilege
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => ((videoRef.current as any).srcObject = stream))
      .then(() => init())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div>PoseRecognition</div>
      <canvas id="canvas" />
      <video autoPlay ref={videoRef} />
      <button onClick={startPredicting}>start</button>

      <div>Current Pose is {currentState} and probability is {currentScore} % </div>
    </div>
  )
}
