import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { removeFeedData } from "../../redux/modules/feed";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/configStore";
import { AppDispatch } from "../../redux/configStore";

export default function FeedRemoveDialog({
  open,
  handleClose,
  feed,
}: any): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.user.userData.userId);
  const feedId = feed.id;

  const removeFeedHandler = (e: any) => {
    e.preventDefault();

    const feedData = {
      id: feedId,
      userId: userId,
    };

    console.log(feedData);

    dispatch(removeFeedData(feedData));
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"피드를 삭제하시겠습니까?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          삭제된 피드는 복구되지 않습니다.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={removeFeedHandler}>취소</Button>
        <Button onClick={handleClose} autoFocus>
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}
