import {
    AppRequestType,
    RequestStatusType,
    ResultCodes,
    ThunkAPIConfigType
} from "../../types/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../../api/todolists-api";
import {setLogged} from "./AuthReducer";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError
} from "../../utils/error-utils";
import {AxiosError} from "axios";


const setAppInitialize = createAsyncThunk<undefined, void, ThunkAPIConfigType>(
    'app/setAppInitialize',
    async (arg, {dispatch, rejectWithValue}) => {
        try {
            const response = await authAPI.me();
            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
                dispatch(setLogged({isLogged: true}));
            } else {
                // const [messages, fieldsErrors] = [response.data.messages, response.data.fieldsErrors];
                // handleAsyncServerAppError(response.data, {dispatch, rejectWithValue}, false);
                // return rejectWithValue({messages, fieldsErrors});
                return handleAsyncServerAppError(response.data, {dispatch, rejectWithValue});
            }
        } catch (err) {
            return handleAsyncServerNetworkError(err as AxiosError, {dispatch, rejectWithValue}, false);
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
    reducers: {
        setAppStatus(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status;
        },
        setAppError(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error;
        }
    },
    extraReducers: builder => {
        builder.addCase(setAppInitialize.fulfilled, (state) => {
            state.isInitialized = true;
        });
    }
});

export const AppReducer = appSlice.reducer;

export const {setAppStatus, setAppError} = appSlice.actions;
