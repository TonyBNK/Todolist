import React, {KeyboardEvent, ChangeEvent, useState} from "react";
import c from './Todolist.module.css';
import {FilterButtons} from "./components/FilterButtons";
import {FilterType} from "./App";

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
    setCompleted: (id: string, isDone: boolean) => void
    filter: FilterType
};

export function Todolist(props: TodolistType) {

    let [newTask, setNewTask] = useState<string>('');
    let [error, setError] = useState<boolean>(false);

    const onNewTaskChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value);
    }

    const onNewTaskKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.charCode === 13) {
            if (!newTask.trim()) setError(true);
            else {
                props.addTask(newTask.trim());
                setNewTask('');
            }
        }
    }

    const onNewTaskAddClickHandler = () => {
        if (newTask.trim()) {
            props.addTask(newTask.trim());
            setNewTask('');
        } else {
            setError(true)
        }
    }

    let tasksElements = props.tasks.map(t => {

        const onRemoveTaskClickHandler = () => {
            props.removeTask(t.id);
        }

        const onSetCompletedHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.setCompleted(t.id, e.currentTarget.checked);
        }

        return <li key={t.id} className={t.isDone ? c.isDone : ''}><input type="checkbox"
                                                                          checked={t.isDone}
                                                                          onChange={onSetCompletedHandler}/>
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
                       onKeyPress={onNewTaskKeyPressHandler}
                       className={error ? c.error : ""}/>
                <button onClick={onNewTaskAddClickHandler}>+</button>
                {error && <div className={c.errorMessage}>Title is required</div>}
            </div>
            <ul>
                {tasksElements}
            </ul>
            <div>
                <FilterButtons changeFilter={props.changeFilter}
                               filter={props.filter}/>
            </div>
        </div>
    );
}