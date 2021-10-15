import React, {useEffect} from 'react';
import c from './App.module.css';
import {
    AppBar,
    Button, CircularProgress,
    IconButton,
    Toolbar,
    Typography,
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {Todolists} from "./components/features/Todolists";
import {ErrorSnackbar} from "./components/common/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRequestType, RootStateType} from "./types/types";
import {ProgressBar} from "./components/common/ProgressBar/ProgressBar";
import {Route} from "react-router-dom";
import {Login} from "./components/features/Login/Login";
import {logOut, setAppInitialize} from "./bll/thunks/thunks";


type AppPropsType = {
    demo?: boolean
}

const App: React.FC<AppPropsType> = React.memo((
    {
        demo = false
    }
) => {
    const {status, isInitialized} = useSelector<RootStateType, AppRequestType>(
        state => state.app
    );
    const isLogged = useSelector<RootStateType, boolean>(
        state => state.auth.isLogged
    );
    const dispatch = useDispatch();

    const onLogOutClickHandler = () => {
        dispatch(logOut());
    }

    useEffect(() => {
        if (demo) {
            return;
        }
        dispatch(setAppInitialize());
    }, []);

    if (!isInitialized) {
        return <div style={{
            position: 'fixed',
            width: '100%',
            top: '30%',
            textAlign: 'center'
        }}>
            <CircularProgress/>
        </div>
    }

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
                    {
                        isLogged
                            && <Button
                                color="inherit"
                                style={{position: 'absolute', right: 0}}
                                onClick={onLogOutClickHandler}
                            >
                                Log Out
                            </Button>
                    }
                </Toolbar>
                {status === 'loading' && <ProgressBar/>}
            </AppBar>
            <Route
                exact path={'/'}
                render={() => <Todolists demo={demo}/>}
            />
            <Route
                path={'/login'}
                render={() => <Login/>}
            />
        </div>
    );
})

export default App;
