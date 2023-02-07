import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch } from "../../redux/configStore.hooks";
import { startSession } from "../../redux/modules/broadcast";
import BasicModal from "../ui/BasicModal";
import ChipsArray from "./ChipsArray";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/configStore";
import { useNavigate } from "react-router-dom";

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
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState<string>("");

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onCloseModal = () => {
    setOpen((prev: boolean) => !prev);
  };

  // chips
  const [chipData, setChipData] = useState<ChipData[]>([
    { key: 0, label: "K-POP", selected: false },
    { key: 1, label: "발라드", selected: false },
    { key: 2, label: "락", selected: false },
    { key: 3, label: "트로트", selected: false },
    { key: 4, label: "디스코", selected: false },
    { key: 5, label: "팝", selected: false },
    { key: 6, label: "재즈", selected: false },
    { key: 7, label: "클래식", selected: false },
    { key: 8, label: "CCM", selected: false },
    { key: 9, label: "힙합", selected: false },
    { key: 10, label: "컨트리", selected: false },
    { key: 11, label: "레게", selected: false },
    { key: 12, label: "댄스", selected: false },
    { key: 13, label: "EDM", selected: false },
    { key: 14, label: "통기타", selected: false },
    { key: 15, label: "피아노", selected: false },
    { key: 16, label: "밴드", selected: false },
    { key: 17, label: "리코더", selected: false },
    { key: 18, label: "팬 미팅", selected: false },
    { key: 19, label: "인디", selected: false },
    { key: 20, label: "솔로", selected: false },
    { key: 21, label: "듀엣", selected: false },
    { key: 22, label: "그룹", selected: false },
  ]);

  const handleClick = (e: any) => {
    const target = e.target.innerHTML;
    setChipData((chips) =>
      chips.map((chip) => {
        if (chip.label === target) {
          chip.selected = !chip.selected;
        }
        return chip;
      })
    );
  };

  // 방송 시작
  const navigate = useNavigate();
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const chipList = chipData.filter((chip) => chip.selected === true);

    const sessionData = {
      title,
      hashTag: JSON.stringify(chipList),
    };

    dispatch(startSession(sessionData));

    onCloseModal();
    navigate("/video");
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
