import {todolistsAPI} from "../../api/todolists-api";
import {
    addTodolist,
    changeTodolistTitle,
    getAllTodolists, removeTodolist
} from "../action-creators/actionCreators";
import {
    CreateTodolistType, DeleteTodolistType,
    GetAllTodolistsType,
    UpdateTodolistType
} from "../../types/types";


export const getTodolists: GetAllTodolistsType = () => {
    return (dispatch) => {
        todolistsAPI
            .getTodolists()
            .then(response => {
                dispatch(getAllTodolists(response.data));
            })
    }
}

export const createTodolist: CreateTodolistType = (title) => {
    return (dispatch) => {
        todolistsAPI
            .createTodolist(title)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(addTodolist(response.data.data.item.title));
                }
            })
            .catch(error => console.log(error));
    }
}

export const updateTodolist: UpdateTodolistType = (id, newTitle) => {
    return (dispatch) => {
        todolistsAPI
            .updateTodolist(id, newTitle)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTodolistTitle(id, newTitle));
                }
            })
            .catch(error => console.log(error));
    }
}

export const deleteTodolist: DeleteTodolistType = (id) => {
    return (dispatch) => {
        todolistsAPI
            .deleteTodolist(id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(removeTodolist(id));
                }
            })
            .catch(error => console.log(error));
    }
}

export const getTasks: any = () => {
    return (dispatch: any) => {

    }
}