import "./App.css";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import * as React from "react";
import Login from "./components/Login";
import SignUp from "./SignUp/SignUp";
import {
  BrowserRouter,
  createBrowserRouter,
  // createRoutesFromElements,
  RouterProvider,
  useRoutes,
  // Route,
} from "react-router-dom";
// import Login from "./login/LoginUser";
import HomePage from "./Homepage/HomePage";
import TempDrawer from "./Drawer/Drawer";
import Signin from "./login/Signin";
import Dashboard from './Expense/Dashboard'
import AddExpense from "./Expense/AddExpense";
import { Provider } from "react-redux";
import store from "./redux/store";
import Module, { SubRouter } from "./components/Module/Module";
import Page1 from "./components/Module/Page1";
import CreateCategory from "./Category/CreateCategory";
import CreateteCategoryExpense from "./Category/CreateteCategoryExpense";

function App() {

  const router = useRoutes([
    { path: "/", element: <HomePage /> },
    {
      path: "/module", element: <Module />,
      children: SubRouter
    },
    { path: "/SignIn", element: <Signin></Signin> },
    { path: "/signup", element: <SignUp /> },
    { path: "/Dashboard", element: <Dashboard /> },
    { path: "/redux", element: <Login /> },
    {path:"/form", element:<CreateteCategoryExpense />}
  ]);
  return (
    <Provider store={store}>
      {router}
    </Provider>
  );
}

export default App;
