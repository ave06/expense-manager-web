import "./LoginUser.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const Login = (props) => {
  const [username, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");
  const setUsernameForm = (event) => {
    setUsername(event.target.value);
  };
  const setPasswordForm = (event) => {
    setPassword(event.target.value);
  };
  async function callLoginMethod(event) {
    event.preventDefault();
    const jsonString = JSON.stringify({
      username: username,
      password: password,
    });
    try {
      const response = await fetch("http://localhost:4000/users/login/", {
        method: "POST",
        body: jsonString,
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    console.log(JSON.stringify({ username: username, password: password }));
  }

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "20ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={callLoginMethod}
    >
      <div>
        <TextField
          error
          id="outlined-error"
          label="Username"
          onChange={setUsernameForm}
        />
      </div>
      <div>
        <TextField
          error
          id="filled-error"
          label="Password"
          onChange={setPasswordForm}
          // variant="filled"
        />
      </div>
      <div>
        <Button type="submit" variant="contained">
          Login
        </Button>
      </div>
    </Box>
  );
};

export default Login;
