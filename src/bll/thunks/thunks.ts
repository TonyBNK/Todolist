import {todolistsAPI} from "../../api/todolists-api";
import {ResultCodes, TodolistType} from "../../types/types";
import {
    handleServerAppError,
    handleServerNetworkError
} from "../../utils/utils";
import {setAppStatus} from "../reducers/AppReducer";
import {setTodolists,} from "../reducers/TodolistsReducer";
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
