import {
    TodolistsReducer
} from "./TodolistsReducer";
import {v1} from "uuid";
import {TodolistType} from "../../types/types";
import {addTodolist, removeTodolist} from "../action-creators/actionCreators";

const [todolistId1, todolistId2] = [v1(), v1()];
let todolists: Array<TodolistType>;

beforeEach(() => {
    todolists = [
        // {id: todolistId1, title: "What to learn", filter: 'All'},
        // {id: todolistId2, title: "What to buy", filter: 'All'},
    ]
});

test.skip('first todolist should be removed', () => {
    // const newTodolists = TodolistsReducer(todolists, removeTodolist(todolistId1));
    //
    // expect(newTodolists.length).toBe(1);
    // expect(newTodolists[0].id).toBe(todolistId2);
    // expect(newTodolists[0].title).toBe('What to buy');
});

test.skip('second todolist should be removed', () => {
    // const newTodolists = TodolistsReducer(todolists, removeTodolist(todolistId2));
    //
    // expect(newTodolists.length).toBe(1);
    // expect(newTodolists[0].id).toBe(todolistId1);
    // expect(newTodolists[0].title).toBe('What to learn');
});

test.skip('todolist should be added', () => {
    // const todolistTitle = 'What to play';
    //
    // const newTodolists = TodolistsReducer(todolists, addTodolist(todolistTitle));
    //
    // expect(newTodolists.length).toBe(3);
    // expect(newTodolists[0].title).toBe(todolistTitle);
    // expect(newTodolists[0].filter).toBe('All');
});

test.skip('todolist title should be changed', () => {
    // const newTitle = 'What to play';
    //
    // const newTodolists = TodolistsReducer(todolists, changeTodolistTitleAC(todolistId2, newTitle));
    //
    // expect(newTodolists.length).toBe(2);
    // expect(newTodolists[1].title).toBe(newTitle);
    // expect(newTodolists[1].filter).toBe('All');
});

test.skip('todolist filter should be changed', () => {
    // const newFilter: FilterType = 'Completed';
    //
    // const newTodolists = TodolistsReducer(todolists, changeTodolistFilterAC(todolistId1, newFilter));
    //
    // expect(newTodolists.length).toBe(2);
    // expect(newTodolists[0].filter).toBe(newFilter);
    // expect(newTodolists[1].filter).toBe('All');
});