import Avatar from "@mui/material/Avatar";
import { createAvatar } from "@dicebear/core";
import { personas, pixelArt } from "@dicebear/collection";

const FeedProfileImage: React.FC<{
  avatar: string;
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
      // sx={{ width: 56, height: 56 }}
    />
  );
};

export default FeedProfileImage;
