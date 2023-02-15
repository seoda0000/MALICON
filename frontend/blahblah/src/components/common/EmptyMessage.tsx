import styled from "@emotion/styled";
import React from "react";
import DotBubble from "../../assets/img/dotBubble.png";

const EmptyMessageBox = styled.div`
  margin: 0 auto;
  & > div {
    margin: 0 auto;
    width: 40px;
    height: 40px;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      opacity: 0.4;
    }
  }
  & > p {
    color: #808080;
    text-align: center;
    margin-top: 10px;
  }
`;

export default function EmptyMessage({ text }: { text: string }): JSX.Element {
  return (
    <EmptyMessageBox>
      <div>
        <img src={DotBubble} alt="bubble" />
      </div>
      <p>{text}</p>
    </EmptyMessageBox>
  );
}

