import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";

import BasicModal from "../ui/BasicModal";
import ScrollModal from "../ui/ScrollModal";
import TextField from "@mui/material/TextField";

import React, { useRef, useState, useMemo } from "react";
import { useAppSelector } from "../../redux/configStore.hooks";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { AppDispatch } from "../../redux/configStore";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/configStore";
import { postFeedData, editFeedData } from "../../redux/modules/feed";
import "../../theme/quill.custom.css";
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
  const userPK = useSelector((state: RootState) => state.user.userData.id);
  const titleRef = useRef<HTMLInputElement>(null);
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState(feed.content);
  const feeds = useAppSelector((state) => state.feed.feedData);
  const [file, setFile] = useState<File | undefined>();
  // quill에서 사용할 모듈을 설정하는 코드
  // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.

  const formData = new FormData();

  const onCloseModal = () => {
    setOpen((prev: boolean) => !prev);
  };

  const handleChangeFile = (event: any) => {
    // formData.append("files", event?.target.files[0] as Blob);
    // console.log("체인지",formData.get("files"));
    setFile(event?.target.files[0]);
  };

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
      userPK,
    };

    
    formData.append(
      "postData",
      new Blob([JSON.stringify(postData)], {
        type: "application/json",
      })
    );

    // console.log(postData);
    if (postData && postData.title && postData.content) {
      if (isEdit) {
        dispatch(editFeedData(editData));
      } else if (file) {
        formData.append("files", file as Blob)
        dispatch(postFeedData(formData));
      } else{
        dispatch(postFeedData(formData));
      }
    }
    // window.scrollTo(0, 0);
    onCloseModal();
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
    <ScrollModal open={open} setOpen={setOpen}>
      {/* <BasicModal open={open} setOpen={setOpen}> */}
      <Box
        component="form"
        sx={{
          "& .MuiFormControl-root": {
            m: 1,
            minWidth: "25ch",
            // minHeight: "40ch",
            display: "flex",
          },
        }}
        noValidate
        autoComplete="off"
        onSubmit={createFeedHandler}
      >
        <TextField
          id="title"
          label="제목을 입력해주세요"
          type="title"
          variant="standard"
          inputRef={titleRef}
          defaultValue={feed.title}
        />

        <label htmlFor="upfile">파일:</label>
        <input
          type="file"
          className="form-control border"
          name="upfile"
          id="upfile"
          multiple
          onChange={handleChangeFile}
          formEncType="multipart/form-data"
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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button size="medium" type="submit">
            확인
          </Button>
        </Box>
      </Box>
      {/* </BasicModal> */}
    </ScrollModal>
  );
}