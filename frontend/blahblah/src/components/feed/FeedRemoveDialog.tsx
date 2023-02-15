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
import { removeVideoData } from "../../redux/modules/video";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";

export default function FeedRemoveDialog({
  open,
  handleClose,
  feed,
  video,
}: any): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const userPK = useSelector((state: RootState) => state.user.userData.id);
  const navigate = useNavigate();
  // const userId = 23;
  let feedId = 0;
  let videoId = 0;
  let text = "피드";
  if (feed) {
    feedId = feed.id;
  } else {
    videoId = video.recordingId;
    text = "비디오";
  }

  const removeFeedHandler = (e: any) => {
    e.preventDefault();

    if (feed) {
      const feedData = {
        id: feedId,
        userPK,
      };
      dispatch(removeFeedData(feedData));
    } else {
      const videoData = {
        recordingId: videoId,
      };
      // recordingid 확인해야 함
      dispatch(removeVideoData(videoData)).then(() => {
        navigate("/main", { replace: true });
      });
    }
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
        {text}를 삭제하시겠습니까?
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          삭제된 {text}는 복구되지 않습니다.
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
