import {v1} from "uuid";
import {
    TasksReducer
} from "./TasksReducer";
import {TaskType} from "../../types/types";

const [todolistId1, todolistId2] = [v1(), v1()];
let tasks: Array<TaskType>;

beforeEach(() => {
    // tasks = {
    //     [todolistId1]: [
    //         {id: '1', title: "HTML&CSS", isDone: true},
    //         {id: '2', title: "JS", isDone: true},
    //         {id: '3', title: "React", isDone: false},
    //         {id: '4', title: "Redux", isDone: false},
    //         {id: '5', title: "Rest API", isDone: false},
    //         {id: '6', title: "GraphQL", isDone: false}
    //     ],
    //     [todolistId2]: [
    //         {id: '1', title: "Milk", isDone: true},
    //         {id: '2', title: "Bread", isDone: true},
    //         {id: '3', title: "Chips", isDone: false}
    //     ]
    // }
});

test.skip('task 3 should be removed from todolist 1', () => {
    // let newTasks = TasksReducer(tasks, removeTask(todolistId1, '3'));
    //
    // expect(newTasks[todolistId1].length).toBe(5);
    // expect(newTasks[todolistId2].length).toBe(3);
    // expect(newTasks[todolistId1].every(t => t.id !== '3')).toBeTruthy();
});

test.skip('new task should be added', () => {
    // const newTaskTitle = 'Butter';
    // let newTasks = TasksReducer(tasks, addTask(todolistId2, newTaskTitle));
    //
    // expect(newTasks[todolistId2].length).toBe(4);
    // expect(newTasks[todolistId2][0].title).toBe(newTaskTitle);
    // expect(newTasks[todolistId2][0].isDone).toBe(false);
});

test.skip('task title should change', () => {
    // const newTaskTitle = 'Beer';
    // let newTasks = TasksReducer(tasks, changeTaskTitle(todolistId2, '1', newTaskTitle));
    //
    // expect(newTasks[todolistId2].length).toBe(3);
    // expect(newTasks[todolistId2][0].title).toBe(newTaskTitle);
    // expect(newTasks[todolistId2][0].isDone).toBe(true);
});

test.skip('task completed status should be set', () => {
    // let newTasks = TasksReducer(tasks, changeTaskStatus(todolistId2, '3', true));
    //
    // expect(newTasks[todolistId2].length).toBe(3);
    // expect(newTasks[todolistId2][2].title).toBe('Chips');
    // expect(newTasks[todolistId2][2].isDone).toBe(true);
});

test.skip('new array should be added when new todolist is added', () => {
    // const action = addTodolistAC("new todolist");
    //
    // const endState = TasksReducer(tasks, action)
    //
    // const keys = Object.keys(endState);
    // const newKey = keys.find(k => k !== todolistId1 && k !== todolistId2);
    // if (!newKey) {
    //     throw Error("new key should be added");
    // }
    //
    // expect(keys.length).toBe(3);
    // expect(endState[newKey]).toEqual([]);
});

test.skip('property with todolistId should be deleted', () => {
    // const action = removeTodolistAC(todolistId2);
    //
    // const endState = TasksReducer(tasks, action)
    //
    // const keys = Object.keys(endState);
    //
    // expect(keys.length).toBe(1);
    // expect(endState[todolistId2]).not.toBeDefined();
});

