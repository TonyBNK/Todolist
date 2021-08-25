import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import c from './Todolist.module.css';
import {FilterButtons} from "../components/FilterButtons";
import {FilterType} from "../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

type TodolistType = {
    mainTitle: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterType) => void
    addTask: (newTask: string) => void
};

export function Todolist(props: TodolistType) {

    let [newTask, setNewTask] = useState('');

    const onNewTaskChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value);
    }
    const onNewTaskKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTask(newTask);
            setNewTask('');
        }
    }
    const onNewTaskAddClickHandler = () => {
        props.addTask(newTask);
        setNewTask('');
    }

    let tasksElements = props.tasks.map(t => {

        const onRemoveTaskClickHandler = () => {
            props.removeTask(t.id);
        }

        return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
            {t.title}
            <button onClick={onRemoveTaskClickHandler}>X</button>
        </li>
    })

    return (
        <div className={c.todolist}>
            <h3>{props.mainTitle}</h3>
            <div>
                <input value={newTask}
                       onChange={onNewTaskChangeHandler}
                       onKeyPress={onNewTaskKeyPressHandler}/>
                <button onClick={onNewTaskAddClickHandler}>+</button>
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