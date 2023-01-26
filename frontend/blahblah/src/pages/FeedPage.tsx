import EditorComponent from "../components/feed/EditorComponent";
import FeedList from "../components/feed/FeedList";
// import FeedSection from "../components/feed/FeedSection";
import { useSelector, useDispatch } from "react-redux";
import { FeedStateType } from "../model/feed/feedStateType";
import { fetchFeedData } from "../redux/modules/feed/feed-action";
import { useEffect } from "react";
// import feed from "../redux/modules/feed";
import { AppDispatch } from "../redux/configStore";

let isInitial = true;

function FeedPage() {
  const dispatch = useDispatch<AppDispatch>();
  const feed = useSelector((state: FeedStateType) => state);

  useEffect(() => {
    dispatch(fetchFeedData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (feed.changed) {
      dispatch(fetchFeedData());
    }
  }, [feed, dispatch]);

  return (
    <div>
      <EditorComponent />
      <br />
      <br />
      <FeedList feeds={feed.feeds} />
    </div>
  );
}
export default FeedPage;
