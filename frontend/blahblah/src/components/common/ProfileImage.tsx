import Avatar from "@mui/material/Avatar";
import { RootState } from "../../redux/configStore";
import { useSelector } from "react-redux";
import { createAvatar } from "@dicebear/core";
import { personas, pixelArt } from "@dicebear/collection";

type ProfileImagePropsType = {
  big?: boolean;
  border?: boolean;
  userAvatar?: string;
  borderColor?: string;
};

export default function ProfileImage({
  big,
  border,
  userAvatar,
  borderColor,
}: ProfileImagePropsType): JSX.Element {
  const avatar = useSelector((state: RootState) => state.user.userData.avatar!);

  let avatarString;

  if (userAvatar) {
    avatarString = userAvatar;
  } else {
    avatarString = avatar;
  }

  const dataUri = createAvatar(personas, {
    ...JSON.parse(avatarString),
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
        borderColor: borderColor ? borderColor : "black",
      }}
    />
  );
}

