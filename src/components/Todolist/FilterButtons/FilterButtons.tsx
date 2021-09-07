import React from "react";
import c from './FilterButtons.module.css';
import {FilterType} from "../../../App";
import {Button} from "@material-ui/core";


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

    const onAllFilterHandler = () => changeFilter('All', todolistId);
    const onActiveFilterHandler = () => changeFilter('Active', todolistId);
    const onCompletedFilterHandler = () => changeFilter('Completed', todolistId);

    return (
        <div className={c.filterButtons}>
            <Button
                style={{margin: '3px'}}
                onClick={onAllFilterHandler}
                color={'primary'}
                variant={filter === "All" ? 'contained' : 'outlined'}
                size={'small'}
            >
                All
            </Button>
            <Button
                style={{margin: '3px'}}
                onClick={onActiveFilterHandler}
                color={"primary"}
                variant={filter === "Active" ? 'contained' : 'outlined'}
                size={'small'}
            >
                Active
            </Button>
            <Button
                style={{margin: '3px'}}
                onClick={onCompletedFilterHandler}
                variant={filter === "Completed" ? 'contained' : 'outlined'}
                color={'primary'}
                size={'small'}
            >
                Completed
            </Button>
        </div>
    );
};