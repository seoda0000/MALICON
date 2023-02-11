import AvatarComp2 from "../common/AvatarComp2";
interface UserAvatar {
  userId: string;
  avatar: string;
}

const SAMPLE_EMOTION_LOG = [
  {
    time: 2000,
    avatar:
      '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["happy"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["bigSmile"],"nose":["smallRound"],"skinColor":["d78774"]}',
    type: "type",
    userId: "ssafy1",
  },
  {
    time: 3000,
    avatar:
      '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["glasses"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["smile"],"nose":["smallRound"],"skinColor":["d78774"]}',
    type: "type",
    userId: "ssafy2",
  },
  {
    time: 4000,
    avatar:
      '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["happy"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["bigSmile"],"nose":["smallRound"],"skinColor":["d78774"]}',
    type: "type",
    userId: "ssafy3",
  },
  {
    time: 5000,
    avatar:
      '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["happy"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["bigSmile"],"nose":["smallRound"],"skinColor":["d78774"]}',
    type: "type",
    userId: "ssafy4",
  },
];
const VideoAvatarSection: React.FC<{ emotionLog: any }> = (props) => {
  let avatarList: UserAvatar[] = [];

  {
    SAMPLE_EMOTION_LOG &&
      SAMPLE_EMOTION_LOG.map((emotion: any) => {
        let user: UserAvatar = {
          userId: emotion.userId,
          avatar: emotion.avatar,
        };
        if (!avatarList.find((element) => element.userId === user.userId)) {
          avatarList.push(user);
        }
      });
  }

  console.log(avatarList);

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
      {avatarList.map((elem) => (
        <AvatarComp2
          currentState="happy"
          currentScore={0}
          avatar={elem.avatar}
          key={elem.userId}
        />
      ))}
    </div>
  );
};

export default VideoAvatarSection;
