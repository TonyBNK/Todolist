import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    CreateTodolistResolved,
    DeleteTodolistResolved,
    GetTodolistsResolved,
    ResultCodes,
    ThunkAPIConfigType,
    TodolistType,
    UpdateTodolistResolved
} from "../../types/types";
import {setAppStatus} from "../reducers/AppReducer";
import {todolistsAPI} from "../../api/todolists-api";
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/utils";
import {changeTodolistStatus} from "../reducers/TodolistsReducer";

export const getTodolists = createAsyncThunk<GetTodolistsResolved, void, ThunkAPIConfigType>(
    'todolists/getTodolists',
    async (arg, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}));
            const response = await todolistsAPI.getTodolists();
            dispatch(setAppStatus({status: 'succeeded'}));
            return {todolists: response.data};
        } catch (e: any) {
            handleServerNetworkError(dispatch, e.message);
            return rejectWithValue({messages: [e.message]});
        }
    });
export const createTodolist = createAsyncThunk<CreateTodolistResolved, string, ThunkAPIConfigType>(
    'todolists/createTodolist',
    async (title, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}));
            const response = await todolistsAPI.createTodolist(title);
            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
                return {todolist: response.data.data.item};
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
export const updateTodolist = createAsyncThunk<UpdateTodolistResolved, TodolistType, ThunkAPIConfigType>(
    'todolists/updateTodolist',
    async (payload, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}));
            const response = await todolistsAPI.updateTodolist(payload);
            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
                return {todolist: payload};
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
export const deleteTodolist = createAsyncThunk<DeleteTodolistResolved, string, ThunkAPIConfigType>(
    'todolists/deleteTodolist',
    async (id, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}));
            dispatch(changeTodolistStatus({id, entityStatus: 'loading'}));
            const response = await todolistsAPI.deleteTodolist(id);
            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
                return {id};
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
