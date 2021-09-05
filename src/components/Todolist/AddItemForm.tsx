import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import c from "./Todolist.module.css";

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
            <input
                className={error ? c.error : ''}
                onChange={onChangeHandler}
                onKeyPress={onEnterPressHandler}
                value={newTask}
            />
            <button onClick={onAddTaskHandler}>+</button>
            {error && <div className={c.errorMessage}>{error}</div>}
        </div>
    )
}