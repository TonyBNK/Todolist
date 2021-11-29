import {selectAppVariables} from "./AppSelector";
import {selectIsLogged} from "./AuthSelector";
import {selectTodolists} from "./TodolistsSelector";


const authSelector = {
    selectIsLogged
}
const appSelector = {
    selectAppVariables
}
const todolistsSelector = {
    selectTodolists
}

export {
    authSelector,
    appSelector,
    todolistsSelector
}
