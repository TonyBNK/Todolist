import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";


type removeTodolistACType = ReturnType<typeof removeTodolistAC>;
type addTodolistACType = ReturnType<typeof addTodolistAC>;
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
type changeFilterACType = ReturnType<typeof changeTodolistFilterAC>;

type todolistsActionType =
    removeTodolistACType
    | addTodolistACType
    | changeTodolistTitleACType
    | changeFilterACType;

export const removeTodolistAC = (todolistId: string) => ({
    type: 'REMOVE-TODOLIST',
    todolistId
} as const);

export const addTodolistAC = (todolistTitle: string) => ({
    type: 'ADD-TODOLIST',
    todolistTitle
} as const);

export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    newTitle
} as const);

export const changeTodolistFilterAC = (filter: FilterType, todolistId: string) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId,
    filter
} as const);


export const TodolistsReducer = (state: Array<TodolistType>, action: todolistsActionType):
    Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId);
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {
                id: v1(),
                title: action.todolistTitle,
                filter: 'All'
            };
            return [
                ...state,
                newTodolist
            ];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => {
                return tl.id === action.todolistId
                    ? {...tl, title: action.newTitle}
                    : tl
            });
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl =>
                tl.id === action.todolistId
                    ? {...tl, filter: action.filter}
                    : tl
            );
        default:
            return state;
    }
}