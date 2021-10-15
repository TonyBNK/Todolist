import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistsReducer} from "./reducers/TodolistsReducer";
import {TasksReducer} from "./reducers/TasksReducer";
import thunkMiddleware from 'redux-thunk';
import {AppReducer} from "./reducers/AppReducer";
import {AuthReducer} from "./reducers/AuthReducer";


export const rootReducer = combineReducers({
    app: AppReducer,
    auth: AuthReducer,
    todolists: TodolistsReducer,
    tasks: TasksReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));