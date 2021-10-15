import {AuthActionType} from "../../types/types";


const initialState = {
    isLoggedIn: false
}

export const AuthReducer = (state = initialState, action: AuthActionType) => {
    switch (action.type) {
        case "SET-LOGGED":
            return {
                ...state,
                isLoggedIn: action.isLoggedIn
            }
        default:
            return state;
    }
}