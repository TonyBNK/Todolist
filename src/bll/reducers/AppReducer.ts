import {AppActionType, AppRequestType} from "../../types/types";


const initialState: AppRequestType = {
    status: "idle",
    error: null
}

export const AppReducer = (state = initialState, action: AppActionType):
    AppRequestType => {
    switch (action.type) {
        case "SET-APP-STATUS":
            return {
                ...state,
                status: action.status
            }
        case "SET-APP-ERROR":
            return {
                ...state,
                error: action.error
            }
        default:
            return state;
    }
}