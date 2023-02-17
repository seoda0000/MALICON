import React, { useCallback, useEffect } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useRef } from "react";
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";
import { useAppSelector } from "../../redux/configStore.hooks";
import { throttle } from "lodash";
import Surprised from "../../assets/emoji/surprised.png";
import Sad from "../../assets/emoji/sad.png";
import Angry from "../../assets/emoji/angry.png";
import Happy from "../../assets/emoji/happy.png";
import Fearful from "../../assets/emoji/fearful.png";
import Disgusted from "../../assets/emoji/disgusted.png";

const emotionKeyFrame = keyframes`
  0% {
    opacity: 1;
  }
  25% {
    transform: translateX(-10px);
  }
  60% {
    transform: translateX(5px);
  }
  100% {
    opacity: 0;
    top: -50px;
    transform: translateX(2px);
  }
`;

const AvatarCompContainer = styled.div`
  position: relative;
  min-width: 40px;
  min-height: 40px;
  max-width: 150px;
  max-height: 150px;
  & > img.avatar-comp-avatar {
    width: 100%;
    height: 100%;
  }
  & > div.avatar-comp-emotion {
    width: 20px;
    height: 20px;
    & > span {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 0px;
      left: 50px;
      right: 0;
      font-size: 30px;
      color: red;
      z-index: 10;
      opacity: 0;
      & > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &.active {
        animation: ${emotionKeyFrame} 1.5s ease backwards;
      }
    }
  }
`;

type AvatarCompPropsType = {
  currentState: string;
  currentScore: number;
  avatar: string;
};

export default function AvatarComp2({
  currentState,
  currentScore,
  avatar,
}: AvatarCompPropsType): JSX.Element {
  const happyEl = useRef<HTMLDivElement>(null);
  const sadEl = useRef<HTMLDivElement>(null);
  const angryEl = useRef<HTMLDivElement>(null);
  const fearfulEl = useRef<HTMLDivElement>(null);
  const disgustedEl = useRef<HTMLDivElement>(null);
  const surprisedEl = useRef<HTMLDivElement>(null);

  const dataUri = createAvatar(personas, {
    ...JSON.parse(avatar),
  }).toDataUriSync();

  const createEmotion = (state: string) => {
    if (state === "happy") {
      happyEl.current?.classList.toggle("active");
      setTimeout(() => {
        happyEl.current?.classList.toggle("active");
      }, 1500);
    } else if (state === "sad") {
      sadEl.current?.classList.toggle("active");
      setTimeout(() => {
        sadEl.current?.classList.toggle("active");
      }, 1500);
    } else if (state === "fearful") {
      fearfulEl.current?.classList.toggle("active");
      setTimeout(() => {
        fearfulEl.current?.classList.toggle("active");
      }, 1500);
    } else if (state === "disgusted") {
      disgustedEl.current?.classList.toggle("active");
      setTimeout(() => {
        disgustedEl.current?.classList.toggle("active");
      }, 1500);
    } else if (state === "angry") {
      angryEl.current?.classList.toggle("active");
      setTimeout(() => {
        angryEl.current?.classList.toggle("active");
      }, 1500);
    } else if (state === "surprised") {
      surprisedEl.current?.classList.toggle("active");
      setTimeout(() => {
        surprisedEl.current?.classList.toggle("active");
      }, 1500);
    }
  };

  const throttled = useCallback(
    throttle((state) => createEmotion(state), 5000),
    []
  );

  useEffect(() => {
    if (currentState && currentState !== "neutral") {
      throttled(currentState);
    }
  }, [currentState, currentScore]);

  return (
    <AvatarCompContainer>
      <img className="avatar-comp-avatar" alt="Sample" src={dataUri} />
      <div className="avatar-comp-emotion">
        <span ref={happyEl}>
          <img src={Happy} alt="" />
        </span>
        <span ref={sadEl}>
          <img src={Sad} alt="" />
        </span>
        <span ref={angryEl}>
          <img src={Angry} alt="" />
        </span>
        <span ref={fearfulEl}>
          <img src={Fearful} alt="" />
        </span>
        <span ref={disgustedEl}>
          <img src={Disgusted} alt="" />
        </span>
        <span ref={surprisedEl}>
          <img src={Surprised} alt="" />
        </span>
      </div>
    </AvatarCompContainer>
  );
}
