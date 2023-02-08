import React, { RefObject, useEffect, useState } from "react";
import * as faceapi from "@vladmandic/face-api";
import AvatarComp from "../common/AvatarComp";

export default function FaceExpressionRecognition(props: { videoRef: React.RefObject<HTMLVideoElement>; }) {
  const videoRef = props.videoRef as RefObject<HTMLVideoElement>;

  const [currentState, setCurrentState] = useState<string>("");
  const [currentScore, setCurrentScore] = useState<number>(0);

  const startPredict = async () => {
    if (videoRef.current === null) { console.log("fuck"); return };

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

  const init = async () => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      Promise.all([
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      ]).then(() => {
        startPredict();
      });
    };

    loadModels();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <div>
        Your Current State is {currentState} {currentScore * 100} %
      </div>
      <AvatarComp currentState={currentState} currentScore={currentScore} />
    </div>
  );
}
