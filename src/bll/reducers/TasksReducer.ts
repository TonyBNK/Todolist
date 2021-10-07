import {TaskActionType, TaskType} from "../../types/types";


const initialState: Array<TaskType> = [];

export const TasksReducer = (state = initialState, action: TaskActionType):
    Array<TaskType> => {
    switch (action.type) {
        case "GET-ALL-TASKS":
            return [
                ...state
            ];
        case "ADD-TASK":
            return [
                ...state,
                {
                    ...action
                }
            ]
        case "CHANGE-TASK-TITLE":
            return [
                ...state,
                {
                    ...action,
                    title: action.newTitle
                }
            ];
        case "CHANGE-TASK-STATUS":
            return [
                ...state,
                {
                    ...action,
                    status: action.newStatus
                }
            ];
        case "REMOVE-TASK":
            return state.filter(task => task.id !== action.id);
        default:
            return state;
    }
}