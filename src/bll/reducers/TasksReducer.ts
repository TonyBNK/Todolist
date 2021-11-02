import {
    CreateTaskResolved, DeleteTaskResolved,
    GetTasksResolved,
    ResultCodes,
    TasksType,
    TaskType, UpdateTaskResolved
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
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/utils";


export const getTasks = createAsyncThunk(
    'tasks/getTasks',
    async (
        todoListId: string,
        {
            dispatch,
            rejectWithValue
        }
    ): Promise<GetTasksResolved> => {
        // try {
            dispatch(setAppStatus({status: 'loading'}));
            const response = await todolistsAPI.tasksAPI.getTasks(todoListId);
            dispatch(setAppStatus({status: 'succeeded'}));
            return {tasks: response.data.items, todoListId};
        // } catch (e: any) {
        //     return rejectWithValue(handleServerNetworkError(dispatch, e.message));
        // }
    });
export const createTask = createAsyncThunk(
    'tasks/createTask',
    (
        arg: { title: string, todoListId: string },
        {dispatch}
    ): Promise<CreateTaskResolved> => {
        dispatch(setAppStatus({status: 'loading'}));
        return todolistsAPI.tasksAPI.createTask(arg.title, arg.todoListId)
            .then(response => {
                // if (response.data.resultCode === ResultCodes.Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
                //dispatch(addTask({taskModel: response.data.data.item}));
                return {taskModel: response.data.data.item};
                // } else {
                //     handleServerAppError(dispatch, response.data.messages);
                // }
            })
        // .catch(error => {
        //     handleServerNetworkError(dispatch, error.message);
        // });
    });
export const updateTask = createAsyncThunk(
    'tasks/updateTask',
    (
        payload: TaskType,
        {dispatch}
    ): Promise<UpdateTaskResolved> => {
        dispatch(setAppStatus({status: 'loading'}));
        return todolistsAPI.tasksAPI.updateTask(payload)
            .then(response => {
                // if (response.data.resultCode === Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
                //dispatch(changeTask({taskModel: response.data.data.item}));
                return {taskModel: response.data.data.item};
                //     } else {
                //         handleServerAppError(dispatch, response.data.messages);
                //     }
            })
        // .catch(error => {
        //     handleServerNetworkError(dispatch, error.message);
        // });
    });
export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    (
        arg: { id: string, todoListId: string },
        {dispatch}
    ): Promise<DeleteTaskResolved> => {
        dispatch(setAppStatus({status: 'loading'}));
        return todolistsAPI.tasksAPI.deleteTask(arg.id, arg.todoListId)
            .then(response => {
                // if (response.data.resultCode === Success) {
                dispatch(setAppStatus({status: 'succeeded'}));
                //dispatch(removeTask({id, todoListId}));
                const [id, todoListId] = [arg.id, arg.todoListId];
                return {id, todoListId};
                // } else {
                //     handleServerAppError(dispatch, response.data.messages);
                // }
            })
        // .catch(error => {
        //     handleServerNetworkError(dispatch, error.message);
        // });
    });

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {} as TasksType,
    reducers: {},
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
        builder.addCase(createTask.fulfilled, (state, action) => {
            state[action.payload.taskModel.todoListId].unshift(action.payload.taskModel);
        });
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.taskModel.todoListId];
            const index = tasks.findIndex(task => task.id === action.payload.taskModel.id);
            if (index > -1) {
                tasks[index] = action.payload.taskModel
            }
        });
        builder.addCase(deleteTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId];
            const index = tasks.findIndex(task => task.id === action.payload.id);
            if (index > -1) {
                tasks.splice(index, 1);
            }
        });
    }
})

export const TasksReducer = tasksSlice.reducer;
