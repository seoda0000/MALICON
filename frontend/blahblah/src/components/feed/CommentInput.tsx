import * as React from "react";
import Box from "@mui/material/Box";

import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { postCommentData } from "../../redux/modules/feed";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useRef } from "react";

import ProfileImage from "../common/ProfileImage";

const CommentInput: React.FC<{
  articleId?: number;
  videoId?: number;
}> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const commentRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const content = commentRef.current?.value || "";

    if (props.articleId) {
      const res = dispatch(
        postCommentData({
          articleId: props.articleId,
          content,
        })
      );
    } else {
      // 비디오 덧글 쓰기 기능 구현
      // const res = dispatch(
      //   postVideoCommentData({
      //     videoId: props.articleId,
      //     content,
      //   })
      // );
    }

    // console.log("덧글 작성 : " + res);

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
      {/* <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} /> */}
      <Box sx={{ mr: 1.5, my: 0.5, width: "20px" }}>
        <ProfileImage />
      </Box>
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
