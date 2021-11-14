import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";
import {TaskType, TodolistType} from "../../../types/types";

export type EditableSpanPropsType = {
    item: TodolistType | TaskType
    changeItem: (model: any) => void // todo: delete any type
}
export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((
    {
        item,
        changeItem
    }
) => {
    const [editMode, setEditMode] = useState(false);
    const [itemTitle, setItemTitle] = useState('');

    const {title, entityStatus} = item as TodolistType;

    const onSetEditModeHandler = useCallback(() => {
        setEditMode(true);
        setItemTitle(title);
    }, [title]);

    const onSetViewModeHandler = useCallback(() => {
        setEditMode(false);
        changeItem({...item, title: itemTitle});
    }, [changeItem, itemTitle]);

    const onChangeTitleHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(e.currentTarget.value);
    }, [])

    return editMode && entityStatus !== 'loading'
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