import AvatarComp2 from "../common/AvatarComp2";
import { useState, useRef, useEffect } from "react";
import AvatarComp3 from "../common/AvatarComp3";
interface UserAvatar {
  userId: string;
  avatar: string;
  type: string;
}

const VideoAvatarSection: React.FC<{ played: number; emotionLog: any }> = (
  props
) => {
  let avatarList: UserAvatar[] = [];
  let timeline: any[] = [];
  let timeList: number[] = [];
  let emotionLogFirst: UserAvatar[] = [];
  let emotionLogChange: UserAvatar[] = [];

  props.emotionLog.map((emotion: any) => {
    if (emotion.type !== "" && emotion.type !== "neutral") {
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
      let time = Math.round(emotion.timestamp / 1000 - 1); // 싱크 조정
      if (timeList.indexOf(time) === -1) {
        timeline.push({ time: time, user: [user] });
        timeList.push(time);
      } else {
        timeline[timeline.length - 1].user.push(user);
      }
    }
  });
  console.log("timeline", timeline);
  emotionLogFirst = avatarList.map((elem) => {
    return {
      userId: elem.userId,
      avatar: elem.avatar,
      type: "",
    };
  });

  emotionLogChange = avatarList.map((elem) => {
    return {
      userId: elem.userId,
      avatar: elem.avatar,
      type: "",
    };
  });

  const [emotionLog, setEmotionLog] = useState(emotionLogFirst);

  const findUserId = (val: string, array: UserAvatar[]) => {
    for (const a of array) {
      if (val === a.userId) {
        return a.type;
      }
    }
    return false;
  };

  useEffect(() => {
    console.log("업데이트 전", emotionLog);
    timeline.map((item: any) => {
      if (item.time === Math.round(props.played)) {
        console.log("해당시각 유저목록", item.user);
        emotionLogChange = emotionLogChange.map((elem) =>
          findUserId(elem.userId, item.user)
            ? { ...elem, type: findUserId(elem.userId, item.user) as string }
            : { ...elem, type: "" }
        );
        setEmotionLog(emotionLogChange);
        console.log("업데이트 후", emotionLog);
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
        justifyContent: "center",
      }}
    >
      {emotionLog.map((elem) => (
        <AvatarComp3
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
