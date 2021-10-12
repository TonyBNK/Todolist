import {TaskActionType, TasksType} from "../../types/types";


const initialState: TasksType = {};

export const TasksReducer = (state = initialState, action: TaskActionType):
    TasksType => {
    switch (action.type) {
        case "SET-TODOLISTS":
            const newState = {...state};
            action.todolists.forEach(tl => newState[tl.id] = []);
            return newState;
        case "ADD-TODOLIST":
            return {
                [action.todolist.id]: [],
                ...state,
            };
        case "REMOVE-TODOLIST":
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        case "SET-TASKS":
            return {
                ...state,
                [action.todolistId]: action.tasks
            };
        case "ADD-TASK":
            return {
                ...state,
                [action.taskModel.todoListId]: [
                    {...action.taskModel},
                    ...state[action.taskModel.todoListId]
                ]
            };
        case "CHANGE-TASK":
            return {
                ...state,
                [action.taskModel.todoListId]: state[action.taskModel.todoListId]
                    .map(task => task.id === action.taskModel.id
                        ? {...action.taskModel}
                        : task
                    )
            };
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todoListId]: state[action.todoListId]
                    .filter(task => task.id !== action.id)
            };
        default:
            return state;
    }
}
