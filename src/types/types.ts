import {
    addTask,
    addTodolist, changeTaskStatus,
    changeTaskTitle,
    changeTodolistFilter,
    changeTodolistTitle, getAllTasks, getAllTodolists,
    removeTask,
    removeTodolist
} from "../bll/action-creators/actionCreators";

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
    | ReturnType<typeof changeTodolistTitle>
    | ReturnType<typeof changeTodolistFilter>;

export type TaskActionType =
    ReturnType<typeof getAllTasks>
    | ReturnType<typeof removeTask>
    | ReturnType<typeof addTask>
    | ReturnType<typeof changeTaskTitle>
    | ReturnType<typeof changeTaskStatus>
    | ReturnType<typeof addTodolist>
    | ReturnType<typeof removeTodolist>;

// export type TodolistsStateType = {
//     todolists: Array<TodolistType>
// }
//
// export type TodolistsDispatchType = {
//     addTodolist: (todolistTitle: string) => void,
//     removeTodolist: (todolistId: string) => void,
//     changeTodolistTitle: (todolistId: string, newTitle: string) => void,
//     changeFilter: (todolistId: string, filter: FilterType) => void
// }

// Thunk Creators Types
export type GetAllTodolistsType = () => (dispatch: (action: TodolistActionType) => void) => void
export type CreateTodolistType = (title: string) => (dispatch: (action: TodolistActionType) => void) => void
export type UpdateTodolistType = (id: string, title: string) => (dispatch: (action: TodolistActionType) => void) => void
export type DeleteTodolistType = (id: string) => (dispatch: (action: TodolistActionType) => void) => void

export type GetAllTasksType = (todoListId: string) => (dispatch: (action: TaskActionType) => void) => void
export type CreateTaskType = (taskModel: TaskType) => (dispatch: (action: TaskActionType) => void) => void
export type UpdateTaskTitleType = (taskModel: TaskType, newTitle: string) => (dispatch: (action: TaskActionType) => void) => void
export type DeleteTaskType = (taskModel: TaskType) => (dispatch: (action: TaskActionType) => void) => void
