import FeedList from "../components/feed/FeedList";

import { useSelector, useDispatch } from "react-redux";
import { FeedStateType } from "../model/feed/feedStateType";
import { fetchFeedData } from "../redux/modules/feed/feed-action";
import { useEffect, useState } from "react";

import { AppDispatch } from "../redux/configStore";

import EditorModal from "../components/feed/EditorModal";

import Button from "@mui/material/Button";

import CreateIcon from "@mui/icons-material/Create";

import { RootState } from "../redux/configStore";

let isInitial = true;

function FeedPage() {
  const dispatch = useDispatch<AppDispatch>();
  const feed = useSelector((state: RootState) => state.feed);

  useEffect(() => {
    dispatch(fetchFeedData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    // if (feed.changed) {
    //   dispatch(fetchFeedData());
    // }
  }, [feed, dispatch]);

  // 모달 조작
  const [openEditorModal, setOpenEditorModal] = useState<boolean>(false);
  const onClickEditor = () => {
    setOpenEditorModal((prev) => !prev);
  };

  return (
    <div>
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

      {/* {showModal && <EditorModal open={showModal} setOpen={!showModal} />} */}
    </div>
  );
}
export default FeedPage;
