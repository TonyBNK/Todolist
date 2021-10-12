import {
    FilterType,
    GetTodolistsType,
    RequestStatusType,
    TaskType,
    TodolistType
} from "../../types/types";


export const getAllTodolists = (todolists: GetTodolistsType) => ({
    type: 'GET-ALL-TODOLISTS',
    todolists
} as const);

export const addTodolist = (todolist: TodolistType) => ({
    type: 'ADD-TODOLIST',
    todolist
} as const);

export const changeTodolist = (todolist: TodolistType) => ({
    type: 'CHANGE-TODOLIST',
    todolist,
} as const);

export const removeTodolist = (id: string) => ({
    type: 'REMOVE-TODOLIST',
    id
} as const);

export const getAllTasks = (todolistId: string, tasks: Array<TaskType>) => ({
    type: 'GET-ALL-TASKS',
    todolistId,
    tasks
} as const);

export const addTask = (taskModel: TaskType) => ({
    type: 'ADD-TASK',
    taskModel
} as const);

export const changeTask = (taskModel: TaskType) => ({
    type: 'CHANGE-TASK',
    taskModel
} as const);

export const removeTask = (id: string) => ({
    type: "REMOVE-TASK",
    id
} as const);

export const setRequestStatus = (status: RequestStatusType) => ({
    type: "APP/SET-REQUEST-STATUS",
    status
} as const);

export const setRequestError = (error: string | null) => ({
    type: "APP/SET-REQUEST-ERROR",
    error
} as const);