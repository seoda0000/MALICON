import * as React from "react";
import IconButton from "@mui/material/IconButton";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const NextButton: React.FC<{ bodyNextHandler: any }> = (props) => {
  return (
    <IconButton
      color="primary"
      aria-label="next"
      onClick={props.bodyNextHandler}
    >
      <NavigateNextIcon />
    </IconButton>
  );
};
export default NextButton;
