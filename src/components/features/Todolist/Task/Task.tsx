import React, {ChangeEvent, useCallback} from "react";
import c from "../Todolist.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../common/EditableSpan/EditableSpan";
import {RemoveCircleOutline} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../types/types";
import {deleteTask, updateTask} from "../../../../bll/thunks/thunks";
import {useDispatch} from "react-redux";


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
        dispatch(deleteTask(taskModel.id, taskModel.todoListId));
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