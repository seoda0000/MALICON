import React, { useState, useEffect } from "react";
import * as posenet from "@tensorflow-models/posenet";

const PREDICTION_THRESHOLD = 0.3;

interface iPosition {
  y: number;
  x: number;
}

interface iPartScore {
  position: iPosition;
  score: number;
}

interface iPartPosition {
  nose: iPartScore;
  leftShoulder: iPartScore;
  rightShoulder: iPartScore;
  leftElbow: iPartScore;
  rightElbow: iPartScore;
  leftWrist: iPartScore;
  rightWrist: iPartScore;
  leftHip: iPartScore;
  rightHip: iPartScore;
}

interface iPositionRecognitionProps {
  videoRef: React.RefObject<HTMLVideoElement>
  onPoseChange: any
}

export default function PoseRecognition(props: iPositionRecognitionProps) {
  const videoRef = props.videoRef;

  const [currentPose, setCurrentPose] = useState<string>("");
  const init = () => {
    posenet.load().then(async (model) => {
      // 이곳의 model과 아래 predict의 model은 같아야 한다.
      if (videoRef.current) {
        console.log("videoRef found");
        await predict();
        console.log("videoRef found2");
      } else console.log("no!");

      async function predict() {
        if (videoRef && videoRef.current) {
          const video = videoRef.current;
          model.estimateSinglePose(video, { flipHorizontal: true }).then((pose) => {

            const analyzedPosition: iPartPosition = {
              nose: pose.keypoints[0],
              leftShoulder: pose.keypoints[5],
              rightShoulder: pose.keypoints[6],
              leftElbow: pose.keypoints[7],
              rightElbow: pose.keypoints[8],
              leftWrist: pose.keypoints[9],
              rightWrist: pose.keypoints[10],
              leftHip: pose.keypoints[11],
              rightHip: pose.keypoints[12],
            };

            analyzePoseWithPositions(analyzedPosition);
          });

          setTimeout(() => {
            requestAnimationFrame(predict);
          }, 500);
        } else {
          console.log("no ref?");
        }
      }
    });
  };

  function analyzePoseWithPositions(pose: iPartPosition) {
    // 1. 머리 위 하트
    if (isLeftWristBetweenShoulders(pose)
      && isRightWristBetweenShoulders(pose)
      && isLeftElbowHighterThanLeftShoulder(pose)
      && isRightElblowHigherThanRightShoulder(pose))
      setCurrentPose("heart");
    // // 2. 왼손들기
    else if (isLeftWristHigherThanLeftShoulder(pose)
      && isLeftWristHigherThanLeftElbow(pose)
      && isLeftElbowHighterThanLeftShoulder(pose))
      setCurrentPose("left");
    // // 3. 오른손들기
    else if (isRightWristHigherThanRightShoulder(pose)
      && isRightWristHigherThanRightElbow(pose)
      && isRightElblowHigherThanRightShoulder(pose))
      setCurrentPose("right");
    // // 4. 박수치기
    else if (isLeftWristBetweenShoulders(pose)
      && isRightWristBetweenShoulders(pose)
      && !isLeftElbowHighterThanLeftShoulder(pose)
      && !isRightElblowHigherThanRightShoulder(pose))
      setCurrentPose("clap");
    // 5. 기타
    else
      setCurrentPose("neutral");
  }

  function isScoreHigherThanPredictionThreshold(score: iPartScore) {
    return score.score >= PREDICTION_THRESHOLD;
  }

  function isLeftWristHigherThanLeftShoulder(pose: iPartPosition) {
    return isScoreHigherThanPredictionThreshold(pose.leftWrist)
      && isScoreHigherThanPredictionThreshold(pose.leftShoulder)
      && pose.leftWrist.position.y < pose.leftShoulder.position.y;
  }

  function isRightWristHigherThanRightShoulder(pose: iPartPosition) {
    return isScoreHigherThanPredictionThreshold(pose.rightWrist)
      && isScoreHigherThanPredictionThreshold(pose.rightShoulder)
      && pose.rightWrist.position.y < pose.rightShoulder.position.y;
  }

  function isLeftWristBetweenShoulders(pose: iPartPosition) {
    return (
      isScoreHigherThanPredictionThreshold(pose.leftWrist)
      && isScoreHigherThanPredictionThreshold(pose.leftShoulder)
      && isScoreHigherThanPredictionThreshold(pose.rightShoulder)
      && pose.leftWrist.position.x > pose.leftShoulder.position.x
      && pose.leftWrist.position.x < pose.rightShoulder.position.x
    );
  }

  function isRightWristBetweenShoulders(pose: iPartPosition) {
    return (
      isScoreHigherThanPredictionThreshold(pose.rightWrist) &&
      isScoreHigherThanPredictionThreshold(pose.leftShoulder) &&
      isScoreHigherThanPredictionThreshold(pose.rightShoulder) &&
      pose.rightWrist.position.x > pose.leftShoulder.position.x &&
      pose.rightWrist.position.x < pose.rightShoulder.position.x
    );
  }

  function isLeftWristHigherThanLeftElbow(pose: iPartPosition) {
    return isScoreHigherThanPredictionThreshold(pose.leftWrist)
      && isScoreHigherThanPredictionThreshold(pose.leftShoulder)
      && pose.leftWrist.position.y < pose.leftShoulder.position.y;
  }

  function isRightWristHigherThanRightElbow(pose: iPartPosition) {
    return isScoreHigherThanPredictionThreshold(pose.rightWrist)
      && isScoreHigherThanPredictionThreshold(pose.rightElbow)
      && pose.rightWrist.position.y < pose.rightElbow.position.y;
  }

  function isLeftElbowHighterThanLeftShoulder(pose: iPartPosition) {
    return isScoreHigherThanPredictionThreshold(pose.leftElbow)
      && isScoreHigherThanPredictionThreshold(pose.leftShoulder)
      && pose.leftElbow.position.y < pose.leftShoulder.position.y;
  }

  function isRightElblowHigherThanRightShoulder(pose: iPartPosition) {
    return isScoreHigherThanPredictionThreshold(pose.rightElbow)
      && isScoreHigherThanPredictionThreshold(pose.rightShoulder)
      && pose.rightElbow.position.y < pose.rightShoulder.position.y;
  }

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    props.onPoseChange(currentPose);
  }, [currentPose])

  return (
    <div>
      {/* <div>현재 자세는 {currentPose}</div> */}
    </div>
  );
}
