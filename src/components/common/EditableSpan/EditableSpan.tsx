import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";


export type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((
    {
        value,
        onChange
    }
) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    // return editMode && entityStatus !== 'loading'
    //     ? <TextField
    //         value={itemTitle}
    //         onBlur={onSetViewModeHandler}
    //         onChange={onChangeTitleHandler}
    //         autoFocus
    //         variant={'outlined'}
    //         size={'small'}
    //     />
    //     : <span
    //         onDoubleClick={onSetEditModeHandler}>
    //         {title}
    // </span>

    return editMode
        ? <TextField
            value={title}
            onChange={changeTitle}
            autoFocus
            onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode}>{value}</span>
})