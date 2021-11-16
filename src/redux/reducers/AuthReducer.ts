import {
    LoginDataType,
    ResultCodes,
    ThunkAPIConfigType
} from "../../types/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {authAPI} from "../../api/todolists-api";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError
} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {appActions} from "../actions";
import {authActions} from "../actions";
import {todolistsActions} from "../actions";


const {setAppStatus} = appActions;
const {setLogged} = authActions;
const {clearTodolistsData} = todolistsActions;

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
                const [messages, fieldsErrors] = [response.data.messages, response.data.fieldsErrors];
                handleAsyncServerAppError(response.data, {
                    dispatch,
                    rejectWithValue
                }, false);
                return rejectWithValue({messages, fieldsErrors});
            }
        } catch (err) {
            return handleAsyncServerNetworkError(err as AxiosError, {
                dispatch,
                rejectWithValue
            }, false);
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
                return handleAsyncServerAppError(response.data, {
                    dispatch,
                    rejectWithValue
                });
            }

        } catch (err) {
            return handleAsyncServerNetworkError(err as AxiosError, {
                dispatch,
                rejectWithValue
            }, false);
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(logIn.fulfilled, (state) => {
                state.isLogged = true;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.isLogged = false;
            })
            .addCase(setLogged, (state, action) => {
                state.isLogged = action.payload.isLogged;
            })
    }
});

export const AuthReducer = authSlice.reducer;
