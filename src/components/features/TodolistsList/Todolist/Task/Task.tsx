import React, {ChangeEvent, useCallback} from "react";
import c from "./Task.module.scss";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../../../common/EditableSpan/EditableSpan";
import {RemoveCircleOutline} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../../../../types/types";
import {tasksActions} from "../../index";
import {useActions, useAppDispatch} from "../../../../../utils/redux-utils";


export type TaskPropsType = {
    taskModel: TaskType
}
export const Task: React.FC<TaskPropsType> = React.memo((
    {
        taskModel
    }
) => {
    const {deleteTask, updateTask} = useActions(tasksActions);
    const dispatch = useAppDispatch();

    const onRemoveTaskHandler = useCallback(() => {
        deleteTask({id: taskModel.id, todoListId: taskModel.todoListId});
    }, [taskModel.id, taskModel.todoListId]);

    const onChangeTitleHandler = useCallback((newValue: string) => {
        dispatch(tasksActions.updateTask({
            ...taskModel,
            title: newValue
        }));
    }, [taskModel, dispatch]);

    const onChangeStatusHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
        e.currentTarget.checked
            ? updateTask({...taskModel, status: TaskStatuses.Completed})
            : updateTask({...taskModel, status: TaskStatuses.New})
    }, [taskModel, updateTask]);

    return <div
        key={taskModel.id}
        className={taskModel.status === TaskStatuses.Completed ? c.completed : ''}
        style={{position: "relative"}}
    >
        <Checkbox
            color={'primary'}
            onChange={onChangeStatusHandler}
            checked={taskModel.status === TaskStatuses.Completed}
        />
        <EditableSpan
            value={taskModel.title}
            onChange={onChangeTitleHandler}
        />
        <IconButton
            onClick={onRemoveTaskHandler}
            size={"small"}
            style={{position: 'absolute', top: 0, right: 0, bottom: 0}}
        >
            <RemoveCircleOutline/>
        </IconButton>
    </div>
});
