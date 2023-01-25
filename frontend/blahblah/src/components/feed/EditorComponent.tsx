import { useRef, useState, useMemo } from "react";
import TextField from "@mui/material/TextField";
//이렇게 라이브러리를 불러와서 사용하면 됩니다
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const EditorComponent = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const QuillRef = useRef<ReactQuill>();
  const [contents, setContents] = useState("");

  // quill에서 사용할 모듈을 설정하는 코드 입니다.
  // 원하는 설정을 사용하면 되는데, 저는 아래와 같이 사용했습니다.
  // useMemo를 사용하지 않으면, 키를 입력할 때마다, imageHandler 때문에 focus가 계속 풀리게 됩니다.

  function createFeedHandler(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const feedTitle = titleRef.current?.value;
    const feedContent = QuillRef.current?.value;

    const feedData = {
      title: feedTitle,
      content: feedContent,
    };

    console.log(feedData);
  }

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
    <Box component="form" onSubmit={createFeedHandler}>
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
  );
};

export default EditorComponent;
