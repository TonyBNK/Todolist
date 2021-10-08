import React from "react";
import c from './FilterButtons.module.css';
import {Button} from "@material-ui/core";
import {FilterType} from "../../../types/types";


export type FilterButtonsType = {
    changeFilter: (filter: FilterType) => void
    filter: FilterType
}
export const FilterButtons: React.FC<FilterButtonsType> = React.memo((
    {
        changeFilter,
        filter
    }) => {
    const onAllFilterHandler = () => changeFilter('All');
    const onActiveFilterHandler = () => changeFilter('Active');
    const onCompletedFilterHandler = () => changeFilter('Completed');

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
});