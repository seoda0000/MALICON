import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { postCommentData } from "../../redux/modules/feed";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";

const CommentInput: React.FC<{
  articleId: number;
}> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const commentRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = commentRef.current?.value || "";

    const res = dispatch(
      postCommentData({
        articleId: props.articleId,
        content,
      })
    );

    console.log("덧글 작성 : " + res);

    if (commentRef.current != null) {
      commentRef.current.value = "";
    }
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "flex-end" }}
      component="form"
      onSubmit={onSubmit}
    >
      <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        id="input-with-sx"
        label="덧글을 입력하세요"
        variant="standard"
        inputRef={commentRef}
        sx={{ width: 1 }}
      />
      <IconButton type="submit">
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default CommentInput;
