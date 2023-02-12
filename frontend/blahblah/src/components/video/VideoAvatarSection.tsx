import AvatarComp2 from "../common/AvatarComp2";
import { useState, useRef, useEffect } from "react";

interface UserAvatar {
  userId: string;
  avatar: string;
  type: string;
}

const SAMPLE_EMOTION_LOG = [
  {
    time: 5000,
    avatar:
      '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["happy"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["bigSmile"],"nose":["smallRound"],"skinColor":["d78774"]}',
    type: "sad",
    userId: "ssafy1",
  },
  {
    time: 5001,
    avatar:
      '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["glasses"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["smile"],"nose":["smallRound"],"skinColor":["d78774"]}',
    type: "happy",
    userId: "ssafy2",
  },
  {
    time: 10000,
    avatar:
      '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["glasses"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["smile"],"nose":["smallRound"],"skinColor":["d78774"]}',
    type: "sad",
    userId: "ssafy2",
  },
  {
    time: 15000,
    avatar:
      '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["happy"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["bigSmile"],"nose":["smallRound"],"skinColor":["d78774"]}',
    type: "sad",
    userId: "ssafy3",
  },
  {
    time: 20000,
    avatar:
      '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["happy"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["bigSmile"],"nose":["smallRound"],"skinColor":["d78774"]}',
    type: "happy",
    userId: "ssafy4",
  },
  {
    time: 25000,
    avatar:
      '{"body":["rounded"],"clothingColor":["54d7c7"],"eyes":["happy"],"facialHair":[""],"facialHairProbability":100,"hair":["curlyHighTop"],"hairColor":["6c4545"],"mouth":["bigSmile"],"nose":["smallRound"],"skinColor":["d78774"]}',
    type: "happy",
    userId: "ssafy1",
  },
];
const VideoAvatarSection: React.FC<{ played: number; emotionLog: any }> = (
  props
) => {
  let avatarList: UserAvatar[] = [];
  let timeline: any[] = [];
  let timeList: number[] = [];

  {
    SAMPLE_EMOTION_LOG &&
      SAMPLE_EMOTION_LOG.map((emotion: any) => {
        // 아바타 생성
        let user: UserAvatar = {
          userId: emotion.userId,
          avatar: emotion.avatar,
          type: emotion.type,
        };
        if (!avatarList.find((element) => element.userId === user.userId)) {
          avatarList.push(user);
        }

        // 타임라인 생성
        let time = Math.round(emotion.time / 1000);
        if (timeList.indexOf(time) === -1) {
          timeline.push({ time: time, user: [user] });
          timeList.push(time);
        } else {
          timeline[timeline.length - 1].user.push(user);
        }
      });
  }

  let emotionLogFirst = avatarList.map((elem) => {
    return {
      userId: elem.userId,
      avatar: elem.avatar,
      type: "",
    };
  });
  let emotionLogChange = avatarList.map((elem) => {
    return {
      userId: elem.userId,
      avatar: elem.avatar,
      type: "",
    };
  });
  const [emotionLog, setEmotionLog] = useState(emotionLogFirst);

  useEffect(() => {
    const findUserId = (val: string, array: UserAvatar[]) => {
      for (const a of array) {
        if (val === a.userId) {
          return a.type;
        }
      }
      return false;
    };
    timeline.map((item: any) => {
      if (item.time === Math.round(props.played)) {
        // console.log("해당시각 유저목록", item.user);
        emotionLogChange = emotionLogChange.map((elem) =>
          findUserId(elem.userId, item.user)
            ? { ...elem, type: findUserId(elem.userId, item.user) as string }
            : { ...elem, type: "" }
        );
        setEmotionLog(emotionLogChange);
        // console.log("업데이트");
        return;
      }
    });
  }, [props.played]);

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
