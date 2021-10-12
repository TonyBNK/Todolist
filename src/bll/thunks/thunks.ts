import {todolistsAPI} from "../../api/todolists-api";
import {
    addTask,
    addTodolist,
    changeTask,
    changeTodolist,
    getAllTasks,
    getAllTodolists,
    removeTask,
    removeTodolist, setRequestError, setRequestStatus
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
        dispatch(setRequestStatus('loading'));
        todolistsAPI
            .getTodolists()
            .then(response => {
                dispatch(setRequestStatus('succeeded'));
                dispatch(getAllTodolists(response.data));
            })
            .catch(error => console.log(error));
    }

export const createTodolist = (title: string): AppThunkType =>
    (dispatch) => {
        dispatch(setRequestStatus('loading'));
        todolistsAPI
            .createTodolist(title)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setRequestStatus('succeeded'));
                    dispatch(addTodolist(response.data.data.item));
                } else {
                    dispatch(setRequestStatus('failed'));
                    response.data.messages.length
                        ? dispatch(setRequestError(response.data.messages[0]))
                        : dispatch(setRequestError('Some error occurred'));
                }
            })
            .catch(error => console.log(error));
    }

export const updateTodolist = (payload: TodolistType): AppThunkType =>
    (dispatch) => {
        dispatch(setRequestStatus('loading'));
        todolistsAPI
            .updateTodolist(payload)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setRequestStatus('succeeded'));
                    dispatch(changeTodolist(payload));
                } else {
                    dispatch(setRequestStatus('failed'));
                    response.data.messages.length
                        ? dispatch(setRequestError(response.data.messages[0]))
                        : dispatch(setRequestError('Some error occurred'));
                }
            })
            .catch(error => console.log(error));
    }

export const deleteTodolist = (id: string): AppThunkType =>
    (dispatch) => {
        dispatch(setRequestStatus('loading'));
        todolistsAPI
            .deleteTodolist(id)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setRequestStatus('succeeded'));
                    dispatch(removeTodolist(id));
                } else {
                    dispatch(setRequestStatus('failed'));
                    response.data.messages.length
                        ? dispatch(setRequestError(response.data.messages[0]))
                        : dispatch(setRequestError('Some error occurred'));
                }
            })
            .catch(error => console.log(error));
    }

export const getTasks = (todoListId: string): AppThunkType =>
    (dispatch) => {
        dispatch(setRequestStatus('loading'));
        todolistsAPI
            .tasksAPI
            .getTasks(todoListId)
            .then(response => {
                dispatch(setRequestStatus('succeeded'));
                dispatch(getAllTasks(todoListId, response.data.items));
            })
            .catch(error => console.log(error));
    }

export const createTask = (title: string, todoListId: string): AppThunkType =>
    (dispatch) => {
        dispatch(setRequestStatus('loading'));
        todolistsAPI
            .tasksAPI
            .createTask(title, todoListId)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setRequestStatus('succeeded'));
                    dispatch(addTask(response.data.data.item));
                } else {
                    dispatch(setRequestStatus('failed'));
                    response.data.messages.length
                        ? dispatch(setRequestError(response.data.messages[0]))
                        : dispatch(setRequestError('Some error occurred'));
                }
            })
            .catch(error => console.log(error));
    }

export const updateTask = (payload: TaskType): AppThunkType =>
    (dispatch) => {
        dispatch(setRequestStatus('loading'));
        todolistsAPI
            .tasksAPI
            .updateTask(payload)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setRequestStatus('succeeded'));
                    dispatch(changeTask(response.data.data.item));
                } else {
                    dispatch(setRequestStatus('failed'));
                    response.data.messages.length
                        ? dispatch(setRequestError(response.data.messages[0]))
                        : dispatch(setRequestError('Some error occurred'));
                }
            })
            .catch(error => console.log(error));
    }

export const deleteTask = (id: string, todoListId: string): AppThunkType =>
    (dispatch) => {
        dispatch(setRequestStatus('loading'));
        todolistsAPI
            .tasksAPI
            .deleteTask(id, todoListId)
            .then(response => {
                if (response.data.resultCode === Success) {
                    dispatch(setRequestStatus('succeeded'));
                    dispatch(removeTask(id));
                } else {
                    dispatch(setRequestStatus('failed'));
                    response.data.messages.length
                        ? dispatch(setRequestError(response.data.messages[0]))
                        : dispatch(setRequestError('Some error occurred'));
                }
            })
            .catch(error => console.log(error));
    }
