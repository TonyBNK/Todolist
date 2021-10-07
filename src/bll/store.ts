import {combineReducers, createStore} from "redux";
import {TodolistsReducer} from "./reducers/TodolistsReducer";
import {TasksReducer} from "./reducers/TasksReducer";


const rootReducer = combineReducers({
    todolists: TodolistsReducer,
    tasks: TasksReducer
})

export type RootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);


// @ts-ignore
window.store = store;