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
import {ErrorSnackbar} from "./components/common/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {RequestStatusType, RootStateType} from "./types/types";
import {ProgressBar} from "./components/common/ProgressBar/ProgressBar";


type AppPropsType = {
    demo?: boolean
}

const App: React.FC<AppPropsType> = React.memo((
    {
        demo = false
    }
) => {
    const status = useSelector<RootStateType, RequestStatusType>(
        state => state.app.status
    );

    return (
        <div className={c.app}>
            <ErrorSnackbar/>
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
                {status === 'loading' && <ProgressBar/>}
            </AppBar>
            <Todolists demo={demo}/>
        </div>
    );
})

export default App;
