import React from "react";
import {FilterType} from "../App";

type FilterButtonsType = {
    changeFilter: (value: FilterType) => void
}
export const FilterButtons:React.FC<FilterButtonsType> = (props) =>{

    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onCompletedClickHandler = () => props.changeFilter('completed');

    return(
        <div>
            <button onClick={onAllClickHandler}>All</button>
            <button onClick={onActiveClickHandler}>Active</button>
            <button onClick={onCompletedClickHandler}>Completed</button>
        </div>
    );
}