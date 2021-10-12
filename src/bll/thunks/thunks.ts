import {todolistsAPI} from "../../api/todolists-api";
import {
    addTask,
    addTodolist,
    changeTask,
    changeTodolist,
    setTasks,
    setTodolists,
    removeTask,
    removeTodolist, setAppError, setAppStatus
} from "../actions/actions";
import {
    AppThunkType,
    ResultCodes,
    TaskType,
    TodolistType
} from "../../types/types";


const {Success} = ResultCodes;

export const getTodolists = (): AppThunkType =>
    (dispatch) => {
        dispatch(setAppStatus('loading'));
        todolistsAPI
            .getTodolists()
            .then(response => {
                dispatch(setAppStatus('succeeded'));
                dispatch(setTodolists(response.data));
            })
            .catch(error => console.log(error));
    }

export const createTodolist = (title: string): AppThunkType =>
    (dispatch) => {
        dispatch(setAppStatus('loading'));
        todolistsAPI
            .createTodolist(title)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus('succeeded'));
                    dispatch(addTodolist(response.data.data.item));
                } else {
                    dispatch(setAppStatus('failed'));
                    response.data.messages.length
                        ? dispatch(setAppError(response.data.messages[0]))
                        : dispatch(setAppError('Some error occurred'));
                }
            })
            .catch(error => console.log(error));
    }

export const updateTodolist = (payload: TodolistType): AppThunkType =>
    (dispatch) => {
        dispatch(setAppStatus('loading'));
        todolistsAPI
            .updateTodolist(payload)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus('succeeded'));
                    dispatch(changeTodolist(payload));
                } else {
                    dispatch(setAppStatus('failed'));
                    response.data.messages.length
                        ? dispatch(setAppError(response.data.messages[0]))
                        : dispatch(setAppError('Some error occurred'));
                }
            })
            .catch(error => console.log(error));
    }

export const deleteTodolist = (id: string): AppThunkType =>
    (dispatch) => {
        dispatch(setAppStatus('loading'));
        todolistsAPI
            .deleteTodolist(id)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus('succeeded'));
                    dispatch(removeTodolist(id));
                } else {
                    dispatch(setAppStatus('failed'));
                    response.data.messages.length
                        ? dispatch(setAppError(response.data.messages[0]))
                        : dispatch(setAppError('Some error occurred'));
                }
            })
            .catch(error => console.log(error));
    }

export const getTasks = (todoListId: string): AppThunkType =>
    (dispatch) => {
        dispatch(setAppStatus('loading'));
        todolistsAPI
            .tasksAPI
            .getTasks(todoListId)
            .then(response => {
                dispatch(setAppStatus('succeeded'));
                dispatch(setTasks(todoListId, response.data.items));
            })
            .catch(error => console.log(error));
    }

export const createTask = (title: string, todoListId: string): AppThunkType =>
    (dispatch) => {
        dispatch(setAppStatus('loading'));
        todolistsAPI
            .tasksAPI
            .createTask(title, todoListId)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus('succeeded'));
                    dispatch(addTask(response.data.data.item));
                } else {
                    dispatch(setAppStatus('failed'));
                    response.data.messages.length
                        ? dispatch(setAppError(response.data.messages[0]))
                        : dispatch(setAppError('Some error occurred'));
                }
            })
            .catch(error => console.log(error));
    }

export const updateTask = (payload: TaskType): AppThunkType =>
    (dispatch) => {
        dispatch(setAppStatus('loading'));
        todolistsAPI
            .tasksAPI
            .updateTask(payload)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus('succeeded'));
                    dispatch(changeTask(response.data.data.item));
                } else {
                    dispatch(setAppStatus('failed'));
                    response.data.messages.length
                        ? dispatch(setAppError(response.data.messages[0]))
                        : dispatch(setAppError('Some error occurred'));
                }
            })
            .catch(error => console.log(error));
    }

export const deleteTask = (id: string, todoListId: string): AppThunkType =>
    (dispatch) => {
        dispatch(setAppStatus('loading'));
        todolistsAPI
            .tasksAPI
            .deleteTask(id, todoListId)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus('succeeded'));
                    dispatch(removeTask(id, todoListId));
                } else {
                    dispatch(setAppStatus('failed'));
                    response.data.messages.length
                        ? dispatch(setAppError(response.data.messages[0]))
                        : dispatch(setAppError('Some error occurred'));
                }
            })
            .catch(error => console.log(error));
    }
