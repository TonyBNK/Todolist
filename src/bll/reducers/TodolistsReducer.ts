import {
    GetTodolistsType,
    TodolistActionType,
    TodolistType,
} from "../../types/types";


const initialState: GetTodolistsType = [];

export const TodolistsReducer = (state = initialState, action: TodolistActionType):
    Array<TodolistType> => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: "All"}));
        case 'ADD-TODOLIST':
            return [
                {...action.todolist},
                ...state,
            ];
        case 'CHANGE-TODOLIST':
            return state.map(tl => {
                return tl.id === action.todolist.id
                    ? {...action.todolist}
                    : tl
            });
        case "CHANGE-TODOLIST-STATUS":
            return state.map(tl => {
                return tl.id === action.id
                    ? {...tl, entityStatus: action.entityStatus}
                    : tl
            })
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        default:
            return state;
    }
}