import * as React from "react";
import IconButton from "@mui/material/IconButton";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export default function PrevButton() {
  return (
    <IconButton color="primary" aria-label="next">
      <NavigateBeforeIcon />
    </IconButton>
  );
}
