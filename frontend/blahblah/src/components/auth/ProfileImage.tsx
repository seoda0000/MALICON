import Avatar from "@mui/material/Avatar";
import { RootState } from "../../redux/configStore";
import { useSelector } from "react-redux";
import { createAvatar } from "@dicebear/core";
import { personas, pixelArt } from "@dicebear/collection";

export default function ProfileImage({ ...rest }): JSX.Element {
  const avatar = useSelector((state: RootState) => state.user.userData.avatar!);

  const dataUri = createAvatar(personas, {
    ...JSON.parse(avatar),
    backgroundColor: ["ffdfbf"],
  }).toDataUriSync();

  return (
    <Avatar
      alt="Sample"
      src={dataUri}
      // sx={{ width: 56, height: 56 }}
      sx={{ ...rest }}
    />
  );
}

