import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
// import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
// import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import ProfileImage from "../auth/ProfileImage";
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
      <Toolbar />
      <Divider />
      <List>
        {SAMPLE_FOLLOWING_LIST.map((item) => (
          <FollowingListItem item={item} key={item.username} />
          // <p>{item.username}</p>
        ))}
      </List>
      <Divider />
    </div>
  );
}
