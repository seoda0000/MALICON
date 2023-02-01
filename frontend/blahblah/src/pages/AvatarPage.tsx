import AvatarTest from "../components/avatar/AvatarTest";
import SelectList from "../components/avatar/SelectList";
import { useState } from "react";
import { Button, Card, Box, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import Divider from "@mui/material/Divider";
import { useAppDispatch } from "../redux/configStore.hooks";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { updateUserAction } from "../redux/modules/user";
import { RootState } from "../redux/configStore";
import { useSelector } from "react-redux";
const AVATAR_OPTION = {
  body: ["checkered", "rounded", "small", "squared"],
  clothingColor: [
    "6dbb58",
    "54d7c7",
    "456dff",
    "7555ca",
    "e24553",
    "f55d81",
    "f3b63a",
    "000000",
    "dddddd",
  ],
  eyes: ["open", "happy", "sleep", "wink", "glasses", "sunglasses"],
  facialHair: [
    "",
    "beardMustache",
    "goatee",
    "pyramid",
    "shadow",
    "soulPatch",
    "walrus",
  ],
  hair: [
    "sideShave",
    "shortCombover",
    "shortComboverChops",
    "curly",
    "curlyBun",
    "curlyHighTop",
    "extraLong",
    "fade",
    "long",
    "mohawk",
    "pigtails",
    "straightBun",
    "bald",
    "balding",
    "beanie",
    "bobBangs",
    "bobCut",
    "bunUndercut",
    "buzzcut",
    "cap",
  ],
  hairColor: [
    "6c4545",
    "CC9966",
    "362c47",
    "dee1f5",
    "e15c66",
    "e16381",
    "f27d65",
    "f29c65",
    "FFFF99",
    "CCFFCC",
    "00FFCC",
    "00FFFF",
    "3333CC",
    "000066",
    "9900FF",
  ],
  mouth: [
    "bigSmile",
    "frown",
    "lips",
    "pacifier",
    "smile",
    "smirk",
    "surprise",
  ],
  nose: ["mediumRound", "smallRound", "wrinkles"],
  skinColor: [
    "d78774",
    "e5a07e",
    "e7a391",
    "eeb4a4",
    "623d36",
    "92594b",
    "b16a5b",
    "9999FF",
    "66CC66",
    "CC3333",
  ],
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
    body: [AVATAR_OPTION.body[body]],
    clothingColor: [AVATAR_OPTION.clothingColor[clothingColor]],
    eyes: [AVATAR_OPTION.eyes[eyes]],
    facialHair: [AVATAR_OPTION.facialHair[facialHair]],
    hair: [AVATAR_OPTION.hair[hair]],
    hairColor: [AVATAR_OPTION.hairColor[hairColor]],
    mouth: [AVATAR_OPTION.mouth[mouth]],
    nose: [AVATAR_OPTION.nose[nose]],
    skinColor: [AVATAR_OPTION.skinColor[skinColor]],
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

  // 아바타 서버에 저장
  const dispatch = useAppDispatch();
  const userId = useSelector((state: RootState) => state.user.userData.userId);
  const saveAvatarHandler = () => {
    console.log("아바타 저장 시도");
    const res = dispatch(
      updateUserAction({
        userId,
        avatar: JSON.stringify(selectedAvatar),
      })
    );

    console.log("아바타 저장 : " + res);

    alert("아바타 저장 완료");
  };

  return (
    <div>
      <h1>아바타 페이지</h1>
    </div>
  );
}
export default AvatarPage;
