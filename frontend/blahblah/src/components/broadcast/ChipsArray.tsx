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

const ChipsArray: React.FC<{ chipData: ChipData[]; handleClick: any }> = (
  props
) => {
  useEffect(() => {}, [props.chipData]);

  return (
    <Paper
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
      {props.chipData.map((data) => {
        let icon;

        if (data.label === "실시간") {
          icon = <LiveTvIcon />;
        }

        let color;

        if (data.selected === true) {
          color = "primary" as "primary";
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
