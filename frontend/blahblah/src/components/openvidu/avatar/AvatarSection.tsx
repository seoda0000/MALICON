import AvatarComp from "../../common/AvatarComp";
export default function AvatarSection() {
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
