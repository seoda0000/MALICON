import React, { useCallback, useEffect, useState } from "react";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useRef } from "react";
import Avatar from "@mui/material/Avatar";
import { RootState } from "../../redux/configStore";
import { useSelector } from "react-redux";
import { createAvatar } from "@dicebear/core";
import { personas } from "@dicebear/collection";
import { useAppSelector } from "../../redux/configStore.hooks";
import { StyledEngineProvider } from "@mui/styled-engine-sc";
import { throttle } from "lodash";
import { FavoriteRounded } from "@mui/icons-material";

const emotionKeyFrame = keyframes`
  0% {
    opacity: 1;
    top: 6px;
    left: 49px;
  }
  25% {
    left: 39px;
  }
  55% {
    left: 54px;
  }
  100% {
    opacity: 0;
    top: -44px;
    left: 51px;
  }
`;

const AvatarCompContainer = styled.div`
  position: relative;
  margin-left: 100px; ///////
  width: 120px;
  height: 120px;
  & > img.avatar-comp-avatar {
    width: 100%;
    height: 100%;
  }
  & > div.avatar-comp-emotion {
    width: 20px;
    height: 20px;
    & > span {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 6px;
      left: 49px;
      right: 0;
      font-size: 30px;
      color: red;
      z-index: 10;
      animation: ${emotionKeyFrame} 1.5s ease backwards;
    }
  }
`;

type AvatarCompPropsType = {
  currentState: string;
};

export default function AvatarComp({
  currentState,
}: AvatarCompPropsType): JSX.Element {
  const avatar = useAppSelector((state) => state.user.userData.avatar!);
  const parentEl = useRef<HTMLDivElement>(null);

  const dataUri = createAvatar(personas, {
    ...JSON.parse(avatar),
  }).toDataUriSync();

  const createHeart = (state: string) => {
    const el = document.createElement("span");
    // el.innerHTML = "!" + state;
    parentEl.current?.appendChild(el);
    setTimeout(() => {
      el.remove();
    }, 1500);
  };

  const throttled = useCallback(
    throttle((state) => createHeart(state), 5000),
    []
  );

  useEffect(() => {
    throttled(currentState);
  }, [currentState]);

  return (
    <AvatarCompContainer>
      <img
        className="avatar-comp-avatar"
        alt="Sample"
        src={dataUri}
        // onClick={createHeart}
      />
      <div className="avatar-comp-emotion" ref={parentEl}>
        <span>
          <FavoriteRounded id="heart-icon" />
        </span>
      </div>
    </AvatarCompContainer>
  );
}

