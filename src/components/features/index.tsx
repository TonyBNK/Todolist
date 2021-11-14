import {
    asyncActions as todolistAsyncActions,
    todolistsSlice
} from "../../redux/reducers/TodolistsReducer";
import {asyncActions as tasksAsyncActions} from "../../redux/reducers/TasksReducer";


const todolistsActions = {
    ...todolistAsyncActions,
    ...todolistsSlice.actions
}

const tasksActions = {
    ...tasksAsyncActions
}

export {
    todolistsActions,
    tasksActions
}
