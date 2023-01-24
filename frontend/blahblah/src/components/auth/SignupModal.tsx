import { Box, Button, FormControl, Input, InputLabel } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/configStore.hooks";
import { signupAction } from "../../redux/modules/user";
import BasicModal from "../ui/BasicModal";

export default function SignupModal({ open, setOpen }: any): JSX.Element {
  const user = useAppSelector((state) => state.user.userData);
  const dispatch = useAppDispatch();

  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const onChangePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };
  const onChangeNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("회원가입 하려고 해");
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
  };
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
        <FormControl variant="standard">
          <InputLabel htmlFor="id">ID</InputLabel>
          <Input id="id" value={id} onChange={onChangeId} required />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="pw">Password</InputLabel>
          <Input
            id="pw"
            value={pw}
            onChange={onChangePw}
            type="password"
            required
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="nickName">nickName</InputLabel>
          <Input
            id="nickName"
            value={nickName}
            onChange={onChangeNickName}
            required
          />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="email">email</InputLabel>
          <Input id="email" value={email} onChange={onChangeEmail} required />
        </FormControl>
        <FormControl variant="standard">
          <InputLabel htmlFor="phone">phone</InputLabel>
          <Input id="phone" value={phone} onChange={onChangePhone} required />
        </FormControl>
        <Button variant="contained" type="submit">
          Signin
        </Button>
      </Box>
    </BasicModal>
  );
}

