import styled from "@emotion/styled";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import { css, keyframes } from "@mui/material";
import React, { useState } from "react";
import ButtonComp from "../common/ButtonComp";

const VideoPageKeyFrame = keyframes`
    from {
        opacity: 0;
        top: 0;
        right: 0;
    }
    to {
        opacity: 1;
        top: 0;
        right: 350px;
    }
`;

const AvatarPageKeyFrame = keyframes`
    from {
        opacity: 0;
        top: 50%;
        left: 50%;
    }
    to {
        opacity: 1;
        top: 50%;
        left: calc(50% + 155px);
    }
`;

const PagesKeyFrame = keyframes`
    from {
        opacity: 0;
        top: 50%;
        right: 50%;
    }
    to {
        opacity: 1;
        top: 50%;
        right: calc(50% + 155px);
    }
`;

const StepModalBox = styled.div<{ page: number; missionSuccess: boolean }>`
  position: absolute;
  width: 300px;
  padding: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 15px;
  background: white;
  & > span {
    font-weight: bold;
  }
  & > p {
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    & > div.page {
      color: #a4a4a4;
    }
    & > div.btn-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      & button {
        gap: 0;
      }
      & > div:nth-of-type(2) {
        & button {
          ${({ missionSuccess }) =>
            !missionSuccess
              ? css`
                  pointer-events: none;
                  background: #adb7b7;
                `
              : css`
                  pointer-events: auto;
                  background: #54d7c7;
                `}
        }
      }
    }
  }
  ${({ page }) =>
    page && page === 1
      ? css`
          animation: ${VideoPageKeyFrame} 0.5s ease-out forwards;
        `
      : page % 2 === 0
      ? css`
          animation: ${AvatarPageKeyFrame} 0.5s ease-out forwards;
        `
      : css`
          animation: ${PagesKeyFrame} 0.5s ease-out forwards;
        `}
`;

type StepModalPropsType = {
  message: {
    title: string;
    text: string;
  };
  page: number;
  total: number;
  onClickPrev: () => void;
  onClickNext: () => void;
  missionSuccess: boolean;
};

export default function StepModal({
  message,
  page,
  total,
  onClickPrev,
  onClickNext,
  missionSuccess,
}: StepModalPropsType): JSX.Element {
  const [open, setOpen] = useState<boolean>(true);

  const onCloseModal = () => {
    setOpen((prev: boolean) => !prev);
  };

  return (
    <StepModalBox page={page} missionSuccess={missionSuccess}>
      <span>{message.title}</span>
      <p>{message.text}</p>
      <div>
        <div className="page">
          {page} / {total}
        </div>
        <div className="btn-wrapper">
          <ButtonComp onClick={onClickPrev} width={35} text="">
            <KeyboardArrowLeftRounded />
          </ButtonComp>
          <ButtonComp onClick={onClickNext} width={35} text="">
            <KeyboardArrowRightRounded />
          </ButtonComp>
        </div>
      </div>
    </StepModalBox>
  );
}

