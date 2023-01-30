import * as React from "react";
import IconButton from "@mui/material/IconButton";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const PrevButton: React.FC<{ PrevHandler: any }> = (props) => {
  return (
    <IconButton color="primary" aria-label="next" onClick={props.PrevHandler}>
      <NavigateBeforeIcon />
    </IconButton>
  );
};
export default PrevButton;
