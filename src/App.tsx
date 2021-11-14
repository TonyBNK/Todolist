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
import {TodolistsList} from "./components/features/TodolistsList";
import {ErrorSnackbar} from "./components/common/ErrorSnackbar/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {ProgressBar} from "./components/common/ProgressBar/ProgressBar";
import {Redirect, Route, Switch} from "react-router-dom";
import {Login} from "./components/features/Login/Login";
import {logOut} from "./redux/reducers/AuthReducer";
import {setAppInitialize} from "./redux/reducers/AppReducer";
import {selectAppVariables} from "./redux/selectors/AppSelector";
import {selectIsLogged} from "./redux/selectors/AuthSelector";


type AppPropsType = {
    demo?: boolean
}
const App: React.FC<AppPropsType> = React.memo((
    {
        demo = false
    }
) => {
    const {status, isInitialized} = useSelector(selectAppVariables);
    const isLogged = useSelector(selectIsLogged);

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
