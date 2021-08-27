import React from "react";
import {FilterType} from "../App";
import c from './FilterButtons.module.css';

type FilterButtonsType = {
    changeFilter: (value: FilterType) => void
    filter: FilterType
}
export const FilterButtons: React.FC<FilterButtonsType> = (props) => {

    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');

    return (
        <div>
            <button onClick={onAllClickHandler}
                    className={props.filter === 'all' ? c.activeFilter : ''}>All</button>
            <button onClick={onActiveClickHandler}
                    className={props.filter === 'active' ? c.activeFilter : ''}>Active</button>
            <button onClick={onCompletedClickHandler}
                    className={props.filter === 'completed' ? c.activeFilter : ''}>Completed</button>
        </div>
    );
};