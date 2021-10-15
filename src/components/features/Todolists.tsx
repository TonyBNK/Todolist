import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useMemo} from "react";
import {createTodolist, getTodolists} from "../../bll/thunks/thunks";
import {RootStateType, TodolistType} from "../../types/types";
import {Container, Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../common/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Redirect} from "react-router-dom";

type TodolistsPropsType = {
    demo?: boolean
}
export const Todolists: React.FC<TodolistsPropsType> = React.memo((
    {
        demo = false
    }
) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector<RootStateType, boolean>(
        state => state.auth.isLoggedIn
    );

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return
        }
        dispatch(getTodolists());
    }, []);

    const todolists = useSelector<RootStateType, Array<TodolistType>>(
        state => state.todolists
    );

    const listOfTodolists = useMemo(() => {
        return todolists.map(tl => <Grid item>
                <Paper
                    elevation={3}
                    style={{padding: '20px', marginTop: '40px'}}
                >
                    <Todolist
                        todolistModel={tl}
                        demo={demo}
                    />
                </Paper>
            </Grid>
        )
    }, [todolists, demo]);

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodolist(title));
    }, [dispatch]);

    if (!isLoggedIn) {
        return <Redirect to={'/login'}/>
    }

    return (
        <Container>
            <Grid container>
                <Paper style={{padding: '20px', marginTop: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Paper>
            </Grid>
            <Grid container spacing={7}>
                {
                    listOfTodolists
                }
            </Grid>
        </Container>
    )
});
