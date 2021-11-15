import {
    CreateTaskResolved,
    DeleteTaskResolved,
    GetTasksResolved,
    ResultCodes,
    TasksType,
    TaskType,
    ThunkAPIConfigType,
    UpdateTaskResolved
} from "../../types/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    asyncActions as todolistsAsyncActions,
    clearTodolistsData
} from "./TodolistsReducer";
import {setAppStatus} from "./AppReducer";
import {todolistsAPI} from "../../api/todolists-api";
import {
    handleAsyncServerAppError, handleAsyncServerNetworkError,
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/error-utils";
import {AxiosError} from "axios";


const getTasks = createAsyncThunk<GetTasksResolved, string, ThunkAPIConfigType>(
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
const createTask = createAsyncThunk<CreateTaskResolved, { title: string, todoListId: string }, ThunkAPIConfigType>(
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
                handleAsyncServerAppError(response.data, {dispatch, rejectWithValue}, false);
                return rejectWithValue({messages, fieldsErrors});
            }
        } catch (err) {
            return handleAsyncServerNetworkError(err as AxiosError, {dispatch, rejectWithValue}, false);
        }

    });
const updateTask = createAsyncThunk<UpdateTaskResolved, TaskType, ThunkAPIConfigType>(
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
const deleteTask = createAsyncThunk<DeleteTaskResolved, { id: string, todoListId: string }, ThunkAPIConfigType>(
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

export const asyncActions = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}

const {getTodolists, createTodolist, deleteTodolist} = todolistsAsyncActions;

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {} as TasksType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTodolists.fulfilled, (state, action) => {
            action.payload.todolists.forEach(todo => state[todo.id]);
        });
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(deleteTodolist.fulfilled, (state, action) => {
            delete state[action.payload.id];
        });
        builder.addCase(clearTodolistsData, () => {
            return {};
        });
        builder.addCase(getTasks.fulfilled, (state, action) => {
            state[action.payload.todoListId] = action.payload.tasks;
        });
        builder.addCase(createTask.fulfilled, (state, action) => {
            state[action.payload.taskModel.todoListId].unshift(action.payload.taskModel);
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.taskModel.todoListId];
            const index = tasks.findIndex(task => task.id === action.payload.taskModel.id);
            if (index > -1) {
                tasks[index] = action.payload.taskModel
            }
        });
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId];
            const index = tasks.findIndex(task => task.id === action.payload.id);
            if (index > -1) {
                tasks.splice(index, 1);
            }
        });
    }
})

export const TasksReducer = tasksSlice.reducer;
