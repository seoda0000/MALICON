import AvatarComp from "../common/AvatarComp";

export default function VideoAvatarSection() {
  return (
    <div
      style={{
        // position: "relative",
        // backgroundColor: "black",
        // zIndex: 10,
        // bottom: 100,
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
    </div>
  );
}
