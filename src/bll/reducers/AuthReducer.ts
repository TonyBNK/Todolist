import {
    LoginDataType,
    LogInResolved, LogOutResolved,
    ResultCodes, ThunkAPIConfigType
} from "../../types/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatus} from "./AppReducer";
import {authAPI} from "../../api/todolists-api";
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/utils";
import {clearTodolistsData} from "./TodolistsReducer";


export const logIn = createAsyncThunk<LogInResolved, LoginDataType, ThunkAPIConfigType>(
    'auth/logIn',
    async (loginData, {dispatch, rejectWithValue}
    ) => {
        try {
            dispatch(setAppStatus({status: 'loading'}));
            const response = await authAPI.logIn(loginData);
            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
                return {isLogged: true};
            } else {
                const [messages, fieldsErrors] = [response.data.messages, response.data.fieldsErrors];
                handleServerAppError(dispatch, messages);
                return rejectWithValue({messages, fieldsErrors});
            }
        } catch (e: any) {
            handleServerNetworkError(dispatch, e.message);
            return rejectWithValue({messages: [e.message]});
        }
    });
export const logOut = createAsyncThunk<LogOutResolved, void, ThunkAPIConfigType>(
    'auth/logOut',
    async (arg, {dispatch, rejectWithValue}
    ) => {
        try {
            dispatch(setAppStatus({status: 'loading'}));
            const response = await authAPI.logOut();
            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
                dispatch(clearTodolistsData());
                return {isLogged: false};
            } else {
                const [messages, fieldsErrors] = [response.data.messages, response.data.fieldsErrors];
                handleServerAppError(dispatch, messages);
                return rejectWithValue({messages, fieldsErrors});
            }

        }catch (e: any) {
            handleServerNetworkError(dispatch, e.message);
            return rejectWithValue({messages: [e.message]});
        }
    });

const authSlice = createSlice({
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
        builder.addCase(logIn.fulfilled, (state, action) => {
            state.isLogged = action.payload.isLogged;
        });
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.isLogged = action.payload.isLogged;
        });
    }
});

export const AuthReducer = authSlice.reducer;

export const {setLogged} = authSlice.actions;
