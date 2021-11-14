import {
    CreateTodolistResolved,
    DeleteTodolistResolved,
    GetTodolistsResolved,
    GetTodolistsType,
    RequestStatusType,
    ResultCodes,
    ThunkAPIConfigType,
    TodolistType,
    UpdateTodolistResolved,
} from "../../types/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppStatus} from "./AppReducer";
import {todolistsAPI} from "../../api/todolists-api";
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/utils";


const getTodolists = createAsyncThunk<GetTodolistsResolved, void, ThunkAPIConfigType>(
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
const createTodolist = createAsyncThunk<CreateTodolistResolved, string, ThunkAPIConfigType>(
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
const updateTodolist = createAsyncThunk<UpdateTodolistResolved, TodolistType, ThunkAPIConfigType>(
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
const deleteTodolist = createAsyncThunk<DeleteTodolistResolved, string, ThunkAPIConfigType>(
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

export const asyncActions = {
    getTodolists,
    createTodolist,
    updateTodolist,
    deleteTodolist
}

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as GetTodolistsType,
    reducers: {
        changeTodolistStatus(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            if (index > -1) {
                state[index].entityStatus = action.payload.entityStatus
            }
        },
        clearTodolistsData(state) {
            state = [];
        }
    },
    extraReducers: builder => {
        builder.addCase(getTodolists.fulfilled, (state, action) => {
            return action.payload.todolists.map(todo => ({
                ...todo,
                filter: 'All',
                entityStatus: 'idle'
            }))
        });
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state.unshift({
                ...action.payload.todolist,
                filter: 'All',
                entityStatus: 'idle'
            });
        });
        builder.addCase(updateTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.todolist.id);
            if (index > -1) {
                state[index] = action.payload.todolist;
            }
        });
        builder.addCase(deleteTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
            }
        });
    }
});

export const TodolistsReducer = todolistsSlice.reducer;

export const {
    changeTodolistStatus,
    clearTodolistsData
} = todolistsSlice.actions;
