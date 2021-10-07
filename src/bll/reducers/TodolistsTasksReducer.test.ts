import {TodolistsReducer} from "./TodolistsReducer";
import {TasksReducer} from "./TasksReducer";
import {TaskType, TodolistType} from "../../types/types";
import {addTodolist} from "../action-creators/actionCreators";

test.skip('ids should be equals', () => {
    // const startTasksState: Array<TaskType> = [];
    // const startTodolistsState: Array<TodolistType> = [];
    //
    // const action = addTodolist("new todolist");
    //
    // const endTasksState = TasksReducer(startTasksState, action)
    // const endTodolistsState = TodolistsReducer(startTodolistsState, action)
    //
    // const keys = Object.keys(endTasksState);
    // const idFromTasks = keys[0];
    // const idFromTodolists = endTodolistsState[0].id;
    //
    // expect(idFromTasks).toBe(action.todolistId);
    // expect(idFromTodolists).toBe(action.todolistId);
});
