import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { EmotionSignalType } from "../../../model/openvidu/emotionSignalType";
import { UserModelType } from "../../../model/openvidu/user-model";
import { ViewerModelType } from "../../../model/openvidu/viewer-model";
import AvatarComp from "../../common/AvatarComp";

const AvatarSectionContainer = styled.div`
  position: fixed;
  z-index: 10;
  bottom: 0;
  width: 100vw;
  height: 120px;
  display: flex;
  justify-content: space-around;
`;

interface iAvatarSectionProp {
  user: any;
  viewers: ViewerModelType[];
}

const initialSignal: EmotionSignalType = {
  message: "",
  nickname: "",
  isPublisher: false,
};
export default function AvatarSection(props: iAvatarSectionProp) {
  const [signal, setSignal] = useState<EmotionSignalType>(initialSignal);

  const onEmotionSignalRecieved = () => {
    props.user
      .getStreamManager()
      .stream.session.on("signal:emotion", (event: any) => {
        const data: EmotionSignalType = JSON.parse(event.data);
        console.log("signal:emotion", data);
        setSignal(data);
      });
  };

  console.log("!!!!!!!!!!!!!!!!", props.viewers);

  useEffect(() => {
    onEmotionSignalRecieved();
  }, []);

  return (
    <AvatarSectionContainer>
      {props.viewers.map((viewer: ViewerModelType) => (
        <AvatarComp
          key={viewer.nickname}
          viewer={viewer}
          signal={signal}
          currentState={signal.message}
          currentScore={0}
        />
      ))}
      {/* 생방 들어오아있는 인원.map((시청자) => {
        <AvatarComp 현재 발생한 시그널같으면 state 보냄? />
      }) */}
    </AvatarSectionContainer>
  );
}

