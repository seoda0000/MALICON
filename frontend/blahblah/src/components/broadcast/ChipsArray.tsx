import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useEffect, useState } from "react";
interface ChipData {
  key: number;
  label: string;
  selected: boolean;
}

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ChipsArray: React.FC<{
  chipData: ChipData[];
  handleClick: any;
}> = (props) => {
  useEffect(() => {}, [props.chipData]);

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {props.chipData.map((data, index) => {
        let icon;

        let color;

        if (data.selected === true) {
          if (index % 6 === 0) {
            color = "primary" as "primary";
          } else if (index % 6 === 1) {
            color = "secondary" as "secondary";
          } else if (index % 6 === 2) {
            color = "error" as "error";
          } else if (index % 6 === 3) {
            color = "info" as "info";
          } else if (index % 6 === 4) {
            color = "success" as "success";
          } else if (index % 6 === 5) {
            color = "warning" as "warning";
          }
        }

        return (
          <ListItem key={data.key}>
            <Chip
              color={color}
              icon={icon}
              label={data.label}
              onClick={props.handleClick}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
};

export default ChipsArray;
