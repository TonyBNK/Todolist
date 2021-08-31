import React from "react";
import c from './FilterButtons.module.css';
import {FilterType} from "../../../App";


export type FilterButtonsType = {
    todolistId: string
    changeFilter: (filter: FilterType, todolistId: string) => void
    filter: FilterType
}
export const FilterButtons: React.FC<FilterButtonsType> = (props) => {

    const onAllFilterHandler = () => props.changeFilter('all', props.todolistId);
    const onActiveFilterHandler = () => props.changeFilter('active', props.todolistId);
    const onCompletedFilterHandler = () => props.changeFilter('completed', props.todolistId);


    return (
        <div className={c.filterButtons}>
            <button onClick={onAllFilterHandler}
                    className={props.filter === 'all' ? c.currentFilter : ''}>All
            </button>
            <button onClick={onActiveFilterHandler}
                    className={props.filter === 'active' ? c.currentFilter : ''}>Active</button>
            <button onClick={onCompletedFilterHandler}
                    className={props.filter === 'completed' ? c.currentFilter : ''}>Completed</button>
        </div>
    );
};