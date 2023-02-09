import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { Box } from "@mui/system";
import { CommentType } from "../../model/feed/commentType";

const CommentSection: React.FC<{
  comments: CommentType[];
  articleId?: number;
  videoId?: number;
}> = (props) => {
  return (
    <Box sx={{ mx: 2 }}>
      <CommentInput articleId={props.articleId} />
      <CommentList comments={props.comments} />
    </Box>
  );
};

export default CommentSection;
