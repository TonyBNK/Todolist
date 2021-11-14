import React, {useCallback} from "react";
import c from './FilterButtons.module.css';
import {Button} from "@material-ui/core";
import {FilterType, TodolistType} from "../../../../../types/types";


export type FilterButtonsPropsType = {
    item: TodolistType
    changeItem: (model: TodolistType) => void
}
export const FilterButtons: React.FC<FilterButtonsPropsType> = React.memo((
    {
        item,
        changeItem
    }) => {
    const {entityStatus} = item;

    const onFilterButtonClickHandler = useCallback(
        (filter: FilterType) => changeItem({...item, filter}), [changeItem, item]
    );

    const renderFilterButton = (onClick: (filter: FilterType) => void, filter: FilterType) => {
        return <Button
            style={{margin: '3px'}}
            onClick={() => onFilterButtonClickHandler(filter)}
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
            {renderFilterButton(onFilterButtonClickHandler, 'All')}
            {renderFilterButton(onFilterButtonClickHandler, 'Active')}
            {renderFilterButton(onFilterButtonClickHandler, 'Completed')}
        </div>
    );
});
