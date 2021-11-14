import {RootStateType, TodolistType} from "../../types/types";


export const selectTodolists = (state: RootStateType): Array<TodolistType> => state.todolists
