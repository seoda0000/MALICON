import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";

import { useAppDispatch } from "../../redux/configStore.hooks";
import { signinAction } from "../../redux/modules/user";
import BasicModal from "../ui/BasicModal";

import TextField from "@mui/material/TextField";

import React, { useRef, useState, useMemo } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { AppDispatch } from "../../redux/configStore";
import { useDispatch } from "react-redux";
import { postFeedData } from "../../redux/modules/feed";

const buttonBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "32px",
};

export default function EditorModal({ open, setOpen }: any): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const titleRef = useRef<HTMLInputElement>(null);
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState("");

  // quill에서 사용할 모듈을 설정하는 코드
  // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.

  const createFeedHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const feedTitle = titleRef.current?.value || "";
    const feedContent = String(QuillRef.current?.value);

    const postData = {
      title: feedTitle,
      content: feedContent,
    };

    console.log(postData);
    if (postData && postData.title && postData.content) {
      dispatch(postFeedData(postData));
    }
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike", "blockquote"],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          // ["image", "video"],
          ["video"],
        ],
        handlers: {},
      },
    }),
    []
  );

  return (
    <BasicModal open={open} setOpen={setOpen}>
      <Box
        component="form"
        sx={{
          "& .MuiFormControl-root": { m: 1, width: "25ch", display: "flex" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={createFeedHandler}
      >
        <TextField
          id="title"
          label="title"
          type="title"
          variant="standard"
          inputRef={titleRef}
        />

        <ReactQuill
          ref={(element: any) => {
            if (element !== null) {
              QuillRef.current = element;
            }
          }}
          value={contents}
          onChange={setContents}
          modules={modules}
          theme="snow"
          placeholder="내용을 입력해주세요."
        />

        <Button size="medium" type="submit">
          확인
        </Button>
      </Box>
    </BasicModal>
  );
}
