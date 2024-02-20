import * as React from "react";
import { Stack, Snackbar, Alert } from "@mui/material";

const CustomSnackbar = ({ openToster, handleClickCloseToaster, messageType, message }) => {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Snackbar open={openToster} autoHideDuration={6000} onClose={handleClickCloseToaster}>
                <Alert onClose={handleClickCloseToaster} severity={messageType} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>);
}

export default CustomSnackbar;