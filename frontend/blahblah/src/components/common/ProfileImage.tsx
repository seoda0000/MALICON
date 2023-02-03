import Avatar from "@mui/material/Avatar";
import { RootState } from "../../redux/configStore";
import { useSelector } from "react-redux";
import { createAvatar } from "@dicebear/core";
import { personas, pixelArt } from "@dicebear/collection";

type ProfileImagePropsType = {
  big?: boolean;
  border?: boolean;
};

export default function ProfileImage({
  big,
  border,
}: ProfileImagePropsType): JSX.Element {
  const avatar = useSelector((state: RootState) => state.user.userData.avatar!);

  const dataUri = createAvatar(personas, {
    ...JSON.parse(avatar),
    backgroundColor: ["ffdfbf"],
  }).toDataUriSync();

  return (
    <Avatar
      alt="Sample"
      src={dataUri}
      sx={{
        width: big ? 120 : 24,
        height: big ? 120 : 24,
        border: border ? 2 : "none",
        borderColor: "black",
      }}
    />
  );
}

