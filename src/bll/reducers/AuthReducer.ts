import {AuthStateType} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: AuthStateType = {
    isLogged: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setLogged(state, action: PayloadAction<AuthStateType>) {
            state.isLogged = action.payload.isLogged;
        }
    }
});

export const AuthReducer = authSlice.reducer;

export const {setLogged} = authSlice.actions;
