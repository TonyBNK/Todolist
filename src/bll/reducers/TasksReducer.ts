import {TasksType, TaskType} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    addTodolist,
    clearTodolistsData,
    removeTodolist,
    setTodolists
} from "./TodolistsReducer";


const initialState: TasksType = {};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        setTasks(state, action: PayloadAction<{ todoListId: string, tasks: Array<TaskType> }>) {
            state[action.payload.todoListId] = action.payload.tasks;
        },
        addTask(state, action: PayloadAction<{ taskModel: TaskType }>) {
            state[action.payload.taskModel.todoListId].unshift(action.payload.taskModel);
        },
        changeTask(state, action: PayloadAction<{ taskModel: TaskType }>) {
            const tasks = state[action.payload.taskModel.todoListId];
            const index = tasks.findIndex(task => task.id === action.payload.taskModel.id);
            if (index > -1) {
                tasks[index] = action.payload.taskModel
            }
        },
        removeTask(state, action: PayloadAction<{ id: string, todoListId: string }>) {
            const tasks = state[action.payload.todoListId];
            const index = tasks.findIndex(task => task.id === action.payload.id);
            if (index > -1) {
                tasks.splice(index, 1);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setTodolists, (state, action) => {
            action.payload.todolists.forEach(todo => state[todo.id] = []);
        });
        builder.addCase(addTodolist, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolist, (state, action) => {
            delete state[action.payload.id];
        });
        builder.addCase(clearTodolistsData, (state, action) => {
            return {};
        });
    }
})

export const TasksReducer = tasksSlice.reducer;

export const {
    setTasks,
    addTask,
    changeTask,
    removeTask
} = tasksSlice.actions;
