import * as React from "react";
import { Box, TextField, Stack, Button } from "@mui/material";

import { useRouter } from "next/router";
import { xRequest } from "../utils/request";
import { setCookie, deleteCookie } from "cookies-next";

export interface ILoginData {
  email: string;
  password: string;
}
export default function LoginPage() {
  const [loginData, setLoginData] = React.useState<ILoginData>({
    email: "",
    password: "",
  });
  const router = useRouter();

  function login(event: React.MouseEvent<HTMLElement>, value: any) {
    event.preventDefault();

    xRequest
      .post("/admin/login", {
        email: loginData.email,
        password: loginData.password,
      })
      .then((response) => {
        setCookie("admintoken", response.data.resData);
        console.log(response.data);
        router.push("/admindashboard");
      });
  }

  function onEmailChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setLoginData({ ...loginData, email: event.target.value });
  }

  function onPasswordChange(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setLoginData({ ...loginData, password: event.target.value });
  }
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
        flexGrow: 1,
      }}
      noValidate
      autoComplete="off"
    >
      <h1>Login to Admin</h1>
      <Stack spacing={2}>
        <TextField
          required
          id="outlined-required"
          label="อีเมล"
          defaultValue=""
          onChange={onEmailChange}
        />

        <TextField
          required
          id="outlined-required"
          label="พาสเวิร์ด"
          defaultValue=""
          onChange={onPasswordChange}
        />

        <Button
          variant="contained"
          style={{ color: "yellow", backgroundColor: "purple" }}
          onClick={() => {
            xRequest
              .post("/admin/login", {
                email: loginData.email,
                password: loginData.password,
              })
              .then((response) => {
                setCookie("admintoken", response.data.resData);
                console.log(response.data);
                router.push("/admindashboard");
              });
          }}
        >
          Login
        </Button>
      </Stack>
    </Box>
  );
}
