import {TodolistType} from "../../types/types";
import {
    changeTodolistStatus, createTodolist, deleteTodolist,
    TodolistsReducer, updateTodolist
} from "./TodolistsReducer";


let todolists: Array<TodolistType>;
let newTodolist: TodolistType;

beforeEach(() => {
    todolists = [
        {
            id: "608a4deb-ec8c-4dd9-866d-50a3a5b15316",
            title: "What to play",
            addedDate: new Date("2021-09-27T16:55:44.577"),
            order: -3,
            filter: "All",
            entityStatus: "idle"
        },
        {
            id: "4d51be01-6bf3-4432-be4f-77ac13dfc31a",
            title: "What to buy",
            addedDate: new Date("2021-09-27T13:38:39.897"),
            order: -2,
            filter: "All",
            entityStatus: "idle"
        },
        {
            id: "404caf11-450d-4ac3-9375-61deeafe63b0",
            title: "What to learn",
            addedDate: new Date("2021-09-27T12:17:57.41"),
            order: -1,
            filter: "All",
            entityStatus: "idle"
        }
    ];
    newTodolist = {
        id: "asdfasdgasdf",
        title: "What to listen",
        addedDate: new Date("2021-09-27T12:17:57.41"),
        order: 0,
        filter: "All",
        entityStatus: "idle"
    }
});

test('first todolist should be removed', () => {
    const newTodolists = TodolistsReducer(todolists, deleteTodolist.fulfilled({
            id: todolists[0].id
        },
        'requestId',
        todolists[0].id
    ));

    expect(newTodolists.length).toBe(2);
    expect(newTodolists[0].id).toBe(todolists[1].id);
    expect(newTodolists[0].title).toBe('What to buy');
});

test('new todolist should be added', () => {
    const newTodolists = TodolistsReducer(todolists, createTodolist.fulfilled({
            todolist: newTodolist
        },
        'requestId',
        newTodolist.title
    ));

    expect(newTodolists.length).toBe(4);
    expect(newTodolists[0].title).toBe(newTodolist.title);
});

test('todolist title should be changed', () => {
    const newTitle = 'Something new';

    const newTodolists = TodolistsReducer(todolists, updateTodolist.fulfilled({
            todolist: {
                ...todolists[0],
                title: newTitle
            }
        },
        'requestId',
        {
            ...todolists[0],
            title: newTitle
        }
    ));

    expect(newTodolists.length).toBe(3);
    expect(newTodolists[0].title).toBe(newTitle);
});

test('todolist filter should be changed', () => {
    const newFilter = 'Active';

    const newTodolists = TodolistsReducer(todolists, updateTodolist.fulfilled({
            todolist: {
                ...todolists[0],
                filter: newFilter
            }
        },
        'requestId',
        {
            ...todolists[0],
            filter: newFilter
        }
    ));

    expect(newTodolists.length).toBe(3);
    expect(newTodolists[0].filter).toBe(newFilter);
});

test('todolist status should be changed', () => {
    const newStatus = 'loading';

    const newTodolists = TodolistsReducer(todolists, changeTodolistStatus({
        id: todolists[0].id,
        entityStatus: 'loading'
    }));

    expect(newTodolists.length).toBe(3);
    expect(newTodolists[0].entityStatus).toBe(newStatus);
});