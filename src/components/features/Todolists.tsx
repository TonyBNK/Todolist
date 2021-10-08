import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useMemo} from "react";
import {createTodolist, getTodolists} from "../../bll/thunks/thunks";
import {RootStateType} from "../../bll/store";
import {TodolistType} from "../../types/types";
import {Container, Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../common/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";

export const Todolists = React.memo(() => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTodolists());
    }, [dispatch]);

    const todolists = useSelector<RootStateType, Array<TodolistType>>(
        state => state.todolists
    );

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolist(title));
    }, [dispatch]);

    return (
        <Container>
            <Grid container>
                <Paper style={{padding: '20px', marginTop: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Paper>
            </Grid>
            <Grid container spacing={7}>
                {
                    useMemo(() => {
                        return todolists.map(tl => <Grid item>
                                <Paper
                                    elevation={3}
                                    style={{padding: '20px', marginTop: '40px'}}
                                >
                                    <Todolist
                                        todolistModel={tl}
                                    />
                                </Paper>
                            </Grid>
                        )
                    }, [todolists])
                }
            </Grid>
        </Container>
    )
});