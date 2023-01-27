import FeedListItem from "./FeedListItem";
import { FeedType } from "../../model/feed/feedType";
import React from "react";

const SAMPLE_FEED_LIST = [
  {
    feedId: 1,
    user: {
      img: "https://api.dicebear.com/5.x/pixel-art/svg?seed=Smokey",
      username: "testuser1",
    },
    title: "제목입니다",
    content:
      '<p><span style="color: rgb(230, 0, 0);">dddddddddd</span></p><iframe class="ql-video" frameborder="0" allowfullscreen="true" src="https://www.youtube.com/embed/jUNz-uTF--E?showinfo=0"></iframe><p><span style="color: rgb(230, 0, 0);"><span class="ql-cursor">﻿</span></span></p>',
    created_at: "2023-1-24 6:14 PM",
    comments: [
      {
        user: {
          img: "https://api.dicebear.com/5.x/pixel-art/svg?seed=Miss%20kitty",
          username: "testuser3",
        },
        content: "덧글입니다",
        created_at: "덧글 작성 시각",
      },
    ],
  },
  {
    feedId: 2,
    user: {
      img: "https://api.dicebear.com/5.x/pixel-art/svg?seed=Miss%20kitty",
      username: "testuser3",
    },
    title: "제목입니다22222",
    content: "<h1>내용입니다22222222<h1/>",
    created_at: "2023-1-24 6:14 PM",
  },
  {
    feedId: 3,
    user: {
      img: "https://api.dicebear.com/5.x/pixel-art/svg?seed=Zoe",
      username: "testuser2",
    },
    title: "제목입니다3333333333",
    content: "내용입니다333333333",
    created_at: "2023-1-24 6:14 PM",
  },
  {
    feedId: 4,
    user: {
      img: "https://api.dicebear.com/5.x/pixel-art/svg?seed=Garfield",
      username: "testuser4",
    },
    title: "제목입니다44444444",
    content: "내용입니다44444444444",
    created_at: "2023-1-24 6:14 PM",
  },
];

const FeedList: React.FC<{ feeds: FeedType[] }> = (props) => {
  return (
    <div>
      {props.feeds &&
        props.feeds.map((feed) => <FeedListItem feed={feed} key={feed.id} />)}
      {SAMPLE_FEED_LIST.map((feed) => (
        <FeedListItem feed={feed} key={feed.feedId} />
      ))}
    </div>
  );
};

export default FeedList;
