import React, {ChangeEvent} from "react";
import c from './Todolist.module.css';
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {DeleteOutline, RemoveCircleOutline} from "@material-ui/icons";
import {
    addTaskAC,
    changeTaskTitleAC,
    removeTaskAC, setCompletedAC
} from "../../reducers/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../redux/store";
import {FilterType, TasksType} from "../../App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    todolistId: string
    title: string
    changeFilter: (todolistId: string, filter: FilterType) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
}
export const Todolist: React.FC<TodolistPropsType> = (
    {
        todolistId,
        title,
        changeFilter,
        changeTodolistTitle,
        filter,
        removeTodolist
    }) => {
    const tasks = useSelector<RootStateType, TasksType>(
        state => state.tasks
    )

    let tasksForTodolist = tasks[todolistId];
    if (filter === 'Active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (filter === 'Completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }

    const dispatch = useDispatch();

    const onRemoveTodolistHandler = () => {
        removeTodolist(todolistId);
    }

    const onAddTaskTitleHandler = (newTitle: string) => {
        dispatch(addTaskAC(todolistId, newTitle));
    }
    
    const onChangeTodolistTitleHandler = (newTitle: string) => {
      changeTodolistTitle(todolistId, newTitle);
    }

    let listOfTasks = tasksForTodolist.map(t => {

        const onRemoveTaskHandler = () => dispatch(removeTaskAC(todolistId, t.id));

        const onSetCompletedHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(setCompletedAC(todolistId, t.id, e.currentTarget.checked));
        }

        const onChangeTaskTitleHandler = (newTitle: string) => {
            dispatch(changeTaskTitleAC(todolistId, t.id, newTitle));
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

