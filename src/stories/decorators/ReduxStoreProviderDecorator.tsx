import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {TodolistsReducer} from "../../bll/reducers/TodolistsReducer";
import {TasksReducer} from "../../bll/reducers/TasksReducer";
import {RootStateType} from "../../types/types";


const rootReducer = combineReducers({
    todolists: TodolistsReducer,
    tasks: TasksReducer
});

const initialGlobalState = {}

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}