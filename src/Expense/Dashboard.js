import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import { Box, Button, TableBody, TableCell, TableContainer, TableHead, TablePagination, Typography } from '@mui/material';
import AapBar from '../AapBar/AapBar';
import Footer from '../Footer/Footer';
import AddExpense from './AddExpense';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions';
import MenuListComposition from '../AapBar/MenuListComposition';
import LoggedAapBar from '../AapBar/LoggedAapBar';
import { format } from 'date-fns';
import CreateCategory from '../Category/CreateCategory';


const Dashboard = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutUser());
    };
    function createData(id, amount, attachment, categoryid, createdat, description, directionid, modifiedby, updatedat, userid) {
        return { id, amount, attachment, categoryid, createdat, description, directionid, modifiedby, updatedat, userid };
    }
    var rows = [];
    const [expensesinfo, setExpensesinfo] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, SetRowsPerPage] = React.useState(5);

    const handlePagechange = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        SetRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }
    async function callGetexpenseMethod() {
        // const response = await fetch("http://localhost:4000/expense/getExpenseByUserId/3", {
        const response = await fetch('http://localhost:4000/expense/getJoinExpense/', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        });
        const info = await (response.json());
        const formattedData = info.data;
        setExpensesinfo(formattedData.map((e) => {
            const originalDate = new Date(e.createdat);
            const formattedDate = format(originalDate, 'dd-MM-yy HH:mm:ss');
            return createData(e.id, e.amount, e.attachment, e.category.categoryname, formattedDate, e.description, e.direction.directionname, e.modifiedby, e.updatedat, e.userid)

        }));
    }
    React.useEffect(() => {
        callGetexpenseMethod()
    }, []);
    return (
        <div>
            <LoggedAapBar />

            {/* <MenuListComposition /> */}


            <Typography variant='h4' sx={{ margin: 2 }} gutterBottom>My Expenses</Typography>
            <div>
                {/* <CreateCategory /> */}
                <AddExpense></AddExpense>
            </div>
            <div>
                {user ? (
                    <div>
                        <p> Welcome , {user.username}</p>
                        {/* <button onClick={handleLogout}>Logout</button> */}
                    </div>) : (
                    <p>You are not logged</p>

                )}
            </div>
            <Paper>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>Amount</TableCell>
                                {/* <TableCell>Attachment</TableCell> */}
                                <TableCell>Category Id</TableCell>
                                <TableCell>Direction</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Created By</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {

                                expensesinfo.map((row) =>
                                (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.amount}</TableCell>
                                        <TableCell>{row.categoryid}</TableCell>
                                        {/* <TableCell>{row.createdat}</TableCell> */}
                                        <TableCell>{row.directionid}</TableCell>
                                        <TableCell>{row.createdat}</TableCell>
                                        <TableCell>{row.modifiedby}</TableCell>
                                        {/* <TableCell>{row.description}</TableCell> */}
                                        {/* <TableCell>{row.userid}</TableCell> */}
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component={"div"}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handlePagechange}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Footer></Footer>
        </div>
    );
}
export default Dashboard;