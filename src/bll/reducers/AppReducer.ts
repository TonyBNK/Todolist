import {AppActionType, AppRequestType} from "../../types/types";


const initialState: AppRequestType = {
    status: "idle",
    error: null
}

export const AppReducer = (state = initialState, action: AppActionType):
    AppRequestType => {
    switch (action.type) {
        case "APP/SET-REQUEST-STATUS":
            return {
                ...state,
                status: action.status
            }
        case "APP/SET-REQUEST-ERROR":
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}