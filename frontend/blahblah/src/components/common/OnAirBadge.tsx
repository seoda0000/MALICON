import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { PlayArrowRounded } from "@mui/icons-material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { SessionType } from "../../model/broadcast/sessionType";
import { useAppDispatch } from "../../redux/configStore.hooks";
import { broadcastActions } from "../../redux/modules/broadcast/broadcast-slice";

const OnAirBadgeBox = styled.span<{
  inactiveVisible: boolean;
  isOnAir: boolean | undefined;
}>`
  padding: 1px 4px 1px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  ${({ inactiveVisible, isOnAir }) =>
    inactiveVisible
      ? isOnAir
        ? css`
            border: 1.5px solid #e24553;
            color: #e24553;
          `
        : css`
            border: 1.5px solid #808080;
            color: #808080;
          `
      : css`
          border: 1.5px solid #e24553;
          color: #e24553;
        `};
  ${({ isOnAir }) =>
    isOnAir &&
    css`
      box-shadow: 0px 0px 4px #e24553;
    `}
  & > svg {
    font-size: 1rem;
  }
  & > span {
    font-size: 11px;
  }
`;

type OnAirBadgePropsType = {
  inactiveVisible?: boolean;
  isOnAir?: boolean;
  sessionInfo?: SessionType;
  onClick?: () => void;
};

export default function OnAirBadge({
  inactiveVisible = false,
  isOnAir,
  sessionInfo,
  onClick,
}: OnAirBadgePropsType) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const joinSessionStart = async () => {
    if (sessionInfo) {
      dispatch(
        broadcastActions.joinSession({
          sessionId: sessionInfo.sessionId,
        })
      );
    }
  };
  const onClickOnAir = () => {
    joinSessionStart().then(() => {
      navigate("/broadcast");
    });
  };

  return (
    <OnAirBadgeBox
      inactiveVisible={inactiveVisible}
      isOnAir={isOnAir}
      onClick={onClickOnAir}
    >
      <PlayArrowRounded />
      <span>ON AIR</span>
    </OnAirBadgeBox>
  );
}

