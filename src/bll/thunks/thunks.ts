import {authAPI, todolistsAPI} from "../../api/todolists-api";
import {
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
    changeTodolist, changeTodolistStatus, clearTodolistsData, removeTodolist,
    setTodolists
} from "../reducers/TodolistsReducer";
import {
    addTask,
    changeTask, getTasks,
    removeTask
} from "../reducers/TasksReducer";
import {Dispatch} from "redux";


const {Success} = ResultCodes;

export const setAppInitialize = () =>
    (dispatch: Dispatch) => {
        authAPI
            .me()
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
            })
            .finally(() => {
                dispatch(setAppInitialized({isInitialized: true}));
            });
    }
export const logIn = (loginData: LoginDataType) =>
    (dispatch: Dispatch) => {
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
export const logOut = () =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        authAPI
            .logOut()
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus({status: 'succeeded'}));
                    dispatch(setLogged({isLogged: false}));
                    dispatch(clearTodolistsData());
                } else {
                    handleServerAppError(dispatch, response.data.messages);
                }
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
    }

export const getTodolists = () =>
    (dispatch: Dispatch<any>) => {
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI
            .getTodolists()
            .then(response => {
                dispatch(setAppStatus({status: 'succeeded'}));
                dispatch(setTodolists({todolists: response.data}));
                return response.data;
            })
            .then((todolists) => {
                todolists.forEach(todo => {
                    dispatch(getTasks(todo.id));
                })
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
    }
export const createTodolist = (title: string) =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI
            .createTodolist(title)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus({status: 'succeeded'}));
                    dispatch(addTodolist({todolist: response.data.data.item}));
                } else {
                    handleServerAppError(dispatch, response.data.messages);
                }
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
    }
export const updateTodolist = (payload: TodolistType) =>
    (dispatch: Dispatch) => {
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI
            .updateTodolist(payload)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setAppStatus({status: 'succeeded'}));
                    dispatch(changeTodolist({todolist: payload}));
                } else {
                    handleServerAppError(dispatch, response.data.messages);
                }
            })
            .catch(error => {
                handleServerNetworkError(dispatch, error.message);
            });
    }
export const deleteTodolist = (id: string) =>
    (dispatch: Dispatch) => {
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

// export const getTasks = (todoListId: string) =>
//     (dispatch: Dispatch) => {
//         dispatch(setAppStatus({status: 'loading'}));
//         todolistsAPI
//             .tasksAPI
//             .getTasks(todoListId)
//             .then(response => {
//                 dispatch(setAppStatus({status: 'succeeded'}));
//                 dispatch(setTasks({tasks: response.data.items, todoListId}));
//             })
//             .catch(error => {
//                 handleServerNetworkError(dispatch, error.message);
//             });
//     }
export const createTask = (title: string, todoListId: string) =>
    (dispatch: Dispatch) => {
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
export const updateTask = (payload: TaskType) =>
    (dispatch: Dispatch) => {
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
export const deleteTask = (id: string, todoListId: string) =>
    (dispatch: Dispatch) => {
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
