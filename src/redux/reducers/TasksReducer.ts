import {TasksType} from "../../types/types";
import {createSlice} from "@reduxjs/toolkit";
import {clearTodolistsData} from "./TodolistsReducer";
import {
    createTodolist,
    deleteTodolist,
    getTodolists
} from "../actions/TodolistsActions";
import {tasksActions} from "../../components/features";


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
        builder.addCase(tasksActions.getTasks.fulfilled, (state, action) => {
            state[action.payload.todoListId] = action.payload.tasks;
        });
        builder.addCase(tasksActions.createTask.fulfilled, (state, action) => {
            state[action.payload.taskModel.todoListId].unshift(action.payload.taskModel);
        });
        builder.addCase(tasksActions.updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.taskModel.todoListId];
            const index = tasks.findIndex(task => task.id === action.payload.taskModel.id);
            if (index > -1) {
                tasks[index] = action.payload.taskModel
            }
        });
        builder.addCase(tasksActions.deleteTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId];
            const index = tasks.findIndex(task => task.id === action.payload.id);
            if (index > -1) {
                tasks.splice(index, 1);
            }
        });
    }
})

export const TasksReducer = tasksSlice.reducer;
