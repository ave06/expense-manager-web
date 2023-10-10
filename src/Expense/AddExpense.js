import { Anchor, LockClockOutlined } from "@mui/icons-material";
import { Avatar, Button, Drawer, FormControl, FormControlLabel, Grid, List, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from "@mui/material";
import * as React from "react";
import Box from "@mui/material/Box";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { useState } from "react";

const AddExpense = () => {

    function createData(id, categoryname, userid) {
        return { id, categoryname, userid }
    }

    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState();
    const [transciction, setTransciction] = useState(false);
    const [category, setCategory] = useState();
    const [categoriesList, setCategoriesList] = useState([]);
    const [state, setState] = useState({
        right: false
    });

    var formattedList = [];
    const toggleDrawer = (anchor, open) => (event) => {
        // if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        //     return;
        // }
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
    console.log(categoriesList);

    // React.useEffect(() => {
    //     getCategories()
    // }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        const dataForm = new FormData(event.currentTarget);
        setAmount(dataForm.get("Amount"));
        setDescription(dataForm.get("Description"));
        setCategory('bubu');
        setTransciction(true)
    };

    async function callCreateExpenseMethod(event) {
        const jsonData = {
            "amount": amount,
            "attachment": "",
            "modifiedby": "abc",
            "userid": 3,
            "categoryid": 4,
            "directionid": 2,
            "description": description
        }
        const responce = await fetch("http://localhost:4000/expense/createExpense/", {
            method: "POST",
            body: JSON.stringify(jsonData),
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await (responce.json());
        if (data.status == 200) {
            //    toggleDrawer(anchor, false)
        }
    }

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
                            autoFocus
                        // onChange={handleDecription}
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
                        >
                            {categoriesList.map((e) => {
                                return <MenuItem value={e.id}>{e.categoryname}</MenuItem>
                            })
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <RadioGroup row sx={{ width: 200 }}
                            //  onChange={handleTransciction}
                            id="Transciction"
                            name="Transciction"
                        >
                            <FormControlLabel value="Pay" control={<Radio />} label="Pay" />
                            <FormControlLabel value="Received" control={<Radio />} label="Received" />
                        </RadioGroup>
                    </Grid>
                    <Grid item xs={4} sm={6} >
                        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, mr: 2 }}
                            onClick={callCreateExpenseMethod}
                        // onClick={toggleDrawer(anchor, false)}
                        >
                            Save
                        </Button>
                        <Button variant="contained"
                            sx={{ mt: 3, mb: 2, mr: 2 }}
                            onClick={getCategories}
                        >
                            Populate Categories
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
                    <Box textAlign={"right"}>
                        <Button sx={{ margin: 2 }} color="success" variant="contained" onClick={toggleDrawer(anchor, true)}>Add Expense</Button>
                    </Box>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                    // onClose={toggleDrawer(anchor, false)}
                    >
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