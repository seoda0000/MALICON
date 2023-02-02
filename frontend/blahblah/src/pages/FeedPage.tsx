import FeedList from "../components/feed/FeedList";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { FeedStateType } from "../model/feed/feedStateType";
import { fetchFeedData } from "../redux/modules/feed/feed-action";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { AppDispatch } from "../redux/configStore";
import Paper from "@mui/material/Paper";
import EditorModal from "../components/feed/EditorModal";

import Button from "@mui/material/Button";

import CreateIcon from "@mui/icons-material/Create";

import { RootState } from "../redux/configStore";

let isInitial = true;

function FeedPage() {
  const dispatch = useDispatch<AppDispatch>();
  const feed = useSelector((state: RootState) => state.feed);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      dispatch(fetchFeedData());
      return;
    }
  }, [feed, dispatch]);

  // 모달 조작
  const [openEditorModal, setOpenEditorModal] = useState<boolean>(false);
  const onClickEditor = () => {
    setOpenEditorModal((prev) => !prev);
  };

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={12} sm={9} md={9}>
        <Button
          onClick={onClickEditor}
          variant="outlined"
          startIcon={<CreateIcon />}
        >
          새 피드
        </Button>

        <br />
        <br />
        <FeedList feeds={feed.feeds} />
      </Grid>
      <Grid item xs={0} sm={3} md={3}>
        <Paper sx={{ position: "fixed", top: "4%", right: "8%", width: "500" }}>
          <h1>구독 비디오</h1>
          <div>
            <p>야호야호</p>
            <p>야호야호</p>
            <p>야호야호</p>
            <p>야호야호</p>
            <p>야호야호</p>
            <p>야호야호</p>
            <p>야호야호</p>
            <p>야호야호</p>
            <p>야호야호</p>
            <p>야호야호</p>
          </div>
        </Paper>
      </Grid>
      {openEditorModal && (
        <EditorModal
          open={openEditorModal}
          setOpen={setOpenEditorModal}
          feed={{ title: "", content: "", feedId: null }}
          isEdit={false}
        />
      )}
    </Grid>
  );
}
export default FeedPage;
