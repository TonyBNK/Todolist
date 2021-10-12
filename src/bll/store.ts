import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistsReducer} from "./reducers/TodolistsReducer";
import {TasksReducer} from "./reducers/TasksReducer";
import thunkMiddleware from 'redux-thunk';


export const rootReducer = combineReducers({
    todolists: TodolistsReducer,
    tasks: TasksReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));