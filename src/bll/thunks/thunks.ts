import {todolistsAPI} from "../../api/todolists-api";
import {
    addTask,
    addTodolist,
    changeTask,
    changeTodolist,
    changeTodolistStatus,
    removeTask,
    removeTodolist,
    setAppError,
    setAppStatus,
    setTasks,
    setTodolists
} from "../actions/actions";
import {
    AppThunkType,
    ResultCodes,
    TaskType,
    TodolistType
} from "../../types/types";
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/utils";


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
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
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
                    handleServerAppError(dispatch, response.data.messages);
                }
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
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
                    handleServerAppError(dispatch, response.data.messages);
                }
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
    }

export const deleteTodolist = (id: string): AppThunkType =>
    (dispatch) => {
        dispatch(setAppStatus('loading'));
        dispatch(changeTodolistStatus(id, 'loading'));
        todolistsAPI
            .deleteTodolist(id)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus('succeeded'));
                    dispatch(removeTodolist(id));
                } else {
                    handleServerAppError(dispatch, response.data.messages);
                }
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
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
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
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
                    handleServerAppError(dispatch, response.data.messages);
                }
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
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
                    handleServerAppError(dispatch, response.data.messages);
                }
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
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
                    handleServerAppError(dispatch, response.data.messages);
                }
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
    }
