import {GetTodolistsType, RequestStatusType,} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {todolistsActions} from "../../components/features";


const todolistsSlice = createSlice({
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
        builder.addCase(todolistsActions.getTodolists.fulfilled, (state, action) => {
            return action.payload.todolists.map(todo => ({
                ...todo,
                filter: 'All',
                entityStatus: 'idle'
            }))
        });
        builder.addCase(todolistsActions.createTodolist.fulfilled, (state, action) => {
            state.unshift({
                ...action.payload.todolist,
                filter: 'All',
                entityStatus: 'idle'
            });
        });
        builder.addCase(todolistsActions.updateTodolist.fulfilled, (state, action) => {
            const index = state.findIndex(todo => todo.id === action.payload.todolist.id);
            if (index > -1) {
                state[index] = action.payload.todolist;
            }
        });
        builder.addCase(todolistsActions.deleteTodolist.fulfilled, (state, action) => {
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
