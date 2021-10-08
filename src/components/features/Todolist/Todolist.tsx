import React, {useCallback, useEffect, useMemo, useState} from "react";
import c from './Todolist.module.css';
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {AddItemForm} from "../../common/AddItemForm/AddItemForm";
import {EditableSpan} from "../../common/EditableSpan/EditableSpan";
import {IconButton} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../../bll/store";
import {
    FilterType,
    TaskStatuses,
    TaskType,
    TodolistType
} from "../../../types/types";
import {
    createTask,
    deleteTodolist,
    getTasks, updateTodolist
} from "../../../bll/thunks/thunks";
import {Task} from "./Task/Task";


type TodolistPropsType = {
    todolistModel: TodolistType
}
export const Todolist: React.FC<TodolistPropsType> = React.memo((
    {
        todolistModel
    }
) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks(todolistModel.id));
    }, [dispatch, todolistModel.id]);

    let tasks = useSelector<RootStateType, Array<TaskType>>(
        state => state.tasks.filter(task => task.todoListId === todolistModel.id)
    );

    const [filter, setFilter] = useState<FilterType>('All');

    if (filter === 'Active') {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === 'Completed') {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const onRemoveTodolistHandler = useCallback(() => {
        dispatch(deleteTodolist(todolistModel.id));
    }, [dispatch, todolistModel.id]);

    const addTask = useCallback((title: string) => {
        dispatch(createTask(title, todolistModel.id));
    }, [dispatch, todolistModel.id]);

    const changeTodolist = useCallback((newTitle: string) => {
        dispatch(updateTodolist({...todolistModel, title: newTitle}));
    }, [dispatch, todolistModel]);

    const changeFilter = useCallback((newFilter: FilterType) => {
        setFilter(newFilter);
    }, []);

    return (
        <div
            key={todolistModel.id}
            className={c.todolist}>
            <h3>
                <EditableSpan
                    title={todolistModel.title}
                    onChangeTitle={changeTodolist}
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