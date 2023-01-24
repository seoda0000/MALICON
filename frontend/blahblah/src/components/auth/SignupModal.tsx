import { CheckRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import { checkDuplicateAction, signupAction } from "../../redux/modules/user";
import BasicModal from "../ui/BasicModal";

const buttonBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "30px",
  marginTop: "15px",
};

const checkBoxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function SignupModal({ open, setOpen }: any): JSX.Element {
  const user = useAppSelector((state) => state.user.userData);
  const checkDup = useAppSelector((state) => state.user.checkDuplicate);
  const dispatch = useAppDispatch();

  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [rePw, setRePw] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [showPw, setShowPw] = useState<boolean>(false);
  const [idAvail, setIdAvail] = useState<string>("PleaseCheckId");
  const [pwAvail, setPwAvail] = useState<boolean>(false);
  const [nickNameActivated, setNickNameActivated] = useState<boolean>(false);
  const [rePwAvail, setRePwAvail] = useState<boolean>(false);
  const [emailAvail, setEmailAvail] = useState<boolean>(false);
  const [phoneAvail, setPhoneAvail] = useState<boolean>(false);
  const [isAgree, setIsAgree] = useState<boolean>(false);

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);

    const regex = /^[a-z]+[a-z0-9]{5,19}$/g;
    if (!regex.test(e.target.value)) {
      setIdAvail("RegexFail");
    } else {
      setIdAvail("PleaseCheckId");
    }
  };
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);

    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
    if (regex.test(e.target.value)) {
      setPwAvail(true);
    } else {
      setPwAvail(false);
    }
  };
  const onChangeRePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePw(e.target.value);
  };
  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickNameActivated(true);

    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    if (regex.test(e.target.value) || e.target.value === "") {
      setNickName(e.target.value);
    }
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    const regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (regex.test(e.target.value)) {
      setEmailAvail(true);
    } else {
      setEmailAvail(false);
    }
  };
  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);

    const regex = /\d{3}-\d{3,4}-\d{4}/;
    if (regex.test(e.target.value)) {
      setPhoneAvail(true);
    } else {
      setPhoneAvail(false);
    }
  };
  const onChangeIsAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAgree((prev) => !prev);
  };

  const onConfirmID = () => {
    dispatch(checkDuplicateAction(id));
    if (checkDup.data) {
      setIdAvail("Unavailable");
    } else {
      setIdAvail("Available");
    }
  };

  const handleClickShowPw = () => {
    setShowPw((prev) => !prev);
  };
  const handleMouseDownPw = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const onCloseModal = () => {
    setOpen((prev: boolean) => !prev);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("회원가입 하려고 해");

    if (
      idAvail &&
      pwAvail &&
      rePwAvail &&
      nickName &&
      emailAvail &&
      (!phone || (phone && phoneAvail)) &&
      isAgree
    ) {
      dispatch(
        signupAction({
          ...user,
          userId: id,
          password: pw,
          nickName,
          email,
          phone,
        })
      );

      console.log("회원가입 된건가?");
      alert("회원가입 완료");
    }
  };

  useEffect(() => {
    if (pw === rePw) {
      setRePwAvail(true);
    } else {
      setRePwAvail(false);
    }
  }, [pw, rePw]);
  return (
    <BasicModal open={open} setOpen={setOpen}>
      <Box
        component="form"
        sx={{
          "& .MuiFormControl-root": { m: 1, width: "25ch", display: "flex" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <div>
          <FormControl variant="standard">
            <InputLabel htmlFor="id">ID *</InputLabel>
            <Input
              id="id"
              value={id}
              onChange={onChangeId}
              required
              error={id && idAvail !== "Available" ? true : false}
              aria-describedby="id-helper-text"
              endAdornment={
                <InputAdornment position="end">
                  {idAvail === "Available" && <CheckRounded />}
                </InputAdornment>
              }
            />
            <FormHelperText id="id-helper-text">
              {id && idAvail === "Unavailable" && (
                <span>다른 아이디를 입력해주세요</span>
              )}
              {id && idAvail === "PleaseCheckId" && (
                <span>아이디 중복 검사를 해주세요</span>
              )}
              {id && idAvail === "RegexFail" && (
                <span>영문자로 시작하는 영문자 또는 숫자 6~20자</span>
              )}
            </FormHelperText>
          </FormControl>
          <Button onClick={onConfirmID}>아이디 중복 확인</Button>
        </div>
        <FormControl variant="standard">
          <InputLabel htmlFor="pw">Password *</InputLabel>
          <Input
            id="pw"
            value={pw}
            onChange={onChangePw}
            type={showPw ? "text" : "password"}
            required
            error={pw && !pwAvail ? true : false}
            aria-describedby="pw-helper-text"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPw}
                  onMouseDown={handleMouseDownPw}
                >
                  {showPw ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <FormHelperText id="pw-helper-text">
            {!pwAvail && <span>영문, 숫자, 특수문자 포함, 8~16자</span>}
          </FormHelperText>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="re-pw">Re-enter Password *</InputLabel>
          <Input
            id="re-pw"
            value={rePw}
            onChange={onChangeRePw}
            type="password"
            required
            error={rePw && !rePwAvail ? true : false}
            aria-describedby="repw-helper-text"
            endAdornment={
              <InputAdornment position="end">
                {rePw && rePwAvail && <CheckRounded />}
              </InputAdornment>
            }
          />
          <FormHelperText id="repw-helper-text">
            {rePw && !rePwAvail && <span>비밀번호가 일치하지 않습니다</span>}
          </FormHelperText>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="nickName">nickName *</InputLabel>
          <Input
            id="nickName"
            value={nickName}
            onChange={onChangeNickName}
            required
            error={nickNameActivated && nickName === "" ? true : false}
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="email">email *</InputLabel>
          <Input
            id="email"
            value={email}
            onChange={onChangeEmail}
            type="email"
            required
            error={email && !emailAvail ? true : false}
            aria-describedby="email-helper-text"
          />
          <FormHelperText id="email-helper-text">
            {email && !emailAvail && <span>올바른 이메일 형식이 아닙니다</span>}
          </FormHelperText>
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="phone">phone</InputLabel>
          <Input
            id="phone"
            value={phone}
            onChange={onChangePhone}
            error={phone && !phoneAvail ? true : false}
            aria-describedby="phone-helper-text"
          />
          <FormHelperText id="phone-helper-text">
            {phone && !phoneAvail && (
              <span>올바른 전화번호 형식이 아닙니다</span>
            )}
          </FormHelperText>
        </FormControl>
        {/* <FormGroup> */}
        <Box style={checkBoxStyle}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isAgree}
                onChange={onChangeIsAgree}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="개인정보 이용 동의"
          />
        </Box>
        {/* </FormGroup> */}
        <Box sx={buttonBoxStyle}>
          <Button variant="contained" type="submit">
            Signin
          </Button>
          <Button variant="contained" type="submit" onClick={onCloseModal}>
            Cancel
          </Button>
        </Box>
      </Box>
    </BasicModal>
  );
}

