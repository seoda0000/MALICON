import Avatar from "@mui/material/Avatar";
import { createAvatar } from "@dicebear/core";
import { personas, pixelArt } from "@dicebear/collection";

const FeedProfileImage: React.FC<{
  avatar: string;
  // small?: boolean;
  // onRemoveTodo: () => void;
}> = (props) => {
  const tempAvatar = JSON.stringify({
    body: ["rounded"],
    clothingColor: ["54d7c7"],
    eyes: ["happy"],
    facialHair: [""],
    facialHairProbability: 100,
    hair: ["curlyHighTop"],
    hairColor: ["6c4545"],
    mouth: ["bigSmile"],
    nose: ["smallRound"],
    skinColor: ["d78774"],
  });
  const dataUri = createAvatar(personas, {
    ...JSON.parse(props.avatar ? props.avatar : tempAvatar),
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

