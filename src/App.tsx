import React, {useCallback} from 'react';
import c from './App.module.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/Todolist/AddItemForm/AddItemForm";
import {
    AppBar,
    Button, Container, Grid,
    IconButton, Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
    removeTodolistAC
} from "./bll/reducers/TodolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./bll/store";
import {TaskType} from "./components/Todolist/Task/Task";

export type FilterType = 'All' | 'Active' | 'Completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

const App = React.memo(() => {
    const dispatch = useDispatch();

    const todolists = useSelector<RootStateType, Array<TodolistType>>(
        state => state.todolists
    );

    const addTodolist = useCallback((todolistTitle: string) => {
        dispatch(addTodolistAC(todolistTitle));
    }, [dispatch]);

    const removeTodolist = useCallback((todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    }, [dispatch]);

    const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle));
    }, [dispatch]);

    const changeFilter = useCallback((todolistId: string, filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter));
    }, [dispatch]);

    return (
        <div className={c.app}>
            <Container>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Grid container>
                    <Paper style={{padding: '20px', marginTop: '20px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Paper>
                </Grid>
                <Grid container spacing={7}>
                    {
                        todolists.map(tl => {
                            return <Grid item>
                                <Paper
                                    elevation={3}
                                    style={{padding: '20px', marginTop: '40px'}}
                                >
                                    <Todolist
                                        todolistId={tl.id}
                                        title={tl.title}
                                        changeFilter={changeFilter}
                                        changeTodolistTitle={changeTodolistTitle}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
})

export default App;
