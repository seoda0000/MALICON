import styled from "@emotion/styled";
import React from "react";

const ButtonWrapper = styled.div`
  position: relative;
  width: 90px;
  height: 35px;
  & > button {
    position: absolute;
    left: -3px;
    top: -3px;
    width: 100%;
    height: 100%;
    padding: 7px 12px;
    border: 1.5px solid black;
    border-radius: 13px;
    background: #54d7c7;
    color: white;
    font-weight: bold;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background: #59d7c8;
    }
    &:active {
      color: #ffffffcc;
      background: #55cdbe;
      box-shadow: inset -2px -2px 5px 2px #99ede4, inset 3px 2px 6px 2px #298c80;
      & > span {
        margin-top: 3px;
      }
    }
  }
  & > div {
    width: 100%;
    height: 100%;
    border: 1.5px solid black;
    border-radius: 13px;
    background: #3ba89b;
  }
`;

type ButtonCompPropsType = {
  children: React.ReactNode;
  onClick: () => void;
};

export default function ButtonComp({
  children,
  onClick,
}: ButtonCompPropsType): JSX.Element {
  return (
    <ButtonWrapper>
      <button onClick={onClick}>
        <span>{children}</span>
      </button>
      <div></div>
    </ButtonWrapper>
  );
}

