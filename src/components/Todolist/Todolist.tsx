import React, {ChangeEvent} from "react";
import c from './Todolist.module.css';
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {FilterType} from "../../App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {DeleteOutline, RemoveCircleOutline} from "@material-ui/icons";

export type TaskType = {
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
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    setCompleted: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
}
export const Todolist: React.FC<TodolistPropsType> = (
    {
        todolistId,
        title,
        tasks,
        addTask,
        removeTask,
        changeFilter,
        changeTaskTitle,
        changeTodolistTitle,
        setCompleted,
        filter,
        removeTodolist
    }) => {

    const onRemoveTodolistHandler = () => {
        removeTodolist(todolistId);
    }

    const onAddTaskTitleHandler = (newTitle: string) => {
        addTask(newTitle, todolistId);
    }
    
    const onChangeTodolistTitleHandler = (newTitle: string) => {
      changeTodolistTitle(todolistId, newTitle);
    }

    let listOfTasks = tasks.map(t => {

        const onRemoveTaskHandler = () => removeTask(t.id, todolistId);

        const onSetCompletedHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setCompleted(t.id, e.currentTarget.checked, todolistId);
        }

        const onChangeTaskTitleHandler = (newTitle: string) => {
            changeTaskTitle(todolistId, t.id, newTitle);
        }

        return <div
            key={t.id}
            className={t.isDone ? c.completed : ''}
        >
            <Checkbox
                color={'primary'}
                checked={t.isDone}
                onChange={onSetCompletedHandler}
            />
            <EditableSpan
                title={t.title}
                onChangeTitle={onChangeTaskTitleHandler}
            />
            <IconButton
                onClick={onRemoveTaskHandler}
                size={"small"}
            >
                <RemoveCircleOutline/>
            </IconButton>
        </div>
    })

    return (
        <div className={c.todolist}>
            <h3>
                <EditableSpan
                    title={title}
                    onChangeTitle={onChangeTodolistTitleHandler}
                />
                <IconButton onClick={onRemoveTodolistHandler}>
                    <DeleteOutline color={"primary"}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={onAddTaskTitleHandler}/>
            <div>
                {listOfTasks}
            </div>
            <FilterButtons
                todolistId={todolistId}
                changeFilter={changeFilter}
                filter={filter}
            />
        </div>
    );
}

