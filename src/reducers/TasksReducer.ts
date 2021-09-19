import {v1} from "uuid";
import {
    addTodolistACType,
    removeTodolistACType,
    todolistId1, todolistId2
} from "./TodolistsReducer";

type removeTaskACType = ReturnType<typeof removeTaskAC>;
type addTaskACType = ReturnType<typeof addTaskAC>;
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>;
type setCompletedACType = ReturnType<typeof setCompletedAC>;

type TasksReducerActionsType =
    removeTaskACType
    | addTaskACType
    | changeTaskTitleACType
    | setCompletedACType
    | addTodolistACType
    | removeTodolistACType;

export const removeTaskAC = (todolistId: string, taskId: string) => ({
    type: "REMOVE-TASK",
    taskId,
    todolistId
} as const);

export const addTaskAC = (todolistId: string, taskTitle: string) => ({
    type: 'ADD-TASK',
    taskTitle,
    todolistId
} as const);

export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string) => ({
    type: 'CHANGE-TASK-TITLE',
    todolistId,
    taskId,
    newTitle
} as const);

export const setCompletedAC = (todolistId: string, taskId: string, isDone: boolean) => ({
    type: 'SET-TASK-COMPLETED',
    todolistId,
    taskId,
    isDone
} as const);

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

const initialState: TasksType = {
    [todolistId1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ],
    [todolistId2]: [
        {id: v1(), title: "Milk", isDone: true},
        {id: v1(), title: "Bread", isDone: true},
        {id: v1(), title: "Chips", isDone: false}
    ]
}

export const TasksReducer = (state: TasksType = initialState, action: TasksReducerActionsType):
    TasksType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t =>
                    t.id !== action.taskId
                )
            };
        case "ADD-TASK":
            const newTask = {id: v1(), title: action.taskTitle, isDone: false};
            return {
                ...state,
                [action.todolistId]: [newTask, ...state[action.todolistId],],
            };
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t =>
                    t.id === action.taskId
                        ? {...t, title: action.newTitle}
                        : t
                )
            };
        case "SET-TASK-COMPLETED":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t =>
                    t.id === action.taskId
                        ? {...t, isDone: action.isDone}
                        : t
                )
            };
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            };
        case "REMOVE-TODOLIST":
            const stateCopy = {...state};
            delete stateCopy[action.todolistId];
            return stateCopy;
        default:
            return state;
    }
}