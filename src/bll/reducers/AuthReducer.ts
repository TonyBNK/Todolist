import {AuthActionType, AuthStateType} from "../../types/types";


const initialState: AuthStateType = {
    isLogged: false
}

export const AuthReducer = (state = initialState, action: AuthActionType) => {
    switch (action.type) {
        case "SET-LOGGED":
            return {
                ...state,
                isLogged: action.isLogged
            }
        default:
            return state;
    }
}