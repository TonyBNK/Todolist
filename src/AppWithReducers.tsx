import React, {useReducer} from 'react';
import c from './App.module.css';
import {v1} from "uuid";
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
    removeTodolistAC,
    TodolistsReducer
} from "./reducers/TodolistsReducer";
import {
    addTaskAC,
    changeTaskTitleAC,
    removeTaskAC, setCompletedAC,
    TasksReducer
} from "./reducers/TasksReducer";

export type FilterType = 'All' | 'Active' | 'Completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
export type TasksObjectType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {

    const [todolistId1, todolistId2] = [v1(), v1()];

    const [todolists, dispatchTodolistsToReducer] = useReducer(
        TodolistsReducer,
        [
            {id: todolistId1, title: "What to learn", filter: 'All'},
            {id: todolistId2, title: "What to buy", filter: 'All'},
        ]
    );

    const [tasks, dispatchTasksToReducer] = useReducer(
        TasksReducer,
        {
            [todolistId1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "React", isDone: false},
                {id: v1(), title: "Redux", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false}
            ],
            [todolistId2]: [
                {id: v1(), title: "Milk", isDone: true},
                {id: v1(), title: "Bread", isDone: true},
                {id: v1(), title: "Chips", isDone: false}
            ]
        }
    );

    const addTask = (todolistId: string, taskTitle: string) => {
        dispatchTasksToReducer(addTaskAC(todolistId, taskTitle));
    }

    const removeTask = (todolistId: string, taskId: string) => {
        dispatchTasksToReducer(removeTaskAC(todolistId, taskId));
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        dispatchTasksToReducer(changeTaskTitleAC(todolistId, taskId, newTitle));
    }

    const setCompleted = (todolistId: string, taskId: string, isDone: boolean) => {
        dispatchTasksToReducer(setCompletedAC(todolistId, taskId, isDone));
    }

    const addTodolist = (todolistTitle: string) => {
        const action = addTodolistAC(todolistTitle);
        dispatchTasksToReducer(action);
        dispatchTodolistsToReducer(action);
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId);
        dispatchTasksToReducer(action);
        dispatchTodolistsToReducer(action);
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        dispatchTodolistsToReducer(changeTodolistTitleAC(todolistId, newTitle));
    }

    const changeFilter = (todolistId: string, filter: FilterType) => {
        dispatchTodolistsToReducer(changeTodolistFilterAC(todolistId, filter));
    }

    return (
        <div className={c.app}>
            <Container>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit"
                                    aria-label="menu">
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

export default AppWithReducers;
