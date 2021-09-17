import React, {ChangeEvent, KeyboardEvent, useState} from "react";
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
    let [newItem, setNewItem] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onAddItemHandler = () => {
        if (newItem.trim()) {
            addItem(newItem.trim());
            setNewItem('');
        } else {
            setError("Title is required!");
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewItem(e.currentTarget.value);
    }
    const onEnterPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newItem.trim()) {
                addItem(newItem.trim());
                setNewItem('');
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
                value={newItem}
                error={!!error}
                helperText={error}
                label={'Add item'}
            />
            <IconButton onClick={onAddItemHandler}>
                <AddCircleOutline color={'primary'}/>
            </IconButton>
        </div>
    )
}