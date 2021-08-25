import React from "react";
import c from './Todolist.module.css';
import {FilterType} from "../App";
<<<<<<< HEAD
import {FilterButtons} from "../components/FilterButtons";

type TodolistType = {
    mainTitle: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterType) => void
};

export type TaskType = {
=======

type TodolistType = {
    mainTitle: string
    tasks: Array<TasksType>
    removeTask: (id: number) => void
    changeFilter: (filter: FilterType) => void
};

export type TasksType = {
>>>>>>> github/master
    id: number
    title: string
    isDone: boolean
};

export function Todolist(props: TodolistType) {

<<<<<<< HEAD
    let tasksElements = props.tasks.map(t => {
        return <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            {t.title} <button onClick={() => props.removeTask(t.id)}>X</button>
        </li>
    })
=======
    let tasksElements = props.tasks.map(t => <li><input type="checkbox" checked={t.isDone}/>
        {t.title} <button onClick={() => props.removeTask(t.id)}>X</button>
    </li>)
>>>>>>> github/master

    return (
        <div className={c.todolist}>
            <h3>{props.mainTitle}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
<<<<<<< HEAD
               <FilterButtons changeFilter={props.changeFilter}/>
=======
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
>>>>>>> github/master
            </div>
        </div>
    );
}