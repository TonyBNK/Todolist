import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect, useMemo} from "react";
import {RootStateType, TodolistType} from "../../types/types";
import {Container, Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../common/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Redirect} from "react-router-dom";
import {
    createTodolist, getTodolists
} from "../../bll/reducers/TodolistsReducer";


type TodolistsPropsType = {
    demo?: boolean
}
export const TodolistsList: React.FC<TodolistsPropsType> = React.memo((
    {
        demo = false
    }
) => {
    const dispatch = useDispatch();
    const isLogged = useSelector<RootStateType, boolean>(
        state => state.auth.isLogged
    );

    useEffect(() => {
        if (demo || !isLogged) {
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

    if (!isLogged) {
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
