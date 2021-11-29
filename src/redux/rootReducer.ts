import {combineReducers} from "redux";
import {AppReducer} from "./reducers/AppReducer";
import {AuthReducer} from "./reducers/AuthReducer";
import {TodolistsReducer} from "./reducers/TodolistsReducer";
import {TasksReducer} from "./reducers/TasksReducer";


export const rootReducer = combineReducers({
    app: AppReducer,
    auth: AuthReducer,
    todolists: TodolistsReducer,
    tasks: TasksReducer
});
