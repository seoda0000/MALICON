import React, { useRef, useState } from "react";
import * as faceapi from "face-api.js";
import AvatarComp from "../common/AvatarComp";

// video size
const constraints = {
  video: {
    width: 1920,
    height: 1080,
  },
  audio: false,
};

export default function FaceExpressionRecognition() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [currentState, setCurrentState] = useState<string>("");
  const [currentScore, setCurrentScore] = useState<number>(0);

  const onPlay = async () => {
    if (videoRef.current === null) return;

    const displaySize = {
      width: videoRef.current.width,
      height: videoRef.current.height,
    };

    // FaceRecognitionStart
    const faceDetecting = async () => {
      if (videoRef.current === null) return;

      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);

      resizedDetections.forEach((detection, i) => {
        // console.log(
        //   detection.expressions.asSortedArray()[0].expression,
        //   detection.expressions.asSortedArray()[0].probability
        // );
        setCurrentState(detection.expressions.asSortedArray()[0].expression);
        setCurrentScore(detection.expressions.asSortedArray()[0].probability);
      });
    };

    const loop = () => {
      faceDetecting();
      setTimeout(loop, 500);
    };
    setTimeout(loop, 500);
  };

  const startDetecting = async () => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]).then(() => {
        startVideo();
      });
    };

    loadModels();
  };

  // Request Video Privilege
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => ((videoRef.current as any).srcObject = stream))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Face-Api Test</h2>

      <div ref={wrapRef}>
        <video
          ref={videoRef}
          autoPlay
          muted
          onPlay={onPlay}
          width={1280}
          height={720}
        />
      </div>
      <button onClick={startDetecting}>Start</button>
      <div>
        Your Current State is {currentState} {currentScore * 100} %
      </div>

      <AvatarComp currentState={currentState} currentScore={currentScore} />
    </div>
  );
}
