import {TasksObjectType} from "../App";
import {v1} from "uuid";
import {removeTaskAC, TasksReducer} from "./TasksReducer";

const [todolistId1, todolistId2] = [v1(), v1()];
let tasks: TasksObjectType;

beforeEach(() => {


   tasks = {
       [todolistId1]: [
           {id: '1', title: "HTML&CSS", isDone: true},
           {id: '2', title: "JS", isDone: true},
           {id: '3', title: "React", isDone: false},
           {id: '4', title: "Redux", isDone: false},
           {id: '5', title: "Rest API", isDone: false},
           {id: '6', title: "GraphQL", isDone: false}
       ],
       [todolistId2]: [
           {id: '1', title: "Milk", isDone: true},
           {id: '2', title: "Bread", isDone: true},
           {id: '3', title: "Chips", isDone: false}
       ]
   }
});

test('task 3 should be removed from todolist 1', () => {
    let newTasks = TasksReducer(tasks, removeTaskAC('3', todolistId1));

    expect(newTasks[todolistId1].length).toBe(5);
    expect(newTasks[todolistId2].length).toBe(3);
});

test('task 2 should be removed from todolist 2', () => {
    const newTasks = TasksReducer(tasks, removeTaskAC('2',todolistId2));

    expect(newTasks[todolistId1].length).toBe(6);
    expect(newTasks[todolistId2].length).toBe(2);
});