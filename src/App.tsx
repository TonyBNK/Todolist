import React, {useState} from 'react';
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

export type FilterType = 'All' | 'Active' | 'Completed';
type TodolistType = {
    id: string
    title: string
    filter: FilterType
}
type TasksObjectType = {
    [key: string]: Array<TaskType>
}

function App() {

    const [todolistId1, todolistId2] = [v1(), v1()];

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: 'All'},
        {id: todolistId2, title: "What to buy", filter: 'All'},
    ]);

    const [tasksObj, setTasksObj] = useState<TasksObjectType>({
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
    });

    const addTask = (taskTitle: string, todolistId: string) => {
        const newTask = {id: v1(), title: taskTitle, isDone: false};
        tasksObj[todolistId] = [...tasksObj[todolistId], newTask];
        setTasksObj({...tasksObj});
    }

    const addTodolist = (todolistTitle: string) => {
        const newTodolist: TodolistType = {
            id: v1(),
            title: todolistTitle,
            filter: 'All'
        };
        setTodolists([...todolists, newTodolist]);
        setTasksObj({...tasksObj, [newTodolist.id]: []});
    }

    const removeTask = (taskId: string, todolistId: string) => {
        tasksObj[todolistId] = tasksObj[todolistId].filter(t => t.id !== taskId);
        setTasksObj({...tasksObj});
    }

    const changeFilter = (filter: FilterType, todolistId: string) => {
        const todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = filter;
            setTodolists([...todolists]);
        }
    }

    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        const newTasks = tasksObj[todolistId].map(t => {
            return t.id === taskId
                ? {...t, title: newTitle}
                : t
        });
        setTasksObj({...tasksObj, [todolistId]: newTasks});
    }

    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        const newTodolists = todolists.map(tl => {
            return tl.id === todolistId
                ? {...tl, title: newTitle}
                : tl
        });
        setTodolists(newTodolists);
    }

    const setCompleted = (taskId: string, isDone: boolean, todolistId: string) => {
        let task = tasksObj[todolistId].find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj});
        }
    }

    const removeTodolist = (todolistId: string) => {
        let filteredTodolists = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filteredTodolists);
        delete tasksObj[todolistId];
        setTasksObj({...tasksObj});
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
                            let tasksForTodolist = tasksObj[tl.id];
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

export default App;
