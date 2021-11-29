import {useSelector} from "react-redux";
import React, {useCallback, useEffect, useMemo} from "react";
import {Container, Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../common/AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {Redirect} from "react-router-dom";
import {authSelector, todolistsSelector} from "../../../redux/selectors";
import {todolistsActions} from "./index";
import {AddItemFormSubmitHelperType} from "../../../types/types";
import {useActions, useAppDispatch} from "../../../utils/redux-utils";


type TodolistsPropsType = {
    demo?: boolean
}
export const TodolistsList: React.FC<TodolistsPropsType> = React.memo((
    {
        demo = false
    }
) => {
    const isLogged = useSelector(authSelector.selectIsLogged);
    const {getTodolists} = useActions(todolistsActions);
    const dispatch = useAppDispatch();

    const addTodolistCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        let thunk = todolistsActions.createTodolist(title)
        const resultAction = await dispatch(thunk)

        if (todolistsActions.createTodolist.rejected.match(resultAction)) {
            if (resultAction.payload?.messages?.length) {
                const errorMessage = resultAction.payload?.messages[0]
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error occured')
            }
        } else {
            helper.setTitle('')
        }
    }, []);

    useEffect(() => {
        if (demo || !isLogged) {
            return
        }
        getTodolists();
    }, []);

    const todolists = useSelector(todolistsSelector.selectTodolists);

    const listOfTodolists = useMemo(() => {
        return todolists.map(tl => <Grid item>
                <div style={{marginTop: '40px'}}>
                    <Todolist
                        todolistModel={tl}
                        demo={demo}
                    />
                </div>
            </Grid>
        )
    }, [todolists, demo]);

    if (!isLogged) {
        return <Redirect to={'/login'}/>
    }

    return (
        <Container>
            <Grid container>
                <Paper style={{padding: '20px', marginTop: '20px'}}>
                    <AddItemForm addItem={addTodolistCallback}/>
                </Paper>
            </Grid>
            <Grid container spacing={4} style={{flexWrap: 'nowrap', overflowX: 'scroll', height: '80vh'}}>
                {
                    listOfTodolists
                }
            </Grid>
        </Container>
    )
});
