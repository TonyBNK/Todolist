import {createAsyncThunk} from "@reduxjs/toolkit";
import {
    CreateTaskResolved,
    DeleteTaskResolved,
    GetTasksResolved,
    ResultCodes,
    TaskType,
    ThunkAPIConfigType,
    UpdateTaskResolved
} from "../../types/types";
import {setAppStatus} from "../reducers/AppReducer";
import {todolistsAPI} from "../../api/todolists-api";
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/utils";

export const getTasks = createAsyncThunk<GetTasksResolved, string, ThunkAPIConfigType>(
    'tasks/getTasks',
    async (todoListId, {dispatch, rejectWithValue}
    ) => {
        try {
            dispatch(setAppStatus({status: 'loading'}));
            const response = await todolistsAPI.tasksAPI.getTasks(todoListId);
            dispatch(setAppStatus({status: 'succeeded'}));
            return {tasks: response.data.items, todoListId};
        } catch (e: any) {
            handleServerNetworkError(dispatch, e.message);
            return rejectWithValue({messages: [e.message]});
        }
    });
export const createTask = createAsyncThunk<CreateTaskResolved, { title: string, todoListId: string }, ThunkAPIConfigType>(
    'tasks/createTask',
    async (arg, {dispatch, rejectWithValue}
    ) => {
        try {
            dispatch(setAppStatus({status: 'loading'}));
            const response = await todolistsAPI.tasksAPI.createTask(arg.title, arg.todoListId);
            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
                return {taskModel: response.data.data.item};
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
export const updateTask = createAsyncThunk<UpdateTaskResolved, TaskType, ThunkAPIConfigType>(
    'tasks/updateTask',
    async (payload, {dispatch, rejectWithValue}
    ) => {
        try {
            dispatch(setAppStatus({status: 'loading'}));
            const response = await todolistsAPI.tasksAPI.updateTask(payload);
            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
                return {taskModel: response.data.data.item};
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
export const deleteTask = createAsyncThunk<DeleteTaskResolved, { id: string, todoListId: string }, ThunkAPIConfigType>(
    'tasks/deleteTask',
    async (arg, {dispatch, rejectWithValue}
    ) => {
        try {
            dispatch(setAppStatus({status: 'loading'}));
            const response = await todolistsAPI.tasksAPI.deleteTask(arg.id, arg.todoListId);
            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
                const [id, todoListId] = [arg.id, arg.todoListId];
                return {id, todoListId};
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
