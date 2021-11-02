import {Dispatch} from "redux";
import {setAppError, setAppStatus} from "../bll/reducers/AppReducer";


export const handleServerAppError = (dispatch: Dispatch, errorMessages: Array<string>) => {
    dispatch(setAppStatus({status: 'failed'}));
    errorMessages.length
        ? dispatch(setAppError({error: errorMessages[0]}))
        : dispatch(setAppError({error: 'Some error occurred'}));
}
export const handleServerNetworkError = (dispatch: Dispatch, errorMessage: string) => {
    dispatch(setAppStatus({status: 'failed'}));
    dispatch(setAppError({error: errorMessage ? errorMessage : 'Some error occurred'}));
    // return {error: errorMessage ? errorMessage : 'Some error occurred'};
}
