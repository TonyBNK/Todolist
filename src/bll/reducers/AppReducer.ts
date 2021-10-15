import {AppActionType, AppRequestType} from "../../types/types";


const initialState: AppRequestType = {
    status: "idle",
    error: null,
    isInitialized: false
}

export const AppReducer = (state = initialState, action: AppActionType):
    AppRequestType => {
    switch (action.type) {
        case "SET-APP-STATUS":
            return {
                ...state,
                status: action.status
            };
        case "SET-APP-ERROR":
            return {
                ...state,
                error: action.error
            };
        case "SET-APP-INITIALIZED":
            return {
                ...state,
                isInitialized: action.isInitialized
            }
        default:
            return state;
    }
}