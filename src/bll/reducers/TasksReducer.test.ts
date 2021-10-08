import {TasksReducer} from "./TasksReducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../../types/types";
import {
    addTask,
    changeTask,
    removeTask
} from "../action-creators/actionCreators";


let tasks: Array<TaskType>;
let newTask: TaskType;

beforeEach(() => {
    tasks = [
        {
            id: "962539f3-5ded-43de-b97c-b276c376692f",
            title: "HTML&CSS",
            description: null,
            todoListId: "404caf11-450d-4ac3-9375-61deeafe63b0",
            order: -4,
            status: 2,
            priority: 1,
            startDate: null,
            deadline: null,
            addedDate: new Date("2021-09-27T17:30:33.757")
        },
        {
            id: "9230f833-2aa8-4506-841a-1b1e409c071f",
            title: "JS",
            description: null,
            todoListId: "404caf11-450d-4ac3-9375-61deeafe63b0",
            order: -3,
            status: 2,
            priority: 1,
            startDate: null,
            deadline: null,
            addedDate: new Date("2021-09-27T17:30:23.163")
        },
        {
            id: "23b8f6c9-6f08-4a08-97cb-1d9f59eac942",
            title: "React",
            description: "awfaserfaw",
            todoListId: "404caf11-450d-4ac3-9375-61deeafe63b0",
            order: -2,
            status: 2,
            priority: 2,
            startDate: null,
            deadline: null,
            addedDate: new Date("2021-09-27T12:37:02.693")
        },
        {
            id: "caae449b-b245-4c67-9c4e-1c91f3fbe1ae",
            title: "Redux",
            description: null,
            todoListId: "404caf11-450d-4ac3-9375-61deeafe63b0",
            order: -1,
            status: 0,
            priority: 1,
            startDate: null,
            deadline: null,
            addedDate: new Date("2021-09-27T12:35:42.497")
        }
    ];
    newTask = {
        id: 'asdfasd',
        title: '',
        status: TaskStatuses.New,
        order: 0,
        addedDate: new Date(),
        todoListId: '404caf11-450d-4ac3-9375-61deeafe63b0',
        description: null,
        priority: TaskPriorities.Middle,
        deadline: null,
        startDate: null
    }
});

test('task HTML&CSS should be removed from tasks', () => {
    expect(tasks.length).toBe(4);

    let newTasks = TasksReducer(tasks, removeTask('962539f3-5ded-43de-b97c-b276c376692f'));

    expect(newTasks.length).toBe(3);
    expect(newTasks.every(t => t.id !== '962539f3-5ded-43de-b97c-b276c376692f')).toBeTruthy();
});

test('new task should be added', () => {
    const newTaskTitle = 'GraphQL';
    let newTasks = TasksReducer(tasks, addTask({
        ...newTask,
        title: newTaskTitle
    }));

    expect(newTasks.length).toBe(5);
    expect(newTasks[0].title).toBe(newTaskTitle);
    expect(newTasks[0].status).toBe(TaskStatuses.New);
});

test('task status should be changed', () => {
    const newTaskStatus = TaskStatuses.Completed;
    let newTasks = TasksReducer(tasks, changeTask({
        ...tasks[0],
        status: newTaskStatus
    }));

    expect(newTasks.length).toBe(4);
    expect(newTasks[0].title).toBe('HTML&CSS');
    expect(newTasks[0].status).toBe(newTaskStatus);
});

test('task title should be changed', () => {
    const newTaskTitle = 'MobX';
    let newTasks = TasksReducer(tasks, changeTask({
        ...tasks[3],
        title: newTaskTitle
    }));

    expect(newTasks.length).toBe(4);
    expect(newTasks[3].status).toBe(TaskStatuses.New);
    expect(newTasks[3].title).toBe(newTaskTitle);
});

