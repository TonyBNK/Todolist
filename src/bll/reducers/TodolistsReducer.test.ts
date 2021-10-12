import {TodolistType} from "../../types/types";
import {
    addTodolist,
    changeTodolist,
    removeTodolist
} from "../actions/actions";
import {TodolistsReducer} from "./TodolistsReducer";


let todolists: Array<TodolistType>;
let newTodolist: TodolistType;

beforeEach(() => {
    todolists = [
        {
            id: "608a4deb-ec8c-4dd9-866d-50a3a5b15316",
            title: "What to play",
            addedDate: new Date("2021-09-27T16:55:44.577"),
            order: -3
        },
        {
            id: "4d51be01-6bf3-4432-be4f-77ac13dfc31a",
            title: "What to buy",
            addedDate: new Date("2021-09-27T13:38:39.897"),
            order: -2
        },
        {
            id: "404caf11-450d-4ac3-9375-61deeafe63b0",
            title: "What to learn",
            addedDate: new Date("2021-09-27T12:17:57.41"),
            order: -1
        }
    ];
    newTodolist = {
        id: "asdfasdgasdf",
        title: "What to listen",
        addedDate: new Date("2021-09-27T12:17:57.41"),
        order: 0
    }
});

test('first todolist should be removed', () => {
    const newTodolists = TodolistsReducer(todolists, removeTodolist(todolists[0].id));

    expect(newTodolists.length).toBe(2);
    expect(newTodolists[0].id).toBe(todolists[1].id);
    expect(newTodolists[0].title).toBe('What to buy');
});

test('new todolist should be added', () => {
    const newTodolists = TodolistsReducer(todolists, addTodolist(newTodolist));

    expect(newTodolists.length).toBe(4);
    expect(newTodolists[0].title).toBe(newTodolist.title);
});

test('todolist title should be changed', () => {
    const newTitle = 'Something new';

    const newTodolists = TodolistsReducer(todolists, changeTodolist({
        ...todolists[0],
        title: newTitle
    }));

    expect(newTodolists.length).toBe(3);
    expect(newTodolists[0].title).toBe(newTitle);
});