import React from "react";
import {FilterType} from "../App";

type FilterButtonsType = {
    changeFilter: (value: FilterType) => void
}
export const FilterButtons:React.FC<FilterButtonsType> = (props) =>{

    return(
        <div>
            <button onClick={() => props.changeFilter('all')}>All</button>
            <button onClick={() => props.changeFilter('active')}>Active</button>
            <button onClick={() => props.changeFilter('completed')}>Completed</button>
        </div>
    );
}