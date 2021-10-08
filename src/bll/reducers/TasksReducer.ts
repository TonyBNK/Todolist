import {TaskActionType, TaskType} from "../../types/types";


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
            )
        // case "CHANGE-TASK-STATUS":
        //     return {
        //         ...state,
        //         [action.taskModel.todoListId]: [
        //             ...state[action.taskModel.todoListId],
        //             {
        //                 ...action.taskModel,
        //                 status: action.newStatus
        //             }
        //         ]
        //     }
        case "REMOVE-TASK":
            return state.filter(tl => tl.id !== action.id);
        default:
            return state;
    }
}