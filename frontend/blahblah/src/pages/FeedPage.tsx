import Box from "@mui/material/Box";
import { Paper } from "@mui/material";
import VideoCard from "../components/video/VideoCard";
import Grid from "@mui/material/Grid";
import FeedList from "../components/feed/FeedList";
import EditorModal from "../components/feed/EditorModal";
import Button from "@mui/material/Button";
import CreateIcon from "@mui/icons-material/Create";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchFeedData,
  getFeedsAction,
} from "../redux/modules/feed/feed-action";
import { useEffect, useState } from "react";
import { AppDispatch } from "../redux/configStore";
import { RootState } from "../redux/configStore";
import RightVideoSection from "../components/video/RightVideoSection";
import InfiniteScroll from "../components/ui/InfiniteScroll";
import { useAppSelector } from "../redux/configStore.hooks";

const drawerWidth = 300;
let isInitial = true;

export default function FeedPage() {
  const dispatch = useDispatch<AppDispatch>();
  const feed = useSelector((state: RootState) => state.feed);
  const feeds = useAppSelector((state) => state.feed.feedData);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      // dispatch(fetchFeedData());
      return;
    }
  }, [feed, dispatch]);

  // 모달 조작
  const [openEditorModal, setOpenEditorModal] = useState<boolean>(false);
  const onClickEditor = () => {
    setOpenEditorModal((prev) => !prev);
  };

  useEffect(() => {
    dispatch(getFeedsAction({ size: 5, page: 0 }));
    console.log("feeds", feeds);
  }, []);

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
        {/* <FeedList feeds={feed.feeds} /> */}
        {feeds && (
          <InfiniteScroll
            feedPage={true}
            actionFunc={getFeedsAction}
            itemsWrap={feeds}
            totalPage={feeds.totalPages}
          />
        )}
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
      <RightVideoSection drawerWidth={drawerWidth} />
    </Box>
  );
}

