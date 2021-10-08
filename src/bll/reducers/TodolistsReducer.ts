import {GetTodolistsType, TodolistActionType,} from "../../types/types";


const initialState: GetTodolistsType = [];

export const TodolistsReducer = (state = initialState, action: TodolistActionType):
    GetTodolistsType => {
    switch (action.type) {
        case "GET-ALL-TODOLISTS":
            return [
                ...action.todolists
            ];
        case 'ADD-TODOLIST':
            return [
                ...state,
                {...action.todolist},
            ];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => {
                return tl.id === action.id
                    ? {...tl, title: action.newTitle}
                    : tl
            });
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        default:
            return state;
    }
}