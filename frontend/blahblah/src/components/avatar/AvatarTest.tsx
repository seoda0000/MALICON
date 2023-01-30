import { createAvatar } from "@dicebear/core";
import { personas, pixelArt } from "@dicebear/collection";
import { useMemo } from "react";
import { Stack } from "@mui/system";
// import { createAvatar } from "@dicebear/avatars";

// const avatar_1 = createAvatar(pixelArt, {
//   seed: "Cuddles",
//   // ... other options
// });

const avatar_2 = createAvatar(personas, {
  // seed: "Shadow",
  // flip: false,
  // backgroundColor,
  // backgroundType,
  body: ["checkered", "rounded", "small", "squared"],
  clothingColor: ["6dbb58", "54d7c7", "456dff", "000000"],
  eyes: ["glasses", "happy", "open", "sleep", "sunglasses", "wink"],
  facialHair: [
    "beardMustache",
    "goatee",
    "pyramid",
    "shadow",
    "soulPatch",
    "walrus",
  ],
  // facialHairProbability: 0,
  hair: ["curlyHighTop"],
  hairColor: ["6c4545", "362c47", "dee1f5"],
  mouth: ["bigSmile", "frown", "lips", "smile"],
  nose: ["mediumRound", "smallRound", "wrinkles"],
  skinColor: ["623d36", "92594b", "b16a5b"],
});

// const dataUri_1 = avatar_1.toDataUriSync();
const dataUri_2 = avatar_2.toDataUriSync();

const AvatarTest: React.FC<{ selectedAvatar: any }> = (props) => {
  const avatar = createAvatar(personas, {
    // seed: "Shadow",
    // flip: false,
    // backgroundColor,
    // backgroundType,
    body: props.selectedAvatar.body,
    clothingColor: ["6dbb58", "54d7c7", "456dff", "000000"],
    eyes: ["glasses", "happy", "open", "sleep", "sunglasses", "wink"],
    facialHair: [
      "beardMustache",
      "goatee",
      "pyramid",
      "shadow",
      "soulPatch",
      "walrus",
    ],
    // facialHairProbability: 0,
    hair: ["curlyHighTop"],
    hairColor: ["6c4545", "362c47", "dee1f5"],
    mouth: ["bigSmile", "frown", "lips", "smile"],
    nose: ["mediumRound", "smallRound", "wrinkles"],
    skinColor: ["623d36", "92594b", "b16a5b"],
  });

  const dataUri = avatar.toDataUriSync();

  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <img src={dataUri} width="200px" />
    </Stack>
  );
};
export default AvatarTest;
