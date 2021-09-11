import React from "react";
import {connect} from "react-redux";
import {Todolist} from "./Todolist";
import {rootReducerType} from "../../store/store";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterType,
    removeTodolistAC,
    todolistsActionType,
    TodolistsDispatchType,
    TodolistsStateType
} from "../../reducers/TodolistsReducer";


const mapStateToProps = (state: rootReducerType): TodolistsStateType => ({
    todolists: state.todolists
});

const mapDispatchToProps = (dispatch: (action: todolistsActionType) => void): TodolistsDispatchType => ({
    addTodolist: (todolistTitle: string) => {
        dispatch(addTodolistAC(todolistTitle));
    },
    removeTodolist: (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    },
    changeTodolistTitle: (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle));
    },
    changeFilter: (todolistId: string, filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter));
    }
});


export const TodolistContainer = connect(mapStateToProps, mapDispatchToProps)(Todolist);

