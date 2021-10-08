import React from "react";
import c from "../Todolist.module.css";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {RemoveCircleOutline} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../types/types";
import {deleteTask} from "../../../bll/thunks/thunks";
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

    // const changeTaskTitle = (taskId: string, newTitle: string) => {
    //     dispatch(changeTaskTitle(todolistId, taskId, newTitle));
    // };

    // const onSetTaskCompletedHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    //     setTaskCompleted(taskData.id, e.currentTarget.checked);
    // }, [setTaskCompleted, taskData.id]);
    //
    // const onChangeTaskTitleHandler = useCallback((newTitle: string) => {
    //     changeTaskTitle(taskData.id, newTitle);
    // }, [changeTaskTitle, taskData.id]);

    return <div
        key={taskModel.id}
        className={taskModel.status === TaskStatuses.Completed ? c.completed : ''}>
        <Checkbox
            color={'primary'}
            onChange={() => {
            }}
        />
        <EditableSpan
            title={taskModel.title}
            onChangeTitle={() => {
            }}
        />
        <IconButton
            onClick={onRemoveTaskHandler}
            size={"small"}
        >
            <RemoveCircleOutline/>
        </IconButton>
    </div>
});