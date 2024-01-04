import { Global } from "@emotion/react";
import { CssBaseline, Skeleton, Typography, styled } from "@mui/material";
import Box from "@mui/material/Box";
import {grey} from "@mui/material/colors";
import Button from "@mui/material/Button";
import * as React from "react";
import { PropTypes } from 'prop-types';


// const AddNewExpense = () =>{
const drawerBleeding =56;
const Root = styled('div')(({theme})=>({
    height:'100%',
    backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));
const StyledBox = styled(Box)(({theme})=>({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme})=>({
    width:30,
    height:6,
    backgroundColor:theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius:3,
    position:'absolute',
    top:8,
    left:'calc(50% -15px)',
}));

function AddNewExpense(props){
    const{ window } = props;
    const [open ,setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) =>() =>{
        setOpen(newOpen);
    };

    const container = window !== undefined ? () => window().document.body :undefined;

    return(
        <Root>
            <CssBaseline />
            <Global 
            styles ={{
                '.MuiDrawer-root > .MuiPaper-root':{
                    width: `calc(50% - ${drawerBleeding}px)`,
                    overflow: 'visible',
                },
            }}
            />
            <Box sx= {{ textAlign : 'center' , pt:1}}>
                <Button onClick={toggleDrawer(true)}>Open</Button>
            </Box>
             {/* <Box textAlign={"right"}>
                        <Button sx={{ margin: 2 }} 
                        color="success" 
                        variant="contained" 
                        onClick={toggleDrawer(true)}>
                            Add Expense
                        </Button>
                    </Box> */}
            <AddNewExpense
            container={container}
            anchor="right"
            open={open}
            onClose={toggleDrawer(false)}
            onOpen= {toggleDrawer(true)}
            swipeAreaWidth = {drawerBleeding}
            disableSwipeToOpen= {false}
            modalProps= {{
                KeepMounted: true
            }}
            >
                <StyledBox
                sx={{
                    position:'absolute',
                    left : -drawerBleeding,
                    borderTopLeftRadius :8,
                    borderTopRightRadius : 8,
                    visibility : 'visibility',
                    top:0,
                    left:0,
                    bottom:0
                }}
                >
                    <Puller />
                    <Typography sx={{ p:2, color: 'text.secondary'}}>51</Typography>
                </StyledBox>
                <StyledBox
                sx={{
                    px:2,
                    pb:2,
                    height:'100%',
                    width:'100%',
                    overflow:'auto'
                }}
                >
                    <Skeleton variant="circle" height={"100%"} />
                </StyledBox>
            </AddNewExpense>
        </Root>
    );
}
// }
AddNewExpense.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
export default AddNewExpense;