import React, {useCallback} from "react";
import c from './FilterButtons.module.css';
import {Button} from "@material-ui/core";
import {TodolistType} from "../../../../../types/types";


export type FilterButtonsType = {
    item: TodolistType
    changeItem: (model: TodolistType) => void
}
export const FilterButtons: React.FC<FilterButtonsType> = React.memo((
    {
        item,
        changeItem
    }) => {
    const {filter, entityStatus} = item;

    const onAllFilterHandler = useCallback(
        () => changeItem({...item, filter: 'All'}), [changeItem, item]
    );
    const onActiveFilterHandler = useCallback(
        () => changeItem({...item, filter: 'Active'}), [changeItem, item]
    );
    const onCompletedFilterHandler = useCallback(
        () => changeItem({...item, filter: 'Completed'}), [changeItem, item]
    );

    return (
        <div className={c.filterButtons}>
            <Button
                style={{margin: '3px'}}
                onClick={onAllFilterHandler}
                color={'primary'}
                variant={filter === "All" ? 'contained' : 'outlined'}
                size={'small'}
                disabled={entityStatus === 'loading'}
            >
                All
            </Button>
            <Button
                style={{margin: '3px'}}
                onClick={onActiveFilterHandler}
                color={"primary"}
                variant={filter === "Active" ? 'contained' : 'outlined'}
                size={'small'}
                disabled={entityStatus === 'loading'}
            >
                Active
            </Button>
            <Button
                style={{margin: '3px'}}
                onClick={onCompletedFilterHandler}
                variant={filter === "Completed" ? 'contained' : 'outlined'}
                color={'primary'}
                size={'small'}
                disabled={entityStatus === 'loading'}
            >
                Completed
            </Button>
        </div>
    );
});