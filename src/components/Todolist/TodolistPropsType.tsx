import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import c from './Todolist.module.css';
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {FilterType} from "../../App";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TaskType>
    addTask: (taskTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterType, todolistId: string) => void
    setCompleted: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    let [newTask, setNewTask] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onAddTaskHandler = () => {
        if (newTask.trim()) {
            props.addTask(newTask.trim(), props.todolistId);
            setNewTask('');
        } else {
            setError("Title is required!");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value);
    }

    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newTask.trim()) {
                props.addTask(newTask.trim(), props.todolistId);
                setNewTask('');
            } else {
                setError("Title is required!");
            }
        } else {
            setError(null);
        }
    }

    const onRemoveTodolistHandler = () => {
        props.removeTodolist(props.todolistId);
    }

    let tasks = props.tasks.map(t => {

        const onRemoveTaskHandler = () => {
            props.removeTask(t.id, props.todolistId);
        }

        const onSetCompletedHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.setCompleted(t.id, e.currentTarget.checked, props.todolistId);
        }

        return <li key={t.id}
                   className={t.isDone ? c.completed : ''}>
            <input type="checkbox"
                   checked={t.isDone}
                   onChange={onSetCompletedHandler}/>
            <span>{t.title}</span>
            <button onClick={onRemoveTaskHandler}>X</button>
        </li>
    })

    return (
        <div className={c.todolist}>
            <h3>{props.title} <button onClick={onRemoveTodolistHandler}>X</button></h3>
            <input className={error ? c.error : ''}
                   onChange={onChangeHandler}
                   onKeyPress={onEnterPressHandler}
                   value={newTask}/>
            <button onClick={onAddTaskHandler}>+</button>
            {error && <div className={c.errorMessage}>{error}</div>}
            <ul>
                {tasks}
            </ul>
            <FilterButtons
                todolistId={props.todolistId}
                changeFilter={props.changeFilter}
                filter={props.filter}/>
        </div>
    );
}