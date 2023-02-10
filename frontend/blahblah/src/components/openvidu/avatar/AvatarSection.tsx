import { useEffect } from 'react'
import AvatarComp from "../../common/AvatarComp";

interface iAvatarSectionProp {
  user: any;
}
export default function AvatarSection(props: iAvatarSectionProp) {

  const onEmotionSignalRecieved = () => {
    props.user.getStreamManager().stream.session.on("signal:emotion", (event: any) => {
      const data = JSON.parse(event.data);
      console.log(data);
    });
  };

  useEffect(() => {
    onEmotionSignalRecieved();
  }, [])

  return (
    <div
      style={{
        position: "absolute",
        // backgroundColor: "red",
        zIndex: 10,
        bottom: 0,
        width: "100%",
        display: "flex",
      }}
    >
      <AvatarComp currentState="happy" currentScore={0} />
      <AvatarComp currentState="happy" currentScore={0} />
      <AvatarComp currentState="happy" currentScore={0} />
      <AvatarComp currentState="happy" currentScore={0} />
      <AvatarComp currentState="happy" currentScore={0} />
      <AvatarComp currentState="happy" currentScore={0} />
      <AvatarComp currentState="happy" currentScore={0} />
      <AvatarComp currentState="happy" currentScore={0} />
      <AvatarComp currentState="happy" currentScore={0} />
      <AvatarComp currentState="happy" currentScore={0} />
      <AvatarComp currentState="happy" currentScore={0} />
      <AvatarComp currentState="happy" currentScore={0} />
      <AvatarComp currentState="happy" currentScore={0} />
    </div>
  );
}
