import {rootReducer, store} from "../bll/store";


// Common types
export type Nullable<T> = T | null;

export type FilterType = 'All' | 'Active' | 'Completed';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export enum ResultCodes {
    Success,
    Error
}

export type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export type FieldErrorType = {
    field: string
    error: string
}
export type ResponseType<T = {}> = { // T = {item: TaskType} | {item: TodolistType}
    data: T
    messages: Array<string>
    fieldsErrors?: Array<FieldErrorType>
    resultCode: ResultCodes
}
export type ThunkAPIConfigType = {
    dispatch?: undefined
    state?: undefined
    extra?: undefined
    rejectValue: {
        fieldsErrors?: Array<FieldErrorType>
        messages: Array<string>
    }
}

// Root Type
export type RootStateType = ReturnType<typeof rootReducer>;
export type RootDispatchType = typeof store.dispatch;
export type AppDispatchType = typeof store.dispatch;

// App, Auth, Login types
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

// Todolist types
export type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
} & {
    filter: FilterType
    entityStatus: RequestStatusType
}
export type GetTodolistsType = Array<TodolistType>;

// Task types
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
export type GetTasksResponseType = {
    items: Array<TaskType>,
    totalCount: number,
    error: Nullable<string>
}
export type GetTasksResolved = {
    tasks: Array<TaskType>,
    todoListId: string
}
export type CreateTaskResolved = {
    taskModel: TaskType
}
export type UpdateTaskResolved = CreateTaskResolved;
export type DeleteTaskResolved = {
    id: string
    todoListId: string
}
export type LogInResolved = AuthStateType;
export type LogOutResolved = AuthStateType;
