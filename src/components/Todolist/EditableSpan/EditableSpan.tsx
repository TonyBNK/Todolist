import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";

export type EditableSpanPropsType = {
    title: string
    onChangeTitle: (newTitle: string) => void
}
export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((
    {
        title,
        onChangeTitle
    }
) => {
    const [editMode, setEditMode] = useState(false);
    const [itemTitle, setItemTitle] = useState('');

    const onSetEditModeHandler = useCallback(() => {
        setEditMode(true);
        setItemTitle(title);
    }, [title]);

    const onSetViewModeHandler = useCallback(() => {
        setEditMode(false);
        onChangeTitle(itemTitle);
    }, [onChangeTitle, itemTitle]);

    const onChangeTitleHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value);
    }, [])

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
})