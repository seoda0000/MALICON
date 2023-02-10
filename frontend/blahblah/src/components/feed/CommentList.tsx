import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { CommentType } from "../../model/feed/commentType";
import CommentListItem from "./CommentListItem";

const CommentList: React.FC<{
  comments: CommentType[];
  isVideo: boolean;
  id?: number;
}> = (props) => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {props.comments.length !== 0 ? (
        props.comments.map((comment, index) => (
          <CommentListItem
            comment={comment}
            key={index}
            isVideo={props.isVideo}
            id={props.id}
          />
        ))
      ) : (
        <div>덧글이 없습니다.</div>
      )}
    </List>
  );
};

export default CommentList;
