import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { createAvatar } from "@dicebear/core";
import { personas, pixelArt } from "@dicebear/collection";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/configStore.hooks";
import { getAboutMeAction } from "../../redux/modules/profile";
const FeedProfileImage: React.FC<{
  avatar: string;
  userPK: number;
  // small?: boolean;
  // onRemoveTodo: () => void;
}> = (props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const onClickHandler = () => {
    console.log("userPK", props.userPK);
    dispatch(getAboutMeAction(String(props.userPK))).then(() => {
      navigate(`/profile/${props.userPK}`);
    });
  };
  return (
    <IconButton onClick={onClickHandler}>
      <Avatar
        alt="Sample"
        src={dataUri}

        // sx={{ width: props.small ? 30 : 40, height: props.small ? 30 : 40 }}
      />
    </IconButton>
  );
};

export default FeedProfileImage;
