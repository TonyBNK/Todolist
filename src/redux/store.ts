import {
    ActionCreatorsMapObject,
    bindActionCreators,
    combineReducers
} from "redux";
import {TodolistsReducer} from "./reducers/TodolistsReducer";
import {TasksReducer} from "./reducers/TasksReducer";
import thunkMiddleware from 'redux-thunk';
import {AppReducer} from "./reducers/AppReducer";
import {AuthReducer} from "./reducers/AuthReducer";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";
import {useMemo} from "react";


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

export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
    const dispatch = useDispatch();

    return useMemo(() => {
        return  bindActionCreators(actions, dispatch);
    }, []);
}
