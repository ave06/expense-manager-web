import "./App.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoginUser from "./login/LoginUser";
import SignInSide from "./login/SignInSlide";
import SignUp from "./SignUp/SignUp";
import {
  createBrowserRouter,
  // createRoutesFromElements,
  RouterProvider,
  // Route,
} from "react-router-dom";
import Login from "./login/LoginUser";
import HomePage from "./Homepage/HomePage";
import TempDrawer from "./Drawer/Drawer";
import Signin from "./login/Signin";
import Dashboard from './Expense/Dashboard'

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    // { path: "/", element: <TempDrawer /> },
    { path: "/SignIn", element: <Signin></Signin> },
    { path: "/signup", element: <SignUp /> },
    { path: "/Dashboard", element: <Dashboard /> }
  ]);
  return (
    // <div>
    <RouterProvider router={router} />

    /* <SignInSide></SignInSide> *
  /* <SignUp></SignUp> */
    /* </div> */
  );
}

export default App;
