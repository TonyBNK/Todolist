import {
    GetTodolistsType,
    TodolistActionType,
    TodolistType
} from "../../types/types";


const initialState: GetTodolistsType = [];

export const TodolistsReducer = (state = initialState, action: TodolistActionType):
    GetTodolistsType => {
    switch (action.type) {
        case "GET-ALL-TODOLISTS":
            return [
                ...action.todolists
            ];
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {
                id: action.id,
                title: action.title,
                addedDate: new Date(),
                order: 0
            };
            return [
                newTodolist,
                ...state,
            ];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => {
                return tl.id === action.id
                    ? {...tl, title: action.newTitle}
                    : tl
            });
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl =>
                tl.id === action.id
                    ? {...tl, filter: action.filter}
                    : tl
            );
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        default:
            return state;
    }
}