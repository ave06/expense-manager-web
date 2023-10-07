import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import { Box, Button, TableBody, TableCell, TableContainer, TableHead, TablePagination, Typography } from '@mui/material';
import AapBar from '../AapBar/AapBar';
import Footer from '../Footer/Footer';


const Dashboard = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, SetRowsPerPage] = React.useState(5);

    const handlePagechange = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        SetRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }



    function createData(id, amount, attachment, createdat, updatedat, modifiedby, userid, categoryid, directionid) {
        return { id, amount, attachment, createdat, updatedat, modifiedby, userid, categoryid, directionid };
    }

    const rows = [
        createData(1, 1000, '', '1999-01-08 04:05:06', '1999-01-08 04:05:06', '1999-01-08 04:05:06', 3, 3, 1),
        createData(2, 500, '', '1999-01-08 04:05:06', '1999-01-08 04:05:06', '1999-01-08 04:05:06', 3, 3, 2)
    ]
    const UserId = 3;
    const [data, setData] = React.useState();
    async function callGetexpenseMethod() {
        const response = await fetch("http://localhost:4000/expense/getExpenseByUserId/3", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        });
        const info = response.json;
        setData(info.message);

    }
    return (
        <div>
            <AapBar></AapBar>
            <Typography variant='h4' sx={{ margin: 2 }} gutterBottom>My Expenses</Typography>
            <Box textAlign='right'>
                <Button sx={{ margin: 2 }} color='success' variant='contained' onClick={callGetexpenseMethod}>Cash in</Button>
                <Button sx={{ margin: 2 }} color='error' variant='contained' onClick={callGetexpenseMethod}>Cash Out</Button>
            </Box>
            <Paper>
                <TableContainer component={Paper}>
                    <Table
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection>
                        <TableHead>
                            <TableRow>
                                <TableCell>Amount</TableCell>
                                <TableCell>Attachment</TableCell>
                                <TableCell>Category Id</TableCell>
                                <TableCell>User Id</TableCell>
                                <TableCell>Modified By</TableCell>
                                <TableCell>Created At</TableCell>
                                <TableCell>Updated At</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((row) =>
                                (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.amount}</TableCell>
                                        <TableCell>{row.attachment}</TableCell>
                                        <TableCell>{row.categoryid}</TableCell>
                                        <TableCell>{row.userid}</TableCell>
                                        <TableCell>{row.modifiedby}</TableCell>
                                        <TableCell>{row.createdat}</TableCell>
                                        <TableCell>{row.updatedat}</TableCell>
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