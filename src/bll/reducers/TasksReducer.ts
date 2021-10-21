import {
    GetTodolistsType,
    TasksType,
    TaskType,
    TodolistType
} from "../../types/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState: TasksType = {};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        setTasks(state, action: PayloadAction<{ todoListId: string, tasks: Array<TaskType> }>) {
            state[action.payload.todoListId] = action.payload.tasks;
        },
        addTask(state, action: PayloadAction<{ taskModel: TaskType }>) {
            state[action.payload.taskModel.todoListId].push(action.payload.taskModel);
        },
        changeTask(state, action: PayloadAction<{ taskModel: TaskType }>) {
            state[action.payload.taskModel.todoListId] = state[action.payload.taskModel.todoListId]
                .map(task => task.id === action.payload.taskModel.id
                    ? action.payload.taskModel
                    : task
                )
        },
        removeTask(state, action: PayloadAction<{ id: string, todoListId: string }>) {
            state[action.payload.todoListId].filter(task => task.id !== action.payload.id);
        },
        setTodolists(state, action: PayloadAction<GetTodolistsType>) {
            action.payload.forEach(todo => state[todo.id] = []);
        },
        addTodolist(state, action: PayloadAction<TodolistType>) {
            state = {[action.payload.id]: [], ...state}
        },
        removeTodolist(state, action: PayloadAction<{ id: string }>) {
            delete state[action.payload.id];
        }
    }
})

export const TasksReducer = tasksSlice.reducer;

export const {
    setTasks,
    addTask,
    changeTask,
    removeTask,
    setTodolists,
    addTodolist,
    removeTodolist
} = tasksSlice.actions;
