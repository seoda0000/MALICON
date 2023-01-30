import { createAvatar } from "@dicebear/core";
import { personas, pixelArt } from "@dicebear/collection";
import { Stack } from "@mui/system";

const AvatarTest: React.FC<{ selectedAvatar: any }> = (props) => {
  let avatar = createAvatar(personas, {
    ...props.selectedAvatar,
    facialHairProbability: 100,
  });

  let dataUri = avatar.toDataUriSync();

  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <img src={dataUri} width="400px" />
    </Stack>
  );
};
export default AvatarTest;
