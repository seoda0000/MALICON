import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { Box } from "@mui/system";
import { CommentType } from "../../model/feed/commentType";
import { useAppSelector } from "../../redux/configStore.hooks";

const CommentSection: React.FC<{
  comments: CommentType[];
  articleId?: number;
  videoId?: number;
}> = (props) => {
  let isVideo;
  let id;
  if (props.articleId) {
    id = props.articleId;
    isVideo = false;
  } else {
    id = props.videoId;
    isVideo = true;
  }

  const isLoggedIn = useAppSelector((state) => state.user.userData.isLoggedIn);

  return (
    <Box sx={{ mx: 2 }}>
      {isLoggedIn && <CommentInput articleId={id} isVideo={isVideo} />}
      <CommentList comments={props.comments} isVideo={isVideo} id={id} />
    </Box>
  );
};

export default CommentSection;
