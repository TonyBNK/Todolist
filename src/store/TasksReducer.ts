import {TasksObjectType} from "../App";

type removeTaskACType = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (taskId: string, todolistId: string) => ({
    type: "REMOVE-TASK",
    taskId,
    todolistId
} as const);

export const TasksReducer = (state: TasksObjectType, action: removeTaskACType): TasksObjectType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t =>
                    t.id !== action.taskId
                )
            };
        default:
            return state;
    }
}