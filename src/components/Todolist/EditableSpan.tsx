import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    onChangeTitle: (newTitle: string) => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = (
    {
        title,
        onChangeTitle
    }
) => {
    const [editMode, setEditMode] = useState(false);
    const [itemTitle, setItemTitle] = useState('');

    const onSetEditModeHandler = () => {
        setEditMode(true);
        setItemTitle(title);
    }

    const onSetViewModeHandler = () => {
        setEditMode(false);
        onChangeTitle(itemTitle);
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value);
    }

    return editMode
        ? <TextField
            value={itemTitle}
            onBlur={onSetViewModeHandler}
            onChange={onChangeTitleHandler}
            autoFocus
            variant={'outlined'}
            size={'small'}
        />
        : <span
            onDoubleClick={onSetEditModeHandler}>
            {title}
    </span>
}