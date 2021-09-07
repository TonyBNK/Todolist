import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import c from "./Todolist.module.css";
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (newTitle: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = (
    {
        addItem
    }
) => {
    let [newTask, setNewTask] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onAddTaskHandler = () => {
        if (newTask.trim()) {
            addItem(newTask.trim());
            setNewTask('');
        } else {
            setError("Title is required!");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value);
    }
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newTask.trim()) {
                addItem(newTask.trim());
                setNewTask('');
            } else {
                setError("Title is required!");
            }
        } else {
            setError(null);
        }
    }

    return (
        <div>
            <TextField
                onChange={onChangeHandler}
                onKeyPress={onEnterPressHandler}
                value={newTask}
                error={!!error}
                helperText={error}
                label={'Add item'}
            />
            <IconButton onClick={onAddTaskHandler}>
                <AddCircleOutline color={'primary'}/>
            </IconButton>
        </div>
    )
}