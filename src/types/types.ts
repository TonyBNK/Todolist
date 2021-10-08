import {
    addTask,
    addTodolist,
    changeTask,
    changeTodolistTitle, getAllTasks, getAllTodolists,
    removeTask,
    removeTodolist
} from "../bll/action-creators/actionCreators";
import {Dispatch} from "redux";


export type Nullable<T> = T | null;

export type FilterType = 'All' | 'Active' | 'Completed';

export type TodolistType = {
    id: string
    addedDate: Date
    order: number
    title: string
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
    resultCode: number
}

// Actions types
export type TodolistActionType =
    ReturnType<typeof getAllTodolists>
    | ReturnType<typeof removeTodolist>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof changeTodolistTitle>;

export type TaskActionType =
    ReturnType<typeof getAllTasks>
    | ReturnType<typeof removeTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof changeTask>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof removeTodolist>;

// Thunk Creators Types
export type GetAllTodolistsType = () => (dispatch: Dispatch<TodolistActionType>) => void
export type CreateTodolistType = (title: string) => (dispatch: Dispatch<TodolistActionType>) => void
export type UpdateTodolistType = (id: string, newTitle: string) => (dispatch: Dispatch<TodolistActionType>) => void
export type DeleteTodolistType = (id: string) => (dispatch: Dispatch<TodolistActionType>) => void

export type GetAllTasksType = (todoListId: string) => (dispatch: Dispatch<TaskActionType>) => void
export type CreateTaskType = (title: string, todoListId: string) => (dispatch: Dispatch<TaskActionType>) => void
export type UpdateTaskType = (taskModel: TaskType, payload: TaskType) => (dispatch: Dispatch<TaskActionType>) => void
export type DeleteTaskType = (id: string, todoListId: string) => (dispatch: Dispatch<TaskActionType>) => void
