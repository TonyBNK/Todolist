import {v1} from "uuid";
import {
    FilterType,
    GetTodolistsType,
    TaskStatuses,
    TaskType
} from "../../types/types";


export const getAllTodolists = (todolists: GetTodolistsType) => ({
    type: 'GET-ALL-TODOLISTS',
    todolists
} as const);

export const addTodolist = (title: string) => ({
    type: 'ADD-TODOLIST',
    title,
    id: v1()
} as const);

export const changeTodolistTitle = (id: string, newTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    id,
    newTitle
} as const);

export const changeTodolistFilter = (id: string, filter: FilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const);

export const removeTodolist = (id: string) => ({
    type: 'REMOVE-TODOLIST',
    id
} as const);

export const getAllTasks = () => ({
    type: 'GET-ALL-TASKS'
} as const);

export const addTask = (taskModel: TaskType) => ({
    type: 'ADD-TASK',
    ...taskModel
} as const);

export const changeTaskTitle = (taskModel: TaskType, newTitle: string) => ({
    type: 'CHANGE-TASK-TITLE',
    ...taskModel,
    newTitle
} as const);

export const changeTaskStatus = (taskModel: TaskType, newStatus: TaskStatuses) => ({
    type: 'CHANGE-TASK-STATUS',
    ...taskModel,
    newStatus
} as const);

export const removeTask = (id: string) => ({
    type: "REMOVE-TASK",
    id
} as const);