import {Dispatch} from "redux";
import {ActionsType} from "../types/types";
import {setAppError, setAppStatus} from "../bll/actions/actions";


export const handleServerAppError = (dispatch: Dispatch<ActionsType>, errorMessages: Array<string>) => {
    dispatch(setAppStatus('failed'));
    errorMessages.length
        ? dispatch(setAppError(errorMessages[0]))
        : dispatch(setAppError('Some error occurred'));
}
export const handleServerNetworkError = (dispatch: Dispatch<ActionsType>, errorMessage: string) => {
    dispatch(setAppError(errorMessage ? errorMessage : 'Some error occurred'));
    dispatch(setAppStatus('failed'));
}
