import {Provider} from "react-redux";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodolistsReducer} from "../../bll/reducers/TodolistsReducer";
import {TasksReducer} from "../../bll/reducers/TasksReducer";
import {RootStateType, TaskPriorities, TaskStatuses} from "../../types/types";
import {AppReducer} from "../../bll/reducers/AppReducer";
import thunkMiddleware from "redux-thunk";
import {v1} from "uuid";


const rootReducer = combineReducers({
    todolists: TodolistsReducer,
    tasks: TasksReducer,
    app: AppReducer
});

const initialGlobalState: RootStateType = {
    todolists: [
        {
            id: 'todolist1',
            title: 'What to learn',
            filter: 'All',
            entityStatus: 'idle',
            addedDate: new Date(),
            order: 0
        },
        {
            id: 'todolist2',
            title: 'What to buy',
            filter: 'All',
            entityStatus: 'loading',
            addedDate: new Date(),
            order: 0
        },
    ],
    tasks: {
        'todolist1': [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                todoListId: 'todolist1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: new Date(),
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.New,
                todoListId: 'todolist1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: new Date(),
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
        'todolist2': [
            {
                id: v1(),
                title: 'Donut',
                status: TaskStatuses.New,
                todoListId: 'todolist2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: new Date(),
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: 'Beer',
                status: TaskStatuses.Completed,
                todoListId: 'todolist2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: new Date(),
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    },
    app: {
        status: 'idle',
        error: null
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware));

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}