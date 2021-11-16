import { createAction } from '@reduxjs/toolkit'
import {Nullable, RequestStatusType} from "../../types/types";


const setAppStatus = createAction<{ status: RequestStatusType }>('app/setAppStatus');
const setAppError = createAction<{ error: Nullable<string> }>('app/setAppError');

export const appActions = {
    setAppStatus,
    setAppError
}
