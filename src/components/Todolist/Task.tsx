import React, {ChangeEvent, useCallback} from "react";
import c from "./Todolist.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {RemoveCircleOutline} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TaskPropsType = {
    removeTask: (taskId: string) => void
    setTaskCompleted: (taskId: string, isChecked: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void
    taskData: TaskType
}
export const Task: React.FC<TaskPropsType> = React.memo((
    {
        removeTask,
        setTaskCompleted,
        changeTaskTitle,
        taskData
    }
) => {
    const onRemoveTaskHandler = useCallback(() => {
        removeTask(taskData.id);
    }, [removeTask, taskData.id]);

    const onSetTaskCompletedHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTaskCompleted(taskData.id, e.currentTarget.checked);
    }, [setTaskCompleted, taskData.id]);

    const onChangeTaskTitleHandler = useCallback((newTitle: string) => {
        changeTaskTitle(taskData.id, newTitle);
    }, [changeTaskTitle, taskData.id]);

    return <div
        key={taskData.id}
        className={taskData.isDone ? c.completed : ''}>
        <Checkbox
            color={'primary'}
            checked={taskData.isDone}
            onChange={onSetTaskCompletedHandler}
        />
        <EditableSpan
            title={taskData.title}
            onChangeTitle={onChangeTaskTitleHandler}
        />
        <IconButton
            onClick={onRemoveTaskHandler}
            size={"small"}
        >
            <RemoveCircleOutline/>
        </IconButton>
    </div>
});