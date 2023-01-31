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

const SAMPLET_COMMENT = {
  id: 12123432321,
  userPK: 24,
  userId: "ssafy",
  articleId: 16,
  content: "샘플 덧글입니다.",
  createDate: "2023-01-28T22:56:05.107453",
  lastModifiedDate: "2023-01-28T22:56:05.107453",
};

const CommentList: React.FC<{ comments: CommentType[] }> = (props) => {
  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {props.comments &&
        props.comments.map((comment) => (
          <CommentListItem comment={comment} key={comment.id} />
        ))}
      {!props.comments && <div>덧글이 없습니다.</div>}
      <CommentListItem comment={SAMPLET_COMMENT} key={SAMPLET_COMMENT.id} />
    </List>
  );
};

export default CommentList;
