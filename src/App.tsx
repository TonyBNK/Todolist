import React, {useCallback, useEffect, useMemo} from 'react';
import c from './App.module.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/Todolist/AddItemForm/AddItemForm";
import {
    AppBar, Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar, Typography,
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./bll/store";
import {createTodolist, getTodolists} from "./bll/thunks/thunks";
import {TodolistType} from "./types/types";
import {Menu} from "@material-ui/icons";


const App = React.memo(() => {
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
        <div className={c.app}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
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
                                            id={tl.id}
                                            title={tl.title}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        }, [todolists])
                    }
                </Grid>
            </Container>
        </div>
    );
})

export default App;
