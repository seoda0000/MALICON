import * as React from "react";
import Stack from "@mui/material/Stack";
import PrevButton from "./PrevButton";
import NextButton from "./NextButton";
import { Button, Paper } from "@mui/material";

const SelectItem: React.FC<{ option: any; selectHandler: any }> = (props) => {
  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <PrevButton />
      <Button>{props.option}</Button>
      <NextButton NextHandler={props.selectHandler.nextHandler} />
    </Stack>
  );
};
export default SelectItem;
