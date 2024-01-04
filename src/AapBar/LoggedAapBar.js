import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Modal from "@mui/material/Modal";
import SignUp from "../SignUp/SignUp";
import SignInSide from "../login/SignInSlide";
import Signin from "../login/Signin";
import UserSignIn from "../login/UserSignIn";
import { Route, Routes, useNavigate } from "react-router-dom";
import MenuListComposition from "./MenuListComposition";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen}>Open Child Modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
          <h2 id="child-modal-title">Text in a child modal</h2>
          <p id="child-modal-description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          </p>
          <Button onClick={handleClose}>Close Child Modal</Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function LoggedAapBar() {
  const navigate = useNavigate();
  const navigatetoRedux = () => {
    navigate('/redux');
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openLogin, setOpenLogin] = React.useState(false);
  const handleOpenLogin = () => {
    handleClose()
    setOpenLogin(true)
  };
  const handleCloseLogin = () => setOpenLogin(false);

  const onSignupSuccessfullHandler = (openSignin) => {
    if (openSignin === true) {
      handleOpenLogin();
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
          >
            Expense Manager
          </Typography>

          
          
          <div>
       <MenuListComposition />
           
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
