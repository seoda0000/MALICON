import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { Box } from "@mui/system";
import { CommentType } from "../../model/feed/commentType";

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
  return (
    <Box sx={{ mx: 2 }}>
      <CommentInput articleId={id} isVideo={isVideo} />
      <CommentList comments={props.comments} isVideo={isVideo} id={id} />
    </Box>
  );
};

export default CommentSection;
