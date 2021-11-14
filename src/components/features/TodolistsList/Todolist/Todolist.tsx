import React, {useCallback, useEffect, useMemo} from "react";
import c from './Todolist.module.css';
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {AddItemForm} from "../../../common/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../common/EditableSpan/EditableSpan";
import {IconButton} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {
    RootStateType,
    TaskStatuses,
    TaskType,
    TodolistType
} from "../../../../types/types";
import {Task} from "./Task/Task";
import {authSelector} from "../../../../redux/selectors";
import {useActions} from "../../../../redux/store";
import {tasksActions, todolistsActions} from "../index";


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
    const {updateTodolist, deleteTodolist} = useActions(todolistsActions);
    const {createTask, getTasks} = useActions(tasksActions);

    let tasks = useSelector<RootStateType, Array<TaskType>>(
        state => state.tasks[todolistModel.id]
    );
    const isLogged = useSelector(authSelector.selectIsLogged);

    const filter = todolistModel.filter;

    if (filter === 'Active') {
        tasks = tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (filter === 'Completed') {
        tasks = tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    const onRemoveTodolistHandler = useCallback(() => {
        deleteTodolist(todolistModel.id);
    }, [todolistModel]);

    const addTask = useCallback((title: string) => {
        createTask({title, todoListId: todolistModel.id});
    }, [todolistModel.id]);

    const tasksList = useMemo(() => {
        if (tasks){
            return tasks.map(t => <Task taskModel={t}/>)
        }
        return null;
    }, [tasks]);

    useEffect(() => {
        if (demo || !isLogged) {
            return
        }
        getTasks(todolistModel.id);
    }, []);

    return (
        <div
            key={todolistModel.id}
            className={c.todolist}>
            <h3>
                <EditableSpan
                    item={todolistModel}
                    changeItem={updateTodolist}
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
                    tasksList
                }
            </div>
            <FilterButtons
                item={todolistModel}
                changeItem={updateTodolist}
            />
        </div>
    );
});
