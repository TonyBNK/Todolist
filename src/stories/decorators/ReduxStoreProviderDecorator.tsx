import {Provider} from "react-redux";
import {RootStateType} from "../../redux/store";
import {combineReducers, createStore} from "redux";
import {
    todolistId1,
    todolistId2,
    TodolistsReducer
} from "../../reducers/TodolistsReducer";
import {TasksReducer} from "../../reducers/TasksReducer";
import {v1} from "uuid";


const rootReducer = combineReducers({
    todolists: TodolistsReducer,
    tasks: TasksReducer
});

const initialGlobalState = {
    todolists: [
        {id: todolistId1, title: "What to learn", filter: 'All'},
        {id: todolistId2, title: "What to buy", filter: 'All'},
    ],
    tasks: {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Chips", isDone: false}
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as RootStateType);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}