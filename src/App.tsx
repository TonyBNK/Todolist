import React, {useState} from 'react';
import {v1} from 'uuid';
import c from './App.module.css'
import {Todolist} from "./Todolist";

export type FilterType = 'all' | 'active' | 'completed';

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    let [filter, setFilter] = useState<FilterType>('all');

    let tasksForTodolist = tasks;
    if (filter === 'active') tasksForTodolist = tasks.filter(task => !task.isDone);
    if (filter === 'completed') tasksForTodolist = tasks.filter(task => task.isDone);

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    }

    const changeFilter = (filter: FilterType) => {
        setFilter(filter);
    }

    const addTask = (newTask: string) => {
            let newTasks = [{id: v1(), title: newTask, isDone: false}, ...tasks]
            setTasks(newTasks);
    }

    const setCompleted = (taskId: string, isDone: boolean) => {
        let task = tasks.find(task => task.id === taskId);
        if (task){
            task.isDone = isDone;
            setTasks([...tasks]);
        }
    }

    return (
        <div className={c.Todolist}>
            <Todolist mainTitle={"What to learn"}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      setCompleted={setCompleted}
                      filter={filter}
            />
        </div>
    );
}

export default App;
