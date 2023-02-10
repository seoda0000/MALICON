import React, { RefObject, useEffect, useState } from "react";
import * as faceapi from "@vladmandic/face-api";
import AvatarComp from "../../common/AvatarComp";

interface iFaceExpressionRecognitionProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  onStateChange: any;
}

export default function FaceExpressionRecognition(props: iFaceExpressionRecognitionProps) {
  const videoRef = props.videoRef as RefObject<HTMLVideoElement>;

  const [currentState, setCurrentState] = useState<string>("");
  const [currentScore, setCurrentScore] = useState<number>(0);

  const startPredict = async () => {
    if (videoRef.current === null) { return };

    const displaySize = {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
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
        console.log(videoRef);
        startPredict();
      });
    };

    loadModels();
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    props.onStateChange(currentState);
  }, [currentState])

  return (
    <div>
      {/* <div>
        Your Current State is {currentState} {currentScore * 100} %
      </div> */}
      {/* <AvatarComp currentState={currentState} currentScore={currentScore} /> */}
    </div>
  );
}
