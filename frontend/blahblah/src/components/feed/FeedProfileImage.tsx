import Avatar from "@mui/material/Avatar";
import { createAvatar } from "@dicebear/core";
import { personas, pixelArt } from "@dicebear/collection";

const FeedProfileImage: React.FC<{
  avatar: string;
  // small?: boolean;
  // onRemoveTodo: () => void;
}> = (props) => {
  const dataUri = createAvatar(personas, {
    ...JSON.parse(props.avatar!),
    backgroundColor: ["ffffff"],
  }).toDataUriSync();

  return (
    <Avatar
      alt="Sample"
      src={dataUri}
      // sx={{ width: props.small ? 30 : 40, height: props.small ? 30 : 40 }}
    />
  );
};

export default FeedProfileImage;
