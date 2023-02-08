import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
interface ChipData {
  key: number;
  label: string;
  selected: boolean;
}

const CarouselChips: React.FC<{ chipData: ChipData[] }> = (props) => {
  console.log(props.chipData);
  return (
    <Box
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
        return (
          <Box
            sx={{
              backgroundColor: "white",
              fontSize: 9,
              borderRadius: 13,
              px: 0.5,
              mr: 1,
            }}
          >
            {data.label}
          </Box>
        );
      })}
    </Box>
  );
};

export default CarouselChips;
