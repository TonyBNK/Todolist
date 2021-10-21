import {Dispatch} from "redux";
import {ActionsType} from "../types/types";
import {setAppError, setAppStatus} from "../bll/reducers/AppReducer";


export const handleServerAppError = (dispatch: Dispatch<ActionsType>, errorMessages: Array<string>) => {
    dispatch(setAppStatus({status: 'failed'}));
    errorMessages.length
        ? dispatch(setAppError({error: errorMessages[0]}))
        : dispatch(setAppError({error: 'Some error occurred'}));
}
export const handleServerNetworkError = (dispatch: Dispatch<ActionsType>, errorMessage: string) => {
    dispatch(setAppError({error: errorMessage ? errorMessage : 'Some error occurred'}));
    dispatch(setAppStatus({status: 'failed'}));
}
