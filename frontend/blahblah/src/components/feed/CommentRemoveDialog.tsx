import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { removeCommentData } from "../../redux/modules/feed";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/configStore";
import { AppDispatch } from "../../redux/configStore";

export default function CommentRemoveDialog({
  open,
  handleClose,
  comment,
  isVideo,
  id,
}: any): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const userPK = useSelector((state: RootState) => state.user.userData.id);
  // const userId = 23;

  const removeFeedHandler = (e: any) => {
    e.preventDefault();

    const commentData = {
      id: comment.id,
      userPK,
      isVideo: isVideo,
      videoId: id,
    };

    // console.log(commentData);

    dispatch(removeCommentData(commentData));
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"덧글을 삭제하시겠습니까?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          삭제된 덧글은 복구되지 않습니다.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button onClick={removeFeedHandler} autoFocus>
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}
