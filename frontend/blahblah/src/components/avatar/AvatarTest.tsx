import { createAvatar } from "@dicebear/core";
import { personas, pixelArt } from "@dicebear/collection";
import { useMemo, useEffect } from "react";
import { Stack } from "@mui/system";

const AvatarTest: React.FC<{ selectedAvatar: any }> = (props) => {
  let avatar = createAvatar(personas, {
    // seed: "Shadow",
    // flip: false,
    // backgroundColor,
    // backgroundType,
    body: [props.selectedAvatar.body],
    clothingColor: [props.selectedAvatar.clothingColor],
    eyes: [props.selectedAvatar.eyes],
    facialHair: [props.selectedAvatar.facialColor],
    // facialHairProbability: 0,
    hair: [props.selectedAvatar.hair],
    hairColor: [props.selectedAvatar.hairColor],
    mouth: [props.selectedAvatar.mouth],
    nose: [props.selectedAvatar.nose],
    skinColor: [props.selectedAvatar.skinColor],
  });

  let dataUri = avatar.toDataUriSync();

  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <img src={dataUri} width="200px" />
    </Stack>
  );
};
export default AvatarTest;
