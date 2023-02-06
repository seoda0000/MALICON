import { personas } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import styled from "@emotion/styled";
import { Avatar } from "@mui/material";
import React from "react";
import Heart from "../../assets/emoji/happy.png";

const LoadingPageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div {
    width: 500px;
    & > div.heart-wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 30px; ////// ?
      & > span {
        width: 30px;
        height: 30px;
        & > img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
        /////avatar
      }
    }
    & > p {
      margin-top: 20px;
      text-align: center;
    }
  }
`;

export default function LoadingPage(): JSX.Element {
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
    seed: "Rocky",
  }).toDataUriSync();
  const avatar5 = createAvatar(personas, {
    seed: "Sammy",
  }).toDataUriSync();
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
          <Avatar src={avatar1} alt="avatar1" />
          <Avatar src={avatar2} alt="avatar2" />
          <Avatar src={avatar3} alt="avatar3" />
          <Avatar src={avatar4} alt="avatar4" />
          <Avatar src={avatar5} alt="avatar5" />
        </div>
        <p>콘서트 장비 나르는 중..</p>
      </div>
    </LoadingPageContainer>
  );
}

