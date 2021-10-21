import {
    addTask,
    addTodolist,
    changeTask,
    changeTodolist,
    setTasks,
    setTodolists,
    removeTask,
    removeTodolist,
    changeTodolistStatus
} from "../bll/actions/actions";
import {ThunkAction} from "redux-thunk";
import {rootReducer} from "../bll/store";
import {setLogged} from "../bll/reducers/AuthReducer";
import {
    setAppError,
    setAppInitialized,
    setAppStatus
} from "../bll/reducers/AppReducer";


export type Nullable<T> = T | null;

export type FilterType = 'All' | 'Active' | 'Completed';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type AppRequestType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}

export type AuthStateType = {
    isLogged: boolean
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
} & {
    filter: FilterType
    entityStatus: RequestStatusType
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgently,
    Later
}

export enum ResultCodes {
    Success,
    Error
}

export type TaskType = {
    todoListId: string
    id: string
    title: string
    description: Nullable<string>
    order: number
    status: TaskStatuses
    priority: TaskPriorities
    startDate: Nullable<string>
    deadline: Nullable<string>
    addedDate: Date
}

export type TasksType = {
    [todolistId: string]: Array<TaskType>
}

export type GetTodolistsType = Array<TodolistType>;

export type GetTasksType = {
    items: Array<TaskType>,
    totalCount: number,
    error: Nullable<string>
}

export type ResponseType<T = {}> = { // T = {item: TaskType} | {item: TodolistType}
    data: T
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: ResultCodes
}

// Root State Type
export type RootStateType = ReturnType<typeof rootReducer>;

// Action Creators types
export type TodolistActionType =
    ReturnType<typeof setTodolists>
    | ReturnType<typeof removeTodolist>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof changeTodolist>
    | ReturnType<typeof changeTodolistStatus>;

export type TaskActionType =
    ReturnType<typeof setTodolists>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof removeTodolist>
    | ReturnType<typeof setTasks>
    | ReturnType<typeof removeTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof changeTask>;

export type AppActionType =
    ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setAppInitialized>;

export type AuthActionType = ReturnType<typeof setLogged>;

export type ActionsType = TodolistActionType | TaskActionType | AppActionType | AuthActionType;

// Thunk Creators Types
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, ActionsType>
