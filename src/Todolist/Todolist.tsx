import React from "react";
import c from './Todolist.module.css';
import {FilterType} from "../App";
import {FilterButtons} from "../components/FilterButtons";

type TodolistType = {
    mainTitle: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (filter: FilterType) => void
};

export type TaskType = {
    id: number
    title: string
    isDone: boolean
};

export function Todolist(props: TodolistType) {

    let tasksElements = props.tasks.map(t => {
        return <li key={t.id}>
            <input type="checkbox" checked={t.isDone}/>
            {t.title} <button onClick={() => props.removeTask(t.id)}>X</button>
        </li>
    })

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
               <FilterButtons changeFilter={props.changeFilter}/>
            </div>
        </div>
    );
}