import { ClickAwayListener, MenuItem, MenuList, Paper, Popper, Stack ,Grow, Button} from "@mui/material";
import * as React from 'react';
import { useDispatch } from "react-redux";
import {logoutUser} from "../redux/actions";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import PersonIcon from '@mui/icons-material/Person';
export default function MenuListComposition() {
    const navigate = useNavigate();
    const navigatetoRedux = () => {
      navigate('/redux');
    }
  
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };


    const dispatch = useDispatch();
    const handleLogout = (event) => {
        dispatch(logoutUser());
     
        navigatetoRedux();
        // handleClose();
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }
        const prevOpen = React.useRef(open);
        React.useEffect(() => {
            if (prevOpen.current === true && open === false) {
                anchorRef.current.focus();
            }
            prevOpen.current = open;
        }, [open]);

        return (
            <Stack direction={"row"} spacing={2}>
                {/* <Paper>
                    <MenuList>
                        <MenuItem>My Account</MenuItem>
                        <MenuItem>Logout</MenuItem>
                    </MenuList>
                </Paper> */}
                <div >
                    <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? "composition-menu" :undefined}
                    aria-expanded={open ? 'true':undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    variant="outlined"
                    sx={{color:"white"}}
                    startIcon={<PersonIcon fontSize="large"/>} ></Button>
                    <Popper
                        open={open}
                        anchoeEl={anchorRef.current}
                        role={undefined}
                        placement="bootom-start"
                        transition
                        disablePortal
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow 
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                        placement === 'bottom-start' ? 'left-top' : 'left-top',
                                    
                                }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList
                                            autoFocusItem={open}
                                            id="composition-menu"
                                            aria-aria-labelledby="composition-button"
                                            onkeyDown={handleListKeyDown}
                             
                                        >
                                            <MenuList onClick={handleClose}>MyAccount</MenuList>
                                            <MenuList onClick={handleLogout}>Logout</MenuList>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                            )}
                    </Popper>
                </div>
            </Stack>
        );
    }


