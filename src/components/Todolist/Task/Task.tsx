import React, {ChangeEvent} from "react";
import c from "../Todolist.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {RemoveCircleOutline} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../types/types";
import {deleteTask, updateTask} from "../../../bll/thunks/thunks";
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

    const onRemoveTaskHandler = () => {
        dispatch(deleteTask(taskModel.id, taskModel.todoListId));
    }

    const changeTitle = (newTitle: string) => {
        const payload = {...taskModel, title: newTitle};
        dispatch(updateTask(taskModel, payload));
    };

    const changeStatus = (newStatus: TaskStatuses) => {
        const payload = {...taskModel, status: newStatus};
        dispatch(updateTask(taskModel, payload));
    };

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.checked
            ? changeStatus(TaskStatuses.Completed)
            : changeStatus(TaskStatuses.New)
    };

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