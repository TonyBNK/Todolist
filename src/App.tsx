import React, {useState} from 'react';
import c from './App.module.css';
import {v1} from "uuid";
import {Todolist} from "./components/Todolist/TodolistPropsType";

export type FilterType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

function App() {

    let [todolistId1, todolistId2] = [v1(), v1()];

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: 'active'},
        {id: todolistId2, title: "What to buy", filter: 'completed'},
    ]);

    let [tasksObj, setTasksObj] = useState({
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
        let newTask = {id: v1(), title: taskTitle, isDone: false};
        tasksObj[todolistId] = [newTask, ...tasksObj[todolistId]];
        setTasksObj({...tasksObj});
    }

    const removeTask = (taskId: string, todolistId: string) => {
        tasksObj[todolistId] = tasksObj[todolistId].filter(t => t.id !== taskId);
        setTasksObj({...tasksObj});
    }

    const changeFilter = (filter: FilterType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = filter;
            setTodolists([...todolists]);
        }
    }

    const setCompleted = (taskId: string, isDone: boolean, todolistId: string) => {
        let task = tasksObj[todolistId].find(t => t.id === taskId);
        if (task){
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
            {
                todolists.map(tl => {

                    let tasksForTodolist = tasksObj[tl.id];
                    if (tl.filter === 'active') tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                    if (tl.filter === 'completed') tasksForTodolist = tasksForTodolist.filter(t => t.isDone);

                    return <Todolist
                        key={tl.id}
                        todolistId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        setCompleted={setCompleted}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}/>
                })
            }
        </div>
    );
}

export default App;
