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

const HASH_TAG_LIST = [
  { key: 0, label: "실시간", selected: true },
  { key: 1, label: "노래", selected: false },
  { key: 2, label: "게임", selected: false },
  { key: 3, label: "요리", selected: false },
  { key: 4, label: "팬미팅", selected: false },
  { key: 5, label: "악기", selected: false },
  { key: 6, label: "댄스", selected: false },
  { key: 7, label: "패션", selected: false },
  { key: 8, label: "그림", selected: false },
  { key: 9, label: "한국어", selected: false },
  { key: 10, label: "English", selected: false },
];
const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function ChipsArray() {
  const [chipData, setChipData] = useState<readonly ChipData[]>([
    { key: 0, label: "실시간", selected: true },
    { key: 1, label: "노래", selected: false },
    { key: 2, label: "게임", selected: false },
    { key: 3, label: "요리", selected: false },
    { key: 4, label: "팬미팅", selected: false },
    { key: 5, label: "악기", selected: false },
    { key: 6, label: "댄스", selected: false },
    { key: 7, label: "패션", selected: false },
    { key: 8, label: "그림", selected: false },
    { key: 9, label: "한국어", selected: false },
    { key: 10, label: "English", selected: false },
  ]);
  useEffect(() => {}, [chipData]);
  const handleDelete = (chipToDelete: ChipData) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  const handleClick = (e: any) => {
    const target = e.target.innerHTML;
    console.log(target);
    setChipData((chips) =>
      chips.map((chip) => {
        if (chip.label === target) {
          chip.selected = !chip.selected;
        }
        return chip;
      })
    );
    console.log(chipData);
  };

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
      {chipData.map((data) => {
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
              onClick={handleClick}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
}
