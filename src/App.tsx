import React, {useState} from 'react';
import c from './App.module.css';
import {v1} from "uuid";
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/Todolist/AddItemForm";

export type FilterType = 'all' | 'active' | 'completed';
type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
type TasksObjectType = {
    [key: string]: Array<TaskType>
}

function App() {

    const [todolistId1, todolistId2] = [v1(), v1()];

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to buy", filter: 'all'},
    ]);

    const [tasksObj, setTasksObj] = useState<TasksObjectType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: true},
            {id: v1(), title: "Chips", isDone: false}
        ]
    });

    const addTask = (taskTitle: string, todolistId: string) => {
        const newTask = {id: v1(), title: taskTitle, isDone: false};
        tasksObj[todolistId] = [...tasksObj[todolistId], newTask];
        setTasksObj({...tasksObj});
    }

    const addTodolist = (todolistTitle: string) => {
        const newTodolist: TodolistType = {
            id: v1(),
            title: todolistTitle,
            filter: 'all'
        };
        setTodolists([...todolists, newTodolist]);
        setTasksObj({...tasksObj, [newTodolist.id]: []});
    }

    const removeTask = (taskId: string, todolistId: string) => {
        tasksObj[todolistId] = tasksObj[todolistId].filter(t => t.id !== taskId);
        setTasksObj({...tasksObj});
    }

    const changeFilter = (filter: FilterType, todolistId: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = filter;
            setTodolists([...todolists]);
        }
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        const newTasks = tasksObj[todolistId].map(t => {
            return t.id === taskId
                ? {...t, title: newTitle}
                : t
        });
        setTasksObj({...tasksObj, [todolistId]: newTasks});
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const newTodolists = todolists.map(tl => {
            return tl.id === todolistId
                ? {...tl, title: newTitle}
                : tl
        });
        setTodolists(newTodolists);
    }

    const setCompleted = (taskId: string, isDone: boolean, todolistId: string) => {
        let task = tasksObj[todolistId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj});
        }
    }

    const removeTodolist = (todolistId: string) => {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filteredTodolists);
        delete tasksObj[todolistId];
        setTasksObj({...tasksObj});
    }

    return (
        <div className={c.app}>
            <AddItemForm addItem={addTodolist}/>
            {
                todolists.map(tl => {
                    let tasksForTodolist = tasksObj[tl.id];
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                    }
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                    }

                    return <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                        setCompleted={setCompleted}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                    />
                })
            }
        </div>
    );
}

export default App;
