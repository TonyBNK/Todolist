import React, {useCallback, useMemo} from "react";
import c from './Todolist.module.css';
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import {IconButton} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {
    addTask, changeTaskTitle,
    removeTask,
    changeTaskStatus
} from "../../bll/reducers/TasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../../bll/store";
import {FilterType} from "../../App";
import {Task, TaskType} from "./Task/Task";


type TodolistPropsType = {
    todolistId: string
    title: string
    changeFilter: (todolistId: string, filter: FilterType) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
    filter: FilterType
    removeTodolist: (todolistId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = React.memo((
    {
        todolistId,
        title,
        changeFilter,
        changeTodolistTitle,
        filter,
        removeTodolist
    }) => {
    console.log('Todolist is rendered');

    let tasksForTodolist = useSelector<RootStateType, Array<TaskType>>(
        state => state.tasks[todolistId]
    )

    if (filter === 'Active') {
        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
    }
    if (filter === 'Completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
    }

    const dispatch = useDispatch();

    const onRemoveTodolistHandler = useCallback(() => {
        removeTodolist(todolistId);
    }, [removeTodolist, todolistId]);

    const onChangeTodolistTitleHandler = useCallback((newTitle: string) => {
        changeTodolistTitle(todolistId, newTitle);
    }, [changeTodolistTitle, todolistId]);

    const onAddItemHandler = useCallback((newTitle: string) => {
        dispatch(addTask(todolistId, newTitle));
    }, [dispatch, todolistId]);

    const removeTask = useCallback((taskId: string) => {
        dispatch(removeTask(todolistId, taskId));
    }, [dispatch, todolistId]);

    const setTaskCompleted = useCallback((taskId: string, isChecked: boolean) => {
        dispatch(changeTaskStatus(todolistId, taskId, isChecked));
    }, [dispatch, todolistId]);

    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
        dispatch(changeTaskTitle(todolistId, taskId, newTitle));
    }, [dispatch, todolistId]);


    let listOfTasks = useMemo(() => {
        return tasksForTodolist.map(t => <Task
                removeTask={removeTask}
                setTaskCompleted={setTaskCompleted}
                changeTaskTitle={changeTaskTitle}
                taskData={t}
            />
        )
    }, [tasksForTodolist, changeTaskTitle, removeTask, setTaskCompleted]);


    return (
        <div
            key={todolistId}
            className={c.todolist}>
            <h3>
                <EditableSpan
                    title={title}
                    onChangeTitle={onChangeTodolistTitleHandler}
                />
                <IconButton onClick={onRemoveTodolistHandler}>
                    <DeleteOutline color={"primary"}/>
                </IconButton>
            </h3>
            <AddItemForm addItem={onAddItemHandler}/>
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
});