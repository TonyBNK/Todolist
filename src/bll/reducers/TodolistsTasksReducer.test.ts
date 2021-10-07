import {
    addTodolistAC,
    TodolistsReducer,
    TodolistType
} from "./TodolistsReducer";
import {TasksReducer, TasksType} from "./TasksReducer";

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodolistAC("new todolist");

    const endTasksState = TasksReducer(startTasksState, action)
    const endTodolistsState = TodolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});
