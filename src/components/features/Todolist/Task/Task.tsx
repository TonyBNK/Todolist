import React, {ChangeEvent, useCallback} from "react";
import c from "../Todolist.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../common/EditableSpan/EditableSpan";
import {RemoveCircleOutline} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../types/types";
import {useDispatch} from "react-redux";
import {deleteTask, updateTask} from "../../../../redux/reducers/TasksReducer";


export type TaskPropsType = {
    taskModel: TaskType
}
export const Task: React.FC<TaskPropsType> = React.memo((
    {
        taskModel
    }
) => {
    const dispatch = useDispatch();

    const onRemoveTaskHandler = useCallback(() => {
        const [id, todoListId] = [taskModel.id, taskModel.todoListId];
        dispatch(deleteTask({id, todoListId}));
    }, [dispatch, taskModel.id, taskModel.todoListId]);

    const changeTitle = useCallback((newTitle: string) => {
        dispatch(updateTask({...taskModel, title: newTitle}));
    }, [dispatch, taskModel]);

    const changeStatus = useCallback((newStatus: TaskStatuses) => {
        dispatch(updateTask({...taskModel, status: newStatus}));
    }, [dispatch, taskModel]);

    const onChangeStatusHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.checked
            ? changeStatus(TaskStatuses.Completed)
            : changeStatus(TaskStatuses.New)
    }, [changeStatus]);

    return <div
        key={taskModel.id}
        className={taskModel.status === TaskStatuses.Completed ? c.completed : ''}>
        <Checkbox
            color={'primary'}
            onChange={onChangeStatusHandler}
            checked={taskModel.status === TaskStatuses.Completed}
        />
        <EditableSpan
            title={taskModel.title}
            onChangeTitle={changeTitle}
        />
        <IconButton
            onClick={onRemoveTaskHandler}
            size={"small"}
        >
            <RemoveCircleOutline/>
        </IconButton>
    </div>
});