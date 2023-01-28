import FeedListItem from "./FeedListItem";
import { FeedType } from "../../model/feed/feedType";
import React from "react";

// const SAMPLE_FEED_LIST = [
//   {
//     id: 1,
//     title: "제목1",
//     content: "내용1",
//     createDate: "0000-00-00 00:00",
//     lastModifiedDate: "0000-00-00 00:00",

//     userId: "아이디",
//     userAvatar: "https://api.dicebear.com/5.x/pixel-art/svg?seed=Garfield",
//     userNickName: "닉네임",
//   },
//   {
//     id: 2,
//     title: "제목2",
//     content: "내용2",
//     createDate: "0000-00-00 00:00",
//     lastModifiedDate: "0000-00-00 00:00",

//     userId: "아이디",
//     userAvatar: "https://api.dicebear.com/5.x/pixel-art/svg?seed=Miss%20kitty",
//     userNickName: "닉네임",
//   },
//   {
//     id: 3,
//     title: "제목3",
//     content: "내용3",
//     createDate: "0000-00-00 00:00",
//     lastModifiedDate: "0000-00-00 00:00",

//     userId: "아이디",
//     userAvatar: "https://api.dicebear.com/5.x/pixel-art/svg?seed=Zoe",
//     userNickName: "닉네임",
//   },
// ];

const FeedList: React.FC<{ feeds: FeedType[] }> = (props) => {
  return (
    <div>
      {props.feeds &&
        props.feeds.map((feed) => <FeedListItem feed={feed} key={feed.id} />)}
      {/* {SAMPLE_FEED_LIST.map((feed) => (
        <FeedListItem feed={feed} key={feed.id} />
      ))} */}
    </div>
  );
};

export default FeedList;
