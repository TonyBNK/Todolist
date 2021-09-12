import {v1} from "uuid";

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>;
export type addTodolistACType = ReturnType<typeof addTodolistAC>;
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>;
type changeFilterACType = ReturnType<typeof changeTodolistFilterAC>;

export type todolistsActionType =
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
    todolistTitle,
    todolistId: v1()
} as const);

export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    newTitle
} as const);

export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId,
    filter
} as const);

export type FilterType = 'All' | 'Active' | 'Completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TodolistsStateType = {
    todolists: Array<TodolistType>
}

export type TodolistsDispatchType = {
    addTodolist: (todolistTitle: string) => void,
    removeTodolist: (todolistId: string) => void,
    changeTodolistTitle: (todolistId: string, newTitle: string) => void,
    changeFilter: (todolistId: string, filter: FilterType) => void
}

const [todolistId1, todolistId2] = [v1(), v1()];

const initialState: Array<TodolistType> = [
    {id: todolistId1, title: "What to learn", filter: 'All'},
    {id: todolistId2, title: "What to buy", filter: 'All'},
];

export const TodolistsReducer = (state: Array<TodolistType> = initialState, action: todolistsActionType):
    Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todolistId);
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {
                id: action.todolistId,
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