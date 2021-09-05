import React from "react";
import c from './FilterButtons.module.css';
import {FilterType} from "../../../App";


export type FilterButtonsType = {
    todolistId: string
    changeFilter: (filter: FilterType, todolistId: string) => void
    filter: FilterType
}
export const FilterButtons: React.FC<FilterButtonsType> = (
    {
        todolistId,
        changeFilter,
        filter
    }) => {

    const onAllFilterHandler = () => changeFilter('all', todolistId);
    const onActiveFilterHandler = () => changeFilter('active', todolistId);
    const onCompletedFilterHandler = () => changeFilter('completed', todolistId);

    return (
        <div className={c.filterButtons}>
            <button
                onClick={onAllFilterHandler}
                className={filter === 'all' ? c.currentFilter : ''}
            >
                All
            </button>
            <button
                onClick={onActiveFilterHandler}
                className={filter === 'active' ? c.currentFilter : ''}
            >
                Active
            </button>
            <button
                onClick={onCompletedFilterHandler}
                className={filter === 'completed' ? c.currentFilter : ''}
            >
                Completed
            </button>
        </div>
    );
};