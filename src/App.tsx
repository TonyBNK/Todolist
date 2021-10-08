import React from 'react';
import c from './App.module.css';
import {
    AppBar,
    Button,
    IconButton,
    Toolbar,
    Typography,
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {Todolists} from "./components/features/Todolists";


const App = React.memo(() => {
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
            <Todolists/>
        </div>
    );
})

export default App;
