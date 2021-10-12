import {
    addTask,
    addTodolist,
    changeTask,
    changeTodolist,
    getAllTasks,
    getAllTodolists,
    removeTask,
    removeTodolist, setRequestError, setRequestStatus
} from "../bll/actions/actions";
import {ThunkAction} from "redux-thunk";
import {rootReducer} from "../bll/store";


export type Nullable<T> = T | null;

export type FilterType = 'All' | 'Active' | 'Completed';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type AppRequestType = {
    status: RequestStatusType
    error: string | null
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

export type AllTasksType = {
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
    ReturnType<typeof getAllTodolists>
    | ReturnType<typeof removeTodolist>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof changeTodolist>;

export type TaskActionType =
    ReturnType<typeof getAllTasks>
    | ReturnType<typeof removeTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof changeTask>;

export type AppActionType =
    ReturnType<typeof setRequestStatus>
    | ReturnType<typeof setRequestError>;

export type ActionsType = TodolistActionType | TaskActionType | AppActionType;

// Thunk Creators Types
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, ActionsType>
