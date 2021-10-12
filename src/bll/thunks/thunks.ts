import {todolistsAPI} from "../../api/todolists-api";
import {
    addTask,
    addTodolist,
    changeTask,
    changeTodolist,
    getAllTasks,
    getAllTodolists,
    removeTask,
    removeTodolist
} from "../action-creators/actionCreators";
import {AppThunkType, TaskType, TodolistType} from "../../types/types";


export const getTodolists = (): AppThunkType =>
    (dispatch) => {
        todolistsAPI
            .getTodolists()
            .then(response => {
                dispatch(getAllTodolists(response.data));
            })
            .catch(error => console.log(error));
    }

export const createTodolist = (title: string): AppThunkType =>
    (dispatch) => {
        todolistsAPI
            .createTodolist(title)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(addTodolist(response.data.data.item));
                }
            })
            .catch(error => console.log(error));
    }

export const updateTodolist = (payload: TodolistType): AppThunkType =>
    (dispatch) => {
        todolistsAPI
            .updateTodolist(payload)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTodolist(payload));
                }
            })
            .catch(error => console.log(error));
    }

export const deleteTodolist = (id: string): AppThunkType =>
    (dispatch) => {
        todolistsAPI
            .deleteTodolist(id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(removeTodolist(id));
                }
            })
            .catch(error => console.log(error));
    }

export const getTasks = (todoListId: string): AppThunkType =>
    (dispatch) => {
        todolistsAPI
            .tasksAPI
            .getTasks(todoListId)
            .then(response => {
                dispatch(getAllTasks(todoListId, response.data.items));
            })
            .catch(error => console.log(error));
    }

export const createTask = (title: string, todoListId: string): AppThunkType =>
    (dispatch) => {
        todolistsAPI
            .tasksAPI
            .createTask(title, todoListId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(addTask(response.data.data.item));
                }
            })
            .catch(error => console.log(error));
    }

export const updateTask = (payload: TaskType): AppThunkType =>
    (dispatch) => {
        todolistsAPI
            .tasksAPI
            .updateTask(payload)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTask(response.data.data.item));
                }
            })
            .catch(error => console.log(error));
    }

export const deleteTask = (id: string, todoListId: string): AppThunkType =>
    (dispatch) => {
        todolistsAPI
            .tasksAPI
            .deleteTask(id, todoListId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(removeTask(id));
                }
            })
            .catch(error => console.log(error));
    }
