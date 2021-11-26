import {createAction} from "@reduxjs/toolkit";
import {RequestStatusType} from "../../types/types";


const changeTodolistStatus = createAction<{ id: string, entityStatus: RequestStatusType }>('todolists/changeTodolistStatus');
const clearTodolistsData = createAction('todolists/clearTodolistsData');

export const todolistsActions = {
    changeTodolistStatus,
    clearTodolistsData
}
