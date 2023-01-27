import * as React from "react";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import FollowingListItem from "./FollowingListItem";

const SAMPLE_FOLLOWING_LIST = [
  {
    img: "https://api.dicebear.com/5.x/pixel-art/svg?seed=Smokey",
    username: "testuser1",
  },
  {
    img: "https://api.dicebear.com/5.x/pixel-art/svg?seed=Zoe",
    username: "testuser2",
  },
  {
    img: "https://api.dicebear.com/5.x/pixel-art/svg?seed=Miss%20kitty",
    username: "testuser3",
  },
  {
    img: "https://api.dicebear.com/5.x/pixel-art/svg?seed=Garfield",
    username: "testuser4",
  },
];

export default function FollowingList() {
  return (
    <div>
      {/* <Toolbar /> */}
      <Divider />
      <List>
        {SAMPLE_FOLLOWING_LIST.map((item) => (
          <FollowingListItem item={item} key={item.username} />
        ))}
      </List>
      {/* <Divider /> */}
    </div>
  );
}
