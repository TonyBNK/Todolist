import React, {useCallback} from "react";
import c from './FilterButtons.module.css';
import {Button} from "@material-ui/core";
import {FilterType, TodolistType} from "../../../../../types/types";


export type FilterButtonsType = {
    item: TodolistType
    changeItem: (model: TodolistType) => void
}
export const FilterButtons: React.FC<FilterButtonsType> = React.memo((
    {
        item,
        changeItem
    }) => {
    const {entityStatus} = item;

    const onAllFilterHandler = useCallback(
        () => changeItem({...item, filter: 'All'}), [changeItem, item]
    );
    const onActiveFilterHandler = useCallback(
        () => changeItem({...item, filter: 'Active'}), [changeItem, item]
    );
    const onCompletedFilterHandler = useCallback(
        () => changeItem({...item, filter: 'Completed'}), [changeItem, item]
    );

    const renderFilterButton = (onClick: () => void, filter: FilterType) => {

        return <Button
            style={{margin: '3px'}}
            onClick={onClick}
            color={'primary'}
            variant={item.filter === filter ? 'contained' : 'outlined'}
            size={'small'}
            disabled={entityStatus === 'loading'}
        >
            {filter}
        </Button>
    }

    return (
        <div className={c.filterButtons}>
            {renderFilterButton(onAllFilterHandler, 'All')}
            {renderFilterButton(onActiveFilterHandler, 'Active')}
            {renderFilterButton(onCompletedFilterHandler, 'Completed')}
        </div>
    );
});
