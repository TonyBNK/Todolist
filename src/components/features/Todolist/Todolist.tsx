import React, {useCallback, useEffect, useMemo} from "react";
import c from './Todolist.module.css';
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {AddItemForm} from "../../common/AddItemForm/AddItemForm";
import {EditableSpan} from "../../common/EditableSpan/EditableSpan";
import {IconButton} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    FilterType,
    RootStateType,
    TaskStatuses,
    TaskType,
    TodolistType
} from "../../../types/types";
import {
    createTask,
    deleteTodolist,
    getTasks,
    updateTodolist
} from "../../../bll/thunks/thunks";
import {Task} from "./Task/Task";


type TodolistPropsType = {
    todolistModel: TodolistType
    demo?: boolean
}
export const Todolist: React.FC<TodolistPropsType> = React.memo((
    {
        todolistModel,
        demo = false
    }
) => {
    const dispatch = useDispatch();

    useEffect(() => {
        if (demo) {
            return
        }
        dispatch(getTasks(todolistModel.id));
    }, []);

    let tasks = useSelector<RootStateType, Array<TaskType>>(
        state => state.tasks[todolistModel.id]
    );

    const filter = todolistModel.filter;

    if (filter === 'Active') {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === 'Completed') {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const onRemoveTodolistHandler = useCallback(() => {
        dispatch(deleteTodolist(todolistModel.id));
    }, [dispatch, todolistModel]);

    const addTask = useCallback((title: string) => {
        dispatch(createTask(title, todolistModel.id));
    }, [dispatch, todolistModel.id]);

    const changeTodolist = useCallback((newTitle: string) => {
        dispatch(updateTodolist({...todolistModel, title: newTitle}));
    }, [dispatch, todolistModel]);

    const changeFilter = useCallback((newFilter: FilterType) => {
        dispatch(updateTodolist({...todolistModel, filter: newFilter}));
    }, [dispatch, todolistModel]);

    return (
        <div
            key={todolistModel.id}
            className={c.todolist}>
            <h3>
                <EditableSpan
                    title={todolistModel.title}
                    onChangeTitle={changeTodolist}
                    entityStatus={todolistModel.entityStatus}
                />
                <IconButton
                    onClick={onRemoveTodolistHandler}
                    disabled={todolistModel.entityStatus === 'loading'}
                >
                    <DeleteOutline color={"primary"}/>
                </IconButton>
            </h3>
            <AddItemForm
                addItem={addTask}
                entityStatus={todolistModel.entityStatus}
            />
            <div>
                {
                    useMemo(() => {
                        return tasks.map(t => <Task taskModel={t}/>)
                    }, [tasks])
                }
            </div>
            <FilterButtons
                filter={todolistModel.filter}
                changeFilter={changeFilter}
                entityStatus={todolistModel.entityStatus}
            />
        </div>
    );
});