import {
    LoginDataType,
    LogInResolved,
    ResultCodes,
    ThunkAPIConfigType
} from "../../types/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatus} from "./AppReducer";
import {authAPI} from "../../api/todolists-api";
import {
    handleAsyncServerAppError, handleAsyncServerNetworkError
} from "../../utils/error-utils";
import {clearTodolistsData} from "./TodolistsReducer";
import {AxiosError} from "axios";


const logIn = createAsyncThunk<undefined, LoginDataType, ThunkAPIConfigType>(
    'auth/logIn',
    async (loginData, {dispatch, rejectWithValue}
    ) => {
        try {
            dispatch(setAppStatus({status: 'loading'}));
            const response = await authAPI.logIn(loginData);
            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
            } else {
                // const [messages, fieldsErrors] = [response.data.messages, response.data.fieldsErrors];
                // handleAsyncServerAppError(response.data, {dispatch, rejectWithValue}, false);
                // return rejectWithValue({messages, fieldsErrors});
                return handleAsyncServerAppError(response.data, {dispatch, rejectWithValue});
            }
        } catch (err) {
            return handleAsyncServerNetworkError(err as AxiosError, {dispatch, rejectWithValue}, false);
        }
    });
const logOut = createAsyncThunk<undefined, void, ThunkAPIConfigType>(
    'auth/logOut',
    async (arg, {dispatch, rejectWithValue}
    ) => {
        try {
            dispatch(setAppStatus({status: 'loading'}));
            const response = await authAPI.logOut();
            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
                dispatch(clearTodolistsData());
            } else {
                // const [messages, fieldsErrors] = [response.data.messages, response.data.fieldsErrors];
                // handleAsyncServerAppError(response.data, {dispatch, rejectWithValue}, false);
                // return rejectWithValue({messages, fieldsErrors});
                return handleAsyncServerAppError(response.data, {dispatch, rejectWithValue});
            }

        }catch (err) {
            return handleAsyncServerNetworkError(err as AxiosError, {dispatch, rejectWithValue}, false);
        }
    });

export const asyncActions = {
    logIn,
    logOut
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogged: false
    },
    reducers: {
        setLogged(state, action: PayloadAction<LogInResolved>) {
            state.isLogged = action.payload.isLogged;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(logIn.fulfilled, (state) => {
            state.isLogged = true;
        });
        builder.addCase(logOut.fulfilled, (state) => {
            state.isLogged = false;
        });
    }
});

export const AuthReducer = authSlice.reducer;

export const {setLogged} = authSlice.actions;
