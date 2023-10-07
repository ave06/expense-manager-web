import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import validator from 'validator';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp(props) {
  const [emailError, setEmailError] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openSignin, setOpenSignin] = useState(false);
  const checkUserisPresentOrNot =()=>{

  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const dataForm = new FormData(event.currentTarget);
    // console.log({
    //   name: dataForm.get("firstName") + dataForm.get("lastName"),
    //   username: dataForm.get("email"),
    //   password: dataForm.get("password"),
    // });
    const jsonData = {
      name: dataForm.get("firstName") + dataForm.get("lastName"),
      username: dataForm.get("email"),
      password: dataForm.get("password"),
    };
    // if (
    //   jsonData.name.trim().length === 0 ||
    //   jsonData.username.trim().length === 0 ||
    //   jsonData.password.trim().length === 0
    // ) {
    //   return;
    // }
    // if (validator.isEmail(jsonData.username)) {
    //   setEmailError("Valid Email :)");
    // } else {
    //   setEmailError("Enter valid Email!");
    //   return;
    // }
    // console.log(emailError);
    setPassword(dataForm.get("password"));
    setUsername(dataForm.get("email"));
    setName(dataForm.get("firstName") + dataForm.get("lastName"));
    // console.log(name + " " + password + " " + username);
    callLoginMethod(jsonData);
  };
  async function callLoginMethod(jsonData) {
    console.log(jsonData);
    try {
      const jsonString = { name: name, username: username, password: password };
      // console.log(jsonString);
       const response = await fetch("http://localhost:4000/users/createUser/", {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      if (result.status == 200) {
        setOpenSignin(true);
        console.log("opensign in value" + openSignin);
        props.onSignupSuccessfull(openSignin);
        console.log("ocontrol goes back to app bar");
      }
      console.log(result.status);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={checkUserisPresentOrNot}
                />
              </Grid>
              <Grid item xs={12}>
              <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        This is an info alert — <strong>check it out!</strong>
      </Alert>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
