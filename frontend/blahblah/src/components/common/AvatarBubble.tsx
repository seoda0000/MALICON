import { personas } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../redux/configStore.hooks";
import AvatarComp from "./AvatarComp";
import Happy from "../../assets/emoji/happy.png";
import Sad from "../../assets/emoji/sad.png";
import Surprised from "../../assets/emoji/surprised.png";
import Clap from "../../assets/emoji/clap.png";
import { keyframes } from "@emotion/react";

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

const AvatarBox = styled.div`
  position: relative;
  margin: 0 auto;
  width: 80%;
  height: 80%;
  & > img.avatar-comp-avatar {
    width: 100%;
    height: 100%;
  }
  & > div.avatar-comp-emotion {
    width: 30px;
    height: 30px;
    & > span {
      position: absolute;
      width: 30px;
      height: 30px;
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
        animation: ${emotionKeyFrame} 1.5s ease infinite;
      }
    }
  }
`;

const BubbleBox = styled.div<{ color?: string }>`
  position: relative;
  background: #ffffff;
  display: inline-block;
  width: 100%;
  height: 100%;
  border: 2px solid black;
  border-radius: 15px;
  &:after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: -17px;
    width: 24px;
    height: 48px;
    background: #ffffff;
    border: 2px solid black;
    transform: skew(47deg) rotate(45deg);
    z-index: -1;
  }
  & > span {
    position: absolute;
    left: calc(50% + 1px);
    bottom: -4px;
    display: inline-block;
    width: 24px;
    border: 4px solid white;
    border-radius: 50%;
  }
  &.shadow {
    position: absolute;
    background: ${({ color }) => color && color};
    left: 3px;
    top: 3px;
    z-index: -2;
    &:after {
      left: 54%;
      bottom: -15px;
      width: 18px;
      background: ${({ color }) => color && color};
      z-index: -3;
    }
    & > span {
      bottom: 0px;
      left: calc(50% + 6px);
      border: 4px solid ${({ color }) => color && color};
      border-radius: 0;
    }
  }
`;

type AvatarBubblePropsType = {
  state: string;
  color: string;
  seed: string;
};

export default function AvatarBubble({
  state,
  color,
  seed,
}: AvatarBubblePropsType): JSX.Element {
  const emotionEl = useRef<HTMLSpanElement>(null);
  //   const avatar = useAppSelector((state) => state.user.userData.avatar!);
  const dataUri = createAvatar(personas, {
    // ...JSON.parse(avatar),
    seed: seed,
  }).toDataUriSync();

  const startEmotion = () => {
    setTimeout(() => {
      emotionEl.current?.classList.add("active");
    }, 3200);
  };

  useEffect(() => {
    startEmotion();
  }, []);
  return (
    <BubbleBox>
      <AvatarBox>
        <img className="avatar-comp-avatar" alt="Sample" src={dataUri} />
        <div className="avatar-comp-emotion">
          <span ref={emotionEl}>
            <img
              src={
                state === "happy"
                  ? Happy
                  : state === "sad"
                  ? Sad
                  : state === "clap"
                  ? Clap
                  : Surprised
              }
              alt=""
            />
          </span>
        </div>
      </AvatarBox>
      <span></span>
      <BubbleBox color={color} className="shadow">
        <span></span>
      </BubbleBox>
    </BubbleBox>
  );
}

