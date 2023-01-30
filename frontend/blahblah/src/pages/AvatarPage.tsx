import AvatarTest from "../components/avatar/AvatarTest";
import SelectList from "../components/avatar/SelectList";
import { useState } from "react";
import { Button } from "@mui/material";

const AVATAR_OPTION = {
  // backgroundColor,
  // backgroundType,
  // seed: "Shadow",
  // flip: [false, true],
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
  hair: ["curlyHighTop", "sideShave"],
  hairColor: ["6c4545", "362c47", "dee1f5"],
  mouth: ["bigSmile", "frown", "lips", "smile"],
  nose: ["mediumRound", "smallRound", "wrinkles"],
  skinColor: ["623d36", "92594b", "b16a5b"],
};

function AvatarPage() {
  const [body, setBody] = useState<number>(0);
  const [clothingColor, setClothingColor] = useState<number>(0);
  const [eyes, setEyes] = useState<number>(0);
  const [facialHair, setFacialHair] = useState<number>(0);
  const [hair, setHair] = useState<number>(0);
  const [hairColor, setHairColor] = useState<number>(0);
  const [mouth, setMouth] = useState<number>(0);
  const [nose, setNose] = useState<number>(0);
  const [skinColor, setSkinColor] = useState<number>(0);

  const selectedAvatar = {
    body: AVATAR_OPTION.body[body],
    clothingColor: AVATAR_OPTION.clothingColor[clothingColor],
    eyes: AVATAR_OPTION.eyes[eyes],
    facialHair: AVATAR_OPTION.facialHair[facialHair],
    hair: AVATAR_OPTION.hair[hair],
    hairColor: AVATAR_OPTION.hairColor[hairColor],
    mouth: AVATAR_OPTION.mouth[mouth],
    nose: AVATAR_OPTION.nose[nose],
    skinColor: AVATAR_OPTION.skinColor[skinColor],
  };

  const selectHandler = {
    body: {
      prevHandler: () => {
        if (body === 0) {
          setBody(AVATAR_OPTION.body.length - 1);
        } else {
          setBody(body - 1);
        }
      },
      nextHandler: () => {
        if (body === AVATAR_OPTION.body.length - 1) {
          setBody(0);
        } else {
          setBody(body + 1);
        }
      },
    },
    clothingColor: {
      prevHandler: () => {
        if (clothingColor === 0) {
          setClothingColor(AVATAR_OPTION.clothingColor.length - 1);
        } else {
          setClothingColor(clothingColor - 1);
        }
      },
      nextHandler: () => {
        if (clothingColor === AVATAR_OPTION.clothingColor.length - 1) {
          setClothingColor(0);
        } else {
          setClothingColor(clothingColor + 1);
        }
      },
    },
    eyes: {
      prevHandler: () => {
        if (eyes === 0) {
          setEyes(AVATAR_OPTION.eyes.length - 1);
        } else {
          setEyes(eyes - 1);
        }
      },
      nextHandler: () => {
        if (eyes === AVATAR_OPTION.eyes.length - 1) {
          setEyes(0);
        } else {
          setEyes(eyes + 1);
        }
      },
    },
    facialHair: {
      prevHandler: () => {
        if (facialHair === 0) {
          setFacialHair(AVATAR_OPTION.facialHair.length - 1);
        } else {
          setFacialHair(facialHair - 1);
        }
      },
      nextHandler: () => {
        if (facialHair === AVATAR_OPTION.facialHair.length - 1) {
          setFacialHair(0);
        } else {
          setFacialHair(facialHair + 1);
        }
      },
    },
    hair: {
      prevHandler: () => {
        if (hair === 0) {
          setHair(AVATAR_OPTION.hair.length - 1);
        } else {
          setHair(hair - 1);
        }
      },
      nextHandler: () => {
        if (hair === AVATAR_OPTION.hair.length - 1) {
          setHair(0);
        } else {
          setHair(hair + 1);
        }
      },
    },
    hairColor: {
      prevHandler: () => {
        if (hairColor === 0) {
          setHairColor(AVATAR_OPTION.hairColor.length - 1);
        } else {
          setHairColor(hairColor - 1);
        }
      },
      nextHandler: () => {
        if (hairColor === AVATAR_OPTION.hairColor.length - 1) {
          setHairColor(0);
        } else {
          setHairColor(hairColor + 1);
        }
      },
    },
    mouth: {
      prevHandler: () => {
        if (mouth === 0) {
          setMouth(AVATAR_OPTION.mouth.length - 1);
        } else {
          setMouth(mouth - 1);
        }
      },
      nextHandler: () => {
        if (mouth === AVATAR_OPTION.mouth.length - 1) {
          setMouth(0);
        } else {
          setMouth(mouth + 1);
        }
      },
    },
    nose: {
      prevHandler: () => {
        if (nose === 0) {
          setNose(AVATAR_OPTION.nose.length - 1);
        } else {
          setNose(nose - 1);
        }
      },
      nextHandler: () => {
        if (nose === AVATAR_OPTION.nose.length - 1) {
          setNose(0);
        } else {
          setNose(nose + 1);
        }
      },
    },
    skinColor: {
      prevHandler: () => {
        if (skinColor === 0) {
          setSkinColor(AVATAR_OPTION.skinColor.length - 1);
        } else {
          setSkinColor(skinColor - 1);
        }
      },
      nextHandler: () => {
        if (skinColor === AVATAR_OPTION.skinColor.length - 1) {
          setSkinColor(0);
        } else {
          setSkinColor(skinColor + 1);
        }
      },
    },
  };

  return (
    <div>
      <h1>아바타 페이지</h1>
      <AvatarTest selectedAvatar={selectedAvatar} />
      <SelectList options={AVATAR_OPTION} selectHandler={selectHandler} />
      <Button>확정</Button>
    </div>
  );
}
export default AvatarPage;
