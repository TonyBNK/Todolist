import React from "react";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {appSelector} from "../../../redux/selectors";
import {appActions} from "../../../redux/actions/AppActions";


const {setAppError} = appActions;

export const ErrorSnackbar = () => {
    const {error} = useSelector(appSelector.selectAppVariables);
    const dispatch = useDispatch<Dispatch>();

    const isOpen = error !== null;

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(setAppError({error: null}));
    };

    return (
        <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}
