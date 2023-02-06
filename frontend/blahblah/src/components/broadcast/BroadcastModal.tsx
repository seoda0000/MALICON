import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../../redux/configStore.hooks";

import BasicModal from "../ui/BasicModal";

const buttonBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "32px",
};

export default function BroadcastModal({ open, setOpen }: any): JSX.Element {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>("");

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onCloseModal = () => {
    setOpen((prev: boolean) => !prev);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // dispatch(
    //   signinAction({
    //     userId: id,
    //   })
    // );

    onCloseModal();
  };

  return (
    <BasicModal open={open} setOpen={setOpen}>
      <Box
        component="form"
        sx={{
          "& .MuiFormControl-root": { m: 1, width: "25ch", display: "flex" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <FormControl variant="standard">
          <InputLabel>방송 제목</InputLabel>
          <Input id="title" value={title} onChange={onChangeTitle} required />
        </FormControl>
        <Box sx={buttonBoxStyle}>
          <Button variant="contained" type="submit">
            방송 시작
          </Button>
        </Box>
      </Box>
    </BasicModal>
  );
}
