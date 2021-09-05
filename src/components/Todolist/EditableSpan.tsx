import React, {ChangeEvent, useState} from "react";

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

    const onSetEditModeHandler = () => setEditMode(true);

    const onSetViewModeHandler = () => setEditMode(false);

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeTitle(e.currentTarget.value);
    }

    return editMode
        ? <input
            value={title}
            onBlur={onSetViewModeHandler}
            onChange={onChangeTitleHandler}
            autoFocus
        />
        : <span
            onDoubleClick={onSetEditModeHandler}>
            {title}
    </span>
}