import {createAction} from "@reduxjs/toolkit";
import {LogInResolved} from "../../types/types";


const setLogged = createAction<LogInResolved>('auth/setLogged');

export const authActions = {
    setLogged
}
