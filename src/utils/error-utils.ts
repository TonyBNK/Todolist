import {ResponseType} from "../types/types";
import {AxiosError} from "axios";
import {appActions} from "../redux/actions/AppActions";


const {setAppStatus, setAppError} = appActions;

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}
export const handleAsyncServerAppError = <D>(
    data: ResponseType<D>,
    thunkAPI: ThunkAPIType,
    showError = true
) => {
    if (showError) {
        thunkAPI.dispatch(setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({
        errors: data.messages,
        fieldsErrors: data.fieldsErrors
    })
}
export const handleAsyncServerNetworkError = (error: AxiosError,
                                              thunkAPI: ThunkAPIType,
                                              showError = true) => {
    if (showError) {
        thunkAPI.dispatch(setAppError({error: error.message ? error.message : 'Some error occurred'}))
    }
    thunkAPI.dispatch(setAppStatus({status: 'failed'}))

    return thunkAPI.rejectWithValue({
        errors: [error.message],
        fieldsErrors: undefined
    })
}

// export const handleServerAppError = (dispatch: Dispatch, errorMessages: Array<string>) => {
//     dispatch(setAppStatus({status: 'failed'}));
//     errorMessages.length
//         ? dispatch(setAppError({error: errorMessages[0]}))
//         : dispatch(setAppError({error: 'Some error occurred'}));
//     // return errorMessages.length
//     //     ? {errorMessage: errorMessages[0]}
//     //     : {errorMessage: 'Some error occurred'};
// }
// export const handleServerNetworkError = (dispatch: Dispatch, errorMessage: string) => {
//     dispatch(setAppStatus({status: 'failed'}));
//     dispatch(setAppError({error: errorMessage ? errorMessage : 'Some error occurred'}));
//     // return {errorMessage: errorMessage ? errorMessage : 'Some error occurred'};
// }
