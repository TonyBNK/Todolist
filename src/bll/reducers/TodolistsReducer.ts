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
        setTodolists(state, action: PayloadAction<{todolists: GetTodolistsType}>) {
            return action.payload.todolists.map(todo => ({...todo, filter: 'All', entityStatus: 'idle'}))
        },
        addTodolist(state, action: PayloadAction<{todolist: TodolistType}>) {
            state.unshift({
                ...action.payload.todolist,
                filter: 'All',
                entityStatus: 'idle'
            });
        },
        changeTodolist(state, action: PayloadAction<{todolist: TodolistType}>) {
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
