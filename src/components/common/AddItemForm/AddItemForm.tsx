import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";
import {RequestStatusType} from "../../../types/types";

export type AddItemFormPropsType = {
    addItem: (newTitle: string, todoListId?: string) => void
    entityStatus?: RequestStatusType
}
export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo((
    {
        addItem,
        entityStatus
    }
) => {
    let [newItem, setNewItem] = useState<string>('');
    let [error, setError] = useState<string | null>(null);

    const onAddItemHandler = useCallback(() => {
        if (newItem.trim()) {
            addItem(newItem.trim());
            setNewItem('');
        } else {
            setError("Title is required!");
        }
    }, [addItem, newItem]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNewItem(e.currentTarget.value);
    }, []);

    const onEnterPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newItem.trim()) {
                addItem(newItem.trim());
                setNewItem('');
            } else {
                setError("Title is required!");
            }
        } else {
            if (error !== null) {
                setError(null);
            }
        }
    }, [addItem, newItem, error]);

    return (
        <div>
            <TextField
                onChange={onChangeHandler}
                onKeyPress={onEnterPressHandler}
                value={newItem}
                error={!!error}
                helperText={error}
                label={'Add item'}
                disabled={entityStatus === 'loading'}
            />
            <IconButton
                onClick={onAddItemHandler}
                disabled={entityStatus === 'loading'}
            >
                <AddCircleOutline color={'primary'}/>
            </IconButton>
        </div>
    )
})