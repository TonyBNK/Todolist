import {
    AppRequestType,
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
import {appActions, authActions} from "../actions";


const {setAppStatus, setAppError} = appActions;
const {setLogged} = authActions;

const setAppInitialize = createAsyncThunk<undefined, void, ThunkAPIConfigType>(
    'app/setAppInitialize',
    async (arg, {dispatch, rejectWithValue}) => {
        try {
            const response = await authAPI.me();
            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
                dispatch(setLogged({isLogged: true}));
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
        } finally {
            return;
        }
    });

export const asyncActions = {
    setAppInitialize
}

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        status: "idle",
        error: null,
        isInitialized: false
    } as AppRequestType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(setAppInitialize.fulfilled, (state) => {
                state.isInitialized = true;
            })
            .addCase(setAppStatus, (state, action) => {
                state.status = action.payload.status;
            })
            .addCase(setAppError, (state, action) => {
                state.error = action.payload.error;
            })
    }
});

export const AppReducer = appSlice.reducer;
