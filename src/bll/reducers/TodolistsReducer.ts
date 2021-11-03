import {
    CreateTodolistResolved,
    GetTodolistsType,
    RequestStatusType,
    ResultCodes, ThunkAPIConfigType,
    TodolistType,
} from "../../types/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/utils";
import {setAppStatus} from "./AppReducer";
import {todolistsAPI} from "../../api/todolists-api";


// export const getTodolists = createAsyncThunk<GetTodolistsResolved, void, ThunkAPIConfigType>(
//     'todolists/getTodolists',
//     async (arg, {dispatch, rejectWithValue}) => {
//         try {
//             dispatch(setAppStatus({status: 'loading'}));
//             const response = await todolistsAPI.getTodolists();
//             dispatch(setAppStatus({status: 'succeeded'}));
//             const result = await dispatch(setTodolists({todolists: response.data}));
//             result.payload.todolists.forEach(tl => {
//                 dispatch(getTasks(tl.id));
//             });
//             return {todolists: result.payload.todolists}
//         } catch (e: any) {
//             handleServerNetworkError(dispatch, e.message);
//             return rejectWithValue({messages: [e.message]});
//         }
//     });
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

const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as GetTodolistsType,
    reducers: {
        setTodolists(state, action: PayloadAction<{ todolists: GetTodolistsType }>) {
            return action.payload.todolists.map(todo => ({
                ...todo,
                filter: 'All',
                entityStatus: 'idle'
            }))
        },
        changeTodolist(state, action: PayloadAction<{ todolist: TodolistType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.todolist.id);
            if (index > -1) {
                state[index] = action.payload.todolist;
            }
        },
        changeTodolistStatus(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            if (index > -1) {
                state[index].entityStatus = action.payload.entityStatus
            }
        },
        removeTodolist(state, action: PayloadAction<{ id: string }>) {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
            }
        },
        clearTodolistsData(state) {
            state = [];
        }
    },
    extraReducers: builder => {
        builder.addCase(createTodolist.fulfilled, (state, action) => {
            state.unshift({
                ...action.payload.todolist,
                filter: 'All',
                entityStatus: 'idle'
            });
        });
    }
});

export const TodolistsReducer = todolistsSlice.reducer;

export const {
    setTodolists,
    changeTodolist,
    changeTodolistStatus,
    removeTodolist,
    clearTodolistsData
} = todolistsSlice.actions;
