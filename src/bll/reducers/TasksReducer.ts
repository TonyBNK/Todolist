import {
    GetTasksRejected,
    GetTasksResolved,
    TasksType,
    TaskType
} from "../../types/types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    addTodolist,
    clearTodolistsData,
    removeTodolist,
    setTodolists
} from "./TodolistsReducer";
import {setAppStatus} from "./AppReducer";
import {todolistsAPI} from "../../api/todolists-api";
import {handleServerNetworkError} from "../../utils/utils";


const initialState: TasksType = {};

export const getTasks = createAsyncThunk(
    'tasks/getTasks',
    async (todoListId: string, {dispatch}
    ): Promise<GetTasksResolved> => {
        // try {
        //     dispatch(setAppStatus({status: 'loading'}));
        //     const response = await todolistsAPI.tasksAPI.getTasks(todoListId);
        //     dispatch(setAppStatus({status: 'succeeded'}));
        //     return {tasks: response.data.items, todoListId};
        // } catch (e: any) {
        //     return handleServerNetworkError(dispatch, e.message);
        // }
        dispatch(setAppStatus({status: 'loading'}));
        return todolistsAPI.tasksAPI.getTasks(todoListId)
            .then(response => {
                dispatch(setAppStatus({status: 'succeeded'}));
                //dispatch(setTasks({tasks: response.data.items, todoListId}));
                return {tasks: response.data.items, todoListId};
            })
        // .catch(error => {
        //     handleServerNetworkError(dispatch, error.message);
        // });
    });

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        // setTasks(state, action: PayloadAction<{ todoListId: string, tasks: Array<TaskType> }>) {
        //     state[action.payload.todoListId] = action.payload.tasks;
        // },
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
        builder.addCase(getTasks.fulfilled, (state, action) => {
                state[action.payload.todoListId] = action.payload.tasks;
        });
    }
})

export const TasksReducer = tasksSlice.reducer;

export const {
    addTask,
    changeTask,
    removeTask
} = tasksSlice.actions;
