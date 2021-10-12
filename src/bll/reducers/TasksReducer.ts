import {TaskActionType, TaskStatuses, TaskType} from "../../types/types";


const initialState: Array<TaskType> = [];

export const TasksReducer = (state = initialState, action: TaskActionType):
    Array<TaskType> => {
    switch (action.type) {
        case "GET-ALL-TASKS":
            return [
                ...state,
                ...action.tasks
            ];
        case "ADD-TASK":
            return [
                {
                    ...action.taskModel
                },
                ...state
            ];
        case "CHANGE-TASK":
            return state.map(task =>
                task.id === action.taskModel.id
                    ? {...action.taskModel}
                    : task
            );
        case "REMOVE-TASK":
            return state.filter(task => task.id !== action.id);
        default:
            return state;
    }
}