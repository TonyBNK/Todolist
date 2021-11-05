import {todolistsAPI} from "../../api/todolists-api";
import {ResultCodes, TodolistType} from "../../types/types";
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/utils";
import {setAppStatus} from "../reducers/AppReducer";
import {
    addTodolist, changeTodolist,
    changeTodolistStatus, removeTodolist, setTodolists,
} from "../reducers/TodolistsReducer";
import {getTasks} from "../reducers/TasksReducer";
import {Dispatch} from "redux";


const {Success} = ResultCodes;

export const getTodolists = () =>
    (dispatch: Dispatch<any>) => {
        dispatch(setAppStatus({status: 'loading'}));
        todolistsAPI.getTodolists()
            .then(response => {
                dispatch(setAppStatus({status: 'succeeded'}));
                dispatch(setTodolists({todolists: response.data}));
                return response.data;
            })
            .then((todolists) => {
                todolists.forEach(tl => {
                    dispatch(getTasks(tl.id));
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
