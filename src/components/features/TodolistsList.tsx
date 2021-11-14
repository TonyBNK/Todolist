import {useSelector} from "react-redux";
import React, {useCallback, useEffect, useMemo} from "react";
import {Container, Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../common/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Redirect} from "react-router-dom";
import {authSelector, todolistsSelector} from "../../redux/selectors";
import {useActions} from "../../redux/store";
import {todolistsActions} from "./index";


type TodolistsPropsType = {
    demo?: boolean
}
export const TodolistsList: React.FC<TodolistsPropsType> = React.memo((
    {
        demo = false
    }
) => {
    const isLogged = useSelector(authSelector.selectIsLogged);
    const {createTodolist, getTodolists} = useActions(todolistsActions);

    useEffect(() => {
        if (demo || !isLogged) {
            return
        }
        getTodolists();
    }, []);

    const todolists = useSelector(todolistsSelector.selectTodolists);

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

    if (!isLogged) {
        return <Redirect to={'/login'}/>
    }

    return (
        <Container>
            <Grid container>
                <Paper style={{padding: '20px', marginTop: '20px'}}>
                    <AddItemForm addItem={createTodolist}/>
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
