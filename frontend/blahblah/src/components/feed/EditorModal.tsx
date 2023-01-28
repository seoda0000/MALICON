import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";

import BasicModal from "../ui/BasicModal";

import TextField from "@mui/material/TextField";

import React, { useRef, useState, useMemo } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { AppDispatch } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { postFeedData, editFeedData } from "../../redux/modules/feed";
import { RootState } from "../../redux/configStore";
// const buttonBoxStyle = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   marginTop: "32px",
// };

export default function EditorModal({
  open,
  setOpen,
  feed,
  isEdit,
}: any): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  // const userId = useSelector((state: RootState) => state.user.userData.userId);
  const userId = 23;
  const titleRef = useRef<HTMLInputElement>(null);
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState(feed.content);

  // quill에서 사용할 모듈을 설정하는 코드
  // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.

  const createFeedHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = titleRef.current?.value || "";
    const content = String(QuillRef.current?.value);

    const postData = {
      title,
      content,
    };

    const editData = {
      title,
      content,
      id: feed.id,
      userId: userId,
    };

    console.log(postData);
    if (postData && postData.title && postData.content) {
      if (isEdit) {
        dispatch(editFeedData(editData));
      } else {
        dispatch(postFeedData(postData));
      }
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
          defaultValue={feed.title}
        />

        <ReactQuill
          ref={(element: any) => {
            if (element !== null) {
              QuillRef.current = element;
            }
          }}
          value={contents}
          // value="엥?"
          onChange={setContents}
          modules={modules}
          theme="snow"
          placeholder="내용을 입력해주세요."
          // defaultValue="엥?"
        />

        <Button size="medium" type="submit">
          확인
        </Button>
      </Box>
    </BasicModal>
  );
}
