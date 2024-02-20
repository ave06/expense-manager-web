import { Anchor, LockClockOutlined } from "@mui/icons-material";
import { Alert, Avatar, Button, Drawer, FormControl, FormControlLabel, Grid, List, MenuItem, Radio, RadioGroup, Select, Snackbar, TextField, Typography } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { useState } from "react";
import CreateteCategoryExpense from "../Category/CreateteCategoryExpense";
import Modal from "@mui/material/Modal";
import MuiAlert from '@mui/material/Alert';
import CustomSnackbar from "../Snackbar/CustomSnackbar";
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

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
const AddExpense = () => {

    function createData(id, categoryname, userid) {
        return { id, categoryname, userid }
    }

    const [statusOfCategoryOperation, setStatusOfCategoryOperation] = useState();
    const [messageType, setMessageType] = useState("info");
    const [message, setMessage] = useState("Operation in Progress");
    const [open, setOpen] = useState(false);
    const [selectedRadioValue, setSelctedRadioValue] = useState("false");
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState();
    const [transaction, setTransaction] = useState(0);
    const [categoryVal, setCategoryval] = useState("");
    const [categoriesList, setCategoriesList] = useState([]);
    const [state, setState] = useState({
        right: false
    });
    const [openToster, setOpenToaster] = useState(false);
    // console.log("val");
    // console.log(state);
    const [helperTextDescription, setHelperTextDescription] = useState("");
    const [errorDescription, setErrorDescription] = useState(true);
    // const categoryVal  = React.useRef('');
    ///new code //
    const [openCreateteCategroy, setOpenCreateCategory] = React.useState(false);
    const handleOpenCraeteCategory = () => setOpenCreateCategory(true);
    const handleCloseCraeteCategory = () => setOpenCreateCategory(false);
    const handleCategoryOperationChange = (data) => {
        setStatusOfCategoryOperation(data.status);
        if (statusOfCategoryOperation == 200) {

            setMessageType("success");
            setMessage("Category Created Successfully");
        } else if(statusOfCategoryOperation == 404) {
            setMessageType("error");
            setMessage("Error encountered while creating category");
        }else{
            setMessageType("info");
            setMessage("Operation in progress");  
        }
        //console.log("statusOfCategoryOperation+" + statusOfCategoryOperation);
        handleClickOpenToster();

    }
    const handleClickOpenToster = () => {
        setOpenToaster(true);
    }
    const handleClickCloseToaster = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToaster(false);
    }
    /// new code ///
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        setOpen(false);
    };
    var formattedList = [];
    const toggleDrawer = (anchor, open) => (event) => {
        // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        //     return;
        // }
        //console.log("control is here");
        setState({ ...state, [anchor]: open });
    };
    async function getCategories() {
        const responce = await fetch("http://localhost:4000/category/getCategoryByUserId/3",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const info = await (responce.json());
        setCategoriesList(info.data.map((e) => {
            return createData(e.id, e.categoryname, e.userid);
        }));
    }
    //console.log(categoriesList);

    React.useEffect(() => {
        getCategories()
    }, []);

    const handleRadioValueChange = (event) => {
        setSelctedRadioValue(event.target.value);
    }
    //console.log(selectedRadioValue);
    const handleSubmit = (event) => {
        event.preventDefault();

        const dataForm = new FormData(event.currentTarget);
        setAmount(dataForm.get("Amount"));
        setDescription(dataForm.get("Description"));
        if (selectedRadioValue === "false") {
            setTransaction(2);
        } else {
            setTransaction(1);
        }
    };

    async function callCreateExpenseMethod(event) {
        const jsonData = {
            "amount": amount,
            "attachment": null,
            "modifiedby": null,
            "userid": 3,
            "categoryid": categoryVal,
            "directionid": transaction,
            "description": description
        }
        try {
            const responce = await fetch("http://localhost:4000/expense/createExpense/", {
                method: "POST",
                body: JSON.stringify(jsonData),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await (responce.json());
            setState({ right: false });
            handleClick();
            //console.log("currently at line number 95");
        } catch (error) {
            //console.log("currently at line number 97");
            //console.log(error);
        }

        // }
    }

    const handleCategoryChange = (event) => {
        setCategoryval(event.target.value);
        // console.log(categoryVal);
    };

    const handleDecription = (event) => {
        const descriptiopnData = event.target.value;
        if (descriptiopnData.length < 1) {
            setHelperTextDescription("Plz Enter Description")
            setErrorDescription(true)
        } else {
            setHelperTextDescription("correct")
            setErrorDescription(false)
        }
    };


    const list = (anchor) => (
        <Box sx={{ marginTop: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockClockOutlined />
                {/* <AddCircleIcon/> */}
            </Avatar>
            <Typography component={"h1"} variant="h5">
                Add Expense Entry
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ width: anchor === "top" ? "auto" : 600, mt: 3 }}
            // onKeyDown={toggleDrawer(anchor, false)}
            >
                <Grid container spacing={2} alignItems={"center"} justifyContent={"center"} >
                    <Grid item xs={12} sm={7}>
                        <TextField autoComplete="given-name"
                            name="Description"
                            required
                            fullWidth
                            id="Description"
                            label="Description"
                            helperText={helperTextDescription}
                            autoFocus
                            onChange={handleDecription}
                        />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <TextField
                            fullWidth
                            name="Amount"
                            id="Amount"
                            label="Amount"
                            // onChange={handleAmount}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <Select
                            fullWidth
                            labelId="category"
                            label="Category"
                            onChange={handleCategoryChange}
                            value={categoryVal}
                        >
                            {/* <MenuItem value=""><em>None</em></MenuItem> */}
                            {categoriesList.map((e) => {
                                return <MenuItem key={e.id} value={e.id}>{e.categoryname}</MenuItem>
                            })
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <RadioGroup row sx={{width:"100%" }}
                            //  onChange={handleTransaction}
                            id="Transaction"
                            name="Transaction"
                        >
                            <FormControlLabel value="Pay" control={<Radio value="true" checked={selectedRadioValue === "true"} 
                            onChange={handleRadioValueChange} />} label="Pay" />
                            <FormControlLabel value="Receive" control={<Radio value="false" checked={selectedRadioValue === "false"} 
                            onChange={handleRadioValueChange} />} label="Receive" />
                            <Button  type="submit" startIcon={<AddCircleOutlineRoundedIcon />} variant="contained" size="small" sx={{ ml:1  }} onClick={handleOpenCraeteCategory}>Add Category</Button>
                        </RadioGroup>

                        <div>

                            <Modal
                                open={openCreateteCategroy}
                                onClose={handleCloseCraeteCategory}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description" >
                                <Box sx={style}>
                                    <CreateteCategoryExpense
                                        pstatusOfCategoryOperation={handleCategoryOperationChange}
                                    />
                                </Box>
                            </Modal>
                        </div>
                    </Grid>
                    <Grid item xs={4} sm={6}  >
                        <Button type="submit" variant="contained" size="large" sx={{ml:12 , mt:4 }}
                            onClick={callCreateExpenseMethod}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </Box>
    );
    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Box textAlign={anchor}>
                        <Button sx={{ margin: 2 }} color="success" variant="contained" onClick={toggleDrawer(anchor, true)}>Add Expense</Button>

                    </Box>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                            Expense Entry is created successfully
                        </Alert>
                    </Snackbar>
                    {statusOfCategoryOperation == 200 && (<CustomSnackbar
                        openToster={openToster}
                        handleClickCloseToaster={handleClickCloseToaster}
                        messageType={messageType}
                        message={message}
                    />)}
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}>
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            )
            )
            }
        </div>
    );
}

export default AddExpense;