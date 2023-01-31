import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function CommentInput() {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        id="input-with-sx"
        label="덧글을 입력하세요"
        variant="standard"
        sx={{ width: 1 }}
      />
    </Box>
  );
}
