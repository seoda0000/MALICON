import * as React from "react";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ButtonComp from "../common/ButtonComp";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";

const PrevButton: React.FC<{ PrevHandler: any }> = (props) => {
  return (
    <IconButton color="primary" aria-label="next" onClick={props.PrevHandler}>
      <NavigateBeforeIcon />
    </IconButton>
    // <ButtonComp onClick={props.PrevHandler} width={35} text="">
    //   <KeyboardArrowLeftRounded />
    // </ButtonComp>
  );
};
export default PrevButton;
