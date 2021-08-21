import React from "react";
import c from './Todolist.module.css';
import {FilterType} from "../App";

type TodolistType = {
    mainTitle: string
    tasks: Array<TasksType>
    removeTask: (id: number) => void
    changeFilter: (filter: FilterType) => void
};

export type TasksType = {
    id: number
    title: string
    isDone: boolean
};

export function Todolist(props: TodolistType) {

    let tasksElements = props.tasks.map(t => <li><input type="checkbox" checked={t.isDone}/>
        {t.title} <button onClick={() => props.removeTask(t.id)}>X</button>
    </li>)

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
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
}