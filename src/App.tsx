import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist/Todolist";

export type FilterType = 'all' | 'active' | 'completed';

function App() {

    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "Js", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
        {id: 5, title: "Rest API", isDone: false},
        {id: 6, title: "GraphQL", isDone: false},
    ]);

    let [filter, setFilter] = useState('all');

    let tasksForTodolist = tasks;
    if (filter === 'active') tasksForTodolist = tasks.filter(task => !task.isDone);
    if (filter === 'completed') tasksForTodolist = tasks.filter(task => task.isDone);

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    }

    const changeFilter = (filter: FilterType) => {
        setFilter(filter);
    }

    return (
        <div className="App">
            <Todolist mainTitle={"What to learn"}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
