import {
    GetTodolistsType,
    RequestStatusType,
    TaskType,
    TodolistType
} from "../../types/types";


export const setTodolists = (todolists: GetTodolistsType) => ({
    type: 'SET-TODOLISTS',
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

export const changeTodolistStatus = (id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-STATUS',
    id,
    entityStatus
} as const);

export const removeTodolist = (id: string) => ({
    type: 'REMOVE-TODOLIST',
    id
} as const);

export const setTasks = (todolistId: string, tasks: Array<TaskType>) => ({
    type: 'SET-TASKS',
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

export const removeTask = (id: string, todoListId: string) => ({
    type: "REMOVE-TASK",
    id,
    todoListId
} as const);

export const setAppStatus = (status: RequestStatusType) => ({
    type: "SET-APP-STATUS",
    status
} as const);

export const setAppError = (error: string | null) => ({
    type: "SET-APP-ERROR",
    error
} as const);

export const setAppInitialized = (isInitialized: boolean) => ({
    type: "SET-APP-INITIALIZED",
    isInitialized
} as const);

export const setLogged = (isLoggedIn: boolean) => ({
    type: "SET-LOGGED",
    isLoggedIn
} as const);