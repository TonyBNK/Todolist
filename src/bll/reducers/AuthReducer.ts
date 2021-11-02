import {
    LoginDataType,
    LogInConfig,
    LogInResolved,
    ResultCodes
} from "../../types/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatus} from "./AppReducer";
import {authAPI} from "../../api/todolists-api";
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/utils";


export const logIn = createAsyncThunk<LogInResolved, LoginDataType, LogInConfig>(
    'auth/logIn',
    async (
        loginData,
        {
            dispatch,
            rejectWithValue
        }
    ) => {
        try {
            dispatch(setAppStatus({status: 'loading'}));
            const response = await authAPI.logIn(loginData);
            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
                //dispatch(setLogged({isLogged: true}));
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
    }
});

export const AuthReducer = authSlice.reducer;

export const {setLogged} = authSlice.actions;
