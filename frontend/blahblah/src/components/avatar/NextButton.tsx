import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ButtonComp from "../common/ButtonComp";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import styled from "@emotion/styled";

const Temp = styled(ButtonComp)`
  button {
    gap: 0;
  }
`;

const NextButton: React.FC<{ NextHandler: any }> = (props) => {
  return (
    <IconButton color="primary" aria-label="next" onClick={props.NextHandler}>
      <NavigateNextIcon />
    </IconButton>
    // <Temp onClick={props.NextHandler} width={35} text="">
    //   <KeyboardArrowRightRounded />
    // </Temp>
  );
};
export default NextButton;
