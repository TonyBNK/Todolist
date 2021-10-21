import {
    GetTodolistsType,
    RequestStatusType,
    TodolistType,
} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: GetTodolistsType = [];

const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        setTodolists(state, action: PayloadAction<GetTodolistsType>) {
            state = action.payload;
        },
        addTodolist(state, action: PayloadAction<TodolistType>) {
            state.push({
                ...action.payload,
                filter: 'All',
                entityStatus: 'idle'
            });
        },
        changeTodolist(state, action: PayloadAction<TodolistType>) {
            const index = state.findIndex(todo => todo.id === action.payload.id);
            if (index > -1) {
                state[index] = action.payload
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
        }
    }
});

export const TodolistsReducer = todolistsSlice.reducer;

export const {
    setTodolists,
    addTodolist,
    changeTodolist,
    changeTodolistStatus,
    removeTodolist
} = todolistsSlice.actions;
