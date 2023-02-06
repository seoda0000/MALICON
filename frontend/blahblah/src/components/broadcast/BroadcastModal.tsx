import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../../redux/configStore.hooks";

import BasicModal from "../ui/BasicModal";
import ChipsArray from "./ChipsArray";

interface ChipData {
  key: number;
  label: string;
  selected: boolean;
}

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

  // chips
  const [chipData, setChipData] = useState<ChipData[]>([
    { key: 0, label: "실시간", selected: true },
    { key: 1, label: "노래", selected: false },
    { key: 2, label: "게임", selected: false },
    { key: 3, label: "요리", selected: false },
    { key: 4, label: "팬미팅", selected: false },
    { key: 5, label: "악기", selected: false },
    { key: 6, label: "댄스", selected: false },
    { key: 7, label: "패션", selected: false },
    { key: 8, label: "그림", selected: false },
    { key: 9, label: "한국어", selected: false },
    { key: 10, label: "English", selected: false },
  ]);

  const handleClick = (e: any) => {
    const target = e.target.innerHTML;
    console.log(target);
    setChipData((chips) =>
      chips.map((chip) => {
        if (chip.label === target) {
          chip.selected = !chip.selected;
        }
        return chip;
      })
    );
    console.log(chipData);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chipList = chipData.filter((chip) => chip.selected === true);
    console.log(JSON.stringify(chipList));
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
        <ChipsArray chipData={chipData} handleClick={handleClick} />
        <Box sx={buttonBoxStyle}>
          <Button variant="contained" type="submit">
            방송 시작
          </Button>
        </Box>
      </Box>
    </BasicModal>
  );
}
