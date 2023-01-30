import AvatarTest from "../components/avatar/AvatarTest";
import SelectList from "../components/avatar/SelectList";
import { useState } from "react";

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

  const bodyNextHandler = () => {
    if (body === AVATAR_OPTION.body.length - 1) {
      setBody(0);
    } else {
      setBody(body + 1);
    }
  };

  const bodyPrevHandler = () => {
    if (body === 0) {
      setBody(AVATAR_OPTION.body.length - 1);
    } else {
      setBody(body - 1);
    }
  };

  return (
    <div>
      <h1>아바타 페이지</h1>
      <div>{selectedAvatar.body}</div>
      <AvatarTest selectedAvatar={selectedAvatar} />
      <SelectList options={AVATAR_OPTION} bodyNextHandler={bodyNextHandler} />
    </div>
  );
}
export default AvatarPage;
