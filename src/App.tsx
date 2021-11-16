import React, {useEffect} from 'react';
import c from './App.module.css';
import {
    AppBar,
    Button,
    CircularProgress,
    IconButton,
    Toolbar,
    Typography,
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useSelector} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import {appSelector, authSelector} from "./redux/selectors";
import {TodolistsList} from "./components/features/TodolistsList";
import {Login} from "./components/features/Login";
import {ProgressBar} from "./components/common/ProgressBar";
import {ErrorSnackbar} from "./components/common/ErrorSnackbar";
import {appActions, authActions} from "./redux/reducers";
import {useActions} from "./utils/redux-utils";


type AppPropsType = {
    demo?: boolean
}
const App: React.FC<AppPropsType> = React.memo((
    {
        demo = false
    }
) => {
    const {status, isInitialized} = useSelector(appSelector.selectAppVariables);
    const isLogged = useSelector(authSelector.selectIsLogged);
    const {logOut} = useActions(authActions);
    const {setAppInitialize} = useActions(appActions);

    const onLogOutClickHandler = () => {
        logOut();
    }

    useEffect(() => {
        if (demo) {
            return;
        }
        setAppInitialize();
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
            <Switch>
                <Route
                    exact path={'/'}
                    render={() => <TodolistsList demo={demo}/>}
                />
                <Route
                    path={'/login'}
                    render={() => <Login/>}
                />
                <Route
                    path={'/404'}
                    render={() => <h1>Error: 404 not found</h1>}
                />
                <Redirect from={'*'} to={'/404'}/>
            </Switch>
        </div>
    );
})

export default App;
