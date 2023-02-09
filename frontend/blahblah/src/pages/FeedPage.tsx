import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import VideoCard from "../components/video/VideoCard";
import Grid from "@mui/material/Grid";
import FeedList from "../components/feed/FeedList";
import EditorModal from "../components/feed/EditorModal";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";

import { useSelector, useDispatch } from "react-redux";
import { fetchFeedData } from "../redux/modules/feed/feed-action";
import { useEffect, useState } from "react";
import { AppDispatch } from "../redux/configStore";
import { RootState } from "../redux/configStore";

const drawerWidth = 300;
let isInitial = true;

export default function FeedPage() {
  const dispatch = useDispatch<AppDispatch>();
  const feed = useSelector((state: RootState) => state.feed);
  const video = useSelector((state: RootState) => state.video);

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
    <Box sx={{ display: "flex" }}>
      {/* 메인 페이지 영역 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
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

        {openEditorModal && (
          <EditorModal
            open={openEditorModal}
            setOpen={setOpenEditorModal}
            feed={{ title: "", content: "", feedId: null }}
            isEdit={false}
          />
        )}
      </Box>

      {/* 우측 컴포넌트 */}

      <Box sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Paper
          // variant="permanent"
          sx={{
            display: { xs: "none", md: "flex" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
            ml: 5,
            p: 2,
          }}
        >
          {/* 컨텐츠 내용 */}
          <Grid container rowSpacing={3}>
            <h3>Latest Video</h3>
            {video.followingVideoList.map((video, index) => (
              <Grid item width={"100%"}>
                <VideoCard nth={3} video={video} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}
