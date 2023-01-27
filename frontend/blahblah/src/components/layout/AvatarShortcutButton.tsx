import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import FaceIcon from "@mui/icons-material/Face";
import GiteIcon from "@mui/icons-material/Gite";
import { Link } from "react-router-dom";

const withLink = (to: string, children: any) => <Link to={to}>{children}</Link>;
const actions = [
  {
    icon: withLink("/tutorial", <AccessibilityNewIcon />),
    name: "아바타 체험하기",
  },
  { icon: withLink("/avatar", <FaceIcon />), name: "내 아바타" },
];

export default function AvatarShortcutButton() {
  return (
    <Box sx={{ height: 320, transform: "translateZ(0px)", flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<GiteIcon />}
      >
        {actions.map((action) => (
          // <Link to="/main">
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
          // </Link>
        ))}
      </SpeedDial>
    </Box>
  );
}
