import {combineReducers} from "redux";
import {TodolistsReducer} from "./reducers/TodolistsReducer";
import {TasksReducer} from "./reducers/TasksReducer";
import thunkMiddleware from 'redux-thunk';
import {AppReducer} from "./reducers/AppReducer";
import {AuthReducer} from "./reducers/AuthReducer";
import {configureStore} from "@reduxjs/toolkit";


export const rootReducer = combineReducers({
    app: AppReducer,
    auth: AuthReducer,
    todolists: TodolistsReducer,
    tasks: TasksReducer
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
});