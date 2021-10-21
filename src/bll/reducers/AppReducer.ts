import {AppRequestType, RequestStatusType} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: AppRequestType = {
    status: "idle",
    error: null,
    isInitialized: false
}

const appSlice = createSlice({
   name: 'app',
   initialState: initialState,
   reducers: {
       setAppStatus(state, action: PayloadAction<{status: RequestStatusType}>){
           state.status = action.payload.status;
       },
       setAppError(state, action: PayloadAction<{error: string | null}>){
           state.error = action.payload.error;
       },
       setAppInitialized(state, action: PayloadAction<{isInitialized: boolean}>){
           state.isInitialized = action.payload.isInitialized;
       }
   }
});

export const AppReducer = appSlice.reducer;

export const {setAppStatus, setAppError, setAppInitialized} = appSlice.actions;
