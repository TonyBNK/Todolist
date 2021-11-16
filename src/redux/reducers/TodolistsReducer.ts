import {
    CreateTodolistResolved,
    DeleteTodolistResolved,
    GetTodolistsResolved,
    GetTodolistsType,
    ResultCodes,
    ThunkAPIConfigType,
    TodolistType,
    UpdateTodolistResolved,
} from "../../types/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {todolistsAPI} from "../../api/todolists-api";
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError
} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {appActions} from "../actions";
import {todolistsActions} from "../actions";


const {setAppStatus} = appActions;
const {changeTodolistStatus, clearTodolistsData} = todolistsActions;

const getTodolists = createAsyncThunk<GetTodolistsResolved, void, ThunkAPIConfigType>(
    'todolists/getTodolists',
    async (arg, {dispatch, rejectWithValue}) => {
        try {
            dispatch(setAppStatus({status: 'loading'}));
            const response = await todolistsAPI.getTodolists();
            dispatch(setAppStatus({status: 'succeeded'}));
            return {todolists: response.data};
        } catch (err) {
            return handleAsyncServerNetworkError(err as AxiosError, {
                dispatch,
                rejectWithValue
            }, false);
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
                handleAsyncServerAppError(response.data, {
                    dispatch,
                    rejectWithValue
                }, false);
                return rejectWithValue({messages, fieldsErrors});
                // return handleAsyncServerAppError(response.data, {dispatch, rejectWithValue});
            }
        } catch (err) {
            return handleAsyncServerNetworkError(err as AxiosError, {
                dispatch,
                rejectWithValue
            }, false);
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
    getTodolists,
    createTodolist,
    updateTodolist,
    deleteTodolist
}

export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as GetTodolistsType,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map(todo => ({
                    ...todo,
                    filter: 'All',
                    entityStatus: 'idle'
                }))
            })
            .addCase(createTodolist.fulfilled, (state, action) => {
                state.unshift({
                    ...action.payload.todolist,
                    filter: 'All',
                    entityStatus: 'idle'
                });
            })
            .addCase(updateTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.todolist.id);
                if (index > -1) {
                    state[index] = action.payload.todolist;
                }
            })
            .addCase(deleteTodolist.fulfilled, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.id);
                if (index > -1) {
                    state.splice(index, 1);
                }
            })
            .addCase(changeTodolistStatus, (state, action) => {
                const index = state.findIndex(todo => todo.id === action.payload.id);
                if (index > -1) {
                    state[index].entityStatus = action.payload.entityStatus
                }
            })
            .addCase(clearTodolistsData, (state) => {
                state = [];
            })
    }
});

export const TodolistsReducer = todolistsSlice.reducer;
