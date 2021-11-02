import {
    createTask,
    deleteTask,
    getTasks,
    TasksReducer, updateTask
} from "./TasksReducer";
import {
    TaskPriorities,
    TaskStatuses,
    TasksType,
    TaskType, TodolistType
} from "../../types/types";
import {addTodolist, removeTodolist} from "./TodolistsReducer";


let tasks: TasksType;
let newTask: TaskType;
let newTodolist: TodolistType;

beforeEach(() => {
    tasks = {
        'todolist1Id': [
            {
                id: "962539f3-5ded-43de-b97c-b276c376692f",
                title: "HTML&CSS",
                description: null,
                todoListId: "todolist1Id",
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
                todoListId: "todolist1Id",
                order: -3,
                status: 2,
                priority: 1,
                startDate: null,
                deadline: null,
                addedDate: new Date("2021-09-27T17:30:23.163")
            }
        ],
        'todolist2Id': [
            {
                id: "23b8f6c9-6f08-4a08-97cb-1d9f59eac942",
                title: "React",
                description: "awfaserfaw",
                todoListId: "todolist2Id",
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
                todoListId: "todolist2Id",
                order: -1,
                status: 0,
                priority: 1,
                startDate: null,
                deadline: null,
                addedDate: new Date("2021-09-27T12:35:42.497")
            }
        ]
    };
    newTask = {
        id: 'asdfasd',
        title: '',
        status: TaskStatuses.New,
        order: 0,
        addedDate: new Date(),
        todoListId: 'todolist2Id',
        description: null,
        priority: TaskPriorities.Middle,
        deadline: null,
        startDate: null
    };
    newTodolist = {
        id: 'todolist3Id',
        title: 'some title',
        order: 0,
        addedDate: new Date(),
        filter: "All",
        entityStatus: 'idle'
    };
});

test('tasks should be added to todolist', () => {
    const action = getTasks.fulfilled({
            tasks: tasks['todolist1Id'],
            todoListId: 'todolist1Id'
        },
        '',
        'todolist1Id'
    );

    const newState = TasksReducer({
        'todolist1Id': [],
        'todolist2Id': []
    }, action);

    expect(newState['todolist1Id'].length).toBe(2);
    expect(newState['todolist2Id'].length).toBe(0);
});

test('task HTML&CSS should be removed from tasks', () => {
    expect(tasks['todolist1Id'].length).toBe(2);

    let newTasks = TasksReducer(tasks, deleteTask.fulfilled({
            id: tasks['todolist1Id'][0].id,
            todoListId: 'todolist1Id'
        },
        '',
        {
            id: tasks['todolist1Id'][0].id,
            todoListId: 'todolist1Id'
        }
    ));

    expect(newTasks['todolist1Id'].length).toBe(1);
    expect(newTasks['todolist1Id'].every(t => t.id !== '962539f3-5ded-43de-b97c-b276c376692f')).toBeTruthy();
});

test('new task should be added', () => {
    const newTaskTitle = 'GraphQL';

    let newTasks = TasksReducer(tasks, createTask.fulfilled({
            taskModel: {
                ...newTask,
                title: newTaskTitle
            }
        },
        '',
        {
            title: newTaskTitle,
            todoListId: 'todolist2Id'
        }
    ));

    expect(newTasks['todolist2Id'].length).toBe(3);
    expect(newTasks['todolist2Id'][0].title).toBe(newTaskTitle);
    expect(newTasks['todolist2Id'][0].status).toBe(TaskStatuses.New);
});

test('task status should be changed', () => {
    const newTaskStatus = TaskStatuses.Completed;
    let newTasks = TasksReducer(tasks, updateTask.fulfilled({
            taskModel: {
                ...tasks['todolist1Id'][0],
                status: newTaskStatus
            }
        },
        '',
        {
            ...tasks['todolist1Id'][0],
            status: newTaskStatus
        }
    ));

    expect(newTasks['todolist1Id'].length).toBe(2);
    expect(newTasks['todolist1Id'][0].title).toBe('HTML&CSS');
    expect(newTasks['todolist1Id'][0].status).toBe(newTaskStatus);
});

test('task title should be changed', () => {
    const newTaskTitle = 'MobX';
    let newTasks = TasksReducer(tasks, updateTask.fulfilled({
            taskModel: {
                ...tasks['todolist2Id'][1],
                title: newTaskTitle
            }
        },
        '',
        {
            ...tasks['todolist2Id'][1],
            title: newTaskTitle
        }
    ));

    expect(newTasks['todolist2Id'].length).toBe(2);
    expect(newTasks['todolist2Id'][1].status).toBe(TaskStatuses.New);
    expect(newTasks['todolist2Id'][1].title).toBe(newTaskTitle);
});

test('new todolist should be added', () => {
    let newTasks = TasksReducer(tasks, addTodolist({todolist: newTodolist}));

    expect(Object.keys(newTasks).length).toBe(3);
    expect(newTasks['todolist3Id'].length).toBe(0);
});

test('one todolist should be removed', () => {
    let newTasks = TasksReducer(tasks, removeTodolist({id: 'todolist1Id'}));

    expect(Object.keys(newTasks).length).toBe(1);
    expect(Object.values(newTasks)[0].length).toBe(2);
    expect(Object.values(newTasks)[0][1].title).toBe('Redux');
});
