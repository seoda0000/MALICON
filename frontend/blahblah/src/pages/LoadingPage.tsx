import { personas } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import styled from "@emotion/styled";
import { Avatar, keyframes } from "@mui/material";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import Heart from "../assets/emoji/happy.png";

const PtagKeyFrame = keyframes`
    from {
        left: 0;
    }
    to {
        left:100%;
    }
`;

const EmotionKeyFrame = keyframes`
    0% {
        transform: translateY(-10px);
    }
    3% {
        transform: translateY(-13px);
    }
    10% {
        transform: translateY(7px);
    }
    100% {
        transform: translateY(7px);
    }
`;

const AvatarKeyFrame = keyframes`
    0% {
        transform: translateY(-25px);
    }
    20% {
        transform: translateY(0px);
    }
    100% {
        transform: translateY(0px);
    }
`;

const LoadingPageContainer = styled.div`
  --avatar-size: 83px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: white;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div.heart-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      & > span {
        position: relative;
        width: var(--avatar-size);
        height: 20px;
        display: flex;
        justify-content: center;
        & > img {
          width: auto;
          height: 100%;
          object-fit: cover;
          transform: translateY(5px);
          animation: ${EmotionKeyFrame} 2s ease-out infinite;
        }
        &:nth-child(1) {
          & > img {
            animation-delay: 0.1s;
          }
        }
        &:nth-child(2) {
          & > img {
            animation-delay: 0.3s;
          }
        }
        &:nth-child(3) {
          & > img {
            animation-delay: 0.5s;
          }
        }
        &:nth-child(4) {
          & > img {
            animation-delay: 0.7s;
          }
        }
        &:nth-child(5) {
          & > img {
            animation-delay: 0.9s;
          }
        }
      }
    }
    & > div.avatar-wrapper {
      margin-top: 15px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > div {
        width: var(--avatar-size);
        height: var(--avatar-size);
        animation: ${AvatarKeyFrame} 1s ease-out infinite alternate;
      }
      & > .avatar1 {
        animation-delay: 0s;
      }
      & > .avatar2 {
        animation-delay: 0.2s;
      }
      & > .avatar3 {
        animation-delay: 0.4s;
      }
      & > .avatar4 {
        animation-delay: 0.6s;
      }
      & > .avatar5 {
        animation-delay: 0.8s;
      }
    }
    & > p {
      position: relative;
      display: inline-block;
      margin-top: 50px;
      text-align: center;
      font-size: 23px;
      &:after {
        content: "";
        position: absolute;
        width: 18px;
        height: 100%;
        left: 0;
        transform: skew(50deg);
        background: white;
        opacity: 0.7;
        animation: ${PtagKeyFrame} 2s ease-out infinite;
      }
    }
  }
`;

export default function LoadingPage(): JSX.Element {
  const pEl = useRef<HTMLParagraphElement>(null);
  const [state, setState] = useState<string>("");

  const avatar1 = createAvatar(personas, {
    seed: "Abby",
  }).toDataUriSync();
  const avatar2 = createAvatar(personas, {
    seed: "Sugar",
  }).toDataUriSync();
  const avatar3 = createAvatar(personas, {
    seed: "Maggie",
  }).toDataUriSync();
  const avatar4 = createAvatar(personas, {
    seed: "Lucky",
  }).toDataUriSync();
  const avatar5 = createAvatar(personas, {
    seed: "Sammy",
  }).toDataUriSync();

  const getRandom = () => {
    if (pEl.current) {
      const random = Math.floor((Math.random() * 10) % 4);
      switch (random) {
        case 0:
          setState("콘서트 장비 나르는 중..");
          break;
        case 1:
          setState("대형 스크린 설치하는 중..");
          break;
        case 2:
          setState("안전 요원 배치 중..");
          break;
        case 3:
          setState("티켓팅 중..");
      }
    }
  };

  useEffect(() => {
    getRandom();
    if (pEl.current) {
      pEl.current.innerText = state;
    }
  }, [pEl, state]);
  return (
    <LoadingPageContainer>
      <div>
        <div className="heart-wrapper">
          <span>
            <img src={Heart} alt="" />
          </span>
          <span>
            <img src={Heart} alt="" />
          </span>
          <span>
            <img src={Heart} alt="" />
          </span>
          <span>
            <img src={Heart} alt="" />
          </span>
          <span>
            <img src={Heart} alt="" />
          </span>
        </div>
        <div className="avatar-wrapper">
          <Avatar src={avatar1} alt="avatar1" className="avatar1" />
          <Avatar src={avatar2} alt="avatar2" className="avatar2" />
          <Avatar src={avatar3} alt="avatar3" className="avatar3" />
          <Avatar src={avatar4} alt="avatar4" className="avatar4" />
          <Avatar src={avatar5} alt="avatar5" className="avatar5" />
        </div>
        <p ref={pEl}>콘서트 장비 나르는 중..</p>
      </div>
    </LoadingPageContainer>
  );
}

