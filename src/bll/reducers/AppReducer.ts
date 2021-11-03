import {
    AppRequestType,
    RequestStatusType,
    ResultCodes,
    SetAppInitializeResolved,
    ThunkAPIConfigType
} from "../../types/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authAPI} from "../../api/todolists-api";
import {setLogged} from "./AuthReducer";
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/utils";


export const setAppInitialize = createAsyncThunk<SetAppInitializeResolved, void, ThunkAPIConfigType>(
    'app/setAppInitialize',
    async (arg, {dispatch, rejectWithValue}) => {
        try {
            const response = await authAPI.me();
            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
                dispatch(setLogged({isLogged: true}));
            } else {
                const [messages, fieldsErrors] = [response.data.messages, response.data.fieldsErrors];
                handleServerAppError(dispatch, messages);
                return rejectWithValue({messages, fieldsErrors});
            }
        } catch (e: any) {
            handleServerNetworkError(dispatch, e.message);
            return rejectWithValue({messages: [e.message]});
        } finally {
            return {isInitialized: true};
        }
    });

const appSlice = createSlice({
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
        builder.addCase(setAppInitialize.fulfilled, (state, action) => {
            state.isInitialized = action.payload.isInitialized;
        });
    }
});

export const AppReducer = appSlice.reducer;

export const {setAppStatus, setAppError} = appSlice.actions;
