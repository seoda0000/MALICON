import AvatarTest from "../components/avatar/AvatarTest";
import SelectList from "../components/avatar/SelectList";
import { useState } from "react";
import {
  Button,
  Card,
  Box,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";
import { Stack } from "@mui/system";
import Divider from "@mui/material/Divider";
import { useAppDispatch, useAppSelector } from "../redux/configStore.hooks";
import { Link } from "react-router-dom";
import * as React from "react";
import { styled } from "@mui/material/styles";
import { updateUserAction } from "../redux/modules/user";
import { RootState } from "../redux/configStore";
import { useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import SigninModal from "../components/auth/SigninModal";
import { ThemeProvider } from "@mui/material/styles";
import { BoldKoreanFont } from "../theme/font";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import PaletteIcon from "@mui/icons-material/Palette";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import InvertColorsIcon from "@mui/icons-material/InvertColors";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Chip from "@mui/material/Chip";

const BeardIcon = require("../assets/img/BeardIcon.png");
const MouthIcon = require("../assets/img/MouthIcon.png");
const NoseIcon = require("../assets/img/NoseIcon.png");

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

  const [currentHandler, setCurrentHandler] = useState<string>("skinColor");

  const [openSigninModal, setOpenSigninModal] = useState<boolean>(false);
  const isLoggedIn = useAppSelector((state) => state.user.userData.isLoggedIn);

  const selectedAvatar = {
    body: [AVATAR_OPTION.body[body]],
    clothingColor: [AVATAR_OPTION.clothingColor[clothingColor]],
    eyes: [AVATAR_OPTION.eyes[eyes]],
    facialHair: [AVATAR_OPTION.facialHair[facialHair]],
    facialHairProbability: 100,
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

  // alert
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleAlert = () => {
    setOpenAlert(!openAlert);
  };

  const action = (
    <Button color="inherit" size="small" onClick={handleAlert}>
      <CloseIcon />
    </Button>
  );

  // 아바타 서버에 저장
  const dispatch = useAppDispatch();
  const userId = useSelector((state: RootState) => state.user.userData.userId);
  const userpk = useSelector((state: RootState) => state.user.userData.id);
  const saveAvatarHandler = () => {
    if (!isLoggedIn) {
      setOpenSigninModal(true);
      return;
    }
    // console.log("아바타 저장 시도");
    const res = dispatch(
      updateUserAction({
        id: userpk,
        userId,
        avatar: JSON.stringify(selectedAvatar),
      })
    );

    // console.log("아바타 저장 : " + JSON.stringify(selectedAvatar));

    // alert("아바타 저장 완료");
    setOpenAlert(!openAlert);
  };

  return (
    <div>
      {/* 제목 영역 */}

      <Box
        sx={{
          display: "flex",
          // flexWrap: "wrap",
          justifyContent: "center",
          flexDirection: "column",
          "& > :not(style)": {
            m: 1,
            // width: 1500,
            // height: 500,
          },
        }}
      >
        <ThemeProvider theme={BoldKoreanFont}>
          <Typography variant="h4">Make your own Avatar</Typography>
          <Typography variant="h6">나만의 아바타 만들기</Typography>
        </ThemeProvider>

        <Box
          sx={{
            display: "flex",
            // flexWrap: "wrap",
            justifyContent: "center",
            flexDirection: "column",
            // "& > :not(style)": {
            //   m: 1,
            //   // width: 1500,
            //   // height: 500,
            // },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <IconButton
              color="primary"
              onClick={
                selectHandler[currentHandler as keyof typeof selectHandler]
                  .prevHandler
              }
            >
              <NavigateBeforeIcon />
            </IconButton>

            <AvatarTest selectedAvatar={selectedAvatar} />
            <IconButton
              color="primary"
              onClick={
                selectHandler[currentHandler as keyof typeof selectHandler]
                  .nextHandler
              }
            >
              <NavigateNextIcon />
            </IconButton>
          </Box>

          <Box>
            {/* <SelectList options={AVATAR_OPTION} selectHandler={selectHandler} /> */}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            "& > :not(style)": {
              m: 1,
              // width: 1500,
              // height: 500,
            },
          }}
        >
          <IconButton
            color="warning"
            onClick={() => {
              setCurrentHandler("body");
            }}
          >
            <CheckroomIcon />
          </IconButton>
          <IconButton
            color="warning"
            onClick={() => {
              setCurrentHandler("clothingColor");
            }}
          >
            <PaletteIcon />
          </IconButton>
          <IconButton
            color="warning"
            onClick={() => {
              setCurrentHandler("eyes");
            }}
          >
            <RemoveRedEyeIcon />
          </IconButton>
          <IconButton
            color="warning"
            onClick={() => {
              setCurrentHandler("hair");
            }}
          >
            <FaceRetouchingNaturalIcon />
          </IconButton>
          <IconButton
            color="warning"
            onClick={() => {
              setCurrentHandler("hairColor");
            }}
          >
            <InvertColorsIcon />
          </IconButton>
          <IconButton
            color="warning"
            onClick={() => {
              setCurrentHandler("skinColor");
            }}
          >
            <EmojiEmotionsIcon />
          </IconButton>
          <IconButton
            color="warning"
            onClick={() => {
              setCurrentHandler("facialHair");
            }}
          >
            <img src={BeardIcon} style={{ width: "24px", height: "24px" }} />
          </IconButton>
          <IconButton
            color="warning"
            onClick={() => {
              setCurrentHandler("mouth");
            }}
          >
            <img src={MouthIcon} style={{ width: "24px", height: "24px" }} />
          </IconButton>
          <IconButton
            color="warning"
            onClick={() => {
              setCurrentHandler("nose");
            }}
          >
            <img src={NoseIcon} style={{ width: "24px", height: "24px" }} />
          </IconButton>
        </Box>
        <Button onClick={saveAvatarHandler}>확정</Button>
      </Box>

      {/* alert */}
      <Snackbar
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleAlert}
        // message="아바타가 업데이트 되었습니다."
        // action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert variant="filled" severity="success" action={action}>
          <AlertTitle>나만의 아바타 생성 완료!</AlertTitle>
          튜토리얼을 진행할까요? —
          <Link style={{ color: "white" }} to="/tutorial">
            바로가기
          </Link>
        </Alert>
      </Snackbar>

      <SigninModal
        open={openSigninModal}
        setOpen={setOpenSigninModal}
      ></SigninModal>
    </div>
  );
}
export default AvatarPage;
