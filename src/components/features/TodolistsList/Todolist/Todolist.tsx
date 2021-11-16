import React, {useCallback, useEffect, useMemo} from "react";
import c from './Todolist.module.scss';
import {FilterButtons} from "./FilterButtons/FilterButtons";
import {AddItemForm} from "../../../common/AddItemForm/AddItemForm";
import {EditableSpan} from "../../../common/EditableSpan/EditableSpan";
import {IconButton} from "@material-ui/core";
import {DeleteOutline} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {
    AddItemFormSubmitHelperType,
    RootStateType,
    TaskStatuses,
    TaskType,
    TodolistType
} from "../../../../types/types";
import {Task} from "./Task/Task";
import {authSelector} from "../../../../redux/selectors";
import {useActions, useAppDispatch} from "../../../../redux/store";
import {tasksActions, todolistsActions} from "../index";
import {Paper} from "@mui/material";


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
    const {getTasks} = useActions(tasksActions);
    const dispatch = useAppDispatch();

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

    const addTaskCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        const resultAction = await dispatch(tasksActions.createTask({
            title, todoListId: todolistModel.id
        }));

        if (tasksActions.createTask.rejected.match(resultAction)) {
            if (resultAction.payload?.messages?.length) {
                const errorMessage = resultAction.payload?.messages[0];
                helper.setError(errorMessage);
            } else {
                helper.setError('Some error occurred');
            }
        } else {
            helper.setTitle('');
        }
    }, [todolistModel.id]);

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(todolistsActions.updateTodolist({...todolistModel, title}));
    }, [todolistModel, dispatch]);

    const tasksList = useMemo(() => {
        if (tasks) {
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
        <Paper
            elevation={3}
            key={todolistModel.id}
            className={c.todolistContainer}
        >
            <IconButton
                onClick={onRemoveTodolistHandler}
                disabled={todolistModel.entityStatus === 'loading'}
                style={{position: 'absolute', right: 0, top: 0}}
            >
                <DeleteOutline color={"primary"}/>
            </IconButton>
            <h3>
                <EditableSpan
                    value={todolistModel.title}
                    onChange={changeTodolistTitle}
                />
            </h3>
            <AddItemForm addItem={addTaskCallback}
                         disabled={todolistModel.entityStatus === 'loading'}/>
            <div>
                {
                    tasksList?.length
                        ? tasksList
                        : <div style={{
                            opacity: 0.5,
                            textAlign: 'center',
                            margin: '10px 0'
                        }}>No
                            tasks</div>
                }
            </div>
            <FilterButtons
                item={todolistModel}
                changeItem={updateTodolist}
            />
        </Paper>
    );
});
