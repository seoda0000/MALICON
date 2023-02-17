import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import FeedProfileImage from "./FeedProfileImage";

const FollowingListItem: React.FC<{
  item: any;
  // onRemoveTodo: () => void;
}> = (props) => {
  return (
    <ListItem key={props.item.username} disablePadding>
      <ListItemButton>
        <ListItemIcon>
          {/* <FeedProfileImage src={props.item.img} /> */}
        </ListItemIcon>
        <ListItemText primary={props.item.username} />
      </ListItemButton>
    </ListItem>
  );
};

export default FollowingListItem;
