import styled from "@emotion/styled";
import { AppBar } from "@mui/material";

export const ToolbarComponentContainer = styled(AppBar)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: linear-gradient(180deg, #565656, transparent);
  color: #ffffff;
  z-index: 999999;
  min-width: 400px !important;
  box-shadow: none;

  &,
  & .toolbar {
    padding: 0 !important;
    min-height: 40px !important;
  }

  & > .toolbar {
    width: 100%;
    height: 100%;
    /* padding: 5px 0px !important; */
    & > .header-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 95%;
      height: 100%;
      margin: 0 auto;
      & > .broadcast-info {
        display: flex;
        align-items: center;
        gap: 30px;
        height: 100%;
        & > span.title {
          font-size: 30px;
        }
        & > div.streamer {
          display: flex;
          align-items: center;
          gap: 10px;
          height: 24px;
          & > div {
            height: 100%;
            width: auto;
          }
          & > span {
            color: #c8c8c8;
          }
        }
      }
      & > .button-wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* width: 320px; */
        height: 100%;
        & > .buttons {
          display: flex;
          align-items: center;
          gap: 5px;
          /* & #volumeButton {
            background-color: #000000c4;
            position: absolute;
            bottom: 45px;
            left: 10px;
            z-index: 1000;
            color: #ffffff;
          } */
        }
        & > img.logo {
          height: 35px;
          width: auto;
          margin-left: 20px;
        }
      }
    }
  }

  /* //////////////////// */

  & > .toolbar {
    & > #navSessionInfo {
      position: absolute;
      & > img#header_img {
        max-width: 135px;
        margin-right: 10px;
        margin-top: 10px;
      }
      & > #titleContent {
        max-width: 100px;
        background-color: #494949;
        margin: 5px -18px;
        padding: 0px 15px;
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        float: right;
        margin-top: 20px;
        & > #session-title {
          font-family: "Open Sans", sans-serif;
        }
      }
    }
    & > .button-wrapper {
      & > .buttons {
        height: 40px !important;
        text-align: center;
        margin: auto;
        width: 90%;
        & > #navMicButton {
        }
        & > #navCamButton {
          &.navbutton: {
          }
          &.mycam {
            float: right;
          }
        }
        & > .navButton {
          height: 40px !important;
          width: 40px !important;
        }
        & > #navLeaveButton {
        }
      }
    }
    & > #navChatButton {
      position: absolute;
      right: 10px;
      top: 0;
      & > #point {
        width: 10px;
        height: 10px;
        position: absolute;
        top: 12px;
        right: 33px;
        border-radius: 50%;
        background-color: #ffa600;
        border: 1px solid #000;
        z-index: 99999;
      }
    }
  }

  @media only screen and (max-width: 700px) {
    #titleContent,
    #navChatButton {
      display: none;
    }
  }
`;

