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
import {Task} from "./Task/Task";
import {createTask, getTasks} from "../../../redux/reducers/TasksReducer";
import {authSelector} from "../../../redux/selectors";
import {useActions} from "../../../redux/store";
import {todolistsActions} from "../index";


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
    const {updateTodolist, deleteTodolist} = useActions(todolistsActions);

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
        const todoListId = todolistModel.id;
        dispatch(createTask({title, todoListId}));
    }, [dispatch, todolistModel.id]);

    const changeTodolist = useCallback((newTitle: string) => {
        updateTodolist({...todolistModel, title: newTitle});
    }, [todolistModel]);

    const changeFilter = useCallback((newFilter: FilterType) => {
        updateTodolist({...todolistModel, filter: newFilter});
    }, [todolistModel]);

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
        dispatch(getTasks(todolistModel.id));
    }, []);

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
                    tasksList
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