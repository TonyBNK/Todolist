import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddCircleOutline} from "@material-ui/icons";
import {AddItemFormSubmitHelperType} from "../../../types/types";


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
                setTitle('');
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
        // <div>
        //     <TextField
        //         onChange={onChangeHandler}
        //         onKeyPress={onEnterPressHandler}
        //         value={newItem}
        //         error={!!error}
        //         helperText={error}
        //         label={'Add item'}
        //         disabled={entityStatus === 'loading'}
        //     />
        //     <IconButton
        //         onClick={onAddItemHandler}
        //         disabled={entityStatus === 'loading'}
        //     >
        //         <AddCircleOutline color={'primary'}/>
        //     </IconButton>
        // </div>
        <div>
            <TextField variant="outlined"
                       disabled={disabled}
                       error={!!error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onEnterPressHandler}
                       label="Title"
                       helperText={error}
            />
            <IconButton color="primary" onClick={onAddItemHandler} disabled={disabled} style={{marginLeft: '5px'}}>
                <AddCircleOutline color={'primary'}/>
            </IconButton>
        </div>
    )
});
