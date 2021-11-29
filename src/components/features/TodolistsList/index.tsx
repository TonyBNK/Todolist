import {
    asyncActions as todolistsAsyncActions,
    todolistsSlice
} from "../../../redux/reducers/TodolistsReducer";
import {asyncActions as tasksAsyncActions} from "../../../redux/reducers/TasksReducer";
import { TodolistsList } from "./TodolistsList";


const todolistsActions = {
    ...todolistsAsyncActions,
    ...todolistsSlice.actions
}

const tasksActions = {
    ...tasksAsyncActions
}

export {
    todolistsActions,
    tasksActions,
    TodolistsList
}
