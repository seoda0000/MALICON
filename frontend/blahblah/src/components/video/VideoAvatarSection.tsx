import AvatarComp2 from "../common/AvatarComp2";
import { useState, useRef } from "react";

interface UserAvatar {
  userId: string;
  avatar: string;
  type: string;
}

const SAMPLE_EMOTION_LOG = [
  {
    time: 2000,
    avatar:
      '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["happy"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["bigSmile"],"nose":["smallRound"],"skinColor":["d78774"]}',
    type: "happy",
    userId: "ssafy1",
  },
  {
    time: 3000,
    avatar:
      '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["glasses"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["smile"],"nose":["smallRound"],"skinColor":["d78774"]}',
    type: "sad",
    userId: "ssafy2",
  },
  {
    time: 4000,
    avatar:
      '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["happy"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["bigSmile"],"nose":["smallRound"],"skinColor":["d78774"]}',
    type: "fearful",
    userId: "ssafy3",
  },
  {
    time: 5000,
    avatar:
      '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["happy"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["bigSmile"],"nose":["smallRound"],"skinColor":["d78774"]}',
    type: "happy",
    userId: "ssafy4",
  },
  {
    time: 6000,
    avatar:
      '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["happy"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["bigSmile"],"nose":["smallRound"],"skinColor":["d78774"]}',
    type: "happy",
    userId: "ssafy1",
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
          type: emotion.type,
        };
        if (!avatarList.find((element) => element.userId === user.userId)) {
          avatarList.push(user);
        }
      });
  }

  console.log(avatarList);
  const [emotionLog, setEmotionLog] = useState(
    avatarList.map((elem) => {
      return {
        userId: elem.userId,
        avatar: elem.avatar,
        type: "happy",
      };
    })
  );

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
      {emotionLog.map((elem) => (
        <AvatarComp2
          currentState={elem.type}
          currentScore={0}
          avatar={elem.avatar}
          key={elem.userId}
        />
      ))}
    </div>
  );
};

export default VideoAvatarSection;
