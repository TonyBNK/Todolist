import React, {useCallback, useEffect, useMemo, useState} from "react";
import c from './Todolist.module.css';
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {IconButton} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../bll/store";
import {FilterType, TaskStatuses, TaskType} from "../../types/types";
import {
    createTask,
    deleteTodolist,
    getTasks, updateTodolist
} from "../../bll/thunks/thunks";
import {Task} from "./Task/Task";


type TodolistPropsType = {
    id: string
    title: string
}
export const Todolist: React.FC<TodolistPropsType> = React.memo((
    {
        id,
        title
    }
) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks(id));
    }, [dispatch, id]);

    let tasks = useSelector<RootStateType, Array<TaskType>>(
        state => state.tasks.filter(task => task.todoListId === id)
    );

    const [filter, setFilter] = useState<FilterType>('All');

    if (filter === 'Active') {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === 'Completed') {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const onRemoveTodolistHandler = useCallback(() => {
        dispatch(deleteTodolist(id));
    }, [dispatch, id]);

    const addTask = useCallback((title: string) => {
        dispatch(createTask(title, id));
    }, [dispatch, id]);

    const changeTitle = useCallback((newTitle: string) => {
        dispatch(updateTodolist(id, newTitle));
    }, [dispatch, id]);

    const changeFilter = useCallback((newFilter: FilterType) => {
        setFilter(newFilter);
    }, []);

    return (
        <div
            key={id}
            className={c.todolist}>
            <h3>
                <EditableSpan
                    title={title}
                    onChangeTitle={changeTitle}
                />
                <IconButton onClick={onRemoveTodolistHandler}>
                    <DeleteOutline color={"primary"}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                {
                    useMemo(() => {
                        return tasks.map(t => <Task
                                taskModel={t}
                            />
                        )
                    }, [tasks])
                }
            </div>
            <FilterButtons
                changeFilter={changeFilter}
                filter={filter}
            />
        </div>
    );
});