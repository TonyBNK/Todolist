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
import {
    addTaskAC,
    changeTaskTitleAC,
    removeTaskAC, setCompletedAC
} from "./reducers/TasksReducer";
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

function AppWithRedux() {

    const dispatch = useDispatch();

    const todolists = useSelector<RootStateType, Array<TodolistType>>(
        state => state.todolists
    );

    const tasks = useSelector<RootStateType, TasksType>(
        state => state.tasks
    )

    const addTask = (todolistId: string, taskTitle: string) => {
        dispatch(addTaskAC(todolistId, taskTitle));
    }

    const removeTask = (todolistId: string, taskId: string) => {
        dispatch(removeTaskAC(todolistId, taskId));
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, newTitle));
    }

    const setCompleted = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatch(setCompletedAC(todolistId, taskId, isDone));
    }

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
                            let tasksForTodolist = tasks[tl.id];
                            if (tl.filter === 'Active') {
                                tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                            }
                            if (tl.filter === 'Completed') {
                                tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                            }

                            return <Grid item>
                                <Paper
                                    elevation={3}
                                    style={{padding: '20px', marginTop: '40px'}}
                                >
                                    <Todolist
                                        key={tl.id}
                                        todolistId={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        addTask={addTask}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        setCompleted={setCompleted}
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

export default AppWithRedux;
