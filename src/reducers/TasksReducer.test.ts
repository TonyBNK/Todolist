import {TasksObjectType} from "../App";
import {v1} from "uuid";
import {
    addTaskAC,
    changeTaskTitleAC,
    removeTaskAC, setCompletedAC,
    TasksReducer
} from "./TasksReducer";

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
    let newTasks = TasksReducer(tasks, removeTaskAC(todolistId1, '3'));

    expect(newTasks[todolistId1].length).toBe(5);
    expect(newTasks[todolistId2].length).toBe(3);
});

test('new task should be added', () => {
    const newTaskTitle = 'Butter';
    let newTasks = TasksReducer(tasks, addTaskAC(todolistId2, newTaskTitle));

    expect(newTasks[todolistId2].length).toBe(4);
    expect(newTasks[todolistId2][3].title).toBe(newTaskTitle);
    expect(newTasks[todolistId2][3].isDone).toBe(false);
});

test('task title should change', () => {
    const newTaskTitle = 'Beer';
    let newTasks = TasksReducer(tasks, changeTaskTitleAC(todolistId2, '1', newTaskTitle));

    expect(newTasks[todolistId2].length).toBe(3);
    expect(newTasks[todolistId2][0].title).toBe(newTaskTitle);
    expect(newTasks[todolistId2][0].isDone).toBe(true);
});

test('task completed status should be set', () => {
    let newTasks = TasksReducer(tasks, setCompletedAC(todolistId2, '3', true));

    expect(newTasks[todolistId2].length).toBe(3);
    expect(newTasks[todolistId2][2].title).toBe('Chips');
    expect(newTasks[todolistId2][2].isDone).toBe(true);
});