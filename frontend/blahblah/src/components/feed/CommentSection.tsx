import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import { Box } from "@mui/system";
import { CommentType } from "../../model/feed/commentType";

const CommentSection: React.FC<{ comments: CommentType[] }> = (props) => {
  return (
    <Box sx={{ mx: 2 }}>
      <CommentInput />
      <CommentList comments={props.comments} />
    </Box>
  );
};

export default CommentSection;
