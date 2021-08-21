import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist/Todolist";

export type FilterType = 'all' | 'active' | 'completed';

function App() {

    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false},
        {id: 4, title: "Redux", isDone: false},
    ]);
    let [filter, setFilter] = useState<FilterType>('all');

    const removeTask = (id: number) => {
      let filteredTasks = tasks.filter(t => t.id !== id);
      setTasks(filteredTasks);
    };

    const changeFilter = (filter: FilterType) => {
        setFilter(filter);
    }

    let tasksForTodolist = tasks;
    if (filter === 'active') tasksForTodolist = tasks.filter(t => !t.isDone);
    if (filter === 'completed') tasksForTodolist = tasks.filter(t => t.isDone);

    return (
        <div className="App">
            <Todolist mainTitle="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
