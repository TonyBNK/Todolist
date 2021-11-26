import {store} from "../redux/store";
import {rootReducer} from "../redux/rootReducer";


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
export type SetAppInitializeResolved = {
    isInitialized: boolean
};
export type LogInResolved = AuthStateType;

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
export type GetTodolistsResolved = {
    todolists: Array<TodolistType>
}
export type CreateTodolistResolved = {
    todolist: TodolistType
}
export type UpdateTodolistResolved = {
    todolist: TodolistType
}
export type DeleteTodolistResolved = {
    id: string
}

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
export type UpdateTaskResolved = {
    taskModel: TaskType
}
export type DeleteTaskResolved = {
    id: string
    todoListId: string
}

//AddItemForm types
export type AddItemFormSubmitHelperType = {
    setError: (error: string) => void,
    setTitle: (title: string) => void
}
