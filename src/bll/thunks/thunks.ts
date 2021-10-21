import {authAPI, todolistsAPI} from "../../api/todolists-api";
import {
    AppThunkType,
    LoginDataType,
    ResultCodes,
    TaskType,
    TodolistType
} from "../../types/types";
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/utils";
import {setLogged} from "../reducers/AuthReducer";
import {setAppInitialized, setAppStatus} from "../reducers/AppReducer";
import {
    addTodolist,
    changeTodolist, changeTodolistStatus, removeTodolist,
    setTodolists
} from "../reducers/TodolistsReducer";
import {
    addTask,
    changeTask,
    removeTask,
    setTasks
} from "../reducers/TasksReducer";


const {Success} = ResultCodes;

export const getTodolists = (): AppThunkType =>
    (dispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI
            .getTodolists()
            .then(response => {
                dispatch(setAppStatus({status: 'succeeded'}));
                dispatch(setTodolists(response.data));
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
    }

export const createTodolist = (title: string): AppThunkType =>
    (dispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI
            .createTodolist(title)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus({status: 'succeeded'}));
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
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI
            .updateTodolist(payload)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus({status: 'succeeded'}));
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
        dispatch(setAppStatus({status: 'loading'}));
        dispatch(changeTodolistStatus({id, entityStatus: 'loading'}));
        todolistsAPI
            .deleteTodolist(id)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus({status: 'succeeded'}));
                    dispatch(removeTodolist({id}));
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
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI
            .tasksAPI
            .getTasks(todoListId)
            .then(response => {
                dispatch(setAppStatus({status: 'succeeded'}));
                dispatch(setTasks({tasks: response.data.items, todoListId}));
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
    }

export const createTask = (title: string, todoListId: string): AppThunkType =>
    (dispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI
            .tasksAPI
            .createTask(title, todoListId)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus({status: 'succeeded'}));
                    dispatch(addTask({taskModel: response.data.data.item}));
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
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI
            .tasksAPI
            .updateTask(payload)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus({status: 'succeeded'}));
                    dispatch(changeTask({taskModel: response.data.data.item}));
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
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI
            .tasksAPI
            .deleteTask(id, todoListId)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus({status: 'succeeded'}));
                    dispatch(removeTask({id, todoListId}));
                } else {
                    handleServerAppError(dispatch, response.data.messages);
                }
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
    }

export const setAppInitialize = (): AppThunkType =>
    (dispatch) => {
        authAPI
            .me()
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus({status: 'succeeded'}));
                    dispatch(setLogged({isLogged: true}));
                } else {
                    handleServerAppError(dispatch, response.data.messages);
                }
                dispatch(setAppInitialized({isInitialized: true}));
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
    }

export const logIn = (loginData: LoginDataType): AppThunkType =>
    (dispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        authAPI
            .logIn(loginData)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus({status: 'succeeded'}));
                    dispatch(setLogged({isLogged: true}));
                } else {
                    handleServerAppError(dispatch, response.data.messages);
                }
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
    }

export const logOut = (): AppThunkType =>
    (dispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        authAPI
            .logOut()
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus({status: 'succeeded'}));
                    dispatch(setLogged({isLogged: false}));
                } else {
                    handleServerAppError(dispatch, response.data.messages);
                }
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
    }

