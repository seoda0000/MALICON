import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { CommentType } from "../../model/feed/commentType";
import { useEffect, useState } from "react";
import CommentRemoveDialog from "./CommentRemoveDialog";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FeedProfileImage from "./FeedProfileImage";
import { useAppSelector } from "../../redux/configStore.hooks";
const CommentListItem: React.FC<{
  comment: any;
  isVideo: boolean;
  id?: any;
}> = (props) => {
  // 삭제 다이얼로그 조작
  const [openRemoveDialog, setopenRemoveDialog] = useState<boolean>(false);
  const loggedUserId = useAppSelector((state) => state.user.userData.userId);

  const handleClickOpen = () => {
    setopenRemoveDialog(true);
  };
  const handleCloseDialog = () => {
    setopenRemoveDialog(false);
  };

  // 날짜 조작
  let dateList = props.comment.createDate.slice(0, 6);
  dateList[1]--;
  // console.log(dateList);
  const utcDate = new Date(
    ...(dateList as [number, number, number, number, number, number])
  );

  const utc = utcDate.getTime() + utcDate.getTimezoneOffset() * 60 * 1000;
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000 * 2;
  const kr_curr = new Date(utc + KR_TIME_DIFF);
  const koreaDate = kr_curr.toLocaleString("en-US", {
    timeZone: "Asia/Seoul",
  });

  return (
    <ListItem alignItems="flex-start">
      <FeedProfileImage
        avatar={props.comment.avatar}
        userPK={props.comment.userPK}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          justifyItems: "center",
          // alignItems: "center",
        }}
      >
        <div>
          <Typography
            sx={{ display: "inline", mr: 3 }}
            component="span"
            variant="body1"
            color="text.primary"
          >
            {props.comment.nickName}
          </Typography>
          {props.comment.content}
        </div>
        <Typography variant="caption">{koreaDate}</Typography>
      </div>

      {props.comment.userId === loggedUserId && (
        <IconButton
          type="submit"
          onClick={handleClickOpen}
          style={{ marginLeft: "auto" }}
        >
          <DeleteIcon />
        </IconButton>
      )}

      <CommentRemoveDialog
        open={openRemoveDialog}
        handleClose={handleCloseDialog}
        comment={props.comment}
        isVideo={props.isVideo}
        id={props.id}
      />
    </ListItem>
  );
};

export default CommentListItem;
