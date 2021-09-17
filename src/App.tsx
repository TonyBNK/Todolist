import React from 'react';
import c from './App.module.css';
import {TaskType, Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/Todolist/AddItemForm";
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
} from "./reducers/TodolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "./redux/store";

export type FilterType = 'All' | 'Active' | 'Completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    const dispatch = useDispatch();

    const todolists = useSelector<RootStateType, Array<TodolistType>>(
        state => state.todolists
    );

    const addTodolist = (todolistTitle: string) => {
        dispatch(addTodolistAC(todolistTitle));
    }

    const removeTodolist = (todolistId: string) => {
        dispatch(removeTodolistAC(todolistId));
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(todolistId, newTitle));
    }

    const changeFilter = (todolistId: string, filter: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, filter));
    }

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
                                        key={tl.id}
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
}

export default App;
