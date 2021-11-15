import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";
import {AddItemFormSubmitHelperType} from "../../../types/types";
import c from "./AddItemForm.module.scss";


export type AddItemFormPropsType = {
    addItem: (title: string, helper: AddItemFormSubmitHelperType) => void
    disabled?: boolean
}
export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo((
    {
        addItem,
        disabled = false
    }
) => {
    let [title, setTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const onAddItemHandler = useCallback(async () => {
        if (title.trim() !== '') {
            addItem(title, {setError, setTitle})
        } else {
            setError('Title is required')
        }
    }, [addItem, title]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }, []);

    const onEnterPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (title.trim()) {
                onAddItemHandler();
            } else {
                setError("Title is required!");
            }
        } else {
            if (error !== null) {
                setError(null);
            }
        }
    }, [onAddItemHandler, title, error]);

    return (
        <div className={c.addItemFormContainer}>
            <TextField
                disabled={disabled}
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onEnterPressHandler}
                label='Add item'
                helperText={error}
                style={{maxWidth: '200px'}}
            />
            <IconButton color="primary" onClick={onAddItemHandler}
                        disabled={disabled} style={{marginLeft: '5px'}}>
                <AddCircleOutline color={'primary'}/>
            </IconButton>
        </div>
    )
});
