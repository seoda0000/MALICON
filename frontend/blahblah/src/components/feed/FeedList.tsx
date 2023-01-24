import FeedListItem from "./FeedListItem";

const SAMPLE_FEED_LIST = [
  {
    pk: 1,
    user: {
      img: "https://api.dicebear.com/5.x/pixel-art/svg?seed=Smokey",
      username: "testuser1",
    },
    title: "제목입니다",
    content: "내용입니다",
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
    pk: 2,
    user: {
      img: "https://api.dicebear.com/5.x/pixel-art/svg?seed=Miss%20kitty",
      username: "testuser3",
    },
    title: "제목입니다22222",
    content: "내용입니다22222222",
    created_at: "2023-1-24 6:14 PM",
  },
  {
    pk: 3,
    user: {
      img: "https://api.dicebear.com/5.x/pixel-art/svg?seed=Zoe",
      username: "testuser2",
    },
    title: "제목입니다3333333333",
    content: "내용입니다333333333",
    created_at: "2023-1-24 6:14 PM",
  },
  {
    pk: 4,
    user: {
      img: "https://api.dicebear.com/5.x/pixel-art/svg?seed=Garfield",
      username: "testuser4",
    },
    title: "제목입니다44444444",
    content: "내용입니다44444444444",
    created_at: "2023-1-24 6:14 PM",
  },
];

export default function FeedList() {
  return (
    <div>
      {SAMPLE_FEED_LIST.map((item) => (
        <FeedListItem item={item} key={item.pk} />
      ))}
    </div>
  );
}
