import EditorComponent from "../components/feed/EditorComponent";
import FeedList from "../components/feed/FeedList";
import FeedSection from "../components/feed/FeedSection";

function FeedPage() {
  return (
    <div>
      <EditorComponent />
      <br />
      <br />
      <FeedList />
    </div>
  );
}
export default FeedPage;
